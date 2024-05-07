// User authentication module

import prisma from "../config/prisma.js"; // connect to database through prisma

import generateAccessToken from "../tools/jwt.js"; // import token generator

import bCrypt from "../tools/bcrypt.js"; // import encryption tool
const bcrypt = new bCrypt(); // create bCrypt class

class AuthController {
    async login(req, res) {
        // log into user account
        try {
            const body = req.body; // get user credentials from body

            // check if user exists
            const user = await prisma.user.findUnique({
                where: {
                    email: body.email,
                },
            });

            // if user does not exist
            if (!user) return res.status(404).json({ message: "User not found" });

            // if user does exist

            // check if received password is same as user password
            const isSamePassword = await bcrypt.comparePassword(body.password, user.password);

            // if password is not valid
            if (!isSamePassword) return res.status(401).json({ message: "Invalid password" });

            // if password is valid
            const token = generateAccessToken(body.email); // generate new token
            
            return res.status(200).json({ token }); // send new token to user
        } catch (e) {
            // if function fails
            return res.status(500).json({ message: e.message }); // send internal server error message
        }
    }

    async myProfile(req, res) {
        try {
            // if the user is authenticated
            // 200: authenticated successfully
            return res.status(200).json(req.user);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }
}

// use NEW to export a whole class with its functions
// module.exports = new AuthController();

export default AuthController;
