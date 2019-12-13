const mongoose = require("mongoose");
const Schema = mongoose.Schema //Para aplicar la clase squema
var uniqueValidator = require('mongoose-unique-validator');


const recipeSchema = new Schema({
    title: {
        type: String,
        required: [true, "title es obligatorio"], //Pasamos un booleano si es requerido y el mensaje que le pasamos al user si no lo metemos
        unique: true //Para uqe solo haya uno
    },
    level:{
        type: String,
        // required: [true, "Level es obligatorio"],
        enum: {
            values: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
            message: "{VALUE} no es el correcto en {PATH}"
        }
    },
    ingredients:{
        type: Array
    },
    cuisine:{
        type: String,
        required: [true, "Cuisine es obligatorio"],     
    },
    dishType:{
        type: String,
        enum: { 
            values:  [ "Breakfast", "Dish","Snack","Drink","Dessert","Other"],
            message: "{VALUE} no es el correcto en {PATH}",
            default: "other"
        }
    },
    image:{
        type: String,
        default: "https://images.media-allrecipes.com/images/75131.jpg"
    },
    duration: {
        type: Number,
        min: [0, "Tiene que ser mayor de 0"]
    },
    creator:{
        type: String
    },
    created: {
        type: Date,
        deault: Date.now()
    },
    state:{
        type: Boolean,
        default: true
    }


})


recipeSchema.plugin(uniqueValidator, {message: "{PATH} debe ser único"})
module.exports = mongoose.model("Recipe", recipeSchema)  //Este nombre nos relaciona con otros modelos, el segundo parámetro