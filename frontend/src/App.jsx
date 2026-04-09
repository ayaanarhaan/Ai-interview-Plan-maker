import React from 'react'
import { RouterProvider } from "react-router-dom"
import { router } from "./app.routes"
import { AuthProvider } from './features/auth/auth.context'
import { InterviewProvider } from './features/interviews/interview.context'


export default function App() {
  return (
    <>
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
    </>
  )
}