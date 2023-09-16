const transactionModel = require('../models/transaction.models')

const transController = {
  add: async (req, res) => {
    try {
      const request = {
        ...req.body
      }
      const result = await transactionModel.add(request)
      return res.status(201).send({ message: 'success', data: result })
    } catch (error) {
      return res.status(500).send({ message: error })
    }
  },

  getById: async (req, res) => {
    try {
      const result = await transactionModel.getById(req.params.user_id)
      return res.status(201).send({ message: 'success', data: result })
    } catch (error) {
      return res.status(500).send({ message: error })
    }
  },

  getByIdFilter: async(req, res) => {
    try{
      let { search, sortBy, page = 1, limit = 20 } = req.query;
      let offset = (page - 1) * limit;
      const userId = req.params.user_id
      const result = await transactionModel.getByIdFilter(userId, search, sortBy, limit, offset)
      return res.status(200).send({message: 'success', data: result})
    }
    catch(err) {
      return res.status(500).send({message: err})
    }
  }
}

module.exports = transController
