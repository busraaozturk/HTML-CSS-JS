import TodoItem from './TodoItem'

type Task = { id: number; text: string; done: boolean }

type Props = {
  tasks: Task[]
  toggle: (id: number) => void
  remove: (id: number) => void
}

export default function TodoList({ tasks, toggle, remove }: Props) {
  if (tasks.length === 0) return <p className="mt-6 text-gray-500">Görev yok.</p>

  return (
    <ul className="max-w-3xl mt-6 space-y-2">
      {tasks.map((t) => (
        <TodoItem key={t.id} task={t} toggle={toggle} remove={remove} />
      ))}
    </ul>
  )
}
