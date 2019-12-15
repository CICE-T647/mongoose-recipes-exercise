const express = require("express");
const router = express.Router();
const recipesModel = require("../models/Recipe");

router.post("/:id", async (req, res) => {
  const { id } = req.params;

  const { title, level, cuisine, dishType, duration, creator } = req.body;

  const recipeData = { title, level, cuisine, dishType, duration, creator };

  try {
    const options = {
      new: true,
      runValidators: true
    };

    const recipeDb = await recipesModel.findByIdAndUpdate(id, recipeData);

    res.status(200).json(recipeDb);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
});

module.exports = router;
