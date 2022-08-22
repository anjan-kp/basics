const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors"); 
require('dotenv').config();
const app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//use parsing middleware
app.use(bodyParser.json())
//app.use(cors)


const PORT = 3030;

//Import the routes

const userRoutes = require("./routes/user")


//Using Routes

app.use('/api', userRoutes) // eg = localhost:5000/api/login

app.get('/login',(req,res)=>{
 res.status(200);
 res.send("Welcome")
});

app.listen(PORT, (error) =>{
    if(!error){
        console.log("Success")
    } else {
        console.log("error")
    }
})

//DB Connection

mongoose.connect(process.env.AUTH_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("DB Connected")
})