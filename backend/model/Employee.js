const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    position:{ 
        type: String, 
        required: true 
    },
    department:{ 
        type: String 
    },
    phone:{
        type: String 
    },
    createdAt:{ 
        type: Date, 
        default: Date.now 
    },
});


module.exports = mongoose.model('Employee', employeeSchema);    