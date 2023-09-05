const express = require("express");
const route = express();

const authController = require("../controller/auth.controller");

route.post("/register", authController.register);
route.post("/login", authController.login);
route.post("/pin", authController.pinVerify);
route.patch("/update-pin", authController.updatePin);
route.patch("/update-password", authController.updatePassword);
route.post("/forgotpassword", authController.forgotPassword);

module.exports = route;
