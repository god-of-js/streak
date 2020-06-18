const c = require("../data/collections");
const User = require('../models/user');
const tokeniser = require("../services/tokens.js");

async function isAuthenticated(req, res, next) {
  if (!req.get("Authorization") ||!req.get("Authorization").startsWith("Bearer "))
    return res.status(401).send({
      error: true,
      message: "You have to provide a JWT Token",
    });
  const token = req.get("Authorization").split(" ")[1];
  req.payload = tokeniser.decode(token);
  if (!req.payload)
    return res.status(401).send({
      error: true,
      message: "Invalid JWT Token",
    });
  const user = await User.find({ _id: req.payload.id });
  if (!user)
    return res.status(401).send({
      error: true,
      message: "Invalid Account details",
    });
  return next();
}
function isAccountType(...type) {
  return async (req, res, next) => {
    const { accountType } = req.payload;
    if (!type.includes(accountType))
      return res.status(401).send({
        error: true,
        message: `You need to have account type ${type} to access this route`,
      });
    return next();
  };
}
module.exports = Object.freeze({
  isAuthenticated,
  isAccountType,
});
