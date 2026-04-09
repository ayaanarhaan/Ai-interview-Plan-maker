import { getAllInterviewReports, generateInterviewReport, getInterViewReportById ,generateResumePdf } from "../services/interview.api"
import { useContext, useEffect, useCallback } from "react"
import { interviewContext } from '../interview.context'
import {useParams} from "react-router-dom"

export const useInterview = () => {
    
    const { interviewId }  = useParams()
    const context = useContext(interviewContext)

    if(!context){
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport , reports, setReports } = context;

    const generateReport = async ({jobDescription, selfDescription, resumeFile}) => {
        setLoading(true);
        let response = null;
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            setReport(response.interViewReport)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
        return response?.interViewReport;

    }
    const getreportById = useCallback(async ( interviewId ) => {
        setLoading(true);
        let response = null;
        try{
            response = await getInterViewReportById(interviewId)
            setReport(response.interViewReport)
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
        return response?.interViewReport;
    }, [setLoading, setReport])
    const getReports  = useCallback(async () => {
        setLoading(true)
        let response = null;
        try {
            response = await getAllInterviewReports()
            console.log('Reports fetched:', response);
            setReports(response.interViewReports)
        } catch (err) {
            console.error('Error fetching reports:', err);
        } finally {
            setLoading(false)
        }
        return response;
    }, [setLoading, setReports])
      useEffect(() => {
        if (interviewId){
          getreportById(interviewId)
        }
      }, [interviewId, getreportById])

    const getResumePdf = async ( interviewId ) => {
        setLoading(true)
        let response = null;
        try {
            response = await generateResumePdf({ interviewId })
            const url = window.URL.createObjectURL(new Blob([response], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url;
            link.setAttribute("download", `resume_${ interviewId }.pdf`)
            document.body.appendChild(link)
            link.click()

        } catch(err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
    return { loading , report, reports, generateReport ,  getreportById , getReports , getResumePdf }
}