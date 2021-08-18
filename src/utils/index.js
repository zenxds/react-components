export function getHashPath(href = window.location.href) {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  const hashIndex = href.indexOf('#')
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1).split('?')[0]
}

export * from './lang'
export * from './getPopupContainer'
