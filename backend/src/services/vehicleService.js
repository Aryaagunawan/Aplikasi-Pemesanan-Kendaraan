const db = require('../config/db')

const getAllVehicles = async () => {
    const [rows] = await db.execute(`
    SELECT id, name, type, owner, fuel, last_service
    FROM vehicles
    ORDER BY id DESC
  `)

    return rows
}

const createVehicle = async ({
    vehicle_name,
    vehicle_type,
    ownership_status,
    fuel_consumption,
    last_service,
}) => {
    const [result] = await db.execute(
        `
    INSERT INTO vehicles
    (name, type, owner, fuel, last_service)
    VALUES (?, ?, ?, ?, ?)
    `,
        [
            vehicle_name,
            vehicle_type,
            ownership_status,
            fuel_consumption,
            last_service,
        ]
    )

    return result.insertId
}

module.exports = {
    getAllVehicles,
    createVehicle,
}