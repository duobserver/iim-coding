// Hogwarts Club API Initialization

// import modules
import express from "express";
import cors from "cors";
import ip from "ip";

// import API routes
import apiRoutes from "./routes/api.js";
import publicRoutes from "./routes/public.js";

const app = express(); // create new express app
const ipAddress = ip.address(); // save current app IP address
const port = 3000; // set custom app port

// allow interactions with other servers
app.use(cors());

// set view/templating engine
app.set("view engine", "ejs");

app.use(express.json()); // use express.json to process json objects
app.use(express.static("./public")); // use express.static to serve static files for frontend

// set routes for frontend and backend
app.use("/", publicRoutes);
app.use("/api", apiRoutes); // use imported app api routes for "/api" path

// launch app
app.listen(port, () => {
    console.log(`Hogwarts Club API is running on ${ipAddress}:${port}`);
});
