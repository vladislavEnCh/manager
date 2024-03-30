import type { Config } from 'tailwindcss';

import { COLORS } from './src/shared/constants/color.constants';

const config: Config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
        './src/shared/radix/**/*.{js,ts,jsx,tsx,mdx}',
        './src/shared/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/custom.css'
    ],
    theme: {
        extend: {
            colors: COLORS,
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
            }
        },
        screens: {
            sm: '576',
            'sm-max': { max: '576px' },
            md: '76px',
            'md-max': { max: '76px' },
            lg: '992px',
            'lg-max': { max: '992px' },
            xl: '1200px',
            'xl-max': { max: '1200px' }
        }
    },
    plugins: []
};
export default config;
