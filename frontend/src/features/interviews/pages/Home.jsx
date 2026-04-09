import React, { useState , useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../hooks/useinterview";

import "../style/user-profile-section.scss";
import "../style/home.scss";
import "../style/job-description-section.scss";

const Home = () => {
    const { loading, generateReport, reports, getReports } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    useEffect(() => {
        getReports()
    }, [getReports])

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({ jobDescription , selfDescription , resumeFile })

        navigate(`/interview/${data._id}`)
    }

    if(loading){
        return (
            <main className="loading-screen">
                <h1>Loading your interview plan....</h1>
            </main>
        )
    }

    return (
        <main className="home">
            <section className="home-header">
                <h1>Create Your Custom <span className="highlight">Interview Plan</span></h1>
                <p className="subtitle">Let our AI analyze the job requirements and your unique profile to build a winning strategy</p>
            </section>

            <section className="interview-input-group">
                <div className="job-description-section">
                    <div className="section-header">
                        <h2>Target Job Description</h2>
                        <span className="required">Required</span>
                    </div>
            
                    <textarea onChange={(e) => {setJobDescription(e.target.value)}} className="job-description-textarea" name="jobDescription" id="jobdescription" placeholder="Paste the full job description here.E.g., Senior Frontend Engineer at Google, requires proficiency in React, TypeScript, and problem-solving skills..." />
            
                    <div className="character-count">
                        <span>0/5000</span>
                    </div>
                </div>
                <div className="user-profile-section">
                    <div className="section-header">
                        <h2>Your Profile</h2>
                    </div>

                <div className="profile-inputs">
                    <div className="input-group">
                        <label className="input-label">
                            Resume
                            <span className="required-badge">Required</span>
                        </label>
                        <div className="file-upload">
                            <input 
                                ref={resumeInputRef}
                                type="file" 
                                id="resumeFile" 
                                name="resume" 
                                accept=".pdf" 
                                className="file-input"
                            />
                            <label htmlFor="resumeFile" className="file-label">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2v20M2 12h20"></path>
                                </svg>
                                <span>Click to upload or drag & drop</span>
                                <small>PDF or DOC files only</small>
                            </label>
                        </div>
                </div>

                <div className="input-group">
                    <label htmlFor="selfDescription" className="input-label">Quick Self Description</label>
                    <textarea
                        onChange={(e) => {setSelfDescription(e.target.value)}}
                        id="selfDescription"
                        name="selfDescription"
                        placeholder="Briefly describe your experience, key skills, and why you're interested in this role..."
                        className="self-description-textarea"
                        rows="6"
                    />
                </div>

                <div className="checkbox-group">
                    <input 
                        type="checkbox" 
                        id="termsCheck" 
                        name="terms"
                        defaultChecked={true}
                    />
                    <label htmlFor="termsCheck">
                        I want a detailed report & self-assessment
                    </label>
                </div>
            </div>
        </div>
            </section>
            {/* Recent Reports list */}
            {reports && reports.length > 0 && (
                <section className="recent-reports">
                    <h1>My Recent Interview Plans</h1>
                    <ul className="reports-list">
                        {reports.map(report => (
                            <li key={report._id} className="report-item" onClick={()=> navigate(`/interview/${report._id}`)}>
                                <h3>{report.title || 'Untitled Position'}</h3>
                                <p className="report-meta">Generated on {new Date(report.createdAt) }</p>
                                <p className="match-score">{report.matchScore}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            <section className="home-footer">
                <button onClick={handleGenerateReport} className="generate-btn primary-button">Generate My Interview Strategy</button>
            </section>
        </main>
    );
};

export default Home;
