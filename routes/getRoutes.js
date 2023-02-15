const FetchReviews = require("../controllers/Reviews/FetchReviews")
const FetchVideos = require("../controllers/Videos/FetchVideos")

const router = require("express").Router()

router.get('/videos', FetchVideos)
router.get('/reviews/:videoId', FetchReviews)

module.exports = router