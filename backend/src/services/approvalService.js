const pool = require('../config/db')

const getPendingApprovals = async (userId, level) => {
    let sql = ''
    let params = []

    if (level === 1) {
        sql = `
      SELECT * FROM bookings
      WHERE status = 'Menunggu Persetujuan 1'
      AND approver1_id = ?
      ORDER BY id DESC
    `
        params = [userId]
    } else {
        sql = `
      SELECT * FROM bookings
      WHERE status = 'Menunggu Persetujuan 2'
      AND approver2_id = ?
      ORDER BY id DESC
    `
        params = [userId]
    }

    const [rows] = await pool.query(sql, params)
    return rows
}

const updateApprovalStatus = async (bookingId, level, approved) => {
    let newStatus = 'Ditolak'

    if (approved) {
        newStatus = level === 1 ? 'Menunggu Persetujuan 2' : 'Disetujui'
    }

    await pool.query(
        'UPDATE bookings SET status = ? WHERE id = ?',
        [newStatus, bookingId]
    )

    return newStatus
}

module.exports = {
    getPendingApprovals,
    updateApprovalStatus,
}