// server initialization
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// allow requests from other servers
app.use(cors());

// run app
app.use(express.json());

app.use("/", require("./routes/start"));

const initializeApp = () => {
  app.listen(port, () => {
    console.log(`Populus is running on port ${port}`);
  });
};

initializeApp();
