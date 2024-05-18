// TOKEN AUTHENTICATION MIDDLEWARE

// visit https://jwt.io to understand the token structure

import prisma from "../config/prisma.js"; // connect to database through prisma
import jwt from "jsonwebtoken"; // import token tool

function authenticateToken(req, res, next) {
    // verify if client token is valid

    const authHeader = req.headers["authorization"]; // get token variable from header ("Bearer <token>" format)

    const token = authHeader && authHeader.split(" ")[1]; // extract token from bearer

    // if token is not found
    // 401: unauthorized
    if (token == null) return res.status(403).json({ message: "Token not found. Please login to access the previous page" });

    // if token is found
    // check if token has been generated by server
    jwt.verify(token, process.env.TOKEN, async (err, payload) => {
        // token data is received in payload

        // if token is not valid
        // 401: unauthorized
        if (err) return res.status(401).json({ message: "Invalid token. Please login to access the previous page" });

        // if token is valid
        // save email and look for user in database
        const email = payload.data;

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        // if user does not exist
        if (!user) {
            console.log("404");
            return res.status(404).json({ message: "User not found" });
        }

        // if user exists
        req.user = user; // save user informations

        next(); // go to next middleware
    });
}

export default authenticateToken;