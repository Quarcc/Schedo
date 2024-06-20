import React from 'react';
import Button from './Button.js';
import Schedule from './Schedule.js';
import Tasks from './Tasks.js';
import Input from './Input.js';
import Checkbox from './Checkbox.js';
import { ClockIcon, CheckIcon } from './Icons.js';
import BurgerMenu from "./HamburgerMenu.js";

function App() {

  return (
    <div className="App">
      <BurgerMenu />
      <header className="bg-[#373a47] h-16  ">
      </header>
      {/* <Schedule label="" /> */}
      <main className="flex-1 grid grid-cols-[400px_1fr] gap-8 p-8">
        <div className="bg-white rounded-lg shadow-md p-6 mx-3">
          <div className="my-0 font-bold">Add Task</div>
          <div className="flex items-center justify-around my-2 space-x-2">
            <div className="w-2/3 ml-px">
              <Input type="text" placeholder=" Enter task name" />
            </div>
            <div className="w-1/3">
              <Checkbox /><div>Immutable</div>
            </div>
          </div>
          <hr className="h-0.5 mx-auto bg-neutral-300 border-0 rounded md:my-10 dark:bg-gray-700" />
          <Tasks />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <Schedule />
        </div>
      </main>
    </div>
  );
}

export default App;
