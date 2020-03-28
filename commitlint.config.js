// git commit -m 'type(scope): Reference message'
// Example: git commit -m 'feat(webbooking): SL-11005 Return public key stripe to web booking'

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [1, 'always', 120],
    'type-enum': [2, 'always', [
      'build', // Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
      'ci', // Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
      'docs', // Documentation only changes
      'feat', // A new feature
      'fix', // A bug fix
      'perf', // A code change that improves performance
      'refactor', // A code change that neither fixes a bug nor adds a feature
      'revert',
      'style', // Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
      'test' // Adding missing tests or correcting existing tests
    ]],
    'scope-empty': [1, 'never'],
    'references-empty': [1, 'never'],
    'subject-case': [2, 'always', [
      'sentence-case', 'start-case', 'pascal-case', 'upper-case', 'kebab-case'
    ]]
  },
  parserPreset: {
    parserOpts: {
      issuePrefixes: ['SL-', 'KAN-', 'QBA-', 'QS-']
    }
  }
};
  
