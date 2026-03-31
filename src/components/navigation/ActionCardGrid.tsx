import { Link } from 'react-router-dom'
import type { ActionCardProps } from '../../constants/actionCards.ts'
import canAccessCard from '../../utils/canAccessCard.ts'
import type Permissions from '../../constants/permissions.ts'

type Props = {
  cards: ActionCardProps[]
  permissions: Permissions[]
  loading?: boolean
}

export default function ActionCardGrid({ cards, permissions, loading }: Props) {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <span className="text-slate-500 font-medium animate-pulse">Cargando panel...</span>
      </div>
    )
  }

  const available = cards.filter(card => canAccessCard(card, permissions))

  if (available.length === 0) {
    return (
      <div className="rounded-2xl bg-white border border-sky-100 p-8 text-center shadow-sm">
        <h2 className="text-xl font-bold text-blue-900">Sin accesos</h2>
        <p className="mt-2 text-sm text-slate-600">No tienes funcionalidades asignadas todavía.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {available.map(card => (
        <Link
          key={card.id}
          to={card.to}
          className="group flex flex-col justify-between rounded-2xl bg-white border border-sky-100 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-sky-300"
        >
          <div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
                  {card.title}
                </h3>
              </div>
              {/* Placeholder para icono */}
              <div className="h-12 w-12 shrink-0 rounded-xl bg-sky-100 flex items-center justify-center transition-colors group-hover:bg-blue-600" />
            </div>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">{card.description}</p>
          </div>

          <div className="mt-6 flex items-center text-sm font-semibold text-blue-600">
            Acceder{' '}
            <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
