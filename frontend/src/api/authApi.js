import api from './axios'

export const loginApi = async (payload) => {
    const response = await api.post('/auth/login', payload)
    return response.data
}