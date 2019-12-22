const mongoose = require("mongoose");
const recipeModel = require("../models/recipe");

require("dotenv").config();

const DB_PORT = process.env.MONGO_PORT;
const DB_HOST = process.env.MONGO_HOST;
const DB_NAME = process.env.MONGO_DB;
const DB_COLLECTION = process.env.MONGO_COLLECTION;

// const test = {
//     title: "asdasdsaddasd03",
//     level: "Easy Peasy",
//     cuisine: "meidte",
//     dishType: "Breakfast"
// };

const mongodbConnection = async () => {
    try {
        await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(
            `Connection to mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME} establized`
        );
    } catch (error) {
        throw error;
    }
};

const mongodbNewRecipe = async newRecipe => {
    try {
        await mongodbConnection();
        const recipe = new recipeModel(newRecipe, { autoIndex: false });
        const recipeDB = await recipe.save();
        console.log("Recipe created:", recipeDB);
    } catch (error) {
        throw error;
    }
};

const mongodbUpdateRecipe = async (searchByTitle, recipe) => {
    try {
        await mongodbConnection();
        const recipeUpdate = await recipeModel.replaceOne(
            searchByTitle,
            recipe
        );
        console.log(recipeUpdate);
    } catch (error) {
        throw error;
    }
};

const mongodbSearchRecipe = async searchByTitle => {
    try {
        await mongodbConnection();
        const recipeUpdate = recipeModel.find(searchByTitle);
        const findAction = await recipeUpdate.exec();
        return findAction;
    } catch (error) {
        throw error;
    }
};

const mongodbDeleteRecipe = async deleteByTitle => {
    try {
        await mongodbConnection();
        await recipeModel.deleteOne(deleteByTitle);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    mongodbNewRecipe,
    mongodbUpdateRecipe,
    mongodbSearchRecipe,
    mongodbDeleteRecipe
};
