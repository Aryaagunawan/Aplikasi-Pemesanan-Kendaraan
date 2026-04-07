const pool = require('../config/db')

const getBookingReports = async () => {
    const [rows] = await pool.query(`
    SELECT 
      b.id,
      b.employee_name,
      v.name AS vehicle_name,
      d.name AS driver_name,
      b.start_date,
      b.end_date,
      b.status,
      b.created_at
    FROM bookings b
    JOIN vehicles v ON b.vehicle_id = v.id
    JOIN drivers d ON b.driver_id = d.id
    ORDER BY b.id DESC
  `)

    return rows
}

module.exports = {
    getBookingReports,
}