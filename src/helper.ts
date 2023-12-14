export function transformElement(source: string, ossUrl: string, prefix: string) {
  const ossSplit = source.split(`${prefix}`)
  const filePath = ossSplit[1]
  return source.replace(`${prefix}${filePath}`, `${ossUrl}${filePath}`)
}

export function matchSrcWithOSS(input: string, elements: string[], prefix: string): string[] {
  const tagRegex = elements.join('|')
  const regex = new RegExp(`<(${tagRegex})[^>]+src="([^">]*${prefix}[^">]+)"`, 'g')
  const matches = input.match(regex) || []
  return matches
}
