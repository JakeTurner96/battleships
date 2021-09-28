module.exports = {
    purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        flex: {
            cell: "0 0 9%",
        },
        padding: {
            cell: "9%",
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
