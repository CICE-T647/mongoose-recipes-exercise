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
        type: Array,
        validate:{
            validator: function(array){
                return array.length > 1;
            },
           message: array => `Una receta deberia contener al menos 2 ingredientes`
        } 
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
        min: [1,"La receta deberia tener una mayor duración!"],
        validate: {
                validator: function(v) {
                return /^[+-]?\d+(\.\d+)?$/.test(v);
            },
            message: time => `${time.value} no es n numero valido!`
        }
    },
    creator:{
        type: String,
        default: "Anonimo"
    },
    created:{
        type:Date,
        default: Date.now()
    },
    state:{
        type:Boolean,
        enum:{
            values:[true,false],
            message: "{VALUE} no es un estado valido"
        },
        default: true  
    }
});

//aplicamos plugin de validación 
recipesSchema.plugin(uniqueValidator, {message: `{PATH} debe ser unico`})
module.exports = mongoose.model("Recipe", recipesSchema);

