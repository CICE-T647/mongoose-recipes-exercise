require("dotenv").config();
const express = require("express");
const bp = require("body-parser");
const fs = require("fs");
const recipes = require("./controllers/recipesMongoDB");

const loadRecipes = async () => {
    const rawdata = fs.readFileSync("../recipes.json");
    const student = JSON.parse(rawdata);
    await recipes.mongodbLoadRecipes(student);
};

// This loadRecipes will not be a stopper to start Express Server
loadRecipes();

const PORT = process.env.SERVER_PORT;
const app = express();

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

app.use("/recipes", require("./routes/recipes"));

app.use((req, res) => {
    res.status(404).json({ message: "page not found" });
});

app.listen(PORT, () => console.log(`NodeJS listen to port ${PORT}`));
