import React from 'react';
import {useState} from 'react';
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

  console.log(Date.UTC(2024, 6, 22, 4, 0, 0))

  let events = [
    {
      title: "New Event [Duration: 2-4]",
      start: Date.UTC(2024, 6, 22, 2, 0, 0),
      end: Date.UTC(2024, 6, 22, 4, 0, 0),
      resource: "Test resource. What does this mean?"
    },
    {
      title: "New Event [Duration: 4-6]",
      start: Date.UTC(2024, 6, 22, 4, 0, 0),
      end: Date.UTC(2024, 6, 22, 6, 0, 0),
    }
  ]

  let [navigationState, setNavigationState] = useState("home") // ["home", "schedule", "tasks", "settings"]
  let [navigationScreenState, setNavigationScreenState] = useState(<CalendarScreen events={events}/>) // ["calendar", "list"]
  

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
      setNavigationScreenState(<CalendarScreen events={events}/>)
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
