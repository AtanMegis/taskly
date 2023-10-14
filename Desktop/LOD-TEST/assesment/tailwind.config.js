/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: { clipCircle: 'circle(47.6% at 67% 18%)' },
    },
    plugins: [require('tailwind-clip-path')],
}
