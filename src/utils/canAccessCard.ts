import type { ActionCardProps } from '../constants/actionCards.ts'
import type Permissions from '../constants/permissions.ts'

export default function canAccessCard(card: ActionCardProps, userPerms: Permissions[]) {
  if (card.permissions) return card.permissions.every(p => userPerms.includes(p))
  return true
}
