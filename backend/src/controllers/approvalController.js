const bookingService = require('../services/bookingService')
const logService = require('../services/logService')
const { successResponse, errorResponse } = require('../utils/response')

const getPendingApprovals = async (req, res, next) => {
    try {
        const bookings = await bookingService.getAllBookings()

        const pending = bookings.filter(
            (item) =>
                item.status === 'Menunggu Persetujuan 1' ||
                item.status === 'Menunggu Persetujuan 2'
        )

        return successResponse(res, 'Data approval berhasil diambil', pending)
    } catch (error) {
        next(error)
    }
}

const approveBooking = async (req, res, next) => {
    try {
        const { id } = req.params
        const { level, approved, user_name } = req.body

        if (typeof approved !== 'boolean') {
            return errorResponse(res, 'approved harus boolean', 400)
        }

        let newStatus = ''

        if (approved === false) {
            newStatus = 'Ditolak'
        } else {
            if (Number(level) === 1) {
                newStatus = 'Menunggu Persetujuan 2'
            } else if (Number(level) === 2) {
                newStatus = 'Disetujui'
            } else {
                return errorResponse(res, 'level approval tidak valid', 400)
            }
        }

        await bookingService.updateBookingStatus(id, newStatus)

        await logService.createLog(
            user_name || 'System',
            approved
                ? `Menyetujui pesanan ID #${id} level ${level}`
                : `Menolak pesanan ID #${id}`
        )

        return successResponse(res, 'Approval berhasil diproses', {
            id: Number(id),
            status: newStatus,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getPendingApprovals,
    approveBooking,
}