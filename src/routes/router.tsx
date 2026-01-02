import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import WelcomePage from '../pages/welcome'
import StudentApplication from '../pages/StudentApplication.tsx'
import StaffApplication from '../pages/StaffApplication.tsx'
import ApplicationFailed from '../pages/ApplicationFailed.tsx'
import ApplicationSubmitted from '../pages/ApplicationSubmitted.tsx'

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
    ],
  },
])

export default router
