// Hogwarts Club API cards functions

import prisma from "../config/prisma.js"; // connect to database through prisma

class CardController {
    async collection(req, res) {
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
        } catch (error) {
            // if command fails
            // 500: internal server error
            return res.status(500).json({ message: e.message });
        }
    }

    async grabBooster() {
        const user = await prisma.user.findUnique({ where: { id: Number(id) }, include: { booster: true } });

        if (user.booster.isAvailable == true) {
            const grabBooster = await prisma.user.update({
                where: {
                    id: Number(id),
                },
            });
        }
    }

    async booster(req, res) {
        try {
            const id = req.user.id;
            let user = await prisma.user.findUnique({ where: { id: Number(id) }, include: { booster: true } }); // get booster status

            // if user cannot grab a booster
            if (user.booster.isAvailable == false) {
                // if user has waited more than 24 hours
                const nextBooster = Number(user.booster.nextBooster);
                if (nextBooster <= Date.now()) {
                    const newCardId = Math.floor(Math.random() * (Math.floor(30) - Math.ceil(1) + 1) + Math.ceil(1)); // choose random card as booster

                    const updateBooster = await prisma.user.update({
                        where: {
                            id: Number(id),
                        },
                        data: {
                            booster: {
                                update: {
                                    isAvailable: true,
                                    cardId: newCardId,
                                },
                            },
                        },
                    });
                } else {
                    // calculate time left before next booster
                    const timeLeft = new Date(nextBooster - Date.now());
                    const hour = timeLeft.getUTCHours();
                    const min = timeLeft.getUTCMinutes();
                    const seconds = timeLeft.getUTCSeconds();

                    console.log(hour, min, seconds);
                    return res.status(200).json({ timeLeft: `${hour}:${min}:${seconds}` });
                }
            }

            return res.status(200).json({ ...user.booster });
        } catch (e) {
            // if command fails
            // 500: internal server error
            return res.status(500).json({ message: e.message });
        }
    }
}

export default CardController;
