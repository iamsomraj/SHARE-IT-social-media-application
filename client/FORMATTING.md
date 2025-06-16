# Code Formatting and Linting Setup

This project uses **Prettier** for code formatting and **TypeScript** for type checking to ensure consistent code quality across the codebase.

## Tools Used

### 🎨 Prettier

- **Purpose**: Automatic code formatting
- **Configuration**: `.prettierrc`
- **Features**:
  - Single quotes
  - No semicolons
  - 2-space indentation
  - 80-character line width
  - Tailwind CSS class sorting
  - Vue SFC formatting

### 🔍 TypeScript

- **Purpose**: Type checking and static analysis
- **Configuration**: `tsconfig.json`
- **Features**:
  - Strict type checking
  - Vue SFC support
  - Modern ES modules
  - Nuxt 3 auto-imports

## Available Scripts

```bash
# Format all files with Prettier
npm run format

# Check if files are properly formatted
npm run lint:prettier

# Run TypeScript type checking
npm run lint:types

# Run all linting checks (formatting + types)
npm run lint

# Build the project (includes type checking)
npm run build
```

## Prettier Configuration

The project uses the following Prettier settings in `.prettierrc`:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 80,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "vueIndentScriptAndStyle": true,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

## IDE Integration

For the best development experience, install Prettier and TypeScript extensions in your IDE:

### VS Code Extensions

- **Prettier - Code formatter** (`esbenp.prettier-vscode`)
- **Vetur** or **Volar** for Vue support
- **TypeScript Vue Plugin** (`vue.vscode-typescript-vue-plugin`)

### VS Code Settings

Add these settings to your VS Code workspace or user settings:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## Pre-commit Hooks (Optional)

To automatically format code before commits, you can add a pre-commit hook:

```bash
# Install husky and lint-staged
npm install --save-dev husky lint-staged

# Add to package.json
{
  "lint-staged": {
    "*.{js,ts,vue}": ["prettier --write", "git add"],
    "*.{json,md}": ["prettier --write", "git add"]
  }
}
```

## File Structure

```
client/
├── .prettierrc          # Prettier configuration
├── .prettierignore      # Files to ignore during formatting
├── tsconfig.json        # TypeScript configuration
├── nuxt.config.ts       # Nuxt configuration
└── package.json         # Scripts and dependencies
```

## Best Practices

1. **Run formatting before committing**: `npm run format`
2. **Check types regularly**: `npm run lint:types`
3. **Use TypeScript interfaces**: Define proper types in `types/`
4. **Follow Vue 3 Composition API**: Use `<script setup lang="ts">`
5. **Use Pinia for state management**: Type-safe stores
6. **Handle null/undefined**: Use optional chaining and null checks

## Migration Notes

This project has been fully migrated to:

- ✅ TypeScript with strict type checking
- ✅ Vue 3 Composition API (`<script setup>`)
- ✅ Pinia state management (replaced Vuex)
- ✅ Modern formatting with Prettier
- ✅ Type-safe component props and emits
- ✅ Readonly arrays for immutability

All pages, components, and stores are now fully type-safe and follow modern Vue 3 best practices.
