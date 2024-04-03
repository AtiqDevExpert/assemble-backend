const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");


router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);
router.get("/get-all-users", userController.getAllUsers);

router.post("/refresh-token", userController.refreshToken);

router.post('/update-password/:id',  userController.updatePassword);
router.delete('/delete-account/:id',  userController.deleteAccount);


router.post('/add',  userController.addUserByAdmin);
router.delete('/delete/:id',  userController.deleteUserByAdmin);


router.get("/protected", authMiddleware.verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;
