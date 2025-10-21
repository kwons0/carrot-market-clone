# 🍃 거래해요, 동물의 숲

동물의 숲 캐릭터들이 중고거래 + SNS 방식으로 소통하는 컨셉의 웹 서비스입니다.
Next.js와 TypeScript로 제작된 당근마켓 + 트위터 스타일의 풀스택 클론 앱입니다.

🔗 배포 링크: https://carrot-market-clone-ten.vercel.app/browse


<br/>

## ✅ 프로젝트 개요

- 당근마켓과 트위터 기능을 결합해 구현한 중고거래 SNS 웹 서비스
- 단순 클론이 아닌, '동물의 숲 캐릭터가 거래한다'는 세계관 + UI 컨셉 적용
- Next.js App Router + Prisma + Zod + TailwindCSS 활용하여 회원관리, 게시글, 댓글, 좋아요, 검색 기능 구현

<br/>

## 📌 주요 기능

- 회원가입 · 로그인
  - zod로 실시간 유효성 검사, bcrypt 비밀번호 암호화, 중복 이메일 방지
- 홈 피드 (트윗형 게시글 UI)
  - 최신 게시글 5개 페이징, 댓글 수·좋아요 수 표시
- 글쓰기 & 이미지 업로드
  - 입력 시 미리보기 제공, 등록 후 상세페이지 자동 이동
- 댓글 & 좋아요 기능
  - 실시간 반영(페이지 새로고침 없이), 내 댓글은 삭제 가능
- 검색 기능
  - 입력한 키워드 기반 트윗/사용자 필터링, 실시간 탐색
- 마이 상점 (프로필 페이지)
  - 닉네임, 이메일, 소개글, 게시글 수/댓글 수/좋아요 수 표시
- 상점 정보 수정
  - 닉네임 중복 확인, 이메일 수정, 비밀번호 재확인, 이미지 미리보기 + 업로드 가능

<br/>


## 🛠 기술 스택
| 분야         | 사용 기술                                |
|--------------|-------------------------------------------|
| Framework    | Next.js (App Router)                     |
| Language     | TypeScript                               |
| Styling      | TailwindCSS                              |
| Database     | PostgreSQL + Prisma                      |
| Auth         | Custom Authentication (iron-session 기반)|
| Validation   | Zod                                       |
| Hashing      | bcrypt                                    |
| Deploy       | Vercel                                    |


<br/>

## 💡 테스트용 로그인 정보  
- 아이디: Isabelle@animal.co
- 이름: 여울
- 비밀번호: 12345  
로그인 후 동물들이 거래하는 현장을 구경하고, 자유롭게 글이나 댓글도 남겨보세요!

<br/>

## 📅 프로젝트 정보

- Date : 2024.12 (2주)
- Contribution: 디자인 100%, 개발 100%                                                                                
