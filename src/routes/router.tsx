import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import WelcomePage from '../pages/WelcomePage.tsx'
import StudentApplication from '../pages/application/public/StudentApplication.tsx'
import StaffApplication from '../pages/application/public/StaffApplication.tsx'
import ApplicationFailed from '../pages/application/public/ApplicationFailed.tsx'
import ApplicationSubmitted from '../pages/application/public/ApplicationSubmitted.tsx'
import HomePage from '../pages/HomePage.tsx'
import ProtectedRoute from '../wrappers/ProtectedRoute.tsx'
import Permissions from '../constants/permissions.ts'
import StaffApplicationDetail from '../pages/application/private/StaffApplicationDetail.tsx'
import VerifyThenPassword from '../pages/application/public/VerifyThenPassword.tsx'
import StudentApplicationDetail from '../pages/application/private/StudentApplicationDetial.tsx'
import CoursesPage from '../pages/coursesManagement/CoursesPage.tsx'
import ApplicationsClosed from '../pages/application/public/ApplicationsClosed.tsx'
import CourseDetail from '../pages/coursesManagement/CourseDetail.tsx'
import ApplicationsRender from '../pages/application/private/ApplicationsRender.tsx'

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
        path: '/application/closed',
        element: <ApplicationsClosed />,
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
            <ApplicationsRender of="staff" />
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
            <ApplicationsRender of="students" />
          </ProtectedRoute>
        ),
      },
      {
        path: '/student/application/:id',
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
        path: '/staff/application/:id',
        element: (
          <ProtectedRoute
            permissionsRequired={[
              Permissions.AcceptStaffApplications,
              Permissions.ReadStaffApplications,
            ]}
          >
            {/* <StaffApplicationDetail justRead={false} /> */}
            <StaffApplicationDetail justRead={false} />
          </ProtectedRoute>
        ),
      },
      {
        path: '/staff/read-application/:id',
        element: (
          <ProtectedRoute permissionsRequired={[Permissions.ReadStaffApplications]}>
            {/* <StaffApplicationDetail justRead={true} /> */}
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
        path: '/verify',
        element: <VerifyThenPassword />,
      },
      {
        path: '/courses',
        element: (
          <ProtectedRoute
            permissionsRequired={[
              Permissions.EditCourses,
              Permissions.ReadCourses,
              Permissions.CreateCourses,
              Permissions.CreateCourseEnrolments,
            ]}
          >
            <CoursesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/course/:id',
        element: (
          <ProtectedRoute
            permissionsRequired={[
              Permissions.EditCourses,
              Permissions.ReadCourses,
              Permissions.CreateCourses,
              Permissions.CreateCourseEnrolments,
            ]}
          >
            <CourseDetail />
          </ProtectedRoute>
        ),
      },
    ],
  },
])

export default router
