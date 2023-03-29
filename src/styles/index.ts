import { createStitches } from "@stitches/react";

export const { 
    styled, 
    config, 
    createTheme, 
    getCssText, 
    globalCss, 
    css, 
    keyframes, 
    prefix, 
    reset, 
    theme 
} = createStitches({
    theme: {
        colors: {
            'white': '#FFFFFF',
            'black': '#171717',
            'primary-600': '#84F9FE',
            'primary-700': '#6AD9FB',
            'primary-800': '#52B0F7',
            'primary-900': '#3B7FF1',
            'neutral-100': '#A3A3A3',
            'neutral-200': '#6C6C6C',
            'neutral-300': '#616161',
            'neutral-400': '#565656',
            'neutral-500': '#4A4A4A',
            'neutral-600': '#3F3F3F',
            'neutral-700': '#343434',
            'neutral-800': '#282828',
            'neutral-900': '#1D1D1D',
            'success-50': '#F2FCF5',
            'success-100': '#CCF2D5',
            'success-200': '#98E4AB',
            'success-300': '#72DA8C',
            'success-400': '#4BD06D',
            'success-500': '#34C759',
            'success-600': '#2EAE4E',
            'success-700': '#217C38',
            'success-800': '#144B21',
            'success-900': '#07190B',
            'error-50': '#FFF3F2',
            'error-100': '#FFCECB',
            'error-200': '#FF9D98',
            'error-300': '#FF7871',
            'error-400': '#FF544A',
            'error-500': '#FF3B30',
            'error-600': '#FF170A',
            'error-700': '#BD0A00',
            'error-800': '#720600',
            'error-900': '#260200',
            'gray-100': '#F9FAFA',
            'gray-200': '#F4F4F6',
            'gray-300': '#E9E9EC',
            'gray-400': '#D2D3D9',
            'gray-500': '#BCBEC7',
            'gray-700': '#8F92A1',
        },
        fonts: {
            'dela-gothic': 'Dela Gothic One, cursive',
            'dm-sans': 'DM Sans, sans-serif',
            'inter': 'Inter, sans-serif'
        },
        fontSizes: {
            'headline-1': '58.9px',
            'headline-2': '44.2px',
            'headline-3': '33.2px',
            'headline-4': '24.9px',
            'headline-5': '18.7px',
            'caption-1': '12px',
            'body-1': '14px'
        },
        lineHeights: {
            'headline-1': '48px',
            'headline-2': '40px',
            'headline-3': '34px',
            'headline-4': '28px',
            'headline-5': '24px',
            'caption-1': '150%',
            'body-1': '150%'
        },
        fontWeights: {
            'regular': 400,
            'normal': 500,
            'bold': 700
        }
    }
})