import api from './axios'

export const getReportsApi = async (search = '') => {
    const response = await api.get('/reports', {
        params: { search },
    })
    return response.data
}