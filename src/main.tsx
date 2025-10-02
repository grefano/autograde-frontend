import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/Home/Home.tsx'
import Classroom from './pages/Classroom/Classroom.tsx'
import { ProviderClassroom } from './ContextClassroom.tsx'

import './index.css'
import Code from './pages/Code/Code.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home/>)
  },
  {
    path: "/classroom/:paramPassword",
    element: (<ProviderClassroom><Classroom/></ProviderClassroom>)
  },
  {
    path: "/classroom/:paramPassword/code",
    element: (<ProviderClassroom><Code/></ProviderClassroom>)
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
