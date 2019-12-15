//importamos las libreria express
const Express = require("express");
const router = Express.Router();
const fs = require("fs");

//importamos el schema para controlar la colección por medio del modelo
const Recipe = require("../models/Recipe");

//cargar archivos de fichero
function loadData(){
    try{
        const rawData = fs.readFileSync("./data/recipes.json");
        const recipesData = JSON.parse(rawData);
        return recipesData;
      
    }
    catch(error){
        console.log(error);
        
    }
    
    
}

//importar todas las recetas
router.put("/import", async (request,response) =>{   

    const recipesData = loadData();

    if(recipesData){
        try{
            await Recipe.insertMany(recipesData, function(error) {
                if(error){
                    console.log(error);
                    response.status(400).json({message : error});
                }
                response.status(200).json({message : `Se han insertado ${recipesData.length} registros.`});
            });
            
        }
        catch(error){
            console.log(error);
            response.status(400).json({message : error});
        }
    }
    else
        response.status(400).json({message : "No se ha podido cargar el fichero."}); 

});

//obtener todas las recetas
router.get("/getrecipes", async (request,response) =>{

    try{
        //const recipeBD = await Recipe.find({_id : id});
        const recipesBD = await Recipe.find({},{_id : 0}).sort({ title:1}).limit(5);
        const recipesCount = await Recipe.count({});
        response.json({recipesBD,recipesCount});
    }
    catch(error){
        console.log(error);
        response.status(400).json({message:'ha ocurrido un error'});
    }
});

//crear una receta
router.put("/new", async (request,response) =>{
    //capturamos el body que viene desde la petición
    const recipeBody = 
    {title,
     level,
     ingredients,
     cuisine,
     dishType,
     image,
     duration,
     creator,
     created,
     state} = request.body;

    const recipe = new Recipe(recipeBody); 
    
    try{
        const recipeBD = await recipe.save();
        response.status(200).json({recipeBD});
    }
    catch(error){
        
        const objErrors = error.errors;
        const errorBD = errorCollector(objErrors);
        response.status(400).json({mensajes :errorBD});
    }

});

//actualizar una receta
router.post("/update/:id", async (request,response) =>{
    //capturamos el body que viene desde la petición
    const {id} = request.params;
    const recipeData = 
    {title,
     level,
     ingredients,
     cuisine,
     dishType,
     image,
     duration,
     creator,
     created,
     state} = request.body;

    try{
        const recipeBD = await Recipe.findByIdAndUpdate({_id:id},recipeData,{new:true});

        response.status(200).json({recipeBD});
    }
    catch(error){
 
        const objErrors = error.errors;
        
        const errorBD = errorCollector(objErrors);
        response.status(400).json({mensajes :errorBD});
    }

});

//Recolectamos los errores para cada campo
function errorCollector(errOBJ){

    let erroresArray = Array();

    if(errOBJ){
        
        if(errOBJ.title)
            erroresArray.push(errorRegister(errOBJ.title.message)); 

        if(errOBJ.level)
            erroresArray.push(errorRegister(errOBJ.level.message)); 

        if(errOBJ.ingredients)
            erroresArray.push(errorRegister(errOBJ.ingredients.message)); 

        if(errOBJ.dishType)
            erroresArray.push(errorRegister(errOBJ.dishType.message)); 
        
        if(errOBJ.image)
            erroresArray.push(errorRegister(errOBJ.image.message)); 
        
        if(errOBJ.image)
            erroresArray.push(errorRegister(errOBJ.image.message));
        
        if(errOBJ.duration)
            erroresArray.push(errorRegister(errOBJ.duration.message));
        
        if(errOBJ.creator)
            erroresArray.push(errorRegister(errOBJ.creator.message));

        if(errOBJ.created)
            erroresArray.push(errorRegister(errOBJ.created.message));

        if(errOBJ.state)
            erroresArray.push(errorRegister(errOBJ.state.message));
    }

    return erroresArray;
     
}
//Registramos el error
function errorRegister(msgError){
    const errorObj= new Object();
    errorObj.error = msgError;
    return errorObj.error;
}


//Borrar una receta por id
router.delete("/delete/:id", async (request,response) => {
        const {id} = request.params;
    
        try{
            const deleteRecipe = await Recipe.findOneAndDelete({_id:id});
            //me gusta mas la opción de desactivar pero la dejaremos comentada
            //const deleteRecipe = await User.findByIdAndUpdate(id, {state: false});
            response.json({deleteRecipe});
        }
        catch(error){
            console.log(error);
            response.status(400).json({error});
        }
        
    })

module.exports = router;