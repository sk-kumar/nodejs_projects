const categoryModel = require("../models/categoryModel");
const postModel = require("../models/postModel");

const createCategory = async (req, res) => {
    try {
        const newCategory = new categoryModel({
            name: req.body.name
        });
        const category = await newCategory.save();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const getCategory = async (req, res) => {
    try {
        const category = await categoryModel.find();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const deleteCategory = async (req, res) => {
    try {
        if (req.body.id === req.params.id) {
            try {
                const category = await categoryModel.findById(req.params.id);
                await postModel.deleteMany({ categories: category });
                await categoryModel.findByIdAndDelete(req.params.id);
            } catch (error) {
                res.status(500).json(error.message);
            }
        } else {
            res.status(401).json("Unauthorized access");
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const updateCategory = async (req, res) => {
    try {
        if (req.body.id === req.params.id) {
            try {
                const updateCategory = await categoryModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
                res.status(200).json(updateCategory);
            } catch (error) {
                res.status(500).json(error.message);
            }
        } else {
            res.status(401).json("Unauthorized access");
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = { createCategory, getCategory, deleteCategory, updateCategory };