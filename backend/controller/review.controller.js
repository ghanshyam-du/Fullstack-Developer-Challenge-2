import Review from "../model/reviews.model.js";

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate("createdBy", "name email");
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createReview = async (req, res)   => {
    try{
        const {title, description} = req.body;

        const newReview = new Review({
            title,
            description, 
            createdBy: req.user.userId
        });
        await newReview.save();
          res.status(201).json({ message: "Review created successfully", review: newReview });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateReview = async (req, res)=>{
    try{
        const {title, description} = req.body;
        const review = await Review.findByIdAndDelete(req.params.id, {title, description}, {new:true});

        if(!review){
            return res.status(400).json({message: "Review Not found"});
        }
        res.json({message: "review updated successfully", review});

    }catch(error){
        res.status(500).json({message: error.message});
    }
};