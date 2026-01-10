import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import WelcomePage from '../pages/WelcomePage.tsx'
import StudentApplication from '../pages/StudentApplication.tsx'
import StaffApplication from '../pages/StaffApplication.tsx'
import ApplicationFailed from '../pages/ApplicationFailed.tsx'
import ApplicationSubmitted from '../pages/ApplicationSubmitted.tsx'
import HomePage from '../pages/HomePage.tsx'
import ProtectedRoute from '../wrappers/ProtectedRoute.tsx'
import StaffApplications from '../pages/StaffApplications.tsx'
import Permissions from '../constants/permissions.ts'
import StudentApplications from '../pages/StudentApplications.tsx'
import AcceptedStaff from '../pages/AcceptedStaff.tsx'
import AcceptedStudents from '../pages/AcceptedStudents.tsx'

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
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/staff/applications',
        element: (
          <ProtectedRoute
            permissionsRequired={[
              Permissions.ReadStaffApplications,
              Permissions.AcceptStaffApplications,
            ]}
          >
            <StaffApplications />
          </ProtectedRoute>
        ),
      },
      {
        path: '/student/applications',
        element: (
          <ProtectedRoute
            permissionsRequired={[
              Permissions.ReadStudentApplications,
              Permissions.AcceptStudentApplications,
            ]}
          >
            <StudentApplications />
          </ProtectedRoute>
        ),
      },
      {
        path: '/staff/accepted',
        element: (
          <ProtectedRoute permissionsRequired={[Permissions.CreateStaffUsers]}>
            <AcceptedStaff />
          </ProtectedRoute>
        ),
      },
      {
        path: '/students/accepted',
        element: (
          <ProtectedRoute permissionsRequired={[Permissions.CreateStudentUsers]}>
            <AcceptedStudents />
          </ProtectedRoute>
        ),
      },
    ],
  },
])

export default router
