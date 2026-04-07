const express = require('express')
const router = express.Router()
const approvalController = require('../controllers/approvalController')

router.get('/', approvalController.getPendingApprovals)
router.patch('/:id', approvalController.approveBooking)

module.exports = router