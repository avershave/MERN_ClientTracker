const employeeRouter = require('express').Router();
const Employee = require('../models/Employee');

employeeRouter.get('/', (req, res) => {
    Employee.find({}, (err, response) => {
        if(err){
            res.status(500).json({message:{
                msgBody: "Unable to retrieve employees",
                msgError: true
            }});
        } else {
            res.status(200).json({response});
        }
    })
});

//Check for unique username
employeeRouter.post('/create', (req, res) => {
    const { body } = req;
    const { firstName, lastName, employeeID, password } = body;
    Employee.find({employeeID: employeeID}, (err, query) => {
        if(err){
            console.log(err)
            res.status(500).json({message:{
                msgBody: "Server error!",
                msgError: true
            }});
        }
        if (query.length > 0){
            res.status(500).json({message: {
                msgBody: "EmployeeID already created",
                msgError: true
            }});
        } else {
            const newEmployee = new Employee();
            newEmployee.firstName = firstName;
            newEmployee.lastName = lastName;
            newEmployee.employeeID = employeeID
            newEmployee.password = newEmployee.generateHash(password);

            newEmployee.save(req.body, err =>{
                if(err){
                    res.status(500).json({message: {
                        msgBody: "Unable to create employee",
                        msgError: true
                    }})
                } else {
                    res.status(200).json({message: {
                        msgBody: "Created employee",
                        msgError: false
                    }});
                }
            })
        }
    });
});

employeeRouter.post('/signin', (req, res) => {
    const { body } = req;
    const { password } = body;
    let {
        employeeID
    } = body;

    Employee.find({employeeID: employeeID}, (err, employees) => {
        if(err){
            res.status(500).json({message:{
                msgBody: "Server error!",
                msgError: true
            }});
        }
        if(employees.length != 1) {
            res.status(500).json({message:{
                msgBody: "Server error!",
                msgError: true
            }});
        }
        const employee = employees[0];
        if(!employee.validPassword(password)){
            res.status(404).json({message: {
                msgBody: "Invalid password",
                msgError: true
            }});
        } else {
            res.status(200).json({message: {
                msgBody: "Welcome!",
                msgError: false
            }})
        }

    })
})


module.exports = employeeRouter;