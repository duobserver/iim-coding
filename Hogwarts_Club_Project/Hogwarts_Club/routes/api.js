// Hogwarts Club API routes

import express from "express";

// import controllers
import UserController from "../controllers/UsersController.js";
import AuthController from "../controllers/AuthController.js";
import * as card from "../controllers/CardsController.js";

// create controller classes
const user = new UserController();
const auth = new AuthController();
// const card = new CardController();

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
router.delete("/user", authenticateToken, user.delete);

// GET user cards collection (login required)
router.get("/collection", authenticateToken, card.collection);

// GET if user owns specific card (login required)
router.get("/card/:id", card.owned);

//
router.get("/booster", authenticateToken, card.booster);

// TEMPORARY UPDATE quantity of specific card
router.put("/getcard/:cardId", authenticateToken, card.addCard);

export default router;
