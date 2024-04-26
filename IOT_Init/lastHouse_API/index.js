// API SETUP

// import packages
import express from "express";
import cors from "cors";
import ip from "ip";

import routes from "./routes/start.js"; // import API routes

const app = express(); // create app
const ipAddress = ip.address(); // save current app IP address
const port = 3000; // set app port

app.use(cors()); // allow interactions with other servers (like LiveServer for the frontend)

app.use(express.json());

// app routes
app.use("/", routes);

// launch app
app.listen(port, () => {
    console.log(`Testing API is running on ${ipAddress}:${port}`);
});
