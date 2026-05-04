import Assignment from "../model/assignment.model.js";

export const createAssignment = async (req, res) =>{ // for admin
    try{
        const {review, reviewer, reviewee} = req.body;

        const existingAssignment = await Assignment.findOne({ review, reviewer, reviewee });
        if (existingAssignment) {
            return res.status(400).json({ message: "This assignment already exists" });
        }

        const newAssignment = new Assignment({
            review, 
            reviewee,
            reviewer
        });
        await newAssignment.save();
        res.status(201).json({message: "Assignment created successfully", assignment: newAssignment});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


export const getMyAssignment = async (req, res)=>{ // for employee
    try{
        const assignements = await Assignment.find({ reviewer: req.user.userId }).populate("review", "title description").populate("reviewee", "name email");
        res.json(assignements);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};



export const getAllAssignments = async (req, res) => { // for admin
    try{
        const assignements = await Assignment.find().populate("review", "title description").populate("reviewer", "name email").populate("reviewee", "name email");
        res.json(assignements);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

