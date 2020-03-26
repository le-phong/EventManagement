module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": ["error", {
            "allow": ["time", "timeEnd", "info", "error"]
        }],
        "camelcase": ["warn"],
        "prefer-promise-reject-errors": ["warn", {
        }],
        "no-inner-declarations": ["warn"],
        "no-unmodified-loop-condition": ["warn"],
        "no-useless-escape": ["warn"],
        "no-template-curly-in-string": ["warn"],
        "eol-last": ["warn"],
        "no-var": ["error"],
        "prefer-const": ["error"],
        "quote-props": ["error", "as-needed"]
    }
};