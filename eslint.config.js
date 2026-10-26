const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintConfigPrettier = require('eslint-config-prettier/flat');

// eslint-config-prettier last: it switches off ESLint style rules that clash with Prettier.
module.exports = defineConfig([expoConfig, eslintConfigPrettier, { ignores: ['dist/*'] }]);
