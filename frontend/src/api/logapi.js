import api from './axios'

export const getLogsApi = async () => {
  const response = await api.get('/logs')
  return response.data
}