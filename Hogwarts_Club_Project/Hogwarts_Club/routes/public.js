// Hogwarts Club public routes

import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

router.get("/booster", (req, res) => {
    res.render("booster", { title: "Booster" });
});

router.get("/collection", (req, res) => {
    res.render("collection", { title: "Collection" });
});

router.get("/catalogue", (req, res) => {
    res.render("catalogue", { title: "Catalogue" });
});

router.get("/login", (req, res) => {
    res.render("login", { title: "Login" });
});

router.get("/signup", (req, res) => {
    res.render("signup", { title: "Signup" });
});

router.get("/card", (req, res) => {
    res.render("card", { title: "Card" });
});

router.get("/members", (req, res) => {
    res.render("members", { title: "Members" });
});

router.get("/profile", (req, res) => {
    res.render("profile", { title: "Profile" });
});

export default router;
