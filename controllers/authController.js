exports.currentUser = async (req, res) => {
  res.send(req.user);
};

exports.logOut = async (req, res) => {
  // remove the cookie
  req.logout();
  return res.redirect('/');
};

exports.googleAuth = async (req, res) => {};

exports.googleCallback = async (req, res) => {
  return res.redirect('/surveys');
};
