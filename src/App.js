import React, { useEffect, useState } from 'react';
import './App.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleAddTodo = () => {
    if (newTitle.trim() === "" || newDescription.trim() === "") {
      return;
    }

    let newTodoItem = {
      title: newTitle,
      description: newDescription,
      isCompleted: false,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));

    setNewTitle("");
    setNewDescription("");
  };

  const handleDeleteTodo = (index) => {
    let updatedTodoArr = allTodos.filter((_, i) => i !== index);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
  };

  const handleCompleteTodo = (index) => {
    let updatedTodoArr = allTodos.map((todo, i) => {
      if (i === index) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
  };

  useEffect(() => {
    let savedTodo = localStorage.getItem('todolist');
    if (savedTodo) {
      try {
        let parsedTodo = JSON.parse(savedTodo);
        if (Array.isArray(parsedTodo)) {
          setTodos(parsedTodo);
        }
      } catch (error) {
        console.error("Error parsing JSON from localStorage", error);
      }
    }
  }, []);

  return (
    <div className="App">
      <div className="content">
        <h1>My ToDo</h1>

        <div className="todo-wrapper">
          <div className="todo-input">
            <div className="todo-input-item">
              <label>Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="What is the task Title"
              />
            </div>

            <div className="todo-input-item">
              <label>Description</label>
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="What is the task Description"
              />
            </div>

            <div className="todo-input-item">
              <button type="button" onClick={handleAddTodo} className="primaryBtn">Add</button>
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
            {allTodos
              .filter((item) => (isCompleteScreen ? item.isCompleted : !item.isCompleted))
              .map((item, index) => (
                <div className="todo-list-item" key={index}>
                  <div className="todo-text">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div className="todo-icons">
                    <AiOutlineDelete className="icon" onClick={() => handleDeleteTodo(index)} />
                    <BsCheck className="check-icon" onClick={() => handleCompleteTodo(index)} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
