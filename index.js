const express=require("express");
const users = require("./route/users.js");
const connectDB = require("./config/db.js");
require('dotenv').config({path:'./.env'})
const projects = require("./route/project");
connectDB();
const app = express();
app.use(express.json());
app.use("/users",users);
app.use("/projects", projects);
module.exports=app.listen(5000);