import type React from 'react'
import usePermissions from '../hooks/usePermissions.ts'
import type Permissions from '../constants/permissions.ts'
import { useAuth0 } from '@auth0/auth0-react'
import { Navigate, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
  permissionsRequired?: Permissions[]
  redirectTo?: string
}

function ProtectedRoute({ children, permissionsRequired, redirectTo = '/' }: ProtectedRouteProps) {
  const location = useLocation()
  const { permissions, loading } = usePermissions()
  const { isAuthenticated, isLoading } = useAuth0()
  if (loading || isLoading) {
    return <div>Cargando...</div>
  }
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location.pathname }} />
  }
  if (!permissionsRequired || permissionsRequired.length === 0) {
    return <>{children}</>
  }
  const hasAll = permissionsRequired.every(p => permissions.includes(p))
  if (!hasAll) {
    return <Navigate to={redirectTo} replace state={{ from: location.pathname }} />
  }
  return <>{children}</>
}

export default ProtectedRoute
