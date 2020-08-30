const UserService = require('../services/UserService');
const UserModel = require('../models/User');

exports.charge = async (req, res) => {
  const userService = new UserService(UserModel);
  const user = await userService.chargeUser(req.body.id, req.user);

  return res.send(user);
};
