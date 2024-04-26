// API ROUTING

import express from "express"; // import express
import { write, read } from "../controllers/houseController.js"; // import variable controller

const router = express.Router();

// POST: change lastHouse value
router.post("/", (req, res) => {
    write(req, res);
});

// GET: show lastHouse value
router.get("/", (req, res) => {
    read(req, res);
});

export default router;
