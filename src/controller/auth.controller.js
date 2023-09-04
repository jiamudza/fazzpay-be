const authModel = require('../models/auth.models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_PRIVATE_KEY } = process.env

const authController = {
  login: (req, res) => {
    return authModel
      .login(req.body)
      .then((result) => {
        jwt.sign(
          { user_id: result.user_id, role: result.role },
          JWT_PRIVATE_KEY,
          (err, token) => {
            return res.status(200).send({
              message: 'success',
              data: {
                token,
                user: result
              }
            })
          }
        )
      })
      .catch((error) => {
        return res.status(500).send({ message: error })
      })
  },

  register: (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).send({ message: err.message })
      } else {
        const request = {
          ...req.body,
          password: hash
        }
        return authModel
          .register(request)
          .then((result) => {
            return res.status(201).send({ message: 'success', data: result })
          })
          .catch((error) => {
            return res.status(500).send({ message: error })
          })
      }
    })
  },

  updatePin: async (req, res) => {
    try {
      const request = {
        ...req.body
      }
      const result = await authModel.pin(request)

      return res.status(201).send({ message: 'success', data: result })
    } catch (error) {
      return res.status(500).send({ message: error })
    }
  },

  pinVerify: async (req, res) => {
    const request = {
      ...req.body
    }
    try {
      const data = await authModel.pinVerify(request)
      return res.status(201).send({ message: 'success', data })
    } catch (error) {
      return res.status(500).send({ message: error })
    }
  },

  updatePassword: async(req, res) => {
    bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
      if(err) {
        return res.status(500).send({message: err.message})
      } else {
        if(req.body.newPassword !== req.body.confirmNewPassword) {
          return res.status(500).send({message: 'New password is not the same'})
        } else {
          const request = {
            ...req.body,
            newPassword: hash,
          }
  
          return authModel.changepassword(request)
          .then(result => {
            return res.status(201).send({message: 'success', data: result})
          })
          .catch(err => {
            return res.status(500).send({message: err})
          })
        }
      }
    })
  }
}

module.exports = authController
