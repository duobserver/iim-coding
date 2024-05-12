// Hogwarts Club API routing

import express from "express";

// import controllers
import UserController from "./controllers/UsersController.js";
import AuthController from "./controllers/AuthController.js";

// create controller classes
const user = new UserController();
const auth = new AuthController();

import authenticateToken from "./middlewares/auth.js"; // import authentication middleware

const router = express.Router();

// POST log into user account with credentials (email, password)
router.post("/login", auth.login);

// GET show authenticated user informations (login required)
router.get("/activeUser", authenticateToken, auth.myProfile);

// GET display all users (login not required)
router.get("/members", user.index);

// POST create new user (login not required)
router.post("/user", user.create);

// GET display specific user (login not required)
router.get("/user/:id", user.read);

router.get("/booster", authenticateToken, user.boosterStatus);

// PUT update authenticated user informations (login required)
router.put("/user", authenticateToken, user.update);

// DELETE delete authenticated user (login required)
router.delete("/user", authenticateToken, user.delete);

export default router;
