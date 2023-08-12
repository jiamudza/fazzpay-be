const express = require("express");
const formUpload = require("../helper/formData");
const route = express();
const userController = require("../controller/user.controller");

route.get("/", userController.get);
route.get("/:user_id", userController.getById);
route.patch(
  "/image/:user_id",
  formUpload.single("userImage"),
  userController.updateImage
);
route.patch("/:user_id", formUpload.single(), userController.updateProfile);
route.patch("/topup/:user_id", formUpload.single(), userController.topup);

module.exports = route;
