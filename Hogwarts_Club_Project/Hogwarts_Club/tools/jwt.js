// JAVASCRIPT WEB TOKEN (JWT) AUTHENTICATION
// REMEMBER to call the dedicated module

// based on https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs

import jwt from "jsonwebtoken";

function generateAccessToken(email) {
    return jwt.sign({ data: email }, process.env.TOKEN, { expiresIn: "3600s" });
}

// use {} to export a single function
export { generateAccessToken };
