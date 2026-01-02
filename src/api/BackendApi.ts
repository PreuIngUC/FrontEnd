import axios, { type AxiosInstance } from 'axios'
import type { paths } from './types.ts'

class BackendApi {
  private api: AxiosInstance
  private static instance: BackendApi
  private constructor() {
    this.api = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL })
  }
  static getInstance() {
    if (!BackendApi.instance) BackendApi.instance = new BackendApi()
    return BackendApi.instance
  }
  async sendApplication(
    body:
      | paths['/api/public/staff/application']['post']['requestBody']['content']['application/json']
      | paths['/api/public/student/application']['post']['requestBody']['content']['application/json'],
  ) {
    const path = Object.keys(body).includes('staff')
      ? '/api/public/staff/application'
      : '/api/public/student/application'
    return this.api.post(path, body)
  }
}

export default BackendApi
