import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
    js.configs.recommended,
    {
        files: ['**/*.js'], // JS files
        ignores: ['**/*.config.js'], // ignore config files
        languageOptions: {
            globals: {
                process: 'readonly',
                console: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                module: 'readonly',
                require: 'readonly',
            },
        },
        plugins: {
            prettier: prettierPlugin, // <-- object, not array
        },
        rules: {
            indent: ['error', 4],
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            'linebreak-style': ['error', 'unix'],
            eqeqeq: ['error', 'always'],
            'max-len': ['error', { code: 100 }],
            'prettier/prettier': [
                'error',
                {
                    singleQuote: true,
                    semi: true,
                },
            ],
        },
    },
];
