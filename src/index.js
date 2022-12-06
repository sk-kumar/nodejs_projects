const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL).then(() => {
    console.log("DB is connected");
}).catch(err => console.log(err.message));


const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const route = require("./routes/route");
app.use("/", route);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on ${process.env.PORT}`);
});