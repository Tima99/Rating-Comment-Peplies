const User = require("../../models/User");
const verifyGoogleToken = require("../../utils/verifyGoogleAccount");
const { JWT_SECRET } = require("../../config");
const jwt = require("jsonwebtoken")

async function SignUp(req, res) {
    try {
        const { credential } = req.body;

        if(!credential) return res.status(400).json({message: "credential are not correct"})

        // if (credential) {
        const verificationResponse = await verifyGoogleToken(credential);

        if (verificationResponse.error) {
            return res.status(400).json({
                message: verificationResponse.error,
            });
        }

        const profile = verificationResponse?.payload;

        let userRow = new User({
            email: profile?.email,
            name: profile?.given_name,
            picture: profile?.picture,
        });

        await userRow.save();


        const token = jwt.sign({ email: profile?.email }, JWT_SECRET, {
            expiresIn: "1d",
        });


        res.cookie("jwt", token, {
            secure: false,
            httpOnly: true,
        });

        res.status(201).json({
                name: profile?.given_name,
                picture: profile?.picture,
                email: profile?.email,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "An error occurred. Registration failed.",
        });
    }
}

module.exports = SignUp;
