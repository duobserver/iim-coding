// Hogwarts Club API Initialization

// import modules
import express from "express";
import cors from "cors";
import ip from "ip";

import routes from "./routes/start.js"; // import app routes

const app = express(); // create new express app
const ipAddress = ip.address(); // save current app IP address
const port = 3000; // set custom app port

app.use(cors()); // allow interactions with other servers

app.use(express.json()); // use express built in json tool

app.use("/", routes); // use imported app routes for "/" path

// launch app
app.listen(port, () => {
    console.log(`Hogwarts Club API is running on ${ipAddress}:${port}`);
});
