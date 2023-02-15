const {db} = require("../db")

class User{
    constructor({email, name, picture}) {
        this.email = email
        this.name = name
        this.picture = picture
    }

    async save(){
        try {
            const query = 'INSERT INTO users (email, name, picture) VALUE (?, ?, ?)'
            const [res] = await db.query(query, [this.email, this.name, this.picture] )
            return res
        } catch (error) {
            return Promise.reject(error)
        }
    }
    
    static async find(email){
        try {
            const query = 'Select * FROM users WHERE email = ?'
            const [res] = await db.query(query, [email])
            return res
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

module.exports = User