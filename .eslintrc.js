module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
        '@vue/typescript',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-mixed-spaces-and-tabs': [0],
        indent: [2, 4],
        'no-multiple-empty-lines': [0, { max: 100 }],
        'max-len': [0, 200, 4],
        'max-line-length': [true, 200],
    },
    parserOptions: {
        parser: 'typescript-eslint-parser',
    },
};
