// Hogwarts Club API Initialization

// import modules
import express from "express";
import cors from "cors";
import ip from "ip";

import routes from "./start.js"; // import API routes

const app = express(); // create new express app
const ipAddress = ip.address(); // save current app IP address
const port = 3000; // set custom app port

app.use(cors()); // allow interactions with other servers

app.use(express.json()); // use express.json to process json objects
app.use(express.static('./public')) // use express.static to serve static files for frontend

app.use("/api", routes); // use imported app api routes for "/api/" path

// launch app
app.listen(port, () => {
    console.log(`Hogwarts Club API is running on ${ipAddress}:${port}`);
});
