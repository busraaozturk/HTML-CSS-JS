type Task = { id: number; text: string; done: boolean }

type Props = {
  task: Task
  toggle: (id: number) => void
  remove: (id: number) => void
}

export default function TodoItem({ task, toggle, remove }: Props) {
  return (
    <li className="p-3 border rounded-md bg-gray-50 flex flex-1 items-center justify-between">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => toggle(task.id)}
          className="w-5 h-5"
        />
        <span className={`${task.done ? 'line-through text-gray-400' : ''}`}>{task.text}</span>
      </div>

      <button onClick={() => remove(task.id)} aria-label="Sil" className="text-red-600 hover:text-red-800">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 6v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 6V4h6v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </li>
  )
}
