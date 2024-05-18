// Hogwarts Club API cards functions

import prisma from "../config/prisma.js"; // connect to database through prisma

export async function addCard(userId, cardId) {
    try {
        // const id = req.user.id;

        // const cardId = Number(req.params.cardId);

        // get for existing card in user collection
        let card = await prisma.user.findUnique({
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

        console.log(card);

        card = card.cards;

        console.log(card);

        // if user does not have this card, add a new record
        if (card.length == 0) {
            console.log("User does not have card");
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
            // if user already have this card, increase quantity
        } else {
            card = card[0];
            console.log("increasing quantity");
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

        return;
    } catch (e) {
        // if command fails
        // function error
        throw new Error(e);
    }
}

export async function collection(req, res) {
    // show the user cards collection
    try {
        const id = req.user.id;

        const user = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                cards: true,
            },
        });

        res.status(200).json(user.cards);
    } catch (e) {
        // if command fails
        // 500: internal server error
        return res.status(500).json({ message: e.message });
    }
}

export async function owned(req, res) {
    try {
        const id = req.user.id;
        const cardId = req.params.id;
    } catch (error) {
        // if command fails
        // 500: internal server error
        return res.status(500).json({ message: e.message });
    }
}

export async function grabBooster() {
    const user = await prisma.user.findUnique({ where: { id: Number(id) }, include: { booster: true } });

    if (user.booster.isAvailable == true) {
        const grabBooster = await prisma.user.update({
            where: {
                id: Number(id),
            },
        });
    }
}

export async function booster(req, res) {
    try {
        const id = Number(req.user.id);
        const booster = await prisma.user.findUnique({ where: { id: id }, select: { nextBooster: true } }); // get booster status

        // get next booster drop date (in milliseceonds)
        const nextBooster = Number(booster.nextBooster);
        console.log(nextBooster);

        // if user has waited enough time
        if (nextBooster <= Date.now()) {
            // select 5 random cards for booster pack
            let boosterCards = [];

            for (let i = 0; i < 5; i++) {
                const card = Math.floor(Math.random() * (Math.floor(30) - Math.ceil(1) + 1) + Math.ceil(1));
                boosterCards.push(card);
            }

            console.log(boosterCards);

            // ADDING CARDS
            for (const element of boosterCards) {
                await addCard(id, element);
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

            console.log(hour, min, seconds);
            return res.status(200).json({ hours: hour, minutes: min, seconds: seconds });
        }

        return res.status(200).json({ ...user.booster });
    } catch (e) {
        // if command fails
        // 500: internal server error
        return res.status(500).json({ message: e.message });
    }
}
