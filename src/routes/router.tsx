import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import WelcomePage from '../pages/WelcomePage.tsx'
import StudentApplication from '../pages/StudentApplication.tsx'
import StaffApplication from '../pages/StaffApplication.tsx'
import ApplicationFailed from '../pages/ApplicationFailed.tsx'
import ApplicationSubmitted from '../pages/ApplicationSubmitted.tsx'
import HomePage from '../pages/HomePage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <></>,
    children: [
      {
        path: '/',
        element: <WelcomePage />,
      },
      {
        path: '/student/application',
        element: <StudentApplication />,
      },
      {
        path: '/staff/application',
        element: <StaffApplication />,
      },
      {
        path: '/application/failed',
        element: <ApplicationFailed />,
      },
      {
        path: '/application/submitted',
        element: <ApplicationSubmitted />,
      },
      {
        path: '/home',
        element: <HomePage />,
      },
    ],
  },
])

export default router
