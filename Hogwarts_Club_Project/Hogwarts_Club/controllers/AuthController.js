import prisma from "../config/prisma.js"; // import prisma functions

import { generateAccessToken } from "../tools/jwt.js"; // import token generator

import bCrypt from "../tools/bcrypt.js"; // import encryption tool

class AuthController {
    async login(req, res) {
        // log into user account
        try {
            // get user credentials from body
            const body = req.body;

            // check if user exists
            const user = await prisma.user.findUnique({
                where: {
                    email: body.email,
                },
            });

            // if user does not exist
            if (!user) return res.status(404).json({ message: "User not found" });

            // if user does exist

            // check if inserted password is same as user password
            const isSamePassword = await bCrypt.comparePassword(body.password, user.password);

            // if password is not valid
            if (!isSamePassword) return res.status(401).json({ message: "Invalid password" });

            // if password is valid
            // grant access to account
            const token = generateAccessToken(body.email);

            // 200: ok/successful login
            return res.status(200).json({ token });
        } catch (e) {
            // if command fails
            // 500: internal server error
            return res.status(500).json({ message: e.message });
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
