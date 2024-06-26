const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const model = "gpt-4o";
let currentDate = new Date().toISOString()
var systemPrompt = `
  You are a task scheduler.You will be given a JSON list of TASKS and EVENTS.Every EVENT has the following fields: {
    "id": 1,
    "name": "eventName",
    "description": "eventDescription",
    "timeTaken": < X > ,
    "scheduledStart": "1977-04-00T14:00:30",
    "scheduledEnd": "1977-04-00T17:00:30",
  }
  and every TASK has {
    "id": 1,
    "name": "taskName",
    "timeTaken": < X > ,
    "dueDate": "1977-04-01T14:00:30"
    "scheduledStart": "2024-06-23T14:00:30",
    "scheduledEnd": "2024-06-23T14:00:30",
    "taskType": "long"
    "resources": "X"
  }
  Note that "timeTaken"
  is in hours, and the time format 1977 - 04 - 01 T14: 00: 30 is representative of 30 seconds after 2: 00 PM on April 1, 1977. Tasks belong to assignments: for every assignment, there will be one or more tasks.Tasks that belong to one assignment share the same assignmentID.any tasks and events you schedule, make sure that NONE of them overlap - eg.2 tasks cannot occur at the same time, 2 events cannot occur at the same time, etc.Resources are resources that are used to help the user to complete their task, and you should generate resources
  for any new task you are asked to schedule.

  The difference between TASKS and EVENTS is that scheduledStart and scheduledEnd
  for EVENTs CANNOT be changed under any circumstance.However, you can change the scheduledStart and scheduledEnd
  for TASKs IF, and ONLY IF it is before the dueDate. Tasks and Events are stored in different tables, so they can have the same ID, but the ID will be provided.

  I will also provide BLOCK - OFF TIMES in which NO tasks or events are to be scheduled.The key of the blocked times(1 - 7) correspond to a day: the keys map to the table below.The format
  for the blocked - off tasks are as such < startTime >: < endTime > .You CANNOT schedule anything during this period.TaskType is either long or short;
  try to arrange short tasks in between BLOCK - OFF TIMES.For example,
    if there are two block - off times with an hour in between them, please schedule a SHORT task.There will also be PREFERRED DAYS and PREFERRED TIMES.Inside these values, there will be one or more integers, seperated with a comma.Each integer corresponds to a specific day or time period, as follows:

    PREFFERED DAYS & BLOCK - OFF TIME INTEGER KEYS
  1: Monday
  2: Tuesday
  3: Wednesday
  4: Thursday
  5: Friday
  6: Saturday
  7: Sunday

  PREFFERED TIMES
  1: Midnight to early morning(12 am - 6 am)
  2: Morning to afternoon(6 am - 12 am)
  3: Afternoon to evening(12 am - 7 pm)
  4: Evening to night(7 pm - 12 am)

  An example of these are shown below: {
      "blockedOff": {
        1: [{
            "scheduledStart": "14:00:30",
            "scheduledEnd": "16:00:30"
          },
          {
            "scheduledStart": "20:00:30",
            "scheduledEnd": "21:00:10"
          }
        ],
        2: [{
            "scheduledStart": < > ,
            "scheduledEnd": < >
          },
          {
            "scheduledStart": < > ,
            "scheduledEnd": < >
          }
        ],
        ...
        7: [{
            "scheduledStart": < > ,
            "scheduledEnd": < >
          },
          {
            "scheduledStart": < > ,
            "scheduledEnd": < >
          }
        ]
      },
      "preferredTimes": "1, 6",
      "preferredDays": "2, 3, 4"
    }

    in this example, the blocked - off times are 2 pm to 4 pm AND 8 pm to 9 pm on Monday.The preferred times are 12 am - 6 am and 12 am - 7 pm, and the preferred days are Monday and Saturday.
  `
async function addTask(taskToAdd, existingEventsTasks, personalization) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `I will now provide you a TASK or EVENT I need you to insert into the schedule, and the existing schedule. Please remember that the date and timings of EVENTs cannot be moved around.
        TASK to be added: ${taskToAdd}
        Exisiting EVENTs and TASKs: ${existingEventsTasks}
        BLOCK-OFF TIMES AND PREFERRED DAYS/TIMES: ${personalization}

        The TASK to be added will be in this format:
        {
          "id": ?,
          "type": "task"
          "name": "taskName",
          "timeTaken": 1
          "dueDate": "1977-04-01T14:00:30",
        },

        Using the above information, your role is to OPTIMIZE the schedule such that all tasks are done before the deadline. Generate the scheduledStart, scheduledEnd, taskType, and resources field and insert it into the existing schedule (existing EVENTs and TASKs). Remember your instructions and the restrictions put on EVENTs and BLOCKED-OFF TIMES. DO NOT REMOVE any EVENTs or TASKs - it is IMPERATIVE that all the tasks are preserved and the new one is added.

        The taskType is split into long and short: short tasks are tasks that take a shorter time to complete, like doing research or identifying a problem, things like that. Long tasks are tasks that require more time, such as technical tasks like programming a website, creating a high-fidelity website, or writing a 4000 word essay. Short tasks should take an hour or less to complete, and anything that takes more than an hour should be a long task. Use your best discretion to sort the tasks.

        Resources are pointers, tips, or links that can be used to help the student in completing their task. You should suggest around 5 pointers/tips/links, and make sure that your claims are BACKED UP. Aim for a mix of all the three formats. (eg. 2 websites and 3 pointers/tips). DO NOT seperate them into categories: just use a new line to differentiate each tip.

        Try to arrange TASKs during the user-stated PREFFERED times and days. You can reschedule TASKS as per you wish, as long as all the tasks are still scheduled before the deadline.

        Please double - check your work to ensure that there are NO overlaps, NO events are moved around, and all tasks are scheduled to be completed before the due date.You can and should change the scheduledStart and scheduledEnd of the tasks
        if any portion of the task time block( in between the start and end) overlaps with any events. DO NOT DELETE EXISTING TASKS OR EVENTS. DO NOT CHANGE THE IDs OF THE EVENTS.

        DO NOT schedule anything before the current date and time, which is ${currentDate}.

        Your output should be new schedule containing all of Exisiting EVENTs and TASKs AND the TASK to be added. Return your output as a list of JSON objects similar to the above ones. Do not add any extra text - the only thing you should output is a list of JSON objects, such as [{<TASK in JSON notation>}, {<EVENT in JSON notation>}, ...]. Ensure that the output is JSON-parseable - this is very important. DO NOT SPECIFY IN YOUR RESPONSE THAT THE OUTPUT IS OF JSON FORMAT.`
        },
      ],
      model: model,
    });

    let response = completion.choices[0].message.content;
    return JSON.parse(response)
  } catch (error) {
    console.error('Error:', error);
  }
}

async function addEvent(eventToAdd, existingEventsTasks) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `I will now provide you a EVENT I need you to insert into the schedule, and the existing schedule. Please remember that the date and timings of existing EVENTs cannot be moved around.
        EVENT to be added: ${eventToAdd}
        Exisiting EVENTs and TASKs: ${existingEventsTasks}

        The EVENT to be added will be in this format:

        {
          "id": ? ,
          "type": "event",
          "name": "eventName",
          "scheduledStart": "1977-04-01T14:00:30",
          "scheduledEnd": "1977-04-01T14:00:30"
        }

        Using the above information, your role is to OPTIMIZE the schedule such that all tasks are done before the deadline AND that the event is added into the schedule. The EVENT HAS to be scheduled on the specific date and time, so reschedule any tasks in that time slot if there are existing tasks. Remember your instructions and the restrictions put on EVENTs and BLOCKED-OFF TIMES. DO NOT REMOVE any EVENTs or TASKs - it is IMPERATIVE that all the TASKs AND EVENTs are preserved and the new one is added.

        Try to arrange TASKs during the user-stated PREFFERED times and days. You can reschedule TASKS as per you wish, as long as all the tasks are still scheduled before the deadline.


        Please double - check your work to ensure that there are NO overlaps, NO events are moved around, and all tasks are scheduled to be completed before the due date.You can and should change the scheduledStart and scheduledEnd of the tasks
        if any portion of the task time block (in between the start and end) overlaps with any events - THIS IS VERY IMPORTANT. EVENTS TAKE PRIORITY OVER TASKS. DO NOT DELETE EXISTING TASKS OR EVENTS.

        For example, if there's an event at 20:00 to 22:00 but there is a task scheduled at 21:00 to 22:00 on the same day, you should reschedule the task since events cannot be moved while tasks can, and 21:00 to 22:00 falls in the event occurence of 20:00 to 22:00.

        DO NOT schedule anything before the current date and time, which is ${currentDate}.

        Your output should be new schedule containing all of Exisiting EVENTs and TASKs AND the TASK to be added. Return your output as a list of JSON objects similar to the above ones. Do not add any extra text or language indicators. The only thing you should output is a list of JSON objects, such as [{<TASK in JSON notation>}, {<EVENT in JSON notation>}, ...]. Ensure that the output is JSON-parseable - this is very important. DO NOT SPECIFY IN YOUR RESPONSE THAT THE OUTPUT IS OF JSON FORMAT`
        },
      ],
      model: model,
    });

    let response = completion.choices[0].message.content;
    return JSON.parse(response)
  } catch (error) {
    console.error('Error:', error);
  }
}

taskToAdd = `{
  "id": 4,
  "type": "task",
  "name": "Code the final product using ReactJS and NodeJS",
  "timeTaken": 4,
  "dueDate": "2024-06-25-01T14:00:30",
}`

eventToAdd = `{
  "id": 2,
  "type": "event",
  "name": "Visit Mother",
  "timeTaken": 1,
  "scheduledStart": "2024-06-21T14:00:30",
  "scheduledEnd": "2024-06-21T15:00:30"
}`

existingEventsTasks = `{
[
  {
    "id": 1,"
    type": "task",
    "name": "Learn how to use ReactJS and NodeJS",
    "timeTaken" : 3,
    "dueDate": "2024-06-23T14:00:30"
    "scheduledStart": "2024-06-20T14:00:30",
    "scheduledEnd": "2024-06-20T17:00:30",
    "taskType": "long"
    "resources": "X"
  },{
    "id": 2,
    "type": "task",
    "name": "Learn best practices",
    "timeTaken" : 0.5,
    "dueDate": "2024-06-24T08:00:30"
    "scheduledStart": "2024-06-21T14:00:30",
    "scheduledEnd": "2024-06-21T14:30:30",
    "taskType": "long"
    "resources": "X"
  },
  {
    "id": 3,
    "type": "task",
    "name": "Create Low-Fidelity prototype",
    "timeTaken" : 0.5,
    "dueDate": "2024-06-24T08:00:30"
    "scheduledStart": "2024-06-20T17:30:30",
    "scheduledEnd": "2024-06-20T18:30:30",
    "taskType": "short"
    "resources": "X"
  },
  {
    "id": 1,
    "type": "event",
    "name": "Visit Father",
    "scheduledStart": "2024-06-30T14:00:30",
    "scheduledEnd": "2024-06-30T17:00:30",
  }
]
}`

personalization = `{
	"blockedOff": {
	  1: [],
	  2: [ {"scheduledStart": 00:30:00, "scheduledEnd": 08:00:00},
			  {"scheduledStart": 13:00, "scheduledEnd": 15:00} ]
    3: [],
    4: [{"scheduledStart": 00:30:00, "scheduledEnd": 08:00:00},
			  {"scheduledStart": 13:00, "scheduledEnd": 15:00}],
    5: [ {"scheduledStart": 00:30:00, "scheduledEnd": 08:00:00},
			  {"scheduledStart": 12:00, "scheduledEnd": 22:00} ]
    6: [ {"scheduledStart": 00:30:00, "scheduledEnd": 08:00:00},
        {"scheduledStart": 12:00, "scheduledEnd": 22:00} ]
    7: [ {"scheduledStart": 00:30:00, "scheduledEnd": 08:00:00},
    {"scheduledStart": 12:00, "scheduledEnd": 22:00} ]
},
"preferredTimes": "2, 4",
"preferredDays": "1, 3, 4"
}
`

// addTask(taskToAdd, existingEventsTasks, personalization);
// addEvent(eventToAdd, existingEventsTasks);

module.exports = {
  addTask,
  addEvent
};