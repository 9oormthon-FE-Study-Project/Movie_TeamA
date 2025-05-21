# Movie_TeamA

영화 리뷰 확인 사이트

React + TypeScript + Vite + Tailwind CSS 기반으로 제작되었습니다.

## 실행방법

```bash
# 1. 레포지토리 클론
git clone https://github.com/your-id/movie_project.git
cd movie_project

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev
```

## Prettier 설정 방법

1. Ctrl + , 눌러 VS Code 설정창 띄우기
2. 검색창에 Editor: Default Formatter를 입력한 후 None을 Prettier - Code formatter로 바꾸기
3. 검색창에 Editor: Format on Save를 입력한 후 빈 박스 체크하기기

```bash
# 4. Prettier 패키지 설치
npm install -D prettier prettier-plugin-tailwindcss
```

## Eslint 설정 방법

```bash
# 1. Eslint 패키지 설치
npm install -D eslint @eslint/js eslint-config-prettier eslint-import-resolver-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-tailwindcss prettier typescript-eslint
```

---

## 폴더 구조 요약

| 폴더 이름     | 역할 설명                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| `api/`        | 서버와 통신할 때 사용하는 **axios 설정 파일**과 **API 요청 함수들**을 넣는 폴더입니다.                 |
| `assets/`     | 이미지, 아이콘(SVG), 로고 등 **정적인 리소스 파일**을 보관하는 폴더입니다.                             |
| `components/` | 버튼, 카드, 모달처럼 **여러 페이지에서 공통으로 사용하는 UI 컴포넌트**들을 모아두는 폴더입니다.        |
| `pages/`      | 실제 라우터로 연결되는 **페이지 단위 컴포넌트들**이 위치하며, 화면별로 나눠 구성합니다.                |
| `store/`      | **Zustand, Recoil, Redux** 등 전역 상태 관리와 관련된 코드들을 정리해두는 폴더입니다.                  |
| `utils/`      | 날짜 포맷팅, 배열 정렬, 중복 제거 등 **어디서든 재사용 가능한 유틸리티 함수들**을 모아두는 폴더입니다. |
