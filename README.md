<!-- # React + TypeScript + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
``` -->

# Memory Card Game

### This is a simple memory card game is using on free pokemon api
#### Website: https://pmcg.netlify.app/

- Mainly used for educational purpose
- Project is created using vite + react + typescript + sass
- Auto delete unused import
- Watch scss and auto created scss module
- Has PR workflow checking typescript and linting

```
Future todos:
- More pokemon generation
- Unit & integration testing
- Add sound effect
- Add scores/timer
- Maybe husky for commit check
```

Preview: 
<img width="1012" alt="Screenshot 2025-05-12 at 11 13 54 PM" src="https://github.com/user-attachments/assets/9d21d186-67f0-4b34-aa7a-5b0ee2798251" />
<img width="1012" alt="Screenshot 2025-05-12 at 11 14 21 PM" src="https://github.com/user-attachments/assets/16e3171a-ac1e-4cbc-90a6-a94ba98c74a6" />


