import { globalCss } from ".";

export const globalStyles = globalCss({
    '*': {
        margin: 0,
        padding: 0
    },

    body: {
        '-webkit-font-smoothing': 'antialised',
        backgroundColor: '$neutral-900'
    },

    'body, input, textarea, button': {
        fontFamily: '$inter',
        fontWeight: '$regular'
    }
})