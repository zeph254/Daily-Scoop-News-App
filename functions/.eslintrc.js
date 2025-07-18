module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "quotes": ["error", "double"],
    "indent": ["error", 2],
    "max-len": ["error", {"code": 120}],
    "require-jsdoc": "off",
    "no-unused-vars": ["error", {"args": "none"}],
  },
  globals: {
    "admin": "readonly",
    "functions": "readonly",
    "require": "readonly",
    "module": "readonly",
    "exports": "readonly",
    "process": "readonly"
  },
};