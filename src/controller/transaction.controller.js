const transactionModel = require('../models/transaction.models')

const transController = {
    add : async(req, res) => {
        try {
            const request = {
                ...req.body
            }
            let result = await transactionModel.add(request)
            return res.status(201).send({message: 'success', data : result})
        } catch (error) {
            return res.status(500).send({message: error})
        }
    },

    getById: async(req, res) => {
        try {
            let result = await transactionModel.getById(req.params.user_id)
            return res.status(201).send({message: 'success', data : result})
        } catch (error) {
            return res.status(500).send({message: error})
        }
    }
}

module.exports = transController