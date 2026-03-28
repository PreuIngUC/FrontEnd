import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import WelcomePage from '../pages/WelcomePage.tsx'
import StudentApplication from '../pages/application/public/StudentApplication.tsx'
import StaffApplication from '../pages/application/public/StaffApplication.tsx'
import ApplicationFailed from '../pages/application/public/ApplicationFailed.tsx'
import ApplicationSubmitted from '../pages/application/public/ApplicationSubmitted.tsx'
import HomePage from '../pages/HomePage.tsx'
import ProtectedRoute from '../wrappers/ProtectedRoute.tsx'
import StaffApplications from '../pages/application/private/StaffApplications.tsx'
import Permissions from '../constants/permissions.ts'
import StudentApplications from '../pages/application/private/StudentApplications.tsx'
import StaffApplicationDetail from '../pages/application/private/StaffApplicationDetail.tsx'
import VerifyThenPassword from '../pages/application/public/VerifyThenPassword.tsx'
import AcceptedApplications from '../pages/application/private/AcceptedApplications.tsx'
import StudentApplicationDetail from '../pages/application/private/StudentApplicationDetial.tsx'

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
        path: '/student/application/:rut',
        element: (
          <ProtectedRoute
            permissionsRequired={[
              Permissions.AcceptStudentApplications,
              Permissions.ReadStudentApplications,
            ]}
          >
            <StudentApplicationDetail justRead={false} />
          </ProtectedRoute>
        ),
      },
      {
        path: '/staff/application/:rut',
        element: (
          <ProtectedRoute
            permissionsRequired={[
              Permissions.AcceptStaffApplications,
              Permissions.ReadStaffApplications,
            ]}
          >
            <StaffApplicationDetail justRead={false} />
          </ProtectedRoute>
        ),
      },
      {
        path: '/staff/read-application/:id',
        element: (
          <ProtectedRoute permissionsRequired={[Permissions.ReadStaffApplications]}>
            <StaffApplicationDetail justRead={true} />
          </ProtectedRoute>
        ),
      },
      {
        path: '/student/read-application/:id',
        element: (
          <ProtectedRoute permissionsRequired={[Permissions.ReadStudentApplications]}>
            <StudentApplicationDetail justRead={true} />
          </ProtectedRoute>
        ),
      },
      {
        path: '/staff/accepted',
        element: (
          <ProtectedRoute permissionsRequired={[Permissions.CreateStaffUsers]}>
            <AcceptedApplications of="staff" />
          </ProtectedRoute>
        ),
      },
      {
        path: '/students/accepted',
        element: (
          <ProtectedRoute permissionsRequired={[Permissions.CreateStudentUsers]}>
            <AcceptedApplications of="students" />
          </ProtectedRoute>
        ),
      },
      {
        path: '/verify',
        element: <VerifyThenPassword />,
      },
    ],
  },
])

export default router
