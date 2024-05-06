// Authentication tool

// based on https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs

import jwt from "jsonwebtoken"; // import token tool

function generateAccessToken(email) {
    // generate token with given email address
    // token expires in 1 hour
    return jwt.sign({ data: email }, process.env.TOKEN, { expiresIn: "3600s" });
}

export default generateAccessToken;
