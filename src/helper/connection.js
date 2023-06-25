require('dotenv').config()
const { Client } = require('pg')

const { HOST, DB_NAME, DB_PORT, USER, PASSWORD } = process.env

const db = new Client({
  user: USER,
  host: HOST,
  database: DB_NAME,
  password: PASSWORD,
  port: DB_PORT,
  trustServerCertificate: true,
})

db.connect((err) => {
  if (!err) {
    console.log('Database FazzPay is Connected')
  } else {
    console.log('Database Connection Failed', err)
  }
})

module.exports = db

// make carousel with react js and tailwind classes
