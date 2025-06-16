import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'

export default [
  // Base JavaScript configuration
  js.configs.recommended,

  // Vue files configuration
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
      globals: {
        $fetch: 'readonly',
        navigateTo: 'readonly',
        useRouter: 'readonly',
        useRoute: 'readonly',
        useRuntimeConfig: 'readonly',
        useNuxtApp: 'readonly',
        computed: 'readonly',
        ref: 'readonly',
        reactive: 'readonly',
        onMounted: 'readonly',
        onUnmounted: 'readonly',
        nextTick: 'readonly',
        watch: 'readonly',
        watchEffect: 'readonly',
        defineProps: 'readonly',
        defineEmits: 'readonly',
        definePageMeta: 'readonly',
        withDefaults: 'readonly',
        useAuthStore: 'readonly',
        useFeedStore: 'readonly',
        usePostStore: 'readonly',
        useProfileStore: 'readonly',
        useThemeStore: 'readonly',
        useToastStore: 'readonly',
        process: 'readonly',
        console: 'readonly',
        localStorage: 'readonly',
        document: 'readonly',
        window: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': typescript,
    },
    rules: {
      // Vue specific rules
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      // General rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-undef': 'off', // TypeScript handles this
      'no-unused-vars': 'off', // Use TypeScript version instead
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // TypeScript files configuration
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        $fetch: 'readonly',
        navigateTo: 'readonly',
        useRouter: 'readonly',
        useRoute: 'readonly',
        useRuntimeConfig: 'readonly',
        useNuxtApp: 'readonly',
        computed: 'readonly',
        ref: 'readonly',
        reactive: 'readonly',
        onMounted: 'readonly',
        onUnmounted: 'readonly',
        nextTick: 'readonly',
        watch: 'readonly',
        watchEffect: 'readonly',
        defineStore: 'readonly',
        readonly: 'readonly',
        process: 'readonly',
        console: 'readonly',
        localStorage: 'readonly',
        document: 'readonly',
        window: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      // General rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-undef': 'off', // TypeScript handles this
      'no-unused-vars': 'off', // Use TypeScript version instead
    },
  },

  // JavaScript files configuration
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        process: 'readonly',
        console: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        Buffer: 'readonly',
        localStorage: 'readonly',
        document: 'readonly',
        window: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
      },
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-unsafe-optional-chaining': 'off', // Allow for store files
      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  // Ignore patterns
  {
    ignores: [
      'node_modules/',
      '.nuxt/',
      '.output/',
      'dist/',
      '.nitro/',
      '.cache/',
      'logs/',
      '*.log',
      '.env*',
      '.vscode/',
      '.idea/',
      '.DS_Store',
      'Thumbs.db',
      'tmp/',
      'temp/',
      'coverage/',
      '.vercel/',
    ],
  },
]
