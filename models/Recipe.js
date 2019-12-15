const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title es obligatorio"],
    unique: true
  },
  level: {
    type: String,
    enum: {
      values: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
      message: "{VALUE} no es un valor valido en {PATH}"
    }
  },
  ingredientes: Array,
  cuisine: {
    type: String,
    required: [true, "cuisine es obligatorio"]
  },
  dishType: {
    type: String,
    enum: {
      values: ["Breakfast", "Dish", "Snack ", "Drink", "Dessert", "Other"],
      message: "{VALUE} no es un valor valido en {PATH}"
    }
  },
  imgage: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg."
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: String,
  created: {
    type: Date,
    default: Date.now
  },
  state: {
    type: Boolean,
    default: true
  }
});
recipeSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único " });

module.exports = mongoose.model("Recipe", recipeSchema);
