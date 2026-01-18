import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import nxEslintPlugin from '@nx/eslint-plugin';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@nx': nxEslintPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: false,
          allow: [],
          depConstraints: [
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: ['type:hooks', 'type:i18n'],
            },
            {
              sourceTag: 'type:hooks',
              onlyDependOnLibsWithTags: [],
            },
            {
              sourceTag: 'type:i18n',
              onlyDependOnLibsWithTags: [],
            },
            {
              sourceTag: 'npm:private',
              onlyDependOnLibsWithTags: ['type:ui', 'type:hooks', 'type:i18n'],
            },
          ],
        },
      ],
    },
  },
)
