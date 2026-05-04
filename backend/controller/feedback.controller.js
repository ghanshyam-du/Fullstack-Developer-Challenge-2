import Feedback from "../model/feedback.model.js";
import Assignment from "../model/assignment.model.js";

export const feedbackSubmit = async(req, res) =>{// for employee
    try{
        const {comments} = req.body;
        const {assignmentId} = req.params;

        const assignment = await Assignment.findById(assignmentId);
        if(!assignment){
            return res.status(404).json({message: "Assignment not found"});
        }

        if(assignment.reviewer.toString() !== req.user.userId){
            return res.status(403).json({message: "You are not permitted to submit feedback for this assignment"});
        }
        
        if(assignment.status === "submitted"){
            return res.status(400).json({message: "Feedback for this assignment has already been submitted"});
        }

        const feedback = await Feedback.create({
            comments,
            assignment: assignmentId,
            createdBy: req.user.userId
        });
        assignment.status = "submitted";
        await assignment.save();
        res.status(201).json({message: "Feedback submitted successfully", feedback});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
}


export const getAllFeedbacks = async (req, res) => { // for admin
    try {
        const feedbacks = await Feedback.find()
            .populate({
                path: "assignment",
                populate: [
                    { path: "review",   select: "title" },
                    { path: "reviewer", select: "name" },
                    { path: "reviewee", select: "name" }
                ]
            });

        res.json(feedbacks);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

