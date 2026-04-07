import api from './axios'

export const getVehiclesApi = async () => {
    const response = await api.get('/vehicles')
    return response.data
}

export const createVehicleApi = async (payload) => {
    const response = await api.post('/vehicles', payload)
    return response.data
}