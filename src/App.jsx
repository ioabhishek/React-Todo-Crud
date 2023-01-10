import React, { useEffect, useState } from 'react'
import TodoItem from './components/TodoItem';
import AddTodoForm from './components/AddTodoForm';
import EditForm from './components/EditForm';

const App = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if(savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]);

  const handleInputChange = (e) => {
    setTodo(e.target.value);
  }

  const handleEditInputChange = (e) => {
    setCurrentTodo({...currentTodo, text: e.target.value});
    console.log(currentTodo);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim()
        }
      ])
    }
    setTodo("")
  }

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  const handleDeleteClick = (id) => {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    })
    setTodos(removeItem);
  }

  const handleUpdateTodo = (id, updatedTodo) => {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    })
    setIsEditing(false)
    setTodos(updatedItem);
  }

  const handleEditClick = (todo) => {
    setIsEditing(true);
    setCurrentTodo({...todo});
  }

  return (
    <div>
      {
        isEditing ? (
          <EditForm
            currentTodo={currentTodo}
            setIsEditing={setIsEditing}
            onEditInputChange={handleEditInputChange}
            onEditFormSubmit={handleEditFormSubmit}
          />
        ) : (
          <AddTodoForm
            todo={todo}
            onAddInputChange={handleInputChange}
            onAddFormSubmit={handleFormSubmit}
          />
        )
      }

      <ul>
        {
          todos.map((todo) => (
            <TodoItem
              todo={todo}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          ))
        }
      </ul>

    </div>
  )
}

export default App