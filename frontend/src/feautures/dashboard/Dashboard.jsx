import React from 'react'
import { useState , useEffect } from 'react';
import { Trash2, CheckCircle, Circle , Pencil } from "lucide-react";

const Dashboard = ( { onLogout } ) => {

  const [ todos , setTodos ] = useState([]);
  const [ title , setTitle ] = useState("");
  const [filter , setFilter] = useState("all");

  // ✅ NEW: track which todo is being edited
  const [editTodoId, setEditTodoId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, [])

  const fetchTodos = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found, logging out");
      onLogout();
      setTodos([]);
      return;
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch todos:", res.status);
      setTodos([]);
      return;
    }

    const data = await res.json();
    setTodos(Array.isArray(data) ? data : []);
  };

  //  handles ADD + EDIT
  const createTodo = async () => {
    if(!title.trim()) return;
    const token = localStorage.getItem("token");

    // EDIT MODE
    if (editTodoId) {
      await fetch(`${import.meta.env.VITE_API_URL}/api/todos/${editTodoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type" : "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      });
    } 
    // ADD MODE
    else {
      await fetch(`${import.meta.env.VITE_API_URL}/api/todos`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({title}),
      });
    }

    // reset back to normal
    setTitle("");
    setEditTodoId(null);
    fetchTodos();
  }

  const toggleTodo = async (todo) => {
    const token = localStorage.getItem("token");

    await fetch(`${import.meta.env.VITE_API_URL}/api/todos/${todo._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        completed: !todo.completed,
      }),
    });
    fetchTodos();
  }

  const filteredTodos = todos.filter((todo) => {
    if( filter === "active" ) return !todo.completed;
    if( filter === "completed" ) return todo.completed;
    return true;
  });

  const deleteTodo = async (id) => {
    const confirmDelete = window.confirm(" Are uy sure want to delete this todo");
    if(!confirmDelete) return;
    const token = localStorage.getItem("token");
    await fetch(`${import.meta.env.VITE_API_URL}/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchTodos();
  }

  // start editing
  const startEdit = (todo) => {
    setTitle(todo.title);      
    setEditTodoId(todo._id);  
  }

  return (

    <div className='min-h-screen bg-gray-900 text-white p-6'>

        <div className='flex justify-between items-center mb-6'>
            <h1 className='text-2xl font-bold'>My Todos</h1>
            <button onClick={onLogout} className='px-4 py-2 bg-red-500 text-black rounded hover:bg-red-400 transition duration-500 hover:scale-110'>Logout</button>
        </div>

        <div className='flex flex-col items-center justify-center'>

        <div className='flex gap-2 mb-6 min-w-[60%] '>
            <input
              type='text'
              value={title}
              placeholder='Enter the todos'
              onKeyDown={(e) => {
                e.key === 'Enter' ? createTodo() : ("");
              }}
              onChange={(e) => setTitle(e.target.value)}
              className='flex-1 p-3 rounded bg-gray-800 outline-none focus:ring-2 focus:ring-green-500 '
            />
            <button
              className='px-4 lg:px-8 py-1 bg-green-500 text-black rounded hover:bg-green-400 transition duration-500 hover:scale-110'
              onClick={createTodo}
            >
              {editTodoId ? "Update" : "Add"}
            </button>
        </div>

        {
          todos.length !== 0 ? (
              <div className='flex gap-2 mb-6'>
                  <button onClick={() => setFilter("all")} className={`px-3 py-1 rounded ${filter === "all" ? "bg-blue-500 text-white font-bold":"bg-gray-700"}`}>All</button>
                  <button onClick={() => setFilter("active")} className={`px-3 py-1 rounded ${filter === "active" ? "bg-blue-500 text-white font-bold" : "bg-gray-700"}`}>Active</button>
                  <button onClick={() => setFilter("completed")} className={`px-3 py-1 ${filter === "completed" ? "bg-blue-500 text-white font-bold" : "bg-gray-700"}`}>completed</button>
              </div>
          ) : ("")
        }

        {
          todos.length === 0 ? (
            <div className='text-center text-gray-400 mt-20'>
                <p className="text-lg">No todos yet 📝</p>
                <p className='text-sm mt-5'>Add first todo above</p>
            </div>
          ) : (
            <ul className='space-y-3 min-w-[60%]'>
              { filteredTodos.map((todo) => (
                <li key={todo._id} className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">
                  <div className="flex items-center gap-3">
                    <span onClick={() => toggleTodo(todo)} className="cursor-pointer">
                      {todo.completed ? (
                        <CheckCircle size={18} className="text-green-400" />
                      ) : (
                        <Circle size={18} className="text-gray-400" />
                      )}
                    </span>

                    <span className={todo.completed ? "line-through text-gray-400" : "text-white"}>
                      {todo.title}
                    </span>

                    {/* ✏️ EDIT BUTTON */}
                    <button
                      onClick={() => startEdit(todo)}
                      className="ml-auto text-blue-400 hover:text-blue-500"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="text-red-400 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )
        }
        </div>

    </div>
  )
}

export default Dashboard
