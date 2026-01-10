import axios, { type AxiosInstance } from 'axios'
import type { paths } from './types.ts'

type TokenGetter = (opts?: { force?: boolean }) => Promise<string>

class BackendApi {
  private api: AxiosInstance
  private static instance: BackendApi
  private tokenGetter: TokenGetter | null = null

  private cachedToken: string | null = null
  private cachedTokenUntil = 0

  private constructor() {
    this.api = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL })

    this.api.interceptors.request.use(async config => {
      if (!this.tokenGetter) return config
      const token = await this.getTokenCached()
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${token}`
      return config
    })

    this.api.interceptors.response.use(
      res => res,
      async error => {
        const status = error?.response?.status
        const original = error?.config
        if (!original || original._retry) throw error
        if (status === 403 && this.tokenGetter) {
          original._retry = true
          const token = await this.tokenGetter({ force: true })
          original.headers = original.headers ?? {}
          original.headers.Authorization = `Bearer ${token}`
          return this.api.request(original)
        }
        throw error
      },
    )
  }
  static getInstance() {
    if (!BackendApi.instance) BackendApi.instance = new BackendApi()
    return BackendApi.instance
  }
  setTokenGetter(getter: TokenGetter | null) {
    this.tokenGetter = getter
  }
  private async getTokenCached() {
    const now = Date.now()
    if (this.cachedToken && now < this.cachedTokenUntil) return this.cachedToken

    const token = await this.tokenGetter!()
    this.cachedToken = token
    this.cachedTokenUntil = now + 30_000
    return token
  }
  private get<T>(url: string, params?: unknown) {
    return this.api.get<T>(url, { params })
  }
  private post<TRes, TBody = unknown>(url: string, body?: TBody) {
    return this.api.post<TRes>(url, body)
  }
  private patch<TRes, TBody = unknown>(url: string, body?: TBody) {
    return this.api.patch<TRes>(url, body)
  }
  private delete<T>(url: string) {
    return this.api.delete<T>(url)
  }
  async sendApplication(
    body:
      | paths['/api/public/staff/application']['post']['requestBody']['content']['application/json']
      | paths['/api/public/student/application']['post']['requestBody']['content']['application/json'],
  ) {
    const path = Object.keys(body).includes('staff')
      ? '/api/public/staff/application'
      : '/api/public/student/application'
    return this.post(path, body)
  }
  async getApplications(type: 'staff' | 'students') {
    return this.get(`/api/private/${type}/applications`)
  }
  async changeApplicationState(
    type: 'staff' | 'student',
    params:
      | paths['/api/private/staff/appstate/:applicationState/:id']['patch']['parameters']['path']
      | paths['/api/private/student/appstate/:applicationState/:id']['patch']['parameters']['path'],
  ) {
    const { id, applicationState } = params
    const path =
      type === 'staff'
        ? `/api/private/staff/appstate/${applicationState}/${id}`
        : `/api/private/student/appstate/${applicationState}/${id}`
    return this.patch(path)
  }
  async getApplication(
    type: 'staff' | 'student',
    params:
      | paths['/api/private/student/application/:id']['get']['parameters']['path']
      | paths['/api/private/staff/application/:id']['get']['parameters']['path'],
  ) {
    const { id } = params
    const path = `/api/private/${type}/application/${id}`
    return this.get(path)
  }
}

export default BackendApi
