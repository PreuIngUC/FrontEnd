import usePermissions from '../hooks/usePermissions.ts'
import ActionCardGrid from '../components/navigation/ActionCardGrid.tsx'
import { actionCards } from '../constants/actionCards.ts'

function HomePage() {
  const { permissions, loading } = usePermissions()

  return (
    <div className="min-h-screen bg-sky-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 border-b border-sky-200 pb-4">
          <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight">Panel Principal</h1>
          <p className="mt-2 text-base text-slate-600">Elige una acción para continuar.</p>
        </div>

        <ActionCardGrid cards={actionCards} permissions={permissions} loading={loading} />
      </div>
    </div>
  )
}

export default HomePage
