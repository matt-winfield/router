import {
  defaultGetScrollRestorationKey,
  restoreScroll,
  storageKey,
} from '@tanstack/router-core'
import { useRouter } from './useRouter'
import { ScriptOnce } from './ScriptOnce'
import { isServer } from '@tanstack/router-core/is-server'

export function ScrollRestoration() {
  const router = useRouter()
  const getKey =
    router.options.getScrollRestorationKey || defaultGetScrollRestorationKey
  const userKey = getKey(router.latestLocation)
  const resolvedKey =
    userKey !== defaultGetScrollRestorationKey(router.latestLocation)
      ? userKey
      : null

  if (!router.isScrollRestoring || !isServer) {
    return null
  }

  return (
    <ScriptOnce
      children={`(${restoreScroll.toString()})(${JSON.stringify(storageKey)},${JSON.stringify(resolvedKey)}, undefined, true)`}
    />
  )
}
