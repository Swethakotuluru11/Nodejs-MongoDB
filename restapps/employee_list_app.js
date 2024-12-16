const mongoose = require('mongoose');
const Employees = require('./employee');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;


const uri =  "mongodb://Localhost:27017";

mongoose.connect(uri,{'dbName':'employeeDB'});


// Middleware to parse JSON requests
// Enable CORS for all routes
app.use(cors());
app.use("*",bodyParser.json());



//GET endpoint
app.get('/api/employees', async (req, res) => {
    const documents = await Employees.find();
    res.json(documents);
});

app.post('/api/add_employee', async (req, res) => {
    
    console.log(req);
    const data = req.body;
    const emp = new Employees({
      "emp_name": data['name'],
      "age": data['age'],
      "location": data['location'],
      "email": data['email']
    });
    // Save the employee to the database
    await emp.save();
    res.json({ message: 'Employee added successfully' });
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});