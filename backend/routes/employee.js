const express = require('express');
const Employee = require('../model/Employee');
const authmiddleware = require('../middleware/authmiddleware');
const router = express.Router();    

router.use(authmiddleware);

router.post('/createEmployee', async (req,res)=>{
    const {name,email,position,department,phone} = req.body;

    if(!name || !email || !position)
    {
        return res.status(400).json({message: 'Name, email, position are required'});
    }
    
    try{
        const existing = await Employee.findOne({email});
        if(existing)
        {
           return res.status(400).json({message: 'This email is aready exist'});
        }

        const employee = new Employee({name,email,position,department,phone});
        await employee.save();
        res.status(201).json(employee);
    }
    catch(err){
        return res.status(500).json({message: 'Server Error'})
    }
})


router.get('/employee-list', async (req,res)=>{
    try{
        const employees = await Employee.find().sort({createdAt: -1});
        res.json(employees);
    }
    catch(err)
    {
        return res.status(500).json({ message: 'Server error' });
    }
})

router.get('/:id', async (req,res)=>{
    try{
        const employee = await Employee.findById(req.params.id);
        if(!employee)
        {
            return res.status(404).json({ message: 'Employee Not Found' });
        }
        res.json(employee);
    }
    catch(err){
        return res.status(500).json({ message: 'Server error' });
    }
})

router.put('/update-employee/:id', async (req,res)=>{
     const {name,email,position,department,phone} = req.body;

    if(!name || !email || !position)
    {
        return res.status(400).json({message: 'Name, email, position are required'});
    }

    try{
        const existing  = await Employee.findById(req.params.id);
        if(!existing)
        {
            return res.status(404).json({message: 'Employee Not found'});
        }

        existing.name = name;
        existing.email = email;
        existing.position = position;
        existing.department = department;
        existing.phone = phone;

        await existing.save();
        res.json(existing);
    }
    catch(err){
        return res.status(500).json({message: 'Server Error'})
    }
    
})

router.delete('/delete/:id', async (req,res)=>{
     try{
       const employee = await Employee.findById(req.params.id);
        if(!employee)
        {
            return res.status(404).json({ message: 'Employee Not Found' });
        }
        await employee.deleteOne();
        res.json({message: 'Employee Deleted'});
    }
    catch(err){
        console.error('Delete employee error:', err);
        return res.status(500).json({message: 'Server Error'})
    }
})


module.exports=router;
