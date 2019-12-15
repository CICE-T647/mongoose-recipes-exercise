require("dotenv").config();
const mongoose = require("mongoose");
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const DB_PORT = process.env.DB_PORT || 27017;
const recipesData = require("./recipes.json");
const recipesModel = require("./models/Recipe");

mongoose
  .connect(`mongodb://localhost:${DB_PORT}/recipes`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() =>
    recipesModel.insertMany(recipesData, (err, data) => {
      if (err) {
        return console.log(err);
      } else {
        return console.log("Recipes inserted to Colection, data-> ", data);
      }
    })
  )
  .catch(err => {
    throw err;
  });
