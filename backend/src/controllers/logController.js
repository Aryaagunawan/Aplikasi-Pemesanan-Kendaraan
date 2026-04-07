const logService = require('../services/logService')
const { successResponse } = require('../utils/response')

const getLogs = async (req, res, next) => {
    try {
        const logs = await logService.getAllLogs()
        return successResponse(res, 'Data log berhasil diambil', logs)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getLogs,
}