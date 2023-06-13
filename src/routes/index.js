const express = require('express')
const router = express()
const userRoute = require('./user_route')
const authRoute = require('./auth_route')
const transroute = require('./transaction_route')

router.get('/', (req, res) => {
    res.send('This is backend for Fazzpay')
})


router.use('/user', userRoute)
router.use('/auth', authRoute)
router.use('/transaction', transroute)
module.exports = router