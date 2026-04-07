const reportService = require('../services/reportService')
const { successResponse } = require('../utils/response')

const getReports = async (req, res, next) => {
    try {
        const reports = await reportService.getBookingReports()
        return successResponse(res, 'Data laporan berhasil diambil', reports)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getReports,
}