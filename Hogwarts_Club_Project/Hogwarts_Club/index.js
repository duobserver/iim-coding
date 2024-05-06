// Hogwarts Club API Initialization

// import modules
import express from "express";
import cors from "cors";
import ip from "ip";

import apiRoutes from "./routes/api.js"; // import API routes
import publicRoutes from "./routes/public.js"; // import public routes

const app = express(); // create new express app
const ipAddress = ip.address(); // save current app IP address
const port = 3000; // set custom app port

app.use(cors()); // allow interactions with other servers

app.use(express.json()); // use express built in json tool

app.use("/", publicRoutes); // use imported app public routes for "/" path
app.use("/api/", apiRoutes); // use imported app api routes for "/api/" path

// launch app
app.listen(port, () => {
    console.log(`Hogwarts Club API is running on ${ipAddress}:${port}`);
});
