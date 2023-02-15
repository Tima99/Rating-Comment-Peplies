const Review = require("../../models/Review")

async function AddReview(req, res){
    try {
        const { end } = req.query
        const user = req.authuser
        const { rating, review, videoId, replyto, replyparent } = req.body

        let $review = new Review({
            user,
            rating: rating?.toString(),
            review,
            replyto,
            replyparent,
            tubeId: videoId
        })
        
        $review = await $review.save()

        const _reviews = await Review.findAll({ id : videoId, end})

        res.json(_reviews)

    } catch (error) {
        console.log(error)
        res.status(500).json({message :"Something went wrong..."})
    }
}

module.exports = AddReview