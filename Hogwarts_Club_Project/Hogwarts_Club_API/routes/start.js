// PROJECT ROUTING
// express router = URL dictionary
// REMEMBER to call dedicated modules
const express = require("express");

// load controller classes
const UserController = require("../controllers/UsersController");
const AuthController = require("../controllers/AuthController");
const { authenticateToken } = require("../middlewares/auth");

const router = express.Router();

// POST log into user account with credentials (email, password)
router.post("/login", AuthController.login);

// GET show authenticated user informations (login required)
router.get("/activeUser", authenticateToken, AuthController.myProfile);

// GET display all user (login not required)
router.get("/people", UserController.index);

// POST create new user (login not required)
router.post("/user", UserController.create);

// GET display specific user (login not required)
router.get("/user/:id", UserController.read);

// PUT update authenticated user informations (login required)
router.put("/user", authenticateToken, UserController.update);

// DELETE delete authenticated user (login required)
router.delete("/user", authenticateToken, UserController.delete);

module.exports = router;
