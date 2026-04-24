import axios, { type AxiosInstance } from 'axios'
import type { paths } from './types.ts'

type TokenGetter = (opts?: { force?: boolean }) => Promise<string>

export type PluralKind = 'staff' | 'students'

export type SingularKind = 'staff' | 'student'

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
  // private delete<T>(url: string) {
  //   return this.api.delete<T>(url)
  // }
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
  async getApplications<R extends PluralKind>({ of }: { of: R }) {
    return this.get<
      R extends 'staff'
        ? paths['/api/private/staff/applications']['get']['responses']['200']['content']['application/json']
        : paths['/api/private/students/applications']['get']['responses']['200']['content']['application/json']
    >(`/api/private/${of}/applications`)
  }
  async changeApplicationState<R extends SingularKind>({
    of,
    params,
  }: {
    of: R
    params: R extends 'staff'
      ? paths['/api/private/staff/appstate/:applicationState/:id']['patch']['parameters']['path']
      : paths['/api/private/student/appstate/:applicationState/:id']['patch']['parameters']['path']
  }) {
    const { id, applicationState } = params
    const path =
      of === 'staff'
        ? `/api/private/staff/appstate/${applicationState}/${id}`
        : `/api/private/student/appstate/${applicationState}/${id}`
    return this.patch(path)
  }
  async getApplication<R extends SingularKind>({
    of,
    params,
  }: {
    of: R
    params: R extends 'staff'
      ? paths['/api/private/staff/application/:id']['get']['parameters']['path']
      : paths['/api/private/student/application/:id']['get']['parameters']['path']
  }) {
    const { id } = params
    const path = `/api/private/${of}/application/${id}`
    return this.get<
      R extends 'staff'
        ? paths['/api/private/staff/application/:id']['get']['responses']['200']['content']['application/json']
        : paths['/api/private/student/application/:id']['get']['responses']['200']['content']['application/json']
    >(path)
  }
  async editApplication<R extends SingularKind>({
    of,
    params,
    body,
  }: {
    of: R
    params: paths['/api/private/student/application/:id']['patch']['parameters']['path'] //TODO: agregar el homologo pero para staff cuando esté listo en Backend
    body: paths['/api/private/student/application/:id']['patch']['requestBody']['content']['application/json']
  }) {
    const { id } = params
    const path = `/api/private/${of}/application/${id}`
    return this.patch(path, body)
  }
  async getAcceptedApplications<R extends PluralKind>({ of }: { of: R }) {
    return this.get<
      R extends 'staff'
        ? paths['/api/private/staff/accepted']['get']['responses']['200']['content']['application/json']
        : paths['/api/private/students/accepted']['get']['responses']['200']['content']['application/json']
    >(`/api/private/${of}/accepted`)
  }
  async createJob<R extends PluralKind>({ of }: { of: R }) {
    return this.post<
      R extends 'staff'
        ? paths['/api/private/job/staff/create']['post']['responses']['201']['content']['application/json']
        : paths['/api/private/job/students/create']['post']['responses']['201']['content']['application/json']
    >(`/api/private/job/${of}/create`)
  }
  async jobStep<R extends PluralKind>({
    of,
    params,
  }: {
    of: R
    params: R extends 'staff'
      ? paths['/api/private/job/staff/step/:jobId']['post']['parameters']['path']
      : paths['/api/private/job/students/step/:jobId']['post']['parameters']['path']
  }) {
    return this.post<
      R extends 'staff'
        ? paths['/api/private/job/staff/step/:jobId']['post']['responses']['201']['content']['application/json']
        : paths['/api/private/job/students/step/:jobId']['post']['responses']['201']['content']['application/json']
    >(`/api/private/job/${of}/step/${params.jobId}`)
  }
  async verifyThenChangePassword(
    body: paths['/api/public/users/verify-then-password']['patch']['requestBody']['content']['application/json'],
  ) {
    return this.patch('/api/public/users/verify-then-password', body)
  }
  async studentAbleToApply() {
    return this.get<
      paths['/api/public/student/able-to-apply']['get']['responses']['200']['content']['application/json']
    >('/api/public/student/able-to-apply')
  }
}

export default BackendApi
