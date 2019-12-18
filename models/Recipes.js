//  ________________  \\
// |                | \\
// | Recipes schema | \\
// |________________| \\


// Packages
const mongoose = require("mongoose")
var uniqueValidator = require("mongoose-unique-validator")



    //////////////
   //          //
  //   CODE   //
 //          //
//////////////

const Schema = mongoose.Schema

// Enums
const possible_levels = [ "Easy Peasy", "Amateur Chef", "UltraPro Chef" ]  // Possible levels for level field.
const possible_dishTypes = [ "Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other" ] // Possible types for dishType field.


const recipesSchema = new Schema( {  

    title: {
        type: String,
        required: [true, "'title' is required."],
        unique: true
    },
    level: { 
        type: String,
        enum: {
            values: possible_levels,
            message: "{VALUE} is not valid in {PATH}."
        }       
    },
    ingredients: {
        type: Array      
    },
    cuisine: { 
        type: String,
        required: [true,"'cuisine' is required."]
    },
    dishType: { 
        type: String,
        enum: { 
            values: possible_dishTypes,
            message: "{VALUE} is not valid in {PATH}."
        }
    },
    image: {
        type: String,
        default: "https://images.media-allrecipes.com/images/75131.jpg"
    },
    duration: { 
        type: Number,
        validate: { 
            validator: function(duration) { return duration > 0 },
                message: "{VALUE} is not a valid duration. It must be greater than '0'."
            }
    },
    creator: { 
        type: String
     },
    created: { 
        type: Date,
        default: Date.now
     },
    state: { 
        type: Boolean,
        default: true
    }
} )

recipesSchema.plugin(uniqueValidator, { message: "{PATH} must be unique." });

module.exports = mongoose.model("Recipes", recipesSchema);
