# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

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
```

---

## 폴더 구조 요약

| 폴더 이름         | 역할 설명                                                              |
| ------------- | ------------------------------------------------------------------ |
| `api/`        | 서버와 통신할 때 사용하는 **axios 설정 파일**과 **API 요청 함수들**을 넣는 폴더입니다.          |
| `assets/`     | 이미지, 아이콘(SVG), 로고 등 **정적인 리소스 파일**을 보관하는 폴더입니다.                    |
| `components/` | 버튼, 카드, 모달처럼 **여러 페이지에서 공통으로 사용하는 UI 컴포넌트**들을 모아두는 폴더입니다.          |
| `pages/`      | 실제 라우터로 연결되는 **페이지 단위 컴포넌트들**이 위치하며, 화면별로 나눠 구성합니다.                |
| `store/`      | **Zustand, Recoil, Redux** 등 전역 상태 관리와 관련된 코드들을 정리해두는 폴더입니다.       |
| `types/`      | 전역에서 사용하는 **공통 타입 정의 (interface, type 등)**를 모아두는 폴더입니다.        |
| `utils/`      | 날짜 포맷팅, 배열 정렬, 중복 제거 등 **어디서든 재사용 가능한 유틸리티 함수들**을 모아두는 폴더입니다.      |

