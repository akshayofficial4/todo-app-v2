import React from 'react'
import { useState , useEffect } from 'react';
import { Trash2, CheckCircle, Circle } from "lucide-react";

const Dashboard = ( { onLogout } ) => {

  const [ todos , setTodos ] = useState([]);
  const [ title , setTitle ] = useState("");

  useEffect(() => {
    fetchTodos();
  }, [])

  const fetchTodos = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/todos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data  = await res.json();
    setTodos(data);
  };

  const createTodo = async () => {
    if(!title.trim()) return;
    const token = localStorage.getItem("token");

    await fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({title}),
    });
    setTitle("");
    fetchTodos();
  }

  const toggleTodo = async (todo) => {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5000/api/todos/${todo._id}`, {
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

  const deleteTodo = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchTodos();
  }
  

  return (

    <div className='min-h-screen bg-gray-900 text-white p-6'>

        <div className='flex justify-between items-center mb-6'>
            <h1 className='text-2xl font-bold'>My Todos</h1>

            <button onClick={onLogout} className='px-4 py-2 bg-red-500 text-black rounded'>Logout</button>
        </div>

        

        <div className='flex flex-col items-center justify-center'>



        <div className='flex gap-2 mb-6 min-w-[60%] '>
            <input type='text' value={title} placeholder='Enter the todos' onChange={(e) => setTitle(e.target.value)} className='flex-1 p-3 rounded bg-gray-800 outline-none ' />
            <button className='px-4 lg:px-8 py-1 bg-green-500 text-black rounded' onClick={createTodo}>Add</button>
        </div>


          {
          todos.length === 0 ? (
            <p className='text-gray-400 pt-6'>No todos yet...</p>
          ) : (
            <ul className='space-y-3  min-w-[60%] '>
                 { todos.map((todo) => (
                    <li key={todo._id} className="bg-gray-800 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span
                          onClick={() => toggleTodo(todo)}
                          className="cursor-pointer"
                        >
                          {todo.completed ? (
                            <CheckCircle size={18} className="text-green-400" />
                          ) : (
                            <Circle size={18} className="text-gray-400" />
                          )}
                        </span>

                        <span
                          className={
                            todo.completed ? "line-through text-gray-400" : ""
                          }
                        >
                          {todo.title}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteTodo(todo._id);
                          }}
                          className="ml-auto text-red-400 hover:text-red-300"
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
