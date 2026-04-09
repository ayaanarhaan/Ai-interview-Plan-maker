const userModel = require("../models/user.model")
const tokenBlacklistModel = require("../models/blacklist.model")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


/**
 * 
 * @name RegisterUserconrtoller
 * @descripton register a new userm expects username, email and password in the request body
 * @access public
 */
async function RegisterUserController(req, res){

    const { username, email, password } = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({
            message: "please provide username, email, password"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "Account already exists with this emaik address or username"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password:hash,
    })

    const token = jwt.sign(
        { id: user._id, username: user.username }, process.env.JWT_SECRETS, { expiresIn: "1d"})

     res.cookie("token", token)

     res.status(201).json({
        message: "User register successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
     })


}

/**
 * 
 * @name RegisterUserconrtoller
 * @descripton register a new userm expects username, email and password in the request body
 * @access public
 */
async function loginUserController(req, res){

    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if(!user) {
         return res.status(400).json({
            message: 'Invalid email or password',
         })
    }

    const isPasswordValid = await  bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message: 'Invalid email or password',
        })
    }

      const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRETS,
     { expiresIn: "1d"})

     res.cookie("token", token)

     res.status(200).json({
        message: "user loggedIn successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
     })
}

/**
 * 
 * @name LogoutUserController
 * @descripton clear toke from cookie and add the token in blacklist
 * @access public
 */
async function logoutUserController(req, res) {

        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({ message: "No token found" });
        }

        await tokenBlacklistModel.create({ token }); 

        res.clearCookie("token");

        res.status(200).json({
             message: "User logged out successfully" 
        });

}

/**
 * 
 * @name getMeController
 * @description get the current logge in user details.
 * @access private
 */
async function getMeController(req, res) {

    const user = await userModel.findById(req.user.id)

    message: "user details fetched successfully"
    return res.status(200).json({
        user: {
            id:user._id,
            username: user.username,
            email: user.email,
        }
    })
    
}

module.exports = { RegisterUserController, loginUserController , logoutUserController , getMeController }