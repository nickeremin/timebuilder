/** @type {import("eslint").Linter.Config} */
module.exports = {
  plugins: ["@typescript-eslint"],
  extends: [
    "next",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:tailwindcss/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2015,
    sourceType: "module",
    project: true,
  },
  settings: {
    tailwindcss: {
      callees: ["cn"],
      config: "./tailwind.config.ts",
    },
    next: {
      rootDir: ["./"],
    },
  },
  root: true,
}
