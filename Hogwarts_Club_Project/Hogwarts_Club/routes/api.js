// Hogwarts Club API routes

import express from "express";

// import controllers
import * as user from "../controllers/UsersController.js";
import AuthController from "../controllers/AuthController.js";
import * as card from "../controllers/CardsController.js";

// create controller classes
const auth = new AuthController();

import authenticateToken from "../middlewares/auth.js"; // import authentication middleware

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

// PUT update authenticated user informations (login required)
router.put("/user", authenticateToken, user.update);

// DELETE delete authenticated user (login required)
router.delete("/user", authenticateToken, user.terminate);

// GET user cards collection (login required)
router.get("/collection", authenticateToken, card.collection);

// GET check if user has specific card in collection (login required)
router.get("/card/:id", card.check);

// GET check booster status
router.get("/booster", authenticateToken, card.booster);

// PUT check booster status
router.put("/favorite/:id", authenticateToken, card.favorite);

// POST remove card from user collection
// router.post("/remove/:id", authenticateToken, card.remove);


export default router;
