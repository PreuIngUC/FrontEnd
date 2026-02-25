import usePermissions from '../hooks/usePermissions.ts'
import ActionCardGrid from '../components/navigation/ActionCardGrid.tsx'
import { actionCards } from '../constants/actionCards.ts'

function HomePage() {
  const { permissions, loading } = usePermissions()
  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-bold">Panel</h1>
      <p className="mt-1 text-sm text-gray-600">Elige una acción para continuar.</p>

      <div className="mt-6">
        <ActionCardGrid cards={actionCards} permissions={permissions} loading={loading} />
      </div>
    </div>
  )
}

export default HomePage
