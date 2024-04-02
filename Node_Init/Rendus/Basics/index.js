const express = require("express");
const app = express();
const port = 3000;

let data = {
    id: 1,
    first: "William",
    last: "Afton",
};

// INDEX: read all users
app.get("/", (req, res) => {
    res.send(data); // send values inside data variable
});

// CRUD method: a JS standard

// CREATE: create new user
app.post("/users/:id", (req, res) => {
  res.send(data); // send values inside data variable
});

// READ: read specific user
app.get("/users/:id", (req, res) => {
  res.send(data); // send values inside data variable
});

// UPDATE: update specific user data
app.put("/users/:id", (req, res) => {
  res.send(data); // send values inside data variable
});

// DELETE: delete specific user
app.delete("/users/:id", (req, res) => {
  res.send(data); // send values inside data variable
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
