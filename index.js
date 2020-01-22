const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());

const client = require('./routes/clients');
const employee = require('./routes/employee')
app.use('/client', client)
app.use('/employee', employee)

app.use(cors());

mongoose.connect('mongodb://localhost:27017/MERN_ClientTrackerdb',{ useNewUrlParser: true, useFindAndModify: true }, err =>{
    if(err){
        console.log("Unable to connect to database.");
    } else {
        console.log("Connected to MongoDB.");
    }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is connected to ${port}`);
});