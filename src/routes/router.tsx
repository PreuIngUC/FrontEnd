import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import WelcomePage from '../pages/welcome'
import StudentApplication from '../pages/StudentApplication.tsx'
import StaffApplication from '../pages/StaffApplication.tsx'

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
    ],
  },
])

export default router
