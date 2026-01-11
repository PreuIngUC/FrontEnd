import useApplications from '../../../hooks/useApplications.ts'
import ApplicationsRender from '../../../components/ApplicationsRender.tsx'

export default function StudentApplications() {
  const { users, loading, error } = useApplications({ of: 'students' })

  const formated = users.map(u => {
    const { studentProfile, ...clean } = u
    const applicationState: 'PENDING' | 'ACCEPTED' | 'REJECTED' =
      studentProfile.applicationState === 'PENDING_AS_STUDENT'
        ? 'PENDING'
        : studentProfile.applicationState === 'ACCEPTED_AS_STUDENT'
          ? 'ACCEPTED'
          : 'REJECTED'
    return {
      ...clean,
      applicationState,
    }
  })

  return <ApplicationsRender of="staff" users={formated} loading={loading} error={error} />
}
