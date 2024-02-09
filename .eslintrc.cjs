const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    root: true,

    ignorePatterns: [
        'node_modules'
    ],

    extends: [
        'plugin:promise/recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
    ],

    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: [__dirname + '/tsconfig.json']
    },

    rules: {
        // https://eslint.org/docs/rules/
        'no-return-assign': 'off',
        'no-console': isProduction ? 'error' : 'warn',
        'no-debugger': isProduction ? 'error' : 'warn',
        'semi': 'off',
        'indent': 'off',
        'no-void': 'off',
        'no-unused-expressions': 'off',
        'space-before-function-paren': [
            'error', {
                'anonymous': 'never',
                'named': 'never',
                'asyncArrow': 'always'
            }
        ],
        'no-trailing-spaces': 'warn',
        'no-any': 'off',
        'no-prototype-builtins': 'off',
        'no-unused-vars': 'off',
        'prefer-rest-params': 'warn',
        'no-extra-parens': 'off',
        'quotes': 'off',
        'func-call-spacing': 'off',
        'camelcase': 'off',
        'comma-spacing': 'off',
        'keyword-spacing': 'off',
        'object-curly-spacing': ['warn', 'always'],
        'comma-dangle': ['warn', 'never'],
        'max-len': ['warn', 120],
        'eqeqeq': 'error',
        'lines-between-class-members': 'off',

        // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules
        '@typescript-eslint/indent': ['warn', 4],
        '@typescript-eslint/semi': 'error',
        '@typescript-eslint/no-unused-expressions': 'error',
        '@typescript-eslint/quotes': ['warn', 'single'],
        '@typescript-eslint/no-extra-parens': 'error',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-useless-constructor': 'warn',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/explicit-module-boundary-types': ['error', {'allowArgumentsExplicitlyTypedAsAny': true}],
        '@typescript-eslint/prefer-nullish-coalescing': 'warn',
        '@typescript-eslint/prefer-optional-chain': 'warn',
        '@typescript-eslint/prefer-ts-expect-error': 'warn',
        '@typescript-eslint/promise-function-async': 'error',
        '@typescript-eslint/func-call-spacing': ['error', 'never'],
        '@typescript-eslint/comma-spacing': 'warn',
        '@typescript-eslint/keyword-spacing': 'warn',
        '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
        '@typescript-eslint/consistent-type-imports': ['error', {prefer: 'type-imports'}],
        '@typescript-eslint/member-delimiter-style': 'warn',
        '@typescript-eslint/type-annotation-spacing': 'warn',
        '@typescript-eslint/naming-convention': ['error',
            {
                selector: 'default',
                format: ['camelCase']
            },
            {
                selector: 'objectLiteralProperty',
                format: ['camelCase', 'PascalCase']
            },
            {
                selector: 'typeLike',
                format: ['PascalCase']
            },
            {
                selector: 'import',
                format: ['camelCase', 'PascalCase'],
            },
            {
                selector: 'parameter',
                format: null,
                filter: {
                    regex: '^_.*',
                    match: true
                }
            }
        ],
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/lines-between-class-members': 'off',
    }
};
