const mongodbManage = require("../controllers/recipesMongoDB");

const express = require("express");
const router = express.Router();

const recipeItems = [
    "ingredients",
    "image",
    "duration",
    "creator",
    "created",
    "state",
    "title",
    "level",
    "cuisine",
    "dishType"
];

router.post("/create", (req, res) => {
    const keys = Object.keys(req.body);
    const itemsExcluded = [];

    keys.map(item => {
        if (!recipeItems.includes(item)) itemsExcluded.push(item);
    });

    if (itemsExcluded.length > 0)
        res.status(422).json({
            message: `Parameters not supported: ${itemsExcluded}`
        });

    mongodbManage
        .mongodbNewRecipe(req.body)
        .then(() => res.status(200).json({ message: "Recipe created" }))
        .catch(err => {
            if (err.name === "ValidationError") {
                res.status(422).json({ message: err.message });
            } else {
                res.status(500).json({ message: err.message });
            }
        });
});

router.post("/update", (req, res) => {
    const { title } = req.body;
    const keys = Object.keys(req.body);
    const itemsExcluded = [];

    keys.map(item => {
        if (!recipeItems.includes(item)) itemsExcluded.push(item);
    });

    if (itemsExcluded.length > 0)
        res.status(422).json({
            message: `Parameters not supported: ${itemsExcluded}`
        });

    if (!keys.includes("title"))
        res.status(422).json({ message: `Bad Parameters: title is required` });

    const search = {
        title: title
    };

    mongodbManage
        .mongodbUpdateRecipe(search, req.body)
        .then(() => res.status(200).json({ message: "Recipe updated" }))
        .catch(err => {
            if (err.name === "ValidationError") {
                res.status(422).json({ message: err.message });
            } else {
                res.status(500).json({ message: err.message });
            }
        });
});

router.get("/search", (req, res) => {
    const { title } = req.query;
    const keys = Object.keys(req.query);

    if (!keys.includes("title") && keys.length > 1)
        res.status(422).json({
            message: `Bad Parameters: title is only one required`
        });

    const search = {
        title: title
    };

    mongodbManage
        .mongodbSearchRecipe(search)
        .then(search =>
            res.status(200).json({ message: "Recipe Founded", content: search })
        )
        .catch(err => {
            if (err.name === "ValidationError") {
                res.status(422).json({ message: err.message });
            } else {
                res.status(500).json({ message: err.message });
            }
        });
});

router.delete("/delete", (req, res) => {
    const { title } = req.query;
    const keys = Object.keys(req.query);

    if (!keys.includes("title") && keys.length > 1)
        res.status(422).json({
            message: `Bad Parameters: title is only one required`
        });

    const search = {
        title: title
    };

    mongodbManage
        .mongodbDeleteRecipe(search)
        .then(() => res.status(200).json({ message: "Recipe Deleted" }))
        .catch(err => {
            if (err.name === "ValidationError") {
                res.status(422).json({ message: err.message });
            } else {
                res.status(500).json({ message: err.message });
            }
        });
});

module.exports = router;
