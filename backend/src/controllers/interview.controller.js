const interviewReportModel = require("../models/interviewReport.model")
const pdfParse = require("pdf-parse")
const { generateInterviewReport , generateResumePdf } = require("../services/ai.service")

/**
 * 
 * @description generate interview report 
 * 
 */
async function generateInterviewReportControl(req, res){

    function stripAiJson(raw) {
        return raw
            .replace(/^```json\s*/i, '')
            .replace(/^```\s*/i, '')
            .replace(/```\s*$/i, '')
            .trim()
}

    const resumeContent = await ( new pdfParse.PDFParse(Uint8Array.from( req.file.buffer ) ) )
    const { selfDescription, jobDescription} = req.body


    const interViewReportByAi = await generateInterviewReport({
        resume:resumeContent,
        selfDescription,
        jobDescription
    })

   const parsedReport = JSON.parse(stripAiJson(interViewReportByAi))

    const interViewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
      ...parsedReport,
    })

    res.status(201).json({
        message: "Interview report genrated successfuly",
        interViewReport,
    })




}

/**
 * 
 * @description Controller to get interview report by interviewId
 */
async function getInterViewReportController(req, res){

    const { interviewId } = req.params

    const interViewReport  = await interviewReportModel.findOne({ _id: interviewId, user:req.user.id})

    if(!interViewReport){
        return res.status(404).json({
            message: "Interview report not found"
        })
    }

    res.status(200).json({
        message: "Interview Report fetched successfully",
        interViewReport
    })

}

async function getAllInterview(req, res){
    const interviewReports = await interviewReportModel.find({ user: req.user.id , }).sort({ createdAt: -1 })
    .select("-resume -selfDescription -jobDescription -_v -technicalQuestions  -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview Report fetched successfully",
        interviewReports
    })


}


/**
 * #description controller to genrate resume pdf bse on use setails
 */

async function generateResumePdfConrtroller(req, res){
    const { interviewId } = req.params;

    const interviewReport = await interviewReportModel.findById(interviewId)

    if(!interviewReport){
        return res.status(404).json({
            message: "Interview report not found."
        })
    }
    const { resume , jobDesription , selfDescription } = interviewReport;

    const pdfbuffer = await generateResumePdf({ resume , jobDesription , selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=reqsume_${interviewId}.pdf`
    })
    res.send(pdfbuffer)

}



module.exports = { generateInterviewReportControl , getInterViewReportController, getAllInterview , generateResumePdfConrtroller }