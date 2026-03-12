type Props = {
  value: string
  setValue: (v: string) => void
  onSubmit: () => void
}

export default function TodoInput({ value, setValue, onSubmit }: Props) {
  return (
    <form
      className="flex items-center gap-3 max-w-3xl border-4 border-black rounded-xl p-2"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <input
        className="flex-1 bg-transparent outline-none text-lg px-4 py-4 placeholder-gray-400 font-semibold text-gray-800"
        placeholder="Görev Ekle"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button type="submit" className="w-14 h-14 bg-black rounded-lg flex items-center justify-center" aria-label="Ekle">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M7 12h10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  )
}
