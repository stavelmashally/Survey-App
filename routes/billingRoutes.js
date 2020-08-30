const requireLogin = require('../middlewares/requireLogin');
const { billingCtrl } = require('../controllers');

module.exports = app => {
  app.post('/api/stripe', requireLogin, billingCtrl.charge);
};
