module.exports = {
    style: {
        postOptions: {
            plugins: [require('tailwindcss'), require('autoprefixer')],
        },
    },
    eslint: {
        enable: false,
    },
};
