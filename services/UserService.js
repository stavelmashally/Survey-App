const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const UserModel = require('../models/User');

module.exports = class UserService {
  async find(userDetails) {
    return await UserModel.findOne({ ...userDetails });
  }

  async substractCredits(user) {
    user.credits -= 1;
    return await user.save();
  }

  async chargeUser(id, user) {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: id,
    });
    user.credits += 5;
    return await user.save();
  }

  async createAndSave(userDetails) {
    const user = await UserModel.create(userDetails);
    return user;
  }
};
