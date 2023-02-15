const Tube = require("../../models/Tube")

async function UploadVideo(req, res){
    try {
        const authUserEmail = req.authuser
        const { title, describe } = req.body
        const videoIndex = req.files.findIndex( file => file.fieldname === 'video')

        let tube = new Tube({
            user: authUserEmail,
            title,
            description: describe,
            video: req.files[videoIndex].filename,
            thumbnail: req.files[1- videoIndex].filename
        })

        tube = await tube.save()

        res.json({ message: "Uploaded"})

    } catch (error) {
        console.log(error)
        res.status(500).json({message :"Something went wrong..."})
    }
}

module.exports = UploadVideo