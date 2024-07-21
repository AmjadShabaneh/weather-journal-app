
// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(express.urlencoded({extended:false}));
app.use(express.json());

//setup cors 
const cors = require('cors');
app.use(cors());
// Cors for cross origin allowance
// Initialize the main project folder
const port = 8000;
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(port, () => {
    console.log(`server running on port ${port}`);
    });

//Routes 
app.get('/getWeatherData', (req, res) => {
    res.send(projectData);    
    });

app.post('/addWeatherData', (req, res) => {
    
   projectData.date=req.body.date;
   projectData.temp=req.body.temp;
   projectData.feelings=req.body.feelings;
   console.log(projectData)
    });
