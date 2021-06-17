require('dotenv').config();
const express = require("express");
const port=process.env.PORT||3000;
const ejs = require("ejs");
const path = require("path");
const layouts = require("express-ejs-layouts");
const app = express();

const connectDB = require('./app/db/concc');
connectDB()

app.use(express.urlencoded({extended:false}));
 app.use(express.json());
app.use(layouts);
app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static('public'))
require('./routers/routes')(app)

app.listen(port ,()=>{
    console.log(`listining at port ${port}`);
})