// eslint.config.ts
import js from '@eslint/js'
import globals from 'globals'

import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

import json from '@eslint/json'
import markdown from '@eslint/markdown'
import css from '@eslint/css'

import { defineConfig, globalIgnores } from 'eslint/config'

import prettier from 'eslint-config-prettier'

export default defineConfig([
  // Ignora lo que no quieres lintar globalmente
  globalIgnores([
    'dist/**',
    'node_modules/**',
    'package-lock.json',
    'eslint.config.ts',
    'tsconfig*.json', // <- aquí va lo que antes estaba en "excludedFiles"
  ]),

  // 1) React + TS/JS (código de app)
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      react.configs.flat.recommended,
      reactHooks.configs.flat['recommended-latest'],
      prettier,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      react: { version: 'detect' },
    },
    // plugins: {
    //   react,
    //   'react-hooks': reactHooks,
    // },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'max-len': [
        'error',
        { code: 100, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true },
      ],
      // 'semi': ['error', 'never'],
      // 'indent': ['error', 2],
      'react/forbid-dom-props': ['error', { forbid: ['style'] }],
      // Hooks
      // ...reactHooks.configs['recommended-latest'].rules,
      // React 17+ no necesita import React para JSX
      'react/react-in-jsx-scope': 'off',
      // (dejamos activa jsx-no-target-blank del preset)
    },
  },

  // 2) Archivos de tooling (Node)
  {
    files: ['vite.config.{ts,js}', 'eslint.config.{ts,js}'],
    extends: [js.configs.recommended, tseslint.configs.recommended, prettier],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
    },
    rules: {
      // semi: ['error', 'never'],
      // indent: ['error', 2],
    },
  },

  // 3) JSON (estricto), sin tsconfig* ni package-lock (ya ignorados globalmente)
  {
    files: ['**/*.json'],
    // plugins: { json },
    language: 'json/json',
    extends: [json.configs.recommended],
  },

  // 4) Markdown
  {
    files: ['**/*.md'],
    // plugins: { markdown },
    language: 'markdown/commonmark',
    extends: [markdown.configs.recommended],
  },

  // 5) CSS
  {
    files: ['**/*.css'],
    // plugins: { css },
    language: 'css/css',
    extends: [css.configs.recommended],
  },
])
