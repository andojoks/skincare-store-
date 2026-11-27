import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist/**', 'public/assets/**', 'node_modules/**'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      {
        plugins: {
          'react-hooks': reactHooks,
          'react-refresh': reactRefresh,
        },
        rules: {
          ...reactHooks.configs.recommended.rules,
          // GSAP-driven effects intentionally keep latest values in refs and drive
          // visual state from layout effects to match the source bundle.
          'react-hooks/refs': 'off',
          'react-hooks/immutability': 'off',
          'react-hooks/set-state-in-effect': 'off',
          'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
          '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
          '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', fixStyle: 'separate-type-imports' }],
          'no-console': 'warn',
          'eqeqeq': ['error', 'always'],
        },
      },
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
  },
);
