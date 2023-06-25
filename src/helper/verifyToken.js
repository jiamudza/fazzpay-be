const jwt = require('jsonwebtoken')
const { JWT_PRIVATE_KEY } = process.env
const verifyToken = (req, res, next) => {
  const token = req.header('token')
  if (!req.header('token')) {
    return res.status(400).send({
      message: 'token is required'
    })
  } else {
    jwt.verify(token, JWT_PRIVATE_KEY, (err, decoded) => {
      if (!err) {
        if (decoded.role === 'admin') {
          next()
        } else if (decoded.role === 'user') {
          return res.status(403).send({
            message: "you don't have access."
          })
        } else {
          return res.status(403).send({
            message: "you don't have access."
          })
        }
      } else {
        return res.status(400).send({
          message: 'invalid token'
        })
      }
    })
  }
}

module.exports = verifyToken
