import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/Home/Home.tsx'
import Classroom from './pages/Classroom/Classroom.tsx'

import './index.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home/>)
  },
  {
    path: "/classroom/:password",
    element: (<Classroom/>)
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
