const db = require('../config/db')

const getAllLogs = async () => {
    const [rows] = await db.execute(`
        SELECT id, user_name, action, created_at
        FROM activity_logs
        ORDER BY id DESC
    `)

    return rows
}

const createLog = async (user_name, action) => {
    await db.execute(
        `INSERT INTO activity_logs (user_name, action, created_at) VALUES (?, ?, NOW())`,
        [user_name, action]
    )
}

module.exports = {
    getAllLogs,
    createLog,
}