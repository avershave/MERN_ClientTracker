const clientRouter = require('express').Router();
const Client = require('../models/Clients');

//CRUD

//read
clientRouter.get('/', (req, res) => {
    Client.find({}, (err, response) => {
        if(err){
            res.status(500).json({message: {
                msgBody: "Unable to retrieve clients.",
                msgError: true
            }});
        } else {
            res.status(200).json({response});
        }
    });
});

//create
clientRouter.post('/', (req, res) => {
    Client.create(req.body, err => {
        if(err){
            res.status(500).json({
                msgBody: "Unable to create client.",
                msgError: true});
        } else {
            res.status(200).json({
                msgBody: "Created client!",
                msgError: false
            });
        }
    });
});

//delete
clientRouter.delete('/:id', (req, res) => {
    Client.findByIdAndDelete(req.params.id, err => {
        if(err){
            res.status(500).json({message: {
                msgBody: "Unable to delete client.",
                msgError: true
            }});
        } else {
            res.status(200).json({message: {
                msgBody: "Deleted client!",
                msgError: false
            }});
        }
    })
})

//update
clientRouter.put('/:id', (req, res) => {
    Client.findByIdAndUpdate({_id: req.params.id}, req.body, {runValidators: true}, err =>{
        if(err){
            res.status(500).json({message: {
                msgBody: "Unable to update client.",
                msgError: true
            }});
        } else {
            res.status(200).json({message: {
                msgBody: "Updated client!",
                msgError: false
            }});
        }
    });
})

module.exports = clientRouter;
