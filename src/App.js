
import React, { useState } from 'react';

import './App.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);

  return (
    <div className="App">
      
      <div className="content">
        <h1>My ToDo</h1>

        <div className="todo-wrapper">
          <div className="todo-input">
            <div className="todo-input-item">
              <label>Title</label>
              <input type="text" placeholder="What is the task Title" />
            </div>

            <div className="todo-input-item">
              <label>Description</label>
              <input type="text" placeholder="What is the task Description" />
            </div>

            <div className="todo-input-item">
              <button type="button" className="primaryBtn">Add</button>
            </div>
          </div>

          <div className="btn-area">
            <button
              className={`seconBtn ${!isCompleteScreen ? 'active' : ''}`}
              onClick={() => setIsCompleteScreen(false)}
            >
              Todo
            </button>
            <button
              className={`seconBtn ${isCompleteScreen ? 'active' : ''}`}
              onClick={() => setIsCompleteScreen(true)}
            >
              Completed
            </button>
          </div>

          <div className="todo-list">
            <div className="todo-list-item">
              <h3>Task 1</h3>
              <p>Description</p>
            </div>
            <div>
              <AiOutlineDelete className='icon'/>
              <BsCheck className='check-icon'/>
       
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
