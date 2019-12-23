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

const checkHttpParamsOnlyTitle = params => {
    const keys = Object.keys(params);

    // Check title
    if (keys.length !== 1 && !keys.includes("title"))
        throw "Bad Parameters: title is only one required";
};

const checkHttpParams = params => {
    const itemsExcluded = [];
    const keys = Object.keys(params);

    // Check title
    if (keys.length < 1 || !keys.includes("title"))
        throw "Bad Parameters: title is required";

    // Check valid params
    keys.map(item => {
        if (!recipeItems.includes(item)) itemsExcluded.push(item);
    });
    if (itemsExcluded.length > 0)
        throw `Parameters not supported: ${itemsExcluded}`;
};

router.post("/create", (req, res) => {
    try {
        checkHttpParams(req.body);
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
    } catch (error) {
        res.status(422).json({ message: error });
    }
});

router.post("/update", (req, res) => {
    try {
        checkHttpParams(req.body);

        const { title } = req.body;
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
    } catch (error) {
        res.status(422).json({ message: error });
    }
});

router.get("/search", (req, res) => {
    try {
        checkHttpParamsOnlyTitle(req.query);

        const { title } = req.query;
        const search = {
            title: title
        };

        mongodbManage
            .mongodbSearchRecipe(search)
            .then(search =>
                res
                    .status(200)
                    .json({ message: "Recipe found", content: search })
            )
            .catch(err => {
                if (err.name === "ValidationError") {
                    res.status(422).json({ message: err.message });
                } else {
                    res.status(500).json({ message: err.message });
                }
            });
    } catch (error) {
        res.status(422).json({ message: error });
    }
});

router.delete("/delete", (req, res) => {
    try {
        checkHttpParamsOnlyTitle(req.query);

        const { title } = req.query;
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
    } catch (error) {
        res.status(422).json({ message: error });
    }
});

module.exports = router;
