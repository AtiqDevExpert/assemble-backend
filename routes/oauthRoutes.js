const express = require('express');
const router = express.Router();
const oAuthUserController = require('../controllers/oauthController');

// Endpoint to create a new OAuth user
router.post('/create', oAuthUserController.createOAuthUser);
router.delete('/delete', oAuthUserController.deleteOAuthUser);

module.exports = router;
