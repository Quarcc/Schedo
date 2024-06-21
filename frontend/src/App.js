import React from 'react';
import {useState, useEffect} from 'react';
import Button from './Button.js';
import Schedule from './Schedule.js';
import Tasks from './Tasks.js';
import Input from './Input.js';
import Checkbox from './Checkbox.js';
import { ClockIcon, CheckIcon } from './Icons.js';
import CalendarScreen from './screens/CalendarScreen.js';
import TasksScreen from './screens/TasksScreen.js';
import SettingScreen from './screens/SettingScreen.js';
import BurgerDrawer from './BurgerDrawer.js';
import { AiFillHome, AiOutlinePaperClip, AiFillCiCircle } from "react-icons/ai";
import axios from 'axios'
import {getEvents} from "./API.js"

function App() {

  //console.log(Date.UTC(2024, 6, 22, 4, 0, 0))

  // let events = [
  //   {
  //     title: "New Event [Duration: 2-4]",
  //     start: Date.UTC(2024, 6, 22, 2, 0, 0),
  //     end: Date.UTC(2024, 6, 22, 4, 0, 0),
  //     resource: "Test resource. What does this mean?"
  //   },
  //   {
  //     title: "New Event [Duration: 4-6]",
  //     start: Date.UTC(2024, 6, 22, 4, 0, 0),
  //     end: Date.UTC(2024, 6, 22, 6, 0, 0),
  //   }
  // ]

  let events = [
    {
        "taskID": 1,
        "name": "Learn how to use ReactJS and NodeJS",
        "timeTaken": 3,
        "dueDate": "2024-06-23T14:00:30",
        "scheduledStart": "2024-06-21T01:00:00.000Z",
        "scheduledEnd": "2024-06-21T04:00:00.000Z",
        "taskType": "long",
        "resources": [
            "X"
        ]
    },
    {
        "taskID": 2,
        "name": "Learn best practices",
        "timeTaken": 1,
        "dueDate": "2024-06-24T08:00:30",
        "scheduledStart": "2024-06-21T04:30:00.000Z",
        "scheduledEnd": "2024-06-21T05:00:00.000Z",
        "taskType": "short",
        "resources": [
            "X"
        ]
    },
    {
        "taskID": 3,
        "name": "Create Low-Fidelity prototype",
        "timeTaken": 1,
        "dueDate": "2024-06-24T08:00:30",
        "scheduledStart": "2024-06-21T05:00:00.000Z",
        "scheduledEnd": "2024-06-21T05:30:00.000Z",
        "taskType": "short",
        "resources": [
            "X"
        ]
    },
    {
        "taskID": 4,
        "name": "Code the final product using ReactJS and NodeJS",
        "timeTaken": 4,
        "dueDate": "2024-06-25T14:00:30",
        "scheduledStart": "2024-06-24T01:00:00.000Z",
        "scheduledEnd": "2024-06-24T05:00:00.000Z",
        "taskType": "long",
        "resources": [
            "Read the official ReactJS documentation: https://reactjs.org/docs/getting-started.html",
            "Explore NodeJS tutorials on NodeSource: https://nodesource.com/blog",
            "Use VS Code with the necessary extensions for better development experience",
            "Follow industry-standard style guides (like Airbnb's JavaScript style guide)",
            "Keep code modular and maintainable by breaking it into smaller components"
        ]
    }
]

  let [eventsState, setEventsState] = useState(null)
  let [navigationState, setNavigationState] = useState("home") // ["home", "schedule", "tasks", "settings"]
  let [navigationScreenState, setNavigationScreenState] = useState(null) // ["calendar", "list"]

  useEffect(() => {
    async function fetchData() {
      try {
        //const data = await getEvents();
        const data = events
        console.log("HELP");
        console.log(data);
        setEventsState(data);
        console.log(data);
        setNavigationScreenState(<CalendarScreen events={eventsState} />);
      } catch (error) {
        console.log(error)
      }
    }

    fetchData();
  }, []);
  console.log(eventsState)
  

  const [nameValue, setNameValue] = useState('');
  const [tasksValue, setTasksValue] = useState('');
  const [datetimeValue, setDatetimeValue] = useState(Date.now());

  const handleNameValue = (event) => {
    setNameValue(event.target.value);
  };
  const handleTasksValue = (event) => {
    setTasksValue(event.target.value);
  };
  const handleDatetimeValue = (event) => {
    setDatetimeValue(event.target.value);
  };

  function postAssignment() {
    console.log(nameValue)
    console.log(tasksValue)
    console.log(datetimeValue)
  }

  let items = [{
    'header': "Home",
    'icon': <AiFillHome />,
    'onClick': () => {
      setNavigationState("home")
      setNavigationScreenState(<CalendarScreen events={eventsState}/>)
    }
  },
  {
    "header": "Tasks",
    "icon": <AiOutlinePaperClip />,
    "onClick": () => {
      setNavigationState("tasks")
      setNavigationScreenState(<TasksScreen />)
    }
  },
  {
    "header": "Settings",
    "icon": <AiFillCiCircle />,
    "onClick": () => {
      setNavigationState("settings")
      setNavigationScreenState(<SettingScreen />)
    }
  }
]

  return (
    <div className="App">
      <header className="bg-[#373a47] h-16">
        <BurgerDrawer items={items}/>
      </header>
      {navigationScreenState}
      <div id="temporary">
        <input className="border-gray-800 border-2" type="text" value={nameValue} onChange={handleNameValue} />
        <textarea className="border-gray-800 border-2" value={tasksValue} onChange={handleTasksValue}></textarea>
        <input type="datetime-local" value={datetimeValue} onChange={handleDatetimeValue} />
        <button className="bg-gray-300 font-semibold rounded-md text-gray-600 text-m cursor-pointer p-2 shadow-md" onClick={getEvents}>Submit</button>
      </div>
    </div>
  );
}

{/* <div className="my-0 font-bold">Add Event</div>
<div className="flex items-center justify-around my-2 space-x-2">
  <div className="w-2/3 ml-px">
    <Input type="text" placeholder=" Enter task name" />
  </div>
  <div className="w-1/3">
    <Checkbox /><div>Immutable</div>
  </div>
</div> */}

export default App;
