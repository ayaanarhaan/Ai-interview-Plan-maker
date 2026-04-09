const { Router } = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewcontroller = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const interViewRouter = Router()


/**
 * @route POT /api/interview/
 * @description genrate a new interview report on the basis of user self description, resumepdf, job description
 * @access private
 */
interViewRouter.post("/", authMiddleware.authUser,upload.single("resume"),interviewcontroller.generateInterviewReportControl)

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId
 * @access private
 */
interViewRouter.get("/report/:interviewId", authMiddleware.authUser,interviewcontroller.getInterViewReportController)

/**
 * @route GET /api/interview
 * @description get all interview reports of logged in user.
 * @access private
 */
interViewRouter.get("/interview", authMiddleware.authUser,interviewcontroller.getAllInterview)

/**
 * @route GET /api/interview/resume/pdf
 * @description genreate resume pdf on the basis od use self description, job description
 * @access private
 */

interViewRouter.post("/resume/pdf/:interviewId", authMiddleware.authUser,interviewcontroller.generateResumePdfConrtroller)


module.exports = interViewRouter
