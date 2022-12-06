const express = require('express');
const { register, login } = require('../controllers/authController');
const { createCategory, getCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { createPost, getPost, updatePost, deletePost, getAllPost } = require('../controllers/postController');
const { updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

// User routes
router.post("/register", register);
router.post("/login", login);
router.put("/:id",updateUser);
router.delete("/:id", deleteUser);

// Category routes
router.post("/", createCategory);
router.get("/", getCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

// Post routes
router.post("/", createPost);
router.get("/:id", getPost);
router.get("/", getAllPost);
router.put("/:id", updatePost);
router.delete("/:id",deletePost);

module.exports = router;