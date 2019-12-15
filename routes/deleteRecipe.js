const express = require("express");
const router = express.Router();
const recipesModel = require("../models/Recipe");

router.post("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const recipeDeleted = await recipesModel.findByIdAndUpdate(id, {
      state: false
    });

    res.status(200).json(recipeDeleted);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
});

module.exports = router;
