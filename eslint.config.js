import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";


export default [
  {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    rules: {
      'indent': [
        'error',
        2
      ],
      'vue/no-v-model-argument': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-v-for-template-key': 'off',
      'vue/component-definition-name-casing': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-undef': 'off',
      'linebreak-style': 0,
      'quotes': [
        'error',
        'single'
      ],
      'semi': [
        'error',
        'never'
      ]
    },
    files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}
  },
];