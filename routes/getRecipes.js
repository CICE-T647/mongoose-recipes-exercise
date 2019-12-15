const express = require("express");
const router = express.Router();
const recipesModel = require("../models/Recipe");

router.get("/", async (req, res) => {
  try {
    const recipeResult = await recipesModel.find().limit(5);
    res.status(200).json({ recipeResult });
  } catch (err) {
    console.log(error);
    res.status(400).json({ error });
  }
});

module.exports = router;
