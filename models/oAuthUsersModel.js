const mongoose = require('mongoose');

const oAuthUserSchema = new mongoose.Schema({
  name: { type: String, },
  email: { type: String, },
  sso_token: { type: String, required: true },
  login_type: { type: String, required: true },
});

const OAuthUser = mongoose.model('OAuthUser', oAuthUserSchema);

module.exports = OAuthUser;
