import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});
const eslintConfig = [
  ...compat.extends('next/core-web-vitals'),
  {
    rules: {
      '@next/next/no-img-element': 'off',
      'no-unused-vars': ['warn'],
      'consistent-return': 'error',
      'semi': ['error', 'always'],
      'eqeqeq': ['error', 'always'],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'eol-last': ['error', 'always'],
    },
  },
];

export default eslintConfig;
