const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    PORT,
    DB_USER, 
    DB_HOST, 
    DB_PWD, 
    DB_DATABASE_NAME ,
    GOOGLE_CLIENT_ID,
    JWT_SECRET
} = process.env
