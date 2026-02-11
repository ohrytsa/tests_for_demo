module.exports = {
  extends: ["react-app", "react-app/jest"],
  rules: {
    "no-console": "warn",
    "no-debugger": "error",
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-duplicate-imports": "error",
    "prefer-const": "warn",
    "no-var": "error",

    "react/jsx-no-duplicate-props": "error",
    "react/jsx-key": "error",
    "react/no-array-index-key": "warn",
    "react/self-closing-comp": "warn",
    "react/jsx-curly-brace-presence": [
      "warn",
      { props: "never", children: "never" },
    ],

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    eqeqeq: ["error", "always"],
    curly: ["warn", "all"],
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-return-await": "warn",

    "arrow-body-style": ["warn", "as-needed"],
    "object-shorthand": "warn",
    "prefer-template": "warn",
  },
  overrides: [
    {
      files: ["**/*.test.js", "**/*.test.jsx", "**/tests/**"],
      rules: {
        "no-console": "off",
      },
    },
  ],
};
