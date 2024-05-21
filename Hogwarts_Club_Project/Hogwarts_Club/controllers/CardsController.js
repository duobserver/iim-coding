// Hogwarts Club API cards functions

// REMEMBER the functions in this file should only execute the final action

import prisma from "../config/prisma.js"; // connect to database through prisma

export async function check(req, res) {
    // check if user has card
    try {
        const userId = Number(req.user.id);
        const cardId = Number(req.params.id);

        const data = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                cards: {
                    where: {
                        id: cardId,
                    },
                },
            },
        });

        // console.log(data);

        if (data.cards.length == 0) {
            // if user does not have card in collection
            // 404: not found
            return res.status(404).json({ message: "You do not have this card in your collection" });
        } else {
            // if user does have card in collection
            // 302: found
            return res.status(302).json(data.cards[0]);
            return data.cards[0];
        }
    } catch (error) {
        // if command fails
        // 500: internal server error
        return res.status(500).json({ message: error.message });
    }
}

export async function checkInternal(userId, cardId) {
    // check if user has card
    // this function is intended for internal use only
    // no server response
    // console.log(userId, cardId);
    try {
        const data = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                cards: {
                    where: {
                        id: cardId,
                    },
                },
            },
        });

        // console.log(data);

        if (data.cards.length == 0) {
            return false;
        } else {
            return data.cards[0];
        }
    } catch (error) {
        // if function fails
        throw new Error(error);
    }
}

async function add(userId, cardId) {
    // add card to user collection
    // this function is intended for internal use only
    try {
        // look for existing card in user collection
        const card = await checkInternal(userId, cardId);

        // process data
        if (card == false) {
            // if user does not have this card
            // add card to user collection
            const updateCard = await prisma.user.update({
                where: { id: userId },
                data: {
                    cards: {
                        create: { id: cardId },
                    },
                },
                include: {
                    cards: true,
                },
            });
        } else {
            // if user already has this card
            // card = data.cards[0]; // save card stats
            // increase card copies quantity in user collection
            const updatedCard = await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    cards: {
                        update: {
                            where: {
                                id_ownerId: {
                                    id: cardId,
                                    ownerId: userId,
                                },
                            },
                            data: {
                                quantity: card.quantity + 1,
                            },
                        },
                    },
                },
                include: {
                    cards: true,
                },
            });
        }

        return true;
    } catch (error) {
        // if function fails
        throw new Error(error);
    }
}

async function remove(userId, cardId) {
    // const userId = Number(req.user.id);
    // const cardId = Number(req.params.id);
    // remove card from user collection
    // this function is intended for internal use only
    try {
        // look for existing card in user collection
        const card = await checkInternal(userId, cardId);

        // process data
        if (card == false) {
            // if user does not have this card
            console.log("no card");
            return false;
            throw new Error("User does not have this card");
        } else {
            // if user already has one or more copies of card
            if (card.quantity == 1) {
                // if user only has one copy of card
                // delete card from user collection
                const updateCard = await prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        cards: {
                            deleteMany: {
                                id: cardId,
                            },
                        },
                    },
                    include: {
                        cards: true,
                    },
                });
            } else {
                // if user has more than one copy of card
                // decrease card copies quantity in user collection
                const updateCard = await prisma.user.update({
                    where: { id: userId },
                    data: {
                        cards: {
                            update: {
                                where: {
                                    id_ownerId: {
                                        id: cardId,
                                        ownerId: userId,
                                    },
                                },
                                data: {
                                    quantity: card.quantity - 1,
                                },
                            },
                        },
                    },
                    include: { cards: true },
                });
            }
        }

        return true;
    } catch (error) {
        // if function fails
        throw new Error(error);
    }
}

export async function favorite(req, res) {
    // set card as favorite in user collection
    try {
        const userId = Number(req.user.id);
        const cardId = Number(req.params.id);

        // look for existing card in user collection
        const card = await checkInternal(userId, cardId);

        if (card == false) {
            // if user does not have card in collection
            return res.status(403).json({ message: "You do not have this card in your collection." });
        } else {
            // if user does have card in collection
            if (card.isFavorite == false) {
                // if card is not set as favorite

                // REMEMBER you can always access cards or other models directly with prisma.card, going through user ensures data consistency but is more complex

                const updateCard = await prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        cards: {
                            update: {
                                where: {
                                    id_ownerId: {
                                        id: cardId,
                                        ownerId: userId,
                                    },
                                },
                                data: {
                                    isFavorite: true,
                                },
                            },
                        },
                    },
                    include: {
                        cards: true,
                    },
                });
                return res.status(200).json({ message: "Successfully added to favorites" });
            } else {
                // if card is set as favorite
                const updateCard = await prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        cards: {
                            update: {
                                where: {
                                    id_ownerId: {
                                        id: cardId,
                                        ownerId: userId,
                                    },
                                },
                                data: {
                                    isFavorite: false,
                                },
                            },
                        },
                    },
                    include: {
                        cards: true,
                    },
                });
                return res.status(200).json({ message: "Successfully removed from favorites" });
            }
        }
    } catch (error) {
        // if function fails
        // 500: internal server error
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export async function collection(req, res) {
    // show user card collection
    try {
        const userId = Number(req.user.id);

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                cards: true,
            },
        });

        res.status(200).json(user.cards);
    } catch (error) {
        // if command fails
        // 500: internal server error
        return res.status(500).json({ message: error.message });
    }
}

export async function foreignCollection(req, res) {
    try {
        const userId = Number(req.params.id);

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                cards: true,
            },
        });

        res.status(302).json(user.cards);

    } catch (error) {
        // if function fails
        return res.status(500).json({ message: error.message }); // 500: internal server error
    }
}

export async function booster(req, res) {
    try {
        const id = Number(req.user.id);
        const booster = await prisma.user.findUnique({ where: { id: id }, select: { nextBooster: true } }); // get booster status

        // get next booster drop date (in milliseceonds)
        const nextBooster = Number(booster.nextBooster);

        // if user has waited enough time
        if (nextBooster <= Date.now()) {
            // select 5 random cards for booster pack
            let boosterCards = [];

            for (let i = 0; i < 5; i++) {
                const card = Math.floor(Math.random() * (Math.floor(30) - Math.ceil(1) + 1) + Math.ceil(1));
                boosterCards.push(card);
            }

            // ADDING CARDS
            for (const element of boosterCards) {
                await add(id, element);
            }

            const updateBooster = await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    nextBooster: String(new Date().getTime() + 86400000),
                },
            });

            return res.status(200).json({ boosterPack: boosterCards });
        } else {
            // calculate time left before next booster
            const timeLeft = new Date(nextBooster - Date.now());
            const hour = timeLeft.getUTCHours();
            const min = timeLeft.getUTCMinutes();
            const seconds = timeLeft.getUTCSeconds();

            return res.status(200).json({ hours: hour, minutes: min, seconds: seconds });
        }
    } catch (error) {
        // if command fails
        return res.status(500).json({ message: error.message }); // 500: internal server error
    }
}

////////////////////////////////////////////////////////////////
// trading system

// view user trade offers
export async function viewTrades(req, res) {
    try {
        const userId = Number(req.user.id);

        const pendingTradeOffers = await prisma.trade.findMany({
            where: {
                authorId: userId,
            },
        });

        const receivedTradeOffers = await prisma.trade.findMany({
            where: {
                targetId: userId,
            },
        });

        return res.status(200).json({ pendingTradeOffers, receivedTradeOffers });
    } catch (error) {
        // if function fails
        return res.status(500).json({ message: error.message }); // 500: internal server error
    }
}

// make new trade offer between users
export async function makeTrade(req, res) {
    try {
        const userId = Number(req.user.id);
        const trade = req.trade;

        const newTrade = await prisma.trade.create({
            data: {
                authorId: userId,
                ...req.trade,
            },
        });

        return res.status(200).json({ message: "Trade offer successfully created" });
    } catch (error) {
        // if function fails
        return res.status(500).json({ message: error.message }); // 500: internal server error
    }
}

// accept trade offer
export async function acceptTrade(req, res) {
    try {
        const trade = req.trade; // get trade offer data from middleware output

        await add(Number(trade.receiverId), Number(trade.cardOutId));
        await remove(Number(trade.receiverId), Number(trade.cardInId));

        await add(Number(trade.senderId), Number(trade.cardInId));
        await remove(Number(trade.senderId), Number(trade.cardOutId));

        return res.status(200).json({ message: "Trade executed successfully." });
    } catch (error) {
        // if function fails
        return res.status(500).json({ message: error.message }); // 500: internal server error
    }
}

// delete/reject trade offer
export async function deleteTrade(req, res) {
    try {
        const tradeId = req.params.id;
        const userId = req.user.id;

        const deletedTrade = await prisma.trade.delete({ where: { id: tradeId } });

        if (deletedTrade.authorId == userId) {
            // if user was author of trade offer
            // trade offer has been aborted
            return res.status(200).json({ message: "You successfully delete one of your trade offers." });
        } else {
            // if user was target of trade offer
            // trade offer has been rejected
            return res.status(200).json({ message: "You successfully rejected someone's trade offer." });
        }
    } catch (error) {
        // if function fails
        return res.status(500).json({ message: error.message }); // 500: internal server error
    }
}
