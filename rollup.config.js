import resolve from '@rollup/plugin-node-resolve';

export default {

    input: './dist/lib/script.js',

    watch: {
        clearScreen: false
    },

    output: {
        file: './dist/browser/script.js',
        format: 'cjs',
    },

    plugins: [
        resolve(),
    ]
};