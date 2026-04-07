const dotenv = require('dotenv')
const app = require('./app')
const pool = require('./config/db')

dotenv.config()

const PORT = process.env.PORT || 5000

const startServer = async () => {
    try {
        const connection = await pool.getConnection()
        console.log('Database MySQL terkoneksi')
        connection.release()

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error('Gagal koneksi database:', error.message)
        process.exit(1)
    }
}

startServer()