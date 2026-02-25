import useApplications from '../../../hooks/useApplications.ts'
import ApplicationsRender from '../../../components/ApplicationsRender.tsx'

export default function StaffApplications() {
  const { users, loading, error } = useApplications({ of: 'staff' })

  const formated = users.map(u => {
    const { staffProfile, ...clean } = u
    const applicationState: 'PENDING' | 'ACCEPTED' | 'REJECTED' =
      staffProfile.applicationState === 'PENDING_AS_STAFF'
        ? 'PENDING'
        : staffProfile.applicationState === 'ACCEPTED_AS_STAFF'
          ? 'ACCEPTED'
          : 'REJECTED'
    return {
      ...clean,
      applicationState,
    }
  })

  return <ApplicationsRender of="staff" users={formated} loading={loading} error={error} />
}
