const bookingService = require('../services/bookingService')
const logService = require('../services/logService')
const { successResponse, errorResponse } = require('../utils/response')

const getBookings = async (req, res, next) => {
    try {
        const bookings = await bookingService.getAllBookings()
        return successResponse(res, 'Data booking berhasil diambil', bookings)
    } catch (error) {
        next(error)
    }
}

const createBooking = async (req, res, next) => {
    try {
        const employee_name = req.body.employee_name || req.body.employeeName
        const vehicle_id = req.body.vehicle_id || req.body.vehicleId
        const driver_id = req.body.driver_id || req.body.driverId
        const start_date = req.body.start_date || req.body.startDate
        const end_date = req.body.end_date || req.body.endDate
        const approver1_id = req.body.approver1_id || req.body.approver1Id
        const approver2_id = req.body.approver2_id || req.body.approver2Id
        const user_name = req.body.user_name || req.body.userName

        if (
            !employee_name ||
            !vehicle_id ||
            !driver_id ||
            !start_date ||
            !end_date ||
            !approver1_id ||
            !approver2_id
        ) {
            return errorResponse(res, 'Semua field booking wajib diisi', 400)
        }

        const insertId = await bookingService.createBooking({
            employee_name,
            vehicle_id,
            driver_id,
            start_date,
            end_date,
            approver1_id,
            approver2_id,
        })

        await logService.createLog(
            user_name || 'System',
            `Membuat pesanan baru untuk ${employee_name}`
        )

        return successResponse(
            res,
            'Booking berhasil dibuat',
            {
                id: insertId,
                employee_name,
                vehicle_id,
                driver_id,
                start_date,
                end_date,
                approver1_id,
                approver2_id,
                status: 'Menunggu Persetujuan 1',
            },
            201
        )
    } catch (error) {
        next(error)
    }
}

const cancelBooking = async (req, res, next) => {
    try {
        const { id } = req.params
        const body = req.body || {}
        const user_name = body.user_name || body.userName || 'System'

        await bookingService.cancelBooking(id)

        await logService.createLog(
            user_name,
            `Membatalkan pesanan ID #${id}`
        )

        return successResponse(res, 'Booking berhasil dibatalkan')
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getBookings,
    createBooking,
    cancelBooking,
}