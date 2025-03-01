export default [
  {
    languageOptions: { globals: globals.browser },
    ...pluginJs.configs.recommended,

    extends: ["eslint:recommended", "plugin:prettier/recommended"],

    rules: {
      "prettier/prettier": "error",
    },
  },
];
