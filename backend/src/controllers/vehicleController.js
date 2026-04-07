const vehicleService = require('../services/vehicleService')
const logService = require('../services/logService')
const { successResponse, errorResponse } = require('../utils/response')

const getVehicles = async (req, res, next) => {
    try {
        const vehicles = await vehicleService.getAllVehicles()
        return successResponse(res, 'Data kendaraan berhasil diambil', vehicles)
    } catch (error) {
        console.error('GET VEHICLES ERROR:', error)
        next(error)
    }
}

const createVehicle = async (req, res, next) => {
    try {
        const vehicle_name = req.body.vehicle_name || req.body.name
        const vehicle_type = req.body.vehicle_type || req.body.type
        const ownership_status = req.body.ownership_status || req.body.owner
        const fuel_consumption = req.body.fuel_consumption || req.body.fuel
        const last_service = req.body.last_service || req.body.lastService
        const user_name = req.body.user_name || req.body.userName || 'System'

        if (
            !vehicle_name ||
            !vehicle_type ||
            !ownership_status ||
            !fuel_consumption ||
            !last_service
        ) {
            return errorResponse(res, 'Semua field kendaraan wajib diisi', 400)
        }

        const insertId = await vehicleService.createVehicle({
            vehicle_name,
            vehicle_type,
            ownership_status,
            fuel_consumption,
            last_service,
        })

        try {
            await logService.createLog(
                user_name,
                `Menambahkan armada baru: ${vehicle_name}`
            )
        } catch (logError) {
            console.error('CREATE VEHICLE LOG ERROR:', logError)
        }

        return successResponse(
            res,
            'Kendaraan berhasil ditambahkan',
            {
                id: insertId,
                name: vehicle_name,
                type: vehicle_type,
                owner: ownership_status,
                fuel: fuel_consumption,
                lastService: last_service,
            },
            201
        )
    } catch (error) {
        console.error('CREATE VEHICLE ERROR:', error)
        next(error)
    }
}

module.exports = {
    getVehicles,
    createVehicle,
}