import React, { useState, useEffect } from 'react';

import '../style/questions-panel.scss';
import '../style/main-content-panel.scss';
import '../style/skill-gaps-panel.scss';
import '../style/interview.scss';

import { useInterview } from '../hooks/useinterview';
import { useParams } from 'react-router-dom';



const Interview = () => {
  const [activeView, setActiveView] = useState('technical');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const { report , getreportById , loading , getResumePdf } = useInterview()
  const { interviewId }  = useParams()

  useEffect(() => {
    if (interviewId){
      getreportById(interviewId)
    }
  }, [interviewId, getreportById])

  if(loading || !report){
    return (
      <main className="loading-screen">
                <h1>Loading your interview plan....</h1>
      </main>
    )
  }


  if (!report) {
    return (
      <div className="interview-container">
        <div className="loading">Loading interview data...</div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeView) {
      case 'technical':
        return (
          <div className="content-view">
            <div className="question-display">
              <div className="question-header">
                <span className="question-label">Technical Question {currentQuestionIdx + 1}</span>
                <span className="question-badge">
                  {currentQuestionIdx + 1} / {report.technicalQuestions?.length || 0}
                </span>
              </div>
              <div className="question-content">
                <div className="question-section">
                  <h4>Question:</h4>
                  <p>{report.technicalQuestions?.[currentQuestionIdx]?.question || 'No question available'}</p>
                </div>
                <div className="question-section">
                  <h4>Interview Intention:</h4>
                  <p>{report.technicalQuestions?.[currentQuestionIdx]?.intention || 'No intention available'}</p>
                </div>
                <div className="question-section">
                  <h4>How to Answer:</h4>
                  <p>{report.technicalQuestions?.[currentQuestionIdx]?.answer || 'No answer available'}</p>
                </div>
              </div>
              <div className="question-navigation">
                <button
                  className="nav-btn prev"
                  onClick={() =>
                    setCurrentQuestionIdx(Math.max(0, currentQuestionIdx - 1))
                  }
                  disabled={currentQuestionIdx === 0}
                >
                  ← Previous
                </button>
                <button
                  className="nav-btn next"
                  onClick={() =>
                    setCurrentQuestionIdx(
                      Math.min(report.technicalQuestions?.length - 1, currentQuestionIdx + 1)
                    )
                  }
                  disabled={currentQuestionIdx === report.technicalQuestions?.length - 1}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        );

      case 'behavioral':
        return (
          <div className="content-view">
            <div className="question-display">
              <div className="question-header">
                <span className="question-label">Behavioral Question {currentQuestionIdx + 1}</span>
                <span className="question-badge">
                  {currentQuestionIdx + 1} / {report.behavioralQuestions?.length || 0}
                </span>
              </div>
              <div className="question-content">
                <div className="question-section">
                  <h4>Question:</h4>
                  <p>{report.behavioralQuestions?.[currentQuestionIdx]?.question || 'No question available'}</p>
                </div>
                <div className="question-section">
                  <h4>Interview Intention:</h4>
                  <p>{report.behavioralQuestions?.[currentQuestionIdx]?.intention || 'No intention available'}</p>
                </div>
                <div className="question-section">
                  <h4>How to Answer:</h4>
                  <p>{report.behavioralQuestions?.[currentQuestionIdx]?.answer || 'No answer available'}</p>
                </div>
              </div>
              <div className="question-navigation">
                <button
                  className="nav-btn prev"
                  onClick={() =>
                    setCurrentQuestionIdx(Math.max(0, currentQuestionIdx - 1))
                  }
                  disabled={currentQuestionIdx === 0}
                >
                  ← Previous
                </button>
                <button
                  className="nav-btn next"
                  onClick={() =>
                    setCurrentQuestionIdx(
                      Math.min(report.behavioralQuestions?.length - 1, currentQuestionIdx + 1)
                    )
                  }
                  disabled={currentQuestionIdx === report.behavioralQuestions?.length - 1}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        );

      case 'roadmap':
        return (
          <div className="content-view">
            <div className="roadmap-display">
              <div className="roadmap-header">
                <h3>Your Preparation Plan</h3>
                <p className="roadmap-subtitle">
                  Follow this structured plan to prepare for your interview
                </p>
              </div>
              <div className="roadmap-timeline">
                {report.preparationPlan?.map((plan, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-marker">
                      <div className="marker-dot"></div>
                    </div>
                    <div className="timeline-content">
                      <div className="plan-header">
                        <h4>Day {plan.day}</h4>
                        <span className="focus-tag">{plan.focus}</span>
                      </div>
                      <ul className="tasks-list">
                        {plan.tasks?.map((task, taskIdx) => (
                          <li key={taskIdx}>
                            <span className="task-icon">✓</span>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="content-view">
            <div className="overview-display">
              <div className="score-display">
                <div className="score-circle">
                  <span className="score-number">{report.matchScore}</span>
                  <span className="score-label">Match Score</span>
                </div>
              </div>
              <div className="overview-stats">
                <div className="stat-item">
                  <span className="stat-label">Technical Questions</span>
                  <span className="stat-value">{report.technicalQuestions?.length || 0}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Behavioral Questions</span>
                  <span className="stat-value">{report.behavioralQuestions?.length || 0}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Preparation Days</span>
                  <span className="stat-value">{report.preparationPlan?.length || 0}</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="interview-container">
      <div className="interview-wrapper">
        {/* Left Panel - Questions */}
        <aside className="interview-left-panel">
          <div className="questions-panel">
            <div className="panel-header">
              <h3>Interview Guide</h3>
            </div>

            <div className="panel-content">
              {/* Technical Questions Section */}
              <div className="section">
                <button
                  className={`section-title ${activeView === 'technical' ? 'active' : ''}`}
                  onClick={() => setActiveView('technical')}
                >
                  <span className="icon">❓</span>
                  Technical Questions
                  <span className="count">{report.technicalQuestions?.length || 0}</span>
                </button>
                {activeView === 'technical' && (
                  <div className="questions-list">
                    {report.technicalQuestions?.map((question, idx) => (
                      <div key={idx} className="question-item">
                        <span className="question-number">{idx + 1}.</span>
                        <span className="question-text">{question.question}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Behavioral Questions Section */}
              <div className="section">
                <button
                  className={`section-title ${activeView === 'behavioral' ? 'active' : ''}`}
                  onClick={() => setActiveView('behavioral')}
                >
                  <span className="icon">💬</span>
                  Behavioral Questions
                  <span className="count">{report.behavioralQuestions?.length || 0}</span>
                </button>
                {activeView === 'behavioral' && (
                  <div className="questions-list">
                    {report.behavioralQuestions?.map((question, idx) => (
                      <div key={idx} className="question-item">
                        <span className="question-number">{idx + 1}.</span>
                        <span className="question-text">{question.question}</span>
                      </div>
                    ))}
                  </div>
                )}
                <button className="button primary button " onClick={() => {getResumePdf(interviewId)}}>
                  <svg height={"0.8 rem"} style={{marginRight: "o.8rem"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
                  Download Ai genereted resume
                  </button>
              </div>

              {/* Preparation Plan Section */}
              <div className="section">
                <button
                  className={`section-title ${activeView === 'roadmap' ? 'active' : ''}`}
                  onClick={() => setActiveView('roadmap')}
                >
                  <span className="icon">🗂️</span>
                  Preparation Plan
                  <span className="count">{report.preparationPlan?.length || 0}</span>
                </button>
                {activeView === 'roadmap' && (
                  <div className="roadmap-list">
                    {report.preparationPlan?.map((plan, idx) => (
                      <div key={idx} className="roadmap-item">
                        <div className="day-number">Day {plan.day}</div>
                        <div className="day-focus">{plan.focus}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Center Panel - Main Content */}
        <section className="interview-center-panel">
          <div className="main-content-panel">
            <div className="panel-header">
              <h2>Interview Content</h2>
            </div>
            <div className="panel-content">
              {renderContent()}
            </div>
          </div>
        </section>

        {/* Right Panel - Skill Gaps */}
        <aside className="interview-right-panel">
          <div className="skill-gaps-panel">
            <div className="panel-header">
              <h3>Skill Gaps</h3>
            </div>
            <div className="panel-content">
              {report.skillGaps && report.skillGaps.length > 0 ? (
                <div className="skills-list">
                  {report.skillGaps.map((gap, idx) => (
                    <div key={idx} className="skill-item">
                      <div className="skill-name">{gap.skill}</div>
                      <div className={`skill-severity severity-${gap.severity}`}>
                        {gap.severity.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-skills">No skill gaps identified</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Interview;