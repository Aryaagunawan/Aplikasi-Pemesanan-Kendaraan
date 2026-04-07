const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const vehicleRoutes = require('./routes/vehicleRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const approvalRoutes = require('./routes/approvalRoutes')
const reportRoutes = require('./routes/reportRoutes')
const logRoutes = require('./routes/logRoutes')

const notFoundHandler = require('./middlewares/notFoundHandler')
const errorHandler = require('./middlewares/errorHandler')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Backend ArmadaPro berjalan',
    })
})

app.use('/api/auth', authRoutes)
app.use('/api/vehicles', vehicleRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/approvals', approvalRoutes)
app.use('/api/reports', reportRoutes)
app.use('/api/logs', logRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

module.exports = app