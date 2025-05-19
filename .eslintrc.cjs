const path = require('path');

module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'standard',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
        project: './tsconfig.app.json',
        tsconfigRootDir: __dirname,
    },
    settings: {
        'import/resolver': {
            typescript: {
                project: path.resolve(__dirname, './tsconfig.app.json'),
            },
        },
    },
    plugins: ['react', '@typescript-eslint', 'import', 'simple-import-sort'],
    rules: {
        'dot-notation': 'off',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'import/no-unresolved': 'error',
        'import/no-default-export': 'off',
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/default': 'off',
        'no-void': 'off',
        'simple-import-sort/imports': [
        'error',
        {
            groups: [
                ['^react$', '^react', '^@?\\w+(-\\w+)*$'],

                ['^@?\\w'],

                ['^@components', '^@redux', '^@utils', '^@hooks', '^@/'],

                ['^\\u0000', '^\\.\\.(?!/?$)', '^\\.'],

                ['^.+\\.s?css$'],
            ],
        },
    ],
        'simple-import-sort/exports': 'error',
        'import/order': 'off',
        quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
        'react/jsx-quotes': ['off'],
        'no-useless-escape': 'off',
        semi: ['error', 'always'],
        indent: ['error', 4],
        'comma-dangle': ['error', 'always-multiline'],
    },
    ignorePatterns: [
        'redux/',
        'src/utils/request.ts',
        'src/utils/iconMap.ts',
        'assets/',
        'vite.config.ts',
        'node_modules/',
        'dist/',
        'public/',
    ],
};
