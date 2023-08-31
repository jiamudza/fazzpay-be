const userModel = require("../models/user.models");
const cloudinary = require("../helper/cloudinary_config");
const bcrypt = require('bcrypt')

const userController = {
  get: async (req, res) => {
    let { search, display_name, sortBy, page = 1, limit = 5 } = req.query;
    let offset = (page - 1) * limit;

    try {
      const result = await userModel.get(
        search,
        display_name,
        sortBy,
        limit,
        offset
      );
      return res.status(200).send({ message: "success", data: result, page,
    limit });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  },

  getById: async (req, res) => {
    try {
      const result = await userModel.getById(req.params.user_id);
      return res.status(200).send({ message: "success", data: result });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  },

  updateImage: async (req, res) => {
    try {
      const image = await cloudinary.uploader.upload(req.file.path, {
        folder: `fazzpay_users_${req.params.user_id}`,
        public_id: `${req.params.user_id}_fazzpay_avatar`,
        width: 700,
        height: 700,
        crop: "pad",
      });
      const request = {
        ...req.body,
        userId: req.params.user_id,
        userImage: image.secure_url,
      };
      const result = await userModel.updateImage(request);
      return res.status(201).send({ message: "success", data: result });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  },

  updateProfile: (req, res) => {
   bcrypt.hash(req.body.password, 10, async(err, hash) => {
    if(err) {
      return res.status(500).send({message: err.message})
    } else {
      try {
        const request = {
          ...req.body,
          password: hash,
          firstName: req.body.firstName,
          userId: req.params.user_id,
        };
  
        const result = await userModel.updateProfile(request);
        return res.status(201).send({ message: "success", data: result });
      } catch (error) {
        return res.status(500).send({ message: error });
      }
    }
   })
  },

  topup: async (req, res) => {
    try {
      const request = {
        ...req.body,
        userId: req.params.user_id,
      };

      const result = await userModel.topup(request);
      return res.status(201).send({ message: "success", data: result });
    } catch (error) {
      return res.status(500).send({ message: err });
    }
  },
};

module.exports = userController;
