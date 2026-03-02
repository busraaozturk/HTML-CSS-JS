import { useState } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

type Task = { id: number; text: string; done: boolean }

function App() {
  const [value, setValue] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = () => {
    const text = value.trim()
    if (!text) return
    const newTask: Task = { id: Date.now(), text, done: false }
    setTasks((prev) => [...prev, newTask])
    setValue('')
  }

  const toggleDone = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="min-h-screen bg-white p-9 font-serif mx-auto">
      <h1 className="text-5xl font-extrabold mb-6">Görev Listesi</h1>

      <TodoInput value={value} setValue={setValue} onSubmit={addTask} />

      <TodoList tasks={tasks} toggle={toggleDone} remove={removeTask} />
    </div>
  )
}

export default App
