import { globalCss } from '.'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    overflow: 'hidden',
  },

  body: {
    '-webkit-font-smoothing': 'antialised',
    backgroundColor: '$neutral900',
  },

  'body, input, textarea, button': {
    fontFamily: '$default',
    fontWeight: '$regular',
    lineHeight: '$base',

    color: '$white',
  },
})
