// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express")
// Start up an instance of app
const app = express()
/* Middleware*/
const bodyParser = require("body-parser")
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors")
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3030;

function listening (){
    console.log(`the server running on : http://localhost:${port}`);
}
const server = app.listen(port,listening);

// callback function to complete get "/all"
const getAll = (req,res) => res.send(projectData)
// GET route
app.get("/all",getAll);
// callback function to complete post "/add"
const postData = (req,res) =>{
    projectData = req.body;
    res.status(200).send(projectData);
}
// POST route
app.post("/add",postData)
