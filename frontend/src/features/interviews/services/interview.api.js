import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})
/**
 * 
 * @description service to generate interview report sbased on user self description, resume,
 * jobdescription
 */
export const generateInterviewReport = async  ({ resumeFile, selfDescription, jobDescription }) => {

    const formData = new FormData()
    formData.append("jobDescription",jobDescription );
    formData.append("selfDescription",selfDescription );
    formData.append("resume",resumeFile );

 const response = await api.post("/api/interview", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return response.data

}
/**
 * @description service to get interview report by interviewId
 */
export const getInterViewReportById = async (interviewId) => {

    const response = await api.get(`/api/interview/${interviewId}`)

    return response.data
}
/**
 * @description service to get all the interview reports of a user
 */
export const getAllInterviewReports = async () => {
    const response = await api.get("/api/interview")

    return response.data
}
/**
 * 
 * @description service to generate resume pdf based on user self description, job descripition,a resume content 
 */
export const generateResumePdf = async ({ interviewId }) => {
    const response = await api.post(`/api/interview/resume/pdf/${interviewId}`, null ,{
        responseType: "blob"
    })

    return response.data
}