module.exports = class UserService {
  constructor() {
  }

  addCredits(user) {
    user.credits += 5;
    return user.save();
  }
};
