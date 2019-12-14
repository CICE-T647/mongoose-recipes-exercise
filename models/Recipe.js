const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

//Objeto para crear una nueva colección
const Schema = mongoose.Schema;

const recipesSchema = new Schema({
    title: { type : String,
            required : [true,"Title es obligatorio"],
            unique: true,
            default: "Recipe Title"
        },
    level: {
        type: String,
        enum:{
            values:["Easy Peasy","Amateur Chef","UltraPro Chef"],
            message: "{VALUE} no es un valor valido"
        }
    },
    ingredients: {
        type: Array
    },
    cuisine:{
        type: String,
        required : [true,"campo cuisine es obligatorio"],
    },
    dishType:{
        type: String,
        enum:{
            values:["Breakfast","Dish","Snack","Drink","Dessert","Other"],
            message: "{VALUE} no es un valor valido"
        }
    },
    image:{
        type: String,
        default: " https://images.media-allrecipes.com/images/75131.jpg"
    },
    duration:{
        type: Number,
        min: 0
    },
    creator:{
        type: String
    },
    created:{
        type:Date,
        default: Date.now()
    },
    state:{
        type:Boolean,
        default: true  
    }
});

//aplicamos plugin de validación 
recipesSchema.plugin(uniqueValidator, {message: `{PATH} debe ser unico`})
module.exports = mongoose.model("Recipe", recipesSchema);

