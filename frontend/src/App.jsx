import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {CreateTodo} from './components/CreateTask'
import {Todo} from './components/Task'

function App() {
    return(
      <div>
        <Todo></Todo>
        <CreateTodo></CreateTodo>
      </div>
    ) 
}

export default App
