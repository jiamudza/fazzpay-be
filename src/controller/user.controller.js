const userModel = require("../models/user.models");
const cloudinary = require("../helper/cloudinary_config");

const userController = {
  get: async (req, res) => {
    try {
      const result = await userModel.get();
      return res.status(200).send({ message: "success", data: result });
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

  updateProfile: async (req, res) => {
    try {
      const request = {
        ...req.body,
        firstName: req.body.firstName,
        userId: req.params.user_id,
      };

      const result = await userModel.updateProfile(request);
      return res.status(201).send({ message: "success", data: result });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
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
