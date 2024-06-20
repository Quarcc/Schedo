import React from 'react';
import {useState} from 'react';
import Button from './Button.js';
import Schedule from './Schedule.js';
import Tasks from './Tasks.js';
import Input from './Input.js';
import Checkbox from './Checkbox.js';
import { ClockIcon, CheckIcon } from './Icons.js';
import BurgerMenu from "./HamburgerMenu.js";
import CalendarScreen from './CalendarScreen.js';

function App() {

  let [navigationState, setNavigationState] = useState("home") // ["home", "schedule", "tasks", "settings"]
  let [navigationScreenState, setNavigationScreenState] = useState(<CalendarScreen />) // ["calendar", "list"]

  return (
    <div className="App">
      <BurgerMenu />
      <header className="bg-[#373a47] h-16  ">
      </header>
      <main className="flex-1 grid grid-cols-[400px_1fr] gap-8 p-8">
        <div className="bg-white rounded-lg shadow-md p-6 mx-3">
          <button clsasName="bg-neutral-800 font-bold rounded-md text-black text-m cursor-pointer">Add Assignment</button>
          <hr className="h-0.5 mx-auto bg-neutral-300 border-0 rounded md:my-10 dark:bg-gray-700" />
          <Tasks />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <Schedule />
        </div>
      </main>
      {/* navigationScreenState */}
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
