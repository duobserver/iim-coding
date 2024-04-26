// LASTHOUSE VARIABLE CONTROLS

import prisma from "../config/prisma.js"; // import prisma functions

let read = async (req, res) => {
    try {
        // if prisma is available
        const house = await prisma.last.findMany(); // read lasthouse value
        console.log("reading lastHouse");
        return res.status(200).json(house); // send json response with value / 200: OK
    } catch (error) {
        return res.status(500).json({ message: error.message }); // 500: internal error
    }
};

let write = async (req, res) => {
    try {
        // if prisma is available
        const body = req.body; // get new lasthouse value

        const newHouse = await prisma.last.updateMany({
            // where: {
            //     id: 1,
            // },
            data: {
                ...body,
            },
        }); // set new lasthouse value in database
        console.log("writing lastHouse !");

        return res.status(200).json({ message: "Done" }); // send json response with confirmation message / 200: OK
    } catch (error) {
        return res.status(500).json({ message: error.message }); // 500: internal error
    }
};

export { write, read }; // export all functions
