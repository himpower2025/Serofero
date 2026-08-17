# Serofero — 출시 전 내부 점검 체크리스트

이 문서는 **앱 내부(코드/설정/Firebase)** 기준입니다. D-U-N-S, 개발자 계정 등
외부 절차는 포함하지 않습니다.

---

## A. 코드에서 이미 처리된 항목 (추가 작업 불필요)

| 항목 | 내용 |
|---|---|
| 가상 알림 제거 | 로그인 12초 후 자동으로 뜨던 "Rajesh Kaji" 가짜 메시지 삭제 |
| Trade Alert Simulator 제거 | 장바구니의 "Price -10% / Mark Sold / Reset" 데모 버튼 및 함수 삭제 |
| 실제 가격 알림 구현 | Firestore 스냅샷 비교로 진짜 가격 인하·판매완료 시에만 알림 |
| 목업 데이터 제거 | `constants.ts` 삭제. 가짜 매물·가짜 판매자 폴백 없음 → 로딩/에러/빈 상태 화면 |
| Vicinity Circles | 가짜 커뮤니티 글 2건 삭제 → "준비 중" 안내로 교체 |
| 죽은 버튼 제거 | 동작하지 않던 "Continue with Phone" 삭제 |
| 검색 기능 구현 | 헤더 검색창이 실제로 필터링(제목·설명·지역·카테고리), 모바일 검색 토글 추가 |
| 헤더 아이콘 | Bell → 장바구니, Menu → 프로필로 연결 (기존엔 무동작) |
| Safety Guide | 무동작 버튼 → 실제 안전 거래 안내 모달 |
| Sign in with Apple | iOS 심사 4.8 대응 코드 추가 (웹/네이티브 양쪽) |
| 신고·문의 실제 전송 | localStorage → Firestore `reports` / `support_tickets` 컬렉션 |
| 계정 삭제 | 매물 + 채팅 + 문의까지 서버에서 삭제 후 계정 삭제 |
| 프로필 실데이터 | 하드코딩된 이메일·전화번호·"Ward 3" 제거 → 실제 로그인 계정 정보 |
| 약관·방침 | 전면 재작성 (수집 항목·Firebase·Gemini·위치·보관기간·삭제 절차 명시) |
| 앱 내 약관 중복 제거 | 요약 + 공개 URL 링크 방식으로 통일 (두 버전이 어긋날 수 없음) |
| 보안 규칙 | `firestore.rules`, `storage.rules`, `firestore.indexes.json`, `firebase.json` 신규 작성 |
| Vercel API | `api/generate-description.js` + `vercel.json` 추가 (AI 설명 기능 복구) |
| 푸시 정리 | 미사용 `@capacitor/push-notifications` 제거, iOS `remote-notification` 백그라운드 모드 및 안드로이드 `POST_NOTIFICATIONS` 제거 |
| 버전 통일 | package.json / Android `versionName` / iOS `MARKETING_VERSION` 모두 1.0.0 |
| `.env.example` | 실제 사용하는 `VITE_FIREBASE_*` + `GEMINI_API_KEY`로 갱신 |

---

## B. 직접 하셔야 하는 일 (우선순위 순)

### 1. 이메일 주소 확정 — 다른 모든 작업의 선행조건 ⚠️

`public/privacy.html`, `public/terms.html` 안에 **`[SUPPORT_EMAIL]`** 이라는
자리표시자를 4군데 넣어 두었습니다. 실제 주소로 바꿔주세요.

- 기존 `privacy@sero.com`, `legal@sero.com`은 **보유하지 않은 도메인**이라 그대로
  두면 심사에서 걸립니다.
- 회사 도메인 메일(`support@himpower.com.np` 등)이 준비되면 그것이 가장 좋고,
  아직이면 우선 `himpower2025@gmail.com`으로 채운 뒤 나중에 교체해도 됩니다.

```bash
# 예시 (macOS/Linux)
sed -i '' 's/\[SUPPORT_EMAIL\]/support@himpower.com.np/g' public/privacy.html public/terms.html
```

### 2. Firebase 보안 규칙 배포 — 이걸 안 하면 앱이 아예 동작하지 않습니다 ⚠️

Firestore를 **Production mode**로 만드셨기 때문에 현재 기본 규칙은
"모든 읽기·쓰기 차단"입니다. 즉 지금 배포된 앱은 매물이 하나도 안 보입니다.

```bash
npm install -g firebase-tools
firebase login
firebase use serofero-6651b
firebase deploy --only firestore:rules,firestore:indexes,storage
```

배포 후 Firebase 콘솔 → Firestore → 규칙 탭에서 실제로 반영됐는지 확인하세요.

### 3. Firestore 복합 인덱스 생성

위 명령의 `firestore:indexes`가 자동 생성합니다. 생성에 몇 분 걸리며,
콘솔 → Firestore → 색인 탭에서 상태가 **사용 설정됨**이 될 때까지 기다리세요.
이게 없으면 **채팅 탭 전체가 실패**합니다.

### 4. Firebase Storage 활성화 (Blaze 요금제)

사진 업로드에 Cloud Storage가 필요하고, 2026년 2월부터는 무료 사용량
범위라도 **Blaze(종량제) 플랜**으로 업그레이드해야 활성화됩니다.
콘솔 → Storage → 시작하기. 예산 알림을 함께 설정해 두시길 권합니다.

### 5. Vercel 환경변수 설정

Vercel → 프로젝트 → Settings → Environment Variables에 아래를 등록
(Production/Preview 모두):

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
GEMINI_API_KEY          ← VITE_ 접두사 절대 붙이지 마세요 (붙이면 키가 공개됩니다)
```

`VITE_FIREBASE_*` 값은 Firebase 콘솔 → 프로젝트 설정 → 내 앱 → 웹 앱 구성에서
그대로 복사하면 됩니다.

### 6. Firebase 인증 공급업체 설정

콘솔 → Authentication → Sign-in method:

- **Google** — 사용 설정 (이미 되어 있을 것)
- **Apple** — 사용 설정 필요. Apple Developer 계정에서 Service ID, Key ID,
  Team ID, 개인 키(.p8)를 만들어 Firebase에 입력해야 합니다.
  (Apple 개발자 계정 승인 후 가능하므로 D-U-N-S 절차 완료 후 작업)
- **승인된 도메인**에 `serofero-pink.vercel.app` 추가

> Apple 로그인 버튼 코드는 이미 넣어두었습니다. 위 설정을 마치기 전까지는
> iOS/웹에서 버튼을 누르면 오류가 납니다. **App Store 제출 전에는 반드시
> 완료**해야 하고(가이드라인 4.8), 그 전에 테스트하실 거면 잠시
> `LoginScreen`의 `showAppleLogin`을 `false`로 두셔도 됩니다.

### 7. Android 릴리스 서명 키 생성

현재 `android/app/build.gradle`에 릴리스 서명 설정이 없습니다.
Play Store 업로드용 키스토어를 만들고 `signingConfigs`를 추가해야 합니다.
**키스토어 파일과 비밀번호는 절대 Git에 올리지 마세요.** 분실하면 앱 업데이트가
영구히 불가능합니다.

### 8. Play Console "데이터 보안" 양식 / App Store "앱 개인정보 보호"

새로 쓴 개인정보처리방침과 **정확히 일치**하게 신고해야 합니다. 실제 수집 항목:

| 항목 | 용도 | 계정 연결 |
|---|---|---|
| 이름·이메일·프로필 사진 | 계정 생성 | 예 |
| 사진 | 매물 등록 | 예 |
| 대략적 위치 | 주변 매물 표시 (앱 사용 중에만) | 아니오 |
| 메시지 | 거래 채팅 | 예 |
| 사용자 생성 콘텐츠 | 매물, 신고 | 예 |

"데이터 삭제 요청 URL"에는 앱 내 삭제 경로(Profile → Compliance Center →
Delete Account)와 지원 이메일을 함께 기재하세요.

### 9. 심사자용 테스트 계정 제공

Google/Apple 로그인만 있으므로 심사자가 로그인할 수 없습니다.
App Store Connect·Play Console의 심사 메모에 **테스트용 Google 계정
아이디/비밀번호**를 반드시 적어주세요. 이것 때문에 리젝되는 경우가 매우 흔합니다.

### 10. 신고 접수 확인 루틴

`reports` 컬렉션에 신고가 쌓입니다. 약관에 **24시간 내 검토**라고 명시했으므로
실제로 매일 확인할 수 있는 방법(Firebase 콘솔 북마크, 또는 Cloud Function으로
이메일 알림)을 정해두세요. 심사자가 실제로 신고를 넣어보고 확인하기도 합니다.

### 11. 실기기 최종 확인

```bash
npm run cap:sync
npm run cap:android   # Android Studio
npm run cap:ios       # Xcode (Mac 필요)
```

확인할 것: 로그인 → 사진 촬영/선택 후 매물 등록 → 다른 계정으로 채팅 →
신고/차단 → 계정 삭제 → 재로그인 시 데이터가 실제로 사라졌는지.

---

## C. 남아 있는 알려진 한계 (출시 차단 요소는 아님)

- **차단 목록이 기기 로컬 저장**입니다. 앱을 재설치하면 초기화됩니다.
  심사 통과에는 문제없지만, 향후 Firestore로 옮기는 편이 좋습니다.
- **Trust Score가 서버에 저장되지 않습니다.** 새로고침하면 초기화됩니다.
  현재는 표시용 지표에 가깝습니다.
- **판매자 정보가 매물 문서에 복제 저장**됩니다. 사용자가 이름/사진을 바꿔도
  기존 매물에는 반영되지 않습니다.
- **JS 번들 1.26MB(gzip 334KB)** — 네팔 모바일 회선에서는 첫 로딩이 느릴 수
  있습니다. 코드 스플리팅으로 개선 여지가 있습니다.
- **푸시 알림은 앱이 열려 있을 때만** 동작합니다(웹 Notification API).
  진짜 백그라운드 푸시가 필요하면 FCM을 별도로 붙여야 하며, 그때 iOS
  `remote-notification` 백그라운드 모드를 다시 추가해야 합니다.
