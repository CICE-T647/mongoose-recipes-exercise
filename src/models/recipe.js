const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const current_date = new Date();

const recipeSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        index: {
            unique: true,
            sparse: true
        }
    },
    level: {
        type: String,
        required: [true, "Level is required"],
        enum: {
            values: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
            message:
                "{VALUE} is not valid in {PATH} (Allowed: Easy Peasy, Amateur Chef or UltraPro Chef)"
        }
    },
    ingredients: {
        type: Array
    },
    cuisine: {
        type: String,
        required: [true, "Cuisine is required"]
    },
    dishType: {
        type: String,
        required: [true, "DishType is required"],
        enum: {
            values: ["Breakfast", "Dish", "Snack", "Dessert", "Other"],
            message:
                "{VALUE} is not valid in {PATH} (Allowed: Breakfast, Dish, Snack, Dessert or Other)"
        }
    },
    image: {
        type: String,
        default: "https://images.media-allrecipes.com/images/75131.jpg"
    },
    duration: {
        type: Number,
        min: 0
    },
    creator: {
        type: String
    },
    created: {
        type: Date,
        default: `${current_date}`
    },
    state: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("Recipe", recipeSchema);
