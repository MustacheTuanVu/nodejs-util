module.exports = app => {
  const Jwt = require("../config/checkJwt");
  const login = require("../controllers/login.controller.js");

  var router = require("express").Router();

  // Login
  router.post("/login", login.login);

  // account
  router.get("/account", [Jwt.checkJwt], login.account);

  app.use('/api/member', router);
};
