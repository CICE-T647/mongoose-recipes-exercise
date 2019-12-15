const express = require("express");
const router = express.Router();
const recipesModel = require("../models/Recipe");

router.post("/", async (req, res) => {
  const { title, level, cuisine, dishType, duration, creator } = req.body;
  try {
    const recipe = new recipesModel({
      title,
      level,
      cuisine,
      dishType,
      duration,
      creator
    });
    const recipeDb = await recipe.save();
    res.status(200).json(recipeDb);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
});

module.exports = router;
