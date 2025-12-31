import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import WelcomePage from '../pages/welcome'
import StudentApplication from '../pages/StudentApplication.tsx'

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
    ],
  },
])

export default router
