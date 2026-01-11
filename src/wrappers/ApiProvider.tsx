import { createContext, useContext, useMemo } from 'react'
import type { PropsWithChildren } from 'react'
import BackendApi from '../api/BackendApi.ts'

const ApiContext = createContext<BackendApi | null>(null)

export function ApiProvider({ children }: PropsWithChildren) {
  const api = useMemo(() => BackendApi.getInstance(), [])
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}

export function useApi() {
  const api = useContext(ApiContext)
  if (!api) throw new Error('useApi debe ser usado dentro del ApiProvider')
  return api
}
