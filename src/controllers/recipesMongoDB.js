const mongoose = require("mongoose");
const recipeModel = require("../models/recipe");

require("dotenv").config();

const DB_PORT = process.env.MONGO_PORT;
const DB_HOST = process.env.MONGO_HOST;
const DB_NAME = process.env.MONGO_DB;

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

const mongodbLoadRecipes = async recipes => {
    try {
        await mongodbConnection();
        await recipeModel.insertMany(recipes);
    } catch (error) {
        throw error;
    }
};

const mongodbNewRecipe = async newRecipe => {
    try {
        await mongodbConnection();
        const recipe = new recipeModel(newRecipe, { autoIndex: false });
        await recipe.save();
    } catch (error) {
        throw error;
    }
};

const mongodbUpdateRecipe = async (searchByTitle, recipe) => {
    try {
        await mongodbConnection();
        await recipeModel.replaceOne(searchByTitle, recipe);
    } catch (error) {
        throw error;
    }
};

const mongodbSearchRecipe = async searchByTitle => {
    try {
        await mongodbConnection();
        const recipeSearched = recipeModel.find(searchByTitle);
        const findAction = await recipeSearched.exec();
        if (findAction.length === 0) throw { message: "Recipe not found" };
        return findAction;
    } catch (error) {
        throw error;
    }
};

const mongodbDeleteRecipe = async deleteByTitle => {
    try {
        await mongodbSearchRecipe(deleteByTitle);
        await recipeModel.deleteOne(deleteByTitle);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    mongodbLoadRecipes,
    mongodbNewRecipe,
    mongodbUpdateRecipe,
    mongodbSearchRecipe,
    mongodbDeleteRecipe
};
