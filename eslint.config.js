{
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true,
    "node": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "parser": "@typescript-eslint/parser",
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "plugins": ["react", "react-hooks", "@typescript-eslint"],
  "rules": {
    // Best practices
    "dot-notation": "error",
    "no-floating-decimal": "error",
    "no-sequences": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "warn",

    // Stylistic
    "array-bracket-spacing": "error",
    "computed-property-spacing": ["error", "never"],
    "curly": "error",
    "no-lonely-if": "error",
    "no-unneeded-ternary": "error",
    "one-var-declaration-per-line": "error",
    // ES6
    "array-callback-return": "off",
    "prefer-const": "error",
    // Imports
    "import/prefer-default-export": "off",
    "sort-imports": [
      "error",
      {
        "ignoreCase": true,
        "ignoreDeclarationSort": true
      }
    ],
    "tailwindcss/no-contradicting-classname": "off",
    "no-unused-expressions": "off",
    "no-prototype-builtins": "off",
    // REACT
    "react/jsx-uses-react": "off",
    "react/jsx-sort-props": "off",
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/href-no-hash": [0],
    "react/display-name": 0,
    "react/no-deprecated": "error",
    "react/no-unsafe": [
      "error",
      {
        "checkAliases": true
      }
    ],
    // "no-undef": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": 0
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
