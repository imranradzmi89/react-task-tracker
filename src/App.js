import { useState , useEffect } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

const App = () => {

  // immutable data & state function in highest level i.e. app level
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

useEffect( () => {
  const getTasks = async () => {
    const tasksFromServer = await fetchTasks()
    setTasks(tasksFromServer)
  }

  getTasks()
}, [])

//get tasks data from json-server
const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  } 

//add task
const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks' ,
  { method : 'POST', 
  headers: {'Content-type' : 'application/json'},
  body: JSON.stringify(task)
})

const data = await res.json()
setTasks([...tasks,data])
}

  //delete task 
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
    setTasks(tasks.filter( (task) => task.id !== id))
  }

  //toggle add task form
  const taskForm = () => setShowAddTask(!showAddTask)

//toggle reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  //toggle task object's reminder property
  const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

  const res = await fetch(`http://localhost:5000/tasks/${id}` , {
    method: 'PUT',
    headers: {
      'Content-type' : 'application/json'
    },
    body: JSON.stringify(updatedTask)
  })

  const data = await res.json()
  
  //changes object reminder property if toggled, otherwise render as per usual
  //new object's properties are retained with {...} but reminder property is toggled 
  setTasks(tasks.map( (task) => task.id === id ? 
  {...task , reminder: data.reminder} : task))
}

  return (<Router>
      <div className="container">
      <Header onAdd ={taskForm} showAdd = {showAddTask}/>
      <p></p>
      
      <Route path ='/' exact render = { (props) => ( 
      <>
        { showAddTask ? <AddTask onAdd = {addTask} showAdd = {showAddTask}/> : ''}
      {tasks.length > 0 ? <Tasks tasks = {tasks} onDelete = {deleteTask} onToggle = {toggleReminder} /> : 'No Tasks Left! Well Done : )'}
      </>

      ) } />
      <Route path= '/about' component = {About} />
      <Footer />
    </div>
    </Router>
    
  );
}

export default App;
