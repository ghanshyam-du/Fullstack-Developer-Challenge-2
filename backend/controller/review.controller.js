import Review from "../model/reviews.model.js";

export const getAllReviews = async (req, res) => { // for admin
    try {
        const reviews = await Review.find().populate("createdBy", "name email");
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createReview = async (req, res)   => { // for admin
    try{
        const {title, description, createdBy} = req.body;

        const newReview = new Review({
            title,
            description, 
            createdBy
        });
        await newReview.save();
          res.status(201).json({ message: "Review created successfully", review: newReview });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateReview = async (req, res)=>{ // for admin
    try{
        const {title, description} = req.body;
        const review = await Review.findByIdAndUpdate(req.params.id, {title, description}, {new:true});

        if(!review){
            return res.status(400).json({message: "Review Not found"});
        }
        res.json({message: "review updated successfully", review});

    }catch(error){
        res.status(500).json({message: error.message});
    }
};

