const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const EmployeeSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    employeeID: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAccount: {
        type: Date,
        default: Date.now()
    }
});

EmployeeSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

EmployeeSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Employee', EmployeeSchema);