const path = require('path');

module.exports = {
    extends: [
        'airbnb',
        'plugin:react/recommended',
        'plugin:i18n-json/recommended',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:jest/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    globals: {
        __DEV__: true,
        window: true,
        videojs: true,
        FormData: true,
        fetch: true,
        jest: true,
        alert: true,
        document: false,
        File: true,
        EventSource: true,
        Audio: true,
    },
    env: {
        jest: true,
        browser: true,
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
        extraFileExtensions: ['.json'],
    },
    plugins: ['react-native', '@typescript-eslint', 'prettier', 'react-hooks'],
    rules: {
        'react/jsx-props-no-spreading': 'off',
        'import/extensions': 'off', // REUIRED FOR TYPESCRIPT
        quotes: ['error', 'single', { allowTemplateLiterals: false }],
        'no-restricted-modules': [2, { patterns: ['../*'] }], // TODO: uncomment in next PR with automatic changed imports
        'prettier/prettier': 'error',
        'react/destructuring-assignment': 0,
        'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.tsx'] }],
        'object-curly-newline': 0, // sometimes object fits into one line
        'function-paren-newline': 0, // prettier doesn't have a config for this
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'off', // Event if we set to warn it will be refactored when commit which is not always needed
        'jsx-a11y/no-autofocus': 'off',
        'consistent-return': 0,
        'prefer-arrow-callback': 'error',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/media-has-caption': 0, // Most of our media are dynamically loaded and we don't currently have anything to dynamically generate track objects
        'react/jsx-wrap-multilines': ['error', { declaration: false, assignment: false }],
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'valid-typeof': 0, // Conflicts with i18next/no-literal-string
        'react/prop-types': [2, { ignore: ['navigation', 'history', 'location', 't'] }],
        '@typescript-eslint/naming-convention': 1,
        '@typescript-eslint/indent': 'off',
        'i18next/no-literal-string': 'off',
        'i18n-json/valid-message-syntax': [
            2,
            {
                syntax: path.resolve('./i18n/i18n.messageValidation'),
            },
        ],
        'i18n-json/valid-json': 2,
        'i18n-json/sorted-keys': 0,
        'i18n-json/identical-keys': 0,
        'linebreak-style': 0, // Git converts linebreak to CRLF for Windows
        'class-methods-use-this': 0,
        'no-underscore-dangle': [2, { allow: ['__'] }], // allow __ for Ramda
        // TODO: Enable camelcase validation in future
        camelcase: 'off',
        curly: 2,
        'no-alert': 0,
        'import/no-extraneous-dependencies': [
            2,
            {
                devDependencies: [
                    '**/*.stories.js',
                    '**/*.stories.ts',
                    '**/*.stories.tsx',
                    '**/*.test.js',
                    '**/*.test.ts',
                    '**/*.test.tsx',
                    '**/scripts/*.js',
                    '__tests__/setup.js',
                ],
            },
        ],
        'react/jsx-one-expression-per-line': 'off',
        'react-native/no-unused-styles': 2,
        'react-native/no-inline-styles': 2,
        'react-native/no-raw-text': 0, // unuseful for web
        'jsx-a11y/label-has-for': [
            2,
            {
                components: ['Form.Input'],
                required: {
                    every: ['nesting', 'id'],
                },
            },
        ],
        'jsx-a11y/label-has-associated-control': [
            2,
            {
                labelAttributes: ['label'],
                controlComponents: ['Form.Input'],
            },
        ],
        'no-unused-vars': ['error', { varsIgnorePattern: 'i18n' }],

        // Overrides default config, because airbnb don't use type annotations:
        // Enforce component methods order https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/sort-comp.md
        'react/sort-comp': [
            'error',
            {
                order: [
                    'navigationOptions',
                    'static-methods',
                    'type-annotations',
                    'getters',
                    'instance-variables',
                    'setters',
                    'lifecycle',
                    '/^on.+$/',
                    '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
                    'instance-methods',
                    'everything-else',
                    'rendering',
                ],
                groups: {
                    lifecycle: [
                        'displayName',
                        'propTypes',
                        'contextTypes',
                        'childContextTypes',
                        'mixins',
                        'statics',
                        'defaultProps',
                        'constructor',
                        'getDefaultProps',
                        'getInitialState',
                        'state',
                        'getChildContext',
                        'componentWillMount',
                        'componentDidMount',
                        'componentWillReceiveProps',
                        'shouldComponentUpdate',
                        'componentWillUpdate',
                        'componentDidUpdate',
                        'componentWillUnmount',
                    ],
                    rendering: ['/^render.+$/', 'render'],
                },
            },
        ],
        'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
        'import/named': 'off',
        'jsx-a11y/control-has-associated-label': [0],
        'jsx-a11y/anchor-has-content': [0],
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [
                    ['@app', './app'],
                    ['@helpers', './app/helpers'],
                    ['@screen', './app/Screen'],
                    ['@component', './app/Component'],
                    ['@reducer', './app/Reducer'],
                    ['@i18n', './i18n'],
                    ['@shared', './app/shared'],
                    ['@ui', './app/ui'],
                    ['@modules', './app/modules'],
                    ['@screens', './app/screens'],
                    ['@store', './app/store'],
                    ['@assets', './app/assets'],
                    ['@saga', './app/saga'],
                    ['@components', './app/components'],
                    ['@tests', './__tests__'],
                    ['@navigation', './app/navigation'],
                ],
            },
            node: {
                extensions: ['.js', '.android.js', '.ios.js'],
            },
        },
    },
    overrides: [
        {
            files: ['*.d.ts'],
            rules: {
                'react/prefer-stateless-function': 'off',
            },
        },
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                'react/prop-types': 'off',
            },
        },
        {
            files: ['*.js', '*.jsx'],
            rules: {
                '@typescript-eslint/ban-types': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
    ],
};
