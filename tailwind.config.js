/** @type {import('tailwindcss').Config} */

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
        'text-center'
    ],
    theme: {
        extend: {
            colors: {
                primary: '#73BA9B',
                accent: {
                    light: '#D5F2E3',
                    dark: '#003E1F',
                    warm: '#F24318'
                },
                neutral: {
                    light: '#F7FDFA',
                    medium: '#A4D6BF',
                    dark: '#01110A'
                },
                complement: {
                    soft: '#F9B19F',
                    medium: '#F68265',
                    deep: '#C1300B'
                },
                success: '#00E070',
                warning: '#FCB85F',
                danger: '#CB231A'
            },
            fontSize: {
                xs: '0.8rem',
                sm: '0.9rem',
                base: '1rem',
                md: '1.25rem',
                lg: '1.4rem',
                xl: '1.5rem',
                '2xl': '1.75rem',
                '3xl': '2rem',
                '4xl': '2.25rem',
                '5xl': '2.5rem',
                '6xl': '3rem',

            },
            screens: {
                xs: '480px',
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1920px'
            },
            fontFamily: {
                base: ['Montserrat', 'Arial', 'sans-serif']
            }
        }
    },
    plugins: [],
};