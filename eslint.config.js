const sharedRules = {
  "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  "no-undef": "error",
  "no-var": "error",
  "prefer-const": "error",
  eqeqeq: ["error", "always"],
};

export default [
  {
    files: ["js/**/*.js", "scripts/**/*.js", "i18n/**/*.js", "data/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        fetch: "readonly",
        IntersectionObserver: "readonly",
        MutationObserver: "readonly",
        Event: "readonly",
        CustomEvent: "readonly",
        Element: "readonly",
        localStorage: "readonly",
        console: "readonly",
        process: "readonly",
      },
    },
    rules: sharedRules,
  },
  {
    files: ["js/consent-default.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        window: "readonly",
        localStorage: "readonly",
      },
    },
    rules: {
      ...sharedRules,
      "no-var": "off",
    },
  },
  {
    files: ["api/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
        fetch: "readonly",
        URL: "readonly",
        Buffer: "readonly",
      },
    },
    rules: sharedRules,
  },
];
