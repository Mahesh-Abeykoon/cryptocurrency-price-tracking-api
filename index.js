const express = require("express");
const mongoose = require("mongoose");

const authRoute = require("./Routes/AuthRoute");

require("dotenv").config()
const app = express();

const PORT = 5001;
const {MONGO_URL} = process.env;

mongoose.connect(MONGO_URL)
.then(() => console.log("MongoDB is Connected Successfully"))
.catch((error) => console.error(error));

app.listen(PORT, () =>{
    console.log(`Server is listening on port ${PORT}`)
})

app.use(express.json());

app.use("/", authRoute);