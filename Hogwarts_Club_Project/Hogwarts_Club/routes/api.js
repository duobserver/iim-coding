// Hogwarts Club API routes

import express from "express";

// import controllers
import * as user from "../controllers/UsersController.js";
import * as auth from "../controllers/AuthController.js";
import * as card from "../controllers/CardsController.js";

import "../middlewares/trade.js"; // import trade offer checking middleware
import authenticateToken from "../middlewares/auth.js"; // import authentication middleware
import { authorHasCard, isNewTrade, targetExists, tradeExists, userHasCard, userIsNotTarget, userIsTarget } from "../middlewares/trade.js";

const router = express.Router();

// log into user account with credentials (email, password)
router.post("/login", auth.login);

// show authenticated user informations (login required)
router.get("/activeUser", authenticateToken, auth.myProfile);

// display all users (login not required)
router.get("/members", user.index);

// search for user profile
router.get("/members/:name", user.searchUser);

// POST create new user (login not required)
router.post("/user", user.create);

// display specific user (login not required)
router.get("/user/:id", user.read);

// update authenticated user informations (login required)
router.put("/user", authenticateToken, user.update);

// delete authenticated user (login required)
router.delete("/user", authenticateToken, user.terminate);

// user cards collection (login required)
router.get("/collection", authenticateToken, card.collection);

// user cards collection (login required)
router.get("/collection/:id", card.foreignCollection);

// check if user has specific card in collection (login required)
router.get("/card/:id", card.check);

// check booster status
router.get("/booster", authenticateToken, card.booster);

// check booster status
router.put("/favorite/:id", authenticateToken, card.favorite);

//////////////////////////////////////////////////////////////
// card trading

// view user trade list
router.get("/trade", authenticateToken, card.viewTrades);

// make new trade offer
router.post("/trade", authenticateToken, [isNewTrade, userIsNotTarget, targetExists], card.makeTrade);

// accept trade offer
router.put("/trade/:id", authenticateToken, [tradeExists, userIsTarget, userHasCard, authorHasCard], card.acceptTrade);

// POST remove card from user collection
// router.post("/remove/:id", authenticateToken, card.remove);

export default router;
