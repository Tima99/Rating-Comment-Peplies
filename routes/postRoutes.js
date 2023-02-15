
const Login = require("../controllers/Entry/Login")
const SignUp = require("../controllers/Entry/SignUp")

const router = require("express").Router()

router.post('/login', Login)
router.post('/signup', SignUp)

module.exports = router