module.exports = {
  '*.{js,jsx,ts,tsx}': ["eslint --max-warnings 10"],
  '*.{ts,tsx}': "tsc-files -p tsconfig.json --noEmit --skipLibCheck typed-css.d.ts next-env.d.ts"
}