import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HeadAndAction({
  title,
  paragraph,
  extra,
}: {
  title: string
  paragraph: string
  extra?: ReactNode
}) {
  const navigate = useNavigate()
  return (
    <div className="mb-8 border-b border-sky-100 pb-4 flex flex-col md:flex-row md:items-start justify-between gap-4">
      <div>
        <button
          className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium mb-4 flex items-center gap-1 transition-colors"
          onClick={() => navigate(-1)}
        >
          &larr; Volver
        </button>
        <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight">{title}</h1>
        <p className="mt-2 text-slate-600">{paragraph}</p>
      </div>
      {extra}
    </div>
  )
}
