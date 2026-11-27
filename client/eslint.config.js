import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

const preservedLegacyFiles = [
  'dist',
  // Root-level page/component duplicates were kept from the original app but
  // are not part of the active route graph.
  'src/pages/*.jsx',
  'src/components/AdminGiftCardManager.jsx',
  'src/components/ErrorBoundary.jsx',
  'src/components/OptimizedImage.jsx',
  'src/components/PersistLogin.jsx',
  'src/components/StudentBills.jsx',
  'src/components/VideoPlayer.jsx',
  'src/components/admin/AdminSettingsPaymentsTab.jsx',
]

export default [
  { ignores: preservedLegacyFiles },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // Preserved screens include intentional stubs and legacy syntax patterns.
      'no-unused-vars': 'off',
      'no-case-declarations': 'off',
      'no-empty': 'off',
      'no-extra-semi': 'off',
      'no-prototype-builtins': 'off',
      'no-unreachable': 'off',
      'no-useless-escape': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
