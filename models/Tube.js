const {db} = require("../db")

class Tube{
    constructor({user, title, description, thumbnail, video}) {
        this.user = user
        this.title = title
        this.description = description
        this.thumbnail = thumbnail
        this.video = video
    }

    async save(){
        try {
            const query = 'INSERT INTO tubes (user, title, description, thumbnail, video) VALUE (?, ?, ?, ?, ?)'
            const [res] = await db.query(query, [this.user, this.title, this.description, this.thumbnail, this.video] )
            return res
        } catch (error) {
            return Promise.reject(error)
        }
    }
    
    static async findAll(){
        try {
            const query = 'Select * FROM tubes'
            const [res] = await db.query(query)
            return res
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

module.exports = Tube