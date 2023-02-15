const Review = require("../../models/Review")

async function FetchReviews(req, res){
    try {
        const { videoId } = req.params
        const { start , end} = req.query

        const _reviews = await Review.findAll({ id : videoId, start, end})

        

        res.json(_reviews)

    } catch (error) {
        console.log(error)
        res.status(500).json({message :"Something went wrong..."})
    }
}

module.exports = FetchReviews