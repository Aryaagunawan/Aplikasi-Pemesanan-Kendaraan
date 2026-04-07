const pool = require('../config/db')

const findUserByUsername = async (username) => {
    const [rows] = await pool.query(
        'SELECT id, username, password, role, level_approval, name FROM users WHERE username = ? LIMIT 1',
        [username]
    )
    return rows[0]
}

module.exports = {
    findUserByUsername,
}