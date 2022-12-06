const postModel = require("../models/postModel");

const createPost = async (req, res) => {
    try {
        const newPost = new postModel(req.body);
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const getPost = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const updatePost = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);
        if (post.username === req.user.username) {
            try {
                const updatePost = await postModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
                res.status(200).json(updatePost);
            } catch (err) {
                res.status(500).json(err.message);
            }
        } else {
            res.status(401).json("You can update only your post!");
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json("Post has been deleted successfully...");
            } catch (error) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can delete only your post!");
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const getAllPost = async (req, res) => {
    try {
        const username = req.query.user;
        const categoryName = req.query.category;
        let posts;
        if (username) {
            posts = await postModel.find({ username });
        } else if (category) {
            posts = await postModel.find({ categories: { $in: [categoryName] } });
        } else {
            posts = await postModel.find();
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = { createPost, getAllPost, updatePost, deletePost, getPost };