// Hogwarts Club public routes

import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

router.get("/collection", (req, res) => {
    res.render("collection", { title: "Collection" });
});

export default router;
