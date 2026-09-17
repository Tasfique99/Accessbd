import { useAccess } from '../context/AppProviders'

export function useSettings() {
  return useAccess()
}
