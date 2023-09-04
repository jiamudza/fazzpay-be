require('dotenv').config()
const { urlencoded, json } = require('express')
const express = require('express')
const app = express()
const router = require('./src/routes/index')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const port = process.env.PORT || 5000
const sendEmail = require("./src/utils/send.email");

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(json())
app.use('/api/v1/', router)

app.get('*', (req, res) => {
  return res.send({
    status: 404,
    message: 'not found'
  })
})

app.listen(port, () => {
  console.log(`FazzPay Backend Success Run on Port ${port}`)
})
//
