const Express = require("express");
const router = Express.Router();
const Recipe = require("../models/Recipe")


// ### Iteración 3 - get recipes

router.get("/get", async (req, res)=>{
    console.log({Recipe}); 
    try{
        const recipeDB = await Recipe.find({}).limit(5); 
        res.json({recipeDB}); 
    }catch(error){
        console.log(error)
        res.status(404).json({message: error});
    }
})

// ### Iteración 4 - create recipe

router.post("/new", async(req, res)=>{
    const body = req.body; 
    const recipe = new Recipe(body);

    try{
       const recipeDB = await recipe.save() //comando de mongoose para guardar
        res.status(200).json({recipeDB})
    }
    catch(error){
        console.log(error)
        res.status(400).json({error})
    }
})

// ### Iteración 5 - update recipe
// Las recetas exigen una revisión de vez en cuando. Por ejemplo, en el caso de la receta de **Rigatoni alla Genovese**, la duración es excesiva. 
router.post("/update/:title", async(req, res)=>{
    const {title} = req.params; 
    const {level,ingredients,cuisine,dishType,image,duration,creator,created,state} = req.body
    const givenRecipe = {level,ingredients,cuisine,dishType,image,duration,creator,created,state}
    try{
        const recipeDB = await Recipe.findOneAndUpdate( { 'title' : { '$regex' : title, '$options' : 'i' }}, givenRecipe)
        res.status(200).json({recipeDB})
    }
    catch(error){
        console.log(error)
        res.status(400).json({error})
    }
})


// Crea un endpoint que permitir modificarlas. El endpoint deberá actualizarse y devolver el nuevo documento creado (no el viejo) 

// Deberá recoger la id por parámetros y el contenido de la actualización por el body

router.post("/updateid/:id", async(req, res)=>{
    const {id} = req.params; 
    const {title, level,ingredients,cuisine,dishType,image,duration,creator,created,state} = req.body
    const givenRecipe = {title, level,ingredients,cuisine,dishType,image,duration,creator,created,state}
    const options = {
        new: true,
        runValidators: true
    }
    try{
        const recipeDB = await Recipe.findByIdAndUpdate(id, givenRecipe, options)
        res.status(200).json({recipeDB})
    }
    catch(error){
        console.log(error)
        res.status(400).json({error})
    }
})

// __BONUS2__ Si has creado validaciones, habilita la opción para que las validaciones se apliquen en el update.

// ### Iteration 5 - Remove a recipe

// Crea un endpoint que permite eliminar las recetas por id. 

router.delete("/delete/:id", async (req,res)=>{ //Esto sería borrar
    const{id} = req.params;
    try{
        const deletedRecipe = await Recipe.findByIdAndDelete(id); //con esto lo borra entero
        res.json({deletedRecipe})
    }
    catch(error){
        console.log(error)
        res.status(404).json({error})    
    }
})

router.delete("/deleteFake/:id", async (req,res)=>{ //Lo que se hace hoy en dia no es borrar, es cambiar el estado y con ese estado no usarlo, para guardar los datos.
    const{id} = req.params;
    try{
        const deletedRecipe = await Recipe.findByIdAndUpdate(id, {state:false}); //con esto lo borra entero
        res.json({deletedRecipe})
    }
    catch(error){
        console.log(error)
        res.status(404).json({error})    
    }
})

module.exports = router