import emojiRegex from 'emoji-regex'

export const DEFAULT_SERVER_LOCALE = 'root-AQ'
export const DEFAULT_SERVER_LOCALE_COUNTRY = 'AQ'

const ere = '(?:' + emojiRegex().source + ')'
const emojiPreRe = new RegExp('^' + ere, '')

const SPLIT_RE = new RegExp(`((?<!\\.(?:[a-zA-Z]{2,6}))\\s?\\/+\\s?|\\||\\s[-~:x×☆ᆞ]+\\s|\\s[Il]\\s|(?:[\\s⠀ㅤ¦[]|${ere})+(?![#0-9])\\p{Emoji}|(?<=(?!^)(?![#0-9])\\p{Emoji}).+|[・·•│]|(?<=(?:\\]|\\}))[-\\s]|ㅤ|kush|(?<=[】⏌」』]).)`, 'u')
const COMMA_SPLIT_RE = /(?:(?<!(?:\d+|Q))\+|,\s*|\.\s+)/u

function filterSplit(a: string) {
  const bits = a.split(SPLIT_RE)
    .map(b => b.trim())
    .filter(b => b !== '')

  return bits.length > 0 ? bits[0] : ''
}

function filterCommas(a: string) {
  const bits = a.split(COMMA_SPLIT_RE)
    .map(b => b.trim())
    .filter(b => b !== '')

  return bits.slice(0, 3).join(', ')
}

function equalReplace(a: string, ...res: [any, any][]) {
  let lastA: string

  do {
    lastA = a

    for (const re of res) {
      a = a.replace(re[0], re[1])
    }
  } while (a !== lastA)

  return a
}

const COUNTRY_PREFIX_RE = /^[[{(][a-zA-Z]{2,}(?:\/...?)*(?:\s.+?)?[\]})]/

const projectNameReplaces: [RegExp, string | Function][] = [
  [/^[\sㅤ]+/, ''],
  [/(?<=(?!(\d|#))\p{Emoji})(?!(\d|#))\p{Emoji}/u, ''],
  [/^\p{So}/u, ''],
  [/(\s|\u2800)+/gu, ' '],
  [/(?:[0-9]+\+|\+[0-9]+)\s*FPS/g, '+'], // FPS in name
  [/\^[0-9]/, ''], // any non-prefixed color codes
  [/[\])]\s*[[(].*$/, ']'], // suffixes after a tag
  [/,.*$/, ''], // a name usually doesn't contain a comma
  [COUNTRY_PREFIX_RE, ''], // country prefixes
  [emojiPreRe, ''], // emoji prefixes
]
const projectNamesReplacesExtra: [RegExp, string | Function][] = [
  [/[\p{Pe}】]/gu, ''],
  [/(?<!\d)[\p{Ps}【]/gu, ''],
]

export function filterServerProjectName(name: string | undefined | null): string {
  if (!name) {
    return ''
  }

  if (name.length >= 50) {
    name = name.substring(0, 50)
  }

  let colorPrefix = ''

  const filteredName = filterSplit(
    equalReplace(
      equalReplace(
        name,
        [/^\^[0-9]/, (regs: any) => { colorPrefix = regs; return '' }],
        ...projectNameReplaces,
      ),
      ...projectNamesReplacesExtra,
    ))

  return colorPrefix + filteredName.normalize('NFKD')
}

export function filterServerProjectDesc(a: string | undefined | null): string {
  if (!a) {
    return ''
  }

  if (a.length >= 125) {
    a = a.substring(0, 125)
  }

  return filterCommas(filterSplit(equalReplace(
    a,
    [/\^[0-9]/g, ''],
    [/^[\sㅤ]+/, ''],
    [COUNTRY_PREFIX_RE, ''],
    [emojiPreRe, ''], // emoji prefixes
  ))).replace(/(\s|\u2800)+/gu, ' ').normalize('NFKD')
}

export const SERVER_PRIVATE_CONNECT_ENDPOINT = 'https://private-placeholder.cfx.re/'

export function hasPrivateConnectEndpoint(endpoints?: string[] | null): boolean {
  if (!endpoints) {
    return false
  }

  return !notPrivateConnectEndpoint(endpoints[0])
}

export function notPrivateConnectEndpoint(endpoit: string): boolean {
  return endpoit !== SERVER_PRIVATE_CONNECT_ENDPOINT
}

