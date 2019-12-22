const express = require("express");
const bp = require("body-parser");

require("dotenv").config();

const PORT = process.env.SERVER_PORT;

const app = express();

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

app.use("/recipes", require("./routes/recipes"));

app.use((req, res) => {
    res.status(404).json({ message: "page not found" });
});

app.listen(PORT, () => console.log(`NodeJS listen to port ${PORT}`));
