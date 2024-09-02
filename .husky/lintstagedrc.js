module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': [],
  'package.json': [],
  '*.vue': ['stylelint --fix'],
  '*.{scss,less,styl,css,html}': ['stylelint --fix'],
  '*.md': [],
  '*.hbs': []
}
