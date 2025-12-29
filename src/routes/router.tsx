import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import WelcomePage from '../pages/welcome'

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
    ],
  },
])

export default router
