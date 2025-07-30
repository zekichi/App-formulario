import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Playfair Display', ...fontFamily.sans],
            },
            colors: {
                acento: '#7e4a35'
            },
        },
    },
}