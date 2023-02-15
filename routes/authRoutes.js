const AddReview = require("../controllers/Reviews/AddReview")
const UploadVideo = require("../controllers/Videos/UploadVideo")
const User = require("../models/User")
const upload = require("../utils/SaveMedia")

const router = require("express").Router()

router.get('/auth', async (req, res) => {
    const authuserEmail = req.authuser
    const userRow = await User.find(authuserEmail)
    res.json({...userRow[0]})
})

router.post('/video', upload.any(),  UploadVideo)

router.post('/review', AddReview)


module.exports = router