// trade offer checking middleware

import prisma from "../config/prisma.js"; // connect to database through prisma
import { readInternal } from "../controllers/UsersController.js";
import { checkInternal } from "../controllers/CardsController.js";

///////////////////////////////////////////////////////////////////////////////////////
// trade offer creation checkers

// check if request contains new trade offer criteria
export async function isNewTrade(req, res, next) {
    console.log("checking if trade offer is valid");
    try {
        const trade = req.body; // get new trade offer
        const neededKeys = ["targetId", "cardForAuthorId", "cardForTargetId", "message"];
        const checkKeys = neededKeys.every((key) => Object.keys(trade).includes(key)); // check if new trade offer contains all required keys

        if (checkKeys == true) {
            // if new trade offer request contains all required keys
            req.trade = trade;
            next();
        } else {
            // if new trade offer request does not contain all required keys
            res.status(400).json({ message: "Please provide (targetId,  cardForAuthorId, cardForTargetId, message) keys to create a new trade offer." });
        }
    } catch (error) {
        // if function fails
        return res.status(500).json({ message: error.message }); // 500: internal server error
    }
}

// check if trade offer target user is not current user (for trade offer creation)
export async function userIsNotTarget(req, res, next) {
    console.log("checking if user is not target");
    try {
        const userId = Number(req.user.id);
        const targetId = Number(req.trade.targetId);

        if (targetId == userId) {
            // if trade oofer target user is current user
            res.status(403).json({ message: "You can't make a trade offer with yourself." });
        } else {
            // if trade oofer target user is not current user
            next();
        }
    } catch (error) {
        // if function fails
        return res.status(500).json({ message: error.message }); // 500: internal server error
    }
}

// check if trade offer target user exists (for trade offer creation)
export async function targetExists(req, res, next) {
    console.log("checking if target user exists");
    try {
        const targetId = Number(req.trade.targetId);

        const check = await readInternal(targetId);

        if (check) {
            // if trade offer target user exists
            next();
        } else {
            // if trade offer target user does not exist
            res.status(404).json({ message: "The user you want to trade with doesn't exist." });
        }
    } catch (error) {
        // if function fails
        return res.status(500).json({ message: error.message }); // 500: internal server error
    }
}

///////////////////////////////////////////////////////////////////////////////////////
// trade offer execution checkers

// check if trade offer exists
export async function tradeExists(req, res, next) {
    console.log("checking if trade offer exists");
    try {
        const tradeId = Number(req.params.id);

        const trade = await prisma.trade.findUnique({ where: { id: tradeId } });

        if (trade) {
            // if trade offer exists
            req.trade = trade;
            next();
        } else {
            // if trade offer does not exist
            res.status(404).json({ message: `Couldn't find trade offer  n°${tradeId}. Trade might have been deleted or its original doesn't exist.` });
        }
    } catch (error) {
        // if function fails
        return res.status(500).json({ message: error.message }); // 500: internal server error
    }
}

// check if trade offer target user is current user
export async function userIsTarget(req, res, next) {
    console.log("checking if target user is current user");
    try {
        const userId = Number(req.user.id);
        const trade = req.trade;

        if (Number(trade.targetId) == userId) {
            // if trade offer target user is current user
            next();
        } else {
            // if trade offer target user is not current user
            return res.status(403).json({ message: `You can't accept trade offer n° ${Number(trade.id)}.` });
        }
    } catch (error) {
        // if function fails
        return res.status(500).json({ message: error.message }); // 500: internal server error
    }
}

// check if current user has card to give
export async function userHasCard(req, res, next) {
    console.log("checking if current user has card");
    try {
        const userId = Number(req.user.id);
        const cardForAuthorId = Number(req.trade.cardForAuthorId);

        const hasCard = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                cards: {
                    where: {
                        id: cardForAuthorId,
                    },
                },
            },
        });

        console.log(hasCard);
        if (hasCard.cards.length == 0) {
            // if user current user does not have card to give
            return res.status(403).json({ message: "You don't have a card to give." });
        } else {
            console.log("has card");
            // if user current user has card to give
            next();
        }
        return res.status(500).json({ message: error.message }); // 500: internal server error
    } catch (error) {
        // if function fails
        return res.status(500).json({ message: error.message }); // 500: internal server error
    }
}

// check if trade offer author exists
export async function authorExists(req, res, next) {
    console.log("checking if trade offer author exists");
    try {
        const trade = req.trade;
        const authorId = Number(req.trade.authorId);

        const check = await readInternal(authorId);

        if (check) {
            // if trade offer author user exists
            next();
        } else {
            // if trade offer author user does not exist
            // await deleteTradeInternal(Number(trade.id));
            res.status(404).json({ message: "The author of this trade offer doesn't exist. This trade offer has been deleted." });
        }
    } catch (error) {
        // if function fails
        return res.status(500).json({ message: error.message }); // 500: internal server error
    }
}

export async function authorHasCard(req, res, next) {
    try {
    } catch (error) {
        // if function fails
        return res.status(500).json({ message: error.message }); // 500: internal server error
    }
}
