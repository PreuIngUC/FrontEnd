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
    return <div>Cargando...</div>
  }

  const available = cards.filter(card => canAccessCard(card, permissions))

  if (available.length === 0) {
    return (
      <div className="rounded-xl border p-6">
        <h2 className="text-lg font-semibold">Sin accesos</h2>
        <p className="mt-1 text-sm text-gray-600">No tienes funcionalidades asignadas todavía.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {available.map(card => (
        <Link
          key={card.id}
          to={card.to}
          className="group rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold">{card.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{card.description}</p>
            </div>
            {/* Placeholder para icono si después lo implementas */}
            <div className="h-10 w-10 rounded-xl bg-gray-100" />
          </div>

          <div className="mt-4 text-sm font-medium">
            Ir <span className="inline-block transition group-hover:translate-x-1">→</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
