const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { isValidReqBody, isValidString } = require("../validator/validation");

const register = async (req, res) => {
    try {
        const {username,email,password} = req.body;
        if (!isValidReqBody(req.body)) return res.status(400).send({ msg: "please fill all required fields" });
        if (!isValidString(username)) return res.status(400).send({ msg: "Please fill valid username" });
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            res.status(400).send({ status: false, message: 'Email should be a valid email address' })
            return
        }
        const isEmailAlreadyUsed = await userModel.findOne({ email });
        if (isEmailAlreadyUsed) {
            res.status(400).send({ status: false, message: `${email} email address is already registered` })
            return
        }
        if (!isValidString(password)) {
            res.status(400).send({ status: false, message: 'Password is required' })
            return
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new userModel({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const login = async (req, res) => {
    try {
        if (!isValidReqBody(req.body)) return res.status(400).send({ msg: "please fill all required fields" });
        if (!isValidString(req.body.username)) return res.status(400).send({ status: false, msg: "Please fill valid username" });
        if (!isValidString(req.body.password)) {
            res.status(400).send({ status: false, message: 'Password is required' })
            return
        }
        const user = await userModel.findOne({ username: req.body.username });
        if (!user) return res.status(400).json("Wrong username or password");
        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        if (!comparePassword) return res.status(400).json("Wrong username or password");
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { register, login };
