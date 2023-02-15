const Tube = require("../../models/Tube")

async function FetchVideos(req, res){
    try {
        const videos = await Tube.findAll()
        
        res.json(videos)

    } catch (error) {
        console.log(error)
        res.status(500).json({message :"Something went wrong..."})
    }
}

module.exports = FetchVideos