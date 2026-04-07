const db = require('../config/db')

const getAllBookings = async () => {
    const [rows] = await db.execute(`
    SELECT id, employee_name, vehicle_id, driver_id, start_date, end_date,
           approver1_id, approver2_id, status, created_at
    FROM bookings
    ORDER BY id DESC
  `)

    return rows
}

const createBooking = async ({
    employee_name,
    vehicle_id,
    driver_id,
    start_date,
    end_date,
    approver1_id,
    approver2_id,
}) => {
    const [result] = await db.execute(
        `
    INSERT INTO bookings
    (employee_name, vehicle_id, driver_id, start_date, end_date, approver1_id, approver2_id, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
        [
            employee_name,
            vehicle_id,
            driver_id,
            start_date,
            end_date,
            approver1_id,
            approver2_id,
            'Menunggu Persetujuan 1',
        ]
    )

    return result.insertId
}

const cancelBooking = async (id) => {
    await db.execute(
        `UPDATE bookings SET status = 'Dibatalkan' WHERE id = ?`,
        [id]
    )
}

const updateBookingStatus = async (id, status) => {
    await db.execute(
        `UPDATE bookings SET status = ? WHERE id = ?`,
        [status, id]
    )
}

module.exports = {
    getAllBookings,
    createBooking,
    cancelBooking,
    updateBookingStatus,
}