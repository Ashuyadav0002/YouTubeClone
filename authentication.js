const jwt = require('jsonwebtoken')
const User = require('../Models/user')



const auth = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            error: "Un-authorised User"
        })
    } else {
        try {
            const decode = jwt.verify(token, "Its_My_Secret_Key")
            req.user = await User.findById(decode.userId).select('-password')
            next();
        } catch (error) {
            res.status(401).json({
                error: "Invalid Token"
            })
        }
    }
}

module.exports = auth