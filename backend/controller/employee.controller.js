import User from "../model/user.model.js";
import bcrypt from "bcrypt";

 export const getAllEmployees = async (req, res) => { // for admin
    try {
        const employees = await User.find({ role: "employee" });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const createEmployee = async (req, res)=> { //for admin
    try {
        const { name, email, password } = req.body;

        const isExist = await User.findOne({ email });
        if (isExist) {
            return res.status(400).json({ message: "Employee with this email already exists" });
        }
        const hashedPassowrd = await bcrypt.hash(password, 10);

        const newEmployee = new User({
            name,
            email,
            password: hashedPassowrd,
            role: "employee"
        });
        await newEmployee.save();
        res.status(201).json({ message: "Employee onboarded successfully", employee: newEmployee });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


export const deleteEmployee = async (req, res) =>{ // for admin
    try {
        const deleteE = await User.findByIdAndDelete(req.params.id);
        if(!deleteE){
            return res.status(404).json({message: "employee not found"});
        }

        res.json({message: "employee deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const updateEmployee = async (req, res) =>{ // Email is not editable, only name nad password can be updated
    try{    //for both
        const {name, password} = req.body;

        const updateData = {name};

        if(password){
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
            updateData.passwordChanged = true;
        }

        const updatedEmployee = await User.findByIdAndUpdate(req.params.id, updateData, {new: true});
        res.json({message: "employee updated successfully", employee: updatedEmployee});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

