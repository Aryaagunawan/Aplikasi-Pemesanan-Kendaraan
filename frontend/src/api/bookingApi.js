import api from './axios'

export const getBookingsApi = async () => {
    const response = await api.get('/bookings')
    return response.data
}

export const createBookingApi = async (payload) => {
    const response = await api.post('/bookings', payload)
    return response.data
}

export const cancelBookingApi = async (id, payload) => {
    const response = await api.patch(`/bookings/${id}/cancel`, payload)
    return response.data
}

export const approveBookingApi = async (id, payload) => {
    const response = await api.patch(`/approvals/${id}`, payload)
    return response.data
}