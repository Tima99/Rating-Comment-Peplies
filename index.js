// 9:55AM - 15/02/2023
const express = require("express")
const { PORT } = require('./config')
const {dbConnect} = require('./db')
const postRoutes = require('./routes/postRoutes')
const authRoutes = require('./routes/authRoutes')
const getRoutes = require('./routes/getRoutes')
const cors = require('cors')
const authentication = require("./middlewares/authentication")
const cookiParser = require('cookie-parser')
const path = require('path')

const app = express()

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.static(path.join(__dirname, './uploads')))
app.use(cookiParser())
app.use(express.json())
app.use('/api', postRoutes)
app.use('/api', getRoutes)
app.use('/api', authentication , authRoutes)


app.listen(PORT, _ => console.log('Server started'))

dbConnect()
.then( res => console.log(`DB connected!`))
.catch(err => console.log(err))
