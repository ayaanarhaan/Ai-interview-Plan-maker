const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")


const { Router } = require('express')

const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @description register a new user
 * @access public
 */ 

authRouter.post("/register", authController.RegisterUserController)

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access public
 */ 

authRouter.post("/login", authController.loginUserController)

/**
 * @route GET /api/auth/logout
 * @description clear toke from user cookie and add the token in blacklist
 * @access private
 * */ 

authRouter.get("/logout", authController.logoutUserController)

/**
 * 
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */
authRouter.get("/get-me",authMiddleware.authUser, authController.getMeController)


module.exports = authRouter