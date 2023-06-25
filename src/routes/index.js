const express = require('express')
const router = express()
const userRoute = require('./user.route')
const authRoute = require('./auth.route')
const transroute = require('./transaction.route')

router.get('/', (req, res) => {
  res.send('This is backend for Fazzpay')
})

router.use('/user', userRoute)
router.use('/auth', authRoute)
router.use('/transaction', transroute)
module.exports = router
