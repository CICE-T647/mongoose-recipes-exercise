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
    }
    catch(error){
        console.log(error);
    }
    

    return recipesData;
}

//importar todas las recetas
router.put("/import", async (request,response) =>{   

    const recipesData = loadData();

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

module.exports = router;