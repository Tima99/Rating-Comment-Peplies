const FetchReviews = require("../controllers/Reviews/FetchReviews")
const FetchVideos = require("../controllers/Videos/FetchVideos")

const router = require("express").Router()

router.get('/videos', FetchVideos)
router.get('/reviews/:videoId', FetchReviews)
router.get('/logout', (req, res) => {
    res.clearCookie('jwt')
    res.json({ message : "Logout"})
})
module.exports = router