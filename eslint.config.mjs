import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
// import reactPlugin from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});
const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    "eslint:recommended",
    "plugin:react/recommended"
  ),
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "react/no-unused-state": "warn",
      "no-unused-vars": "off", // отключаем стандартное правило
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": "error",
      "react/react-in-jsx-scope": "off",
      '@next/next/no-img-element': 'off',
      'consistent-return': 'error',
      'semi': ['warn', 'always'],
      'eqeqeq': ['warn', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'eol-last': ['warn', 'always'],
    },
  },
];

export default eslintConfig;
