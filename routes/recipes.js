//  ___________________  \\
// |                   | \\
// | Recipes endpoints | \\
// |___________________| \\


// Packages
const Express = require("express");
const router = Express.Router();
const Recipe = require("../models/Recipes")
const mongoose = require("mongoose")
const fs = require("fs")




    //////////////
   //          //
  //   CODE   //
 //          //
//////////////


// Import many entries to database
router.post( "/insertmany", async ( req, res ) => { 
    const { JSONpath } = req.body
    console.log(JSONpath)
    let recipes = []

    if ( JSONpath ){
        try{
            const recipesBuffer = fs.readFileSync( JSONpath )
            const recipes = JSON.parse( recipesBuffer )
            const recipesDB = Recipe.insertMany( recipes )
            res.status(200).json( { message: "Multiple recipes succesfully loaded." } )
            console.log( recipes )

        } catch ( error ){
            res.status(400).json( error )
            console.log( error )

        }
    } else {
        res.status( 400 ).json( { message: "Any path has been found." } )
    }
 } )

 // ------------------------------------------------------------------------------ //



 // Get recipes database
 router.get( "/get/:elements", async ( req, res ) => {  
    const { elements } =  req.params

    try {
        const recipesDB = await Recipe.find( { state: true } ).limit( parseInt(elements, 0) )
        res.status(200).json( recipesDB )
    } catch ( error ) {
        console.log( error )
        res.status(400).json( error )
    }

 } )

// ------------------------------------------------------------------------------ //



 // Create a new recipe
 router.post( "/add", async ( req, res ) => {
    const recipe = req.body

    if ( recipe ){
        try{
            const new_recipe = new Recipe( recipe )
            const recipesDB = await new_recipe.save()

            res.status( 200 ).json( { recipesDB } )

        } catch( error ){
            console.log( error )
            res.status(400).json( { error } )
        }
        

    } else{
        res.status( 400 ).json( { message: "Recipe parameteres are empty." } )
    }

 } )

 // ------------------------------------------------------------------------------ //



 // Update recipe
 router.post( "/update/:keysearch", async ( req, res ) => {

    const { keysearch } = req.params
    const recipe = req.body
    const isID = mongoose.Types.ObjectId.isValid( keysearch )
 
    try {
        // Validation: able
        const options = { 
            new: true,
            runValidators: true
        }

        // Search by ID
        if ( isID ) {
            const recipesDB = await Recipe.findByIdAndUpdate( keysearch, recipe, options )
            res.status( 200 ).json( recipesDB )
            
        // Search by title
        } else {
            const recipesDB = await Recipe.findOneAndUpdate( keysearch, recipe, options )
            res.status( 200 ).json( recipesDB )
        }

    } catch ( error ) {
        res.status( 400 ).json( error )
    }
 } )

 // ------------------------------------------------------------------------------ //



 // Remove recipe
 router.delete( "/delete/:keysearch", async ( req, res ) => { 
    
    const { keysearch } = req.params
    const isID = mongoose.Types.ObjectId.isValid( keysearch )

    try {
        // Search by ID
        if ( isID ) {
            const deletedRecipe = await Recipe.findByIdAndUpdate( keysearch, { state: false } )
            res.status( 200 ).json( deletedRecipe )
            
        // Search by title
        } else {
            const deletedRecipe = await Recipe.findOneAndUpdate( keysearch, { state: false } )
            res.status( 200 ).json( deletedRecipe )
        }

    } catch ( error ) {
        res.status( 400 ).json( error )
    }
  } )



 module.exports = router