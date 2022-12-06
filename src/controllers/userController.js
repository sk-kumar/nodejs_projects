const postModel = require("../models/postModel");
const userModel = require("../models/userModel");

const updateUser = async (req, res) => {
    try {
        if (req.body.userId === req.params.id) {
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            try {
                const updateUser = await userModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
                res.status(200).json(updateUser);
            } catch (error) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can update only your user account!");
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        if (req.body.userId === req.params.id) {
            try {
                const user = await userModel.findById(req.params.id);
                await postModel.deleteMany({ username: user.username });
                await userModel.findByIdAndDelete(req.params.id);
                res.status(200).json("User has been deleted...");
            } catch (error) {
                res.status(500).json(error.message);
            }
        } else {
            res.status(401).json("You can delete only your account!");
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports={updateUser,deleteUser}