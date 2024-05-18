import { useState,useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
uuidv4()
import './App.css'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinised] = useState(true)

  useEffect(() => {
    let getLocalStorage = localStorage.getItem("todos")
    if (getLocalStorage) {
    let todos =  JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
    }
  }, [])
  

  const saveToLS = ()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
  const toggleFinish = () => {
    setShowFinised(!showFinished)
  }

  const handleAdd = () =>{
    setTodos([...todos , {id: uuidv4(), todo, isCompleted : false}])
    setTodo("")
    saveToLS()
  }

  const handleEdit = (e,id) =>{
    let toEdit = todos.filter(item => item.id == id)
    setTodo(toEdit[0].todo)
    let newTodos = todos.filter(item =>{
      return item.id != id
  })
  setTodos(newTodos)
  saveToLS()
  }

  const handleDelete = (e , id) =>{
    let newTodos = todos.filter(item =>{
        return item.id != id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleChange = (e) =>{
    setTodo(e.target.value)
  }

  const handleChkChange = (e) =>{
    const id = e.target.name
    const index = todos.findIndex(item =>{return item.id == id})
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
    <Navbar/>
      <div className="md:container md:mx-auto md:w-[40%] bg-violet-200 min-h-[70vh] my-5 rounded-xl p-3">
        <h1 className='text-center font-bold text-xl my-5'>Task Manager - Manage your todos at one place</h1>
        <div className='addTodo my-5'>
        <div className="font-bold" >Add Todos</div>
        <div className='my-3'>
          <input onChange={handleChange} value={todo} type="text" className='outline-none rounded-lg p-1 w-80' placeholder='enter your todos' />
          <button onClick={handleAdd} className='bg-violet-800 px-2 py-1 rounded-lg text-white mx-4 disabled:bg-gray-400' disabled={todo.length<=3}>SAVE</button>
        </div>
        </div>
        <div className='flex gap-2'>
        <input type='checkbox' checked={showFinished} onChange={toggleFinish}/>
        <label htmlFor='show finished'>Show Finished</label> 
        </div>
        <div className='w-full bg-black opacity-15 my-5 h-0.5 mx-auto'></div>
       
       <div className='todos'>
        <h2 className='font-bold'>Your Todos</h2>
        {todos.length===0 && <div className='m-5 font-bold'>No todos to display</div>}
       {todos.map((item,index) =>{
        return ( (showFinished || !item.isCompleted) &&
        <div key={index} className="todo flex justify-between  my-4">
          <div className='flex gap-3'>
          <input type='checkbox' name={item.id} onChange={handleChkChange} checked={item.isCompleted}/>
          <div className="w-full max-w-sm max-w-md">
            <p className={item.isCompleted ? 'break-words line-through': "break-words"}>{item.todo}</p></div>
          </div>
          <div className='buttons flex h-full'>
            <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-800 px-2 py-1 rounded-lg text-white mx-2'><FaEdit /></button>
            <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 px-2 py-1 rounded-lg text-white mx-2'><MdDeleteForever /></button>
          </div>
        </div>
        )
        })}
       </div>
      </div>
    </>
  )
}

export default App
