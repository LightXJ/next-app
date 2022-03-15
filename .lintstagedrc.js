module.exports = {
  '*.{js,jsx,ts,tsx}': ["eslint --fix --max-warnings 10"],
  '*.{ts,tsx}': [() => "tsc --skipLibCheck --noEmit"]
}