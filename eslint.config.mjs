import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { includeIgnoreFile } from '@eslint/compat';
import path from 'path';
import prettier from 'eslint-config-prettier';
import mochaPlugin from 'eslint-plugin-mocha';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.mocha,
        ...globals.node,
        artifacts: 'readonly',
        contract: 'readonly',
        web3: 'readonly',
        extendEnvironment: 'readonly',
        expect: 'readonly',
      },
    },
  },
  ...tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    mochaPlugin.configs.recommended,
    prettierRecommended,
  ),
  prettier,

  includeIgnoreFile(path.resolve(import.meta.dirname, '.gitignore')),
  {
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]);
