const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employee');
const app = express();


dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Database Connected');
    })
    .catch((err)=>{
        console.log('err');
    });

app.use('/api/auth', authRoutes);
app.use('/api/employee', employeeRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log("Server started on port 5000"))