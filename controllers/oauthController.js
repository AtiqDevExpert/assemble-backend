const OAuthUser = require('../models/oAuthUsersModel');

exports.createOAuthUser = async (req, res) => {
  try {
    const { name, email, sso_token, login_type } = req.body;

    if ( !sso_token || !login_type) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
    const existingUser = await OAuthUser.findOne({ sso_token, login_type });
    if (existingUser) {
      if (login_type.toLowerCase() === 'google') {
        // If the login type is Google, return a message with the existing user's sso_token
        return res.status(201).json({
          message: 'User with this email and login_type (Google) already exists',
          name: existingUser.name,
          email: existingUser.email,
          sso_token: existingUser.sso_token,
          login_type: existingUser.login_type,
        });
      } else if (login_type.toLowerCase() === 'apple') {
        // If the login type is Apple, return a message with the existing user's information
        return res.status(201).json({
            message: 'User with this email and login_type (Apple) already exists',
          name: existingUser.name,
          email: existingUser.email,
          sso_token: existingUser.sso_token,
          login_type: existingUser.login_type,
        });
      }
      // If the login type is not Google or Apple, return a message that the user already exists
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    // Create a new OAuth user
    const newUser = new OAuthUser({ name, email, sso_token, login_type });
    await newUser.save();

    res.status(201).json({ message: 'OAuth user created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating OAuth user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.deleteOAuthUser = async (req, res) => {
  try {
    const { sso_token, login_type } = req.body;

    // Validate input
    if (!sso_token || !login_type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if the user with the given sso_token and login_type exists
    const existingUser = await OAuthUser.findOne({ sso_token, login_type });
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the OAuth user and include the deleted user in the response
    const deletedUser = await OAuthUser.findOneAndDelete({ sso_token, login_type });

    res.json({ message: 'OAuth user deleted successfully', deletedUser });
  } catch (error) {
    console.error('Error deleting OAuth user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
