# Serofero — Firebase & 스토어 제출 설정 가이드

이 문서는 코드로 대신 처리할 수 없는, **사장님 계정으로 직접 하셔야 하는** 단계들만 정리한 것입니다. 코드는 이미 이 값들을 사용하도록 다 연결되어 있습니다 — 아래 값들을 채워 넣기만 하면 됩니다.

---

## 1. Firebase 프로젝트 만들기

1. https://console.firebase.google.com 접속 → **프로젝트 추가**
2. 프로젝트 이름 입력 (예: `serofero-prod`) → Google Analytics는 꺼도 무방합니다.
3. 생성 완료까지 대기.

## 2. 웹 앱 등록 → 설정 값 복사

1. 프로젝트 개요 옆 **⚙️ 프로젝트 설정** → **일반** 탭 → 아래로 스크롤 → **내 앱** → **</> (웹)** 아이콘 클릭
2. 앱 닉네임: `Serofero Web` 입력 → 등록
3. 화면에 아래처럼 생긴 `firebaseConfig` 객체가 나옵니다. 이 값을 그대로 복사해서

   **`src/firebase.ts`** 파일을 열고 `REPLACE_WITH_...` 부분을 실제 값으로 바꿔주세요.

   ```ts
   const firebaseConfig: FirebaseOptions = {
     apiKey: "...",              // 여기에 실제 값
     authDomain: "...",
     projectId: "...",
     storageBucket: "...",
     messagingSenderId: "...",
     appId: "...",
   };
   ```

   > 이 값은 비밀키가 아닙니다. Firebase 웹 앱은 원래 이 설정을 클라이언트에 그대로 노출합니다 (Gemini API 키와는 성격이 다릅니다). 실제 보안은 아래 5번 "Firestore 보안 규칙"에서 처리합니다.

## 3. Google 로그인 활성화

1. 왼쪽 메뉴 **Authentication** → **시작하기** (처음이면) → **Sign-in method** 탭
2. **Google** 선택 → 사용 설정 켜기 → 프로젝트 지원 이메일 선택 → 저장

이제 앱의 "Continue with Google" 버튼이 실제로 동작합니다.

## 4. Firestore 데이터베이스 만들기

1. 왼쪽 메뉴 **Firestore Database** → **데이터베이스 만들기**
2. 위치는 가까운 리전 선택 (예: `asia-south1` 뭄바이 — 네팔에서 제일 가까운 옵션 중 하나)
3. **프로덕션 모드**로 시작 (테스트 모드는 30일 후 전체 차단되므로 비추천)
4. Edition은 **Standard**로 선택 (Enterprise는 이 앱엔 불필요합니다)

## 5. Firestore 보안 규칙 적용

**Firestore Database → 규칙** 탭에서 기본 규칙을 아래로 교체하세요 (상품 목록 + 채팅 규칙 포함):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      // 누구나 목록은 볼 수 있음 (로그인 없이도 둘러보기 가능해야 UX가 자연스러움)
      allow read: if true;
      // 로그인한 사용자만 자기 자신을 seller.id로 해서 등록 가능
      allow create: if request.auth != null
                    && request.resource.data.seller.id == request.auth.uid;
      // 본인 리스팅만 수정/삭제 가능
      allow update, delete: if request.auth != null
                    && resource.data.seller.id == request.auth.uid;
    }

    match /chats/{chatId} {
      // 대화 당사자(구매자/판매자) 둘만 읽고 쓸 수 있음
      allow read, update: if request.auth != null
                    && request.auth.uid in resource.data.participantIds;
      allow create: if request.auth != null
                    && request.auth.uid in request.resource.data.participantIds;

      match /messages/{messageId} {
        allow read: if request.auth != null
                    && request.auth.uid in get(/databases/$(database)/documents/chats/$(chatId)).data.participantIds;
        // 본인 명의로만 메시지를 보낼 수 있음 (system 메시지는 대화 시작/완료 시 클라이언트가 대신 기록)
        allow create: if request.auth != null
                    && request.auth.uid in get(/databases/$(database)/documents/chats/$(chatId)).data.participantIds
                    && (request.resource.data.senderId == request.auth.uid || request.resource.data.senderId == 'system');
      }
    }
  }
}
```

**게시(Publish)** 버튼을 꼭 눌러주세요. 이 규칙 없이는 아무나 다른 사람 리스팅이나 채팅을 읽고 고칠 수 있습니다.

## 6. Firebase Storage 활성화 (사진 업로드용)

**중요**: 2026년 2월부터 Google 정책이 바뀌어서, 무료 사용량 안에 있어도 Cloud Storage를 쓰려면 **Blaze(종량제) 요금제로 업그레이드하고 결제 수단(카드)을 연결**해야 합니다. 무료 한도(월 5GB 저장, 북미 기준 100GB 전송) 안에서는 실제 청구는 되지 않지만, 카드 등록 자체는 필수입니다. 이건 결제 수단 연결이라 제가 대신 해드릴 수 없는 단계입니다.

1. Firebase 콘솔 왼쪽 하단 **요금제 업그레이드** (또는 프로젝트 설정 → 사용량 및 결제) → **Blaze로 업그레이드** → 결제 수단 등록
2. 왼쪽 메뉴 **Storage (빌드 카테고리 안에 있음)** → **시작하기** → 위치는 Firestore와 같은 리전 선택 → 완료
3. **Storage → 규칙** 탭에서 기본 규칙을 아래로 교체 → Publish:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /listings/{sellerId}/{fileName} {
      // 누구나 리스팅 사진은 볼 수 있음
      allow read: if true;
      // 본인 명의 폴더에만, 5MB 이하 이미지 파일만 업로드 가능
      allow write: if request.auth != null
                   && request.auth.uid == sellerId
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

이 단계를 안 하면 "Sell" 화면에서 사진 추가 시 업로드 실패 에러가 뜹니다.

## 7. 네이티브 앱 등록 (Android / iOS 빌드에 필요)

Capacitor로 빌드한 네이티브 앱이 Firebase에 연결되려면, **웹 앱과 별도로** Android/iOS 앱을 Firebase에 등록해야 합니다.

### Android
1. 프로젝트 설정 → 내 앱 → **앱 추가 → Android**
2. 패키지 이름: `com.himpower.serofero` (반드시 `capacitor.config.ts`의 `appId`와 정확히 일치해야 합니다)
3. `google-services.json` 다운로드 → 프로젝트의 `android/app/google-services.json` 위치에 저장
4. SHA-1 인증서 지문 등록 (네이티브 Google 로그인에 필수):
   ```
   cd android && ./gradlew signingReport
   ```
   출력된 `SHA1` 값을 Firebase 콘솔의 해당 Android 앱 설정에 추가하세요.

### iOS
1. 프로젝트 설정 → 내 앱 → **앱 추가 → iOS**
2. 번들 ID: `com.himpower.serofero`
3. `GoogleService-Info.plist` 다운로드 → Xcode에서 `ios/App/App/` 폴더에 추가 (Xcode로 `ios/App/App.xcworkspace` 열어서 드래그 앤 드롭, "Copy items if needed" 체크)
4. `GoogleService-Info.plist` 안의 `REVERSED_CLIENT_ID` 값을 복사 → Xcode에서 `ios/App/App/Info.plist` 열어서 URL Types에 URL Scheme으로 등록 (자세한 단계는 아래 "네이티브 Google 로그인" 참고)

## 8. 네이티브 Google 로그인 마무리 (앱에서 실제로 동작하게)

코드에는 이미 `@capacitor-firebase/authentication` 플러그인이 연결되어 있어서, **네이티브 앱에서는 자동으로 진짜 네이티브 Google 로그인 창이 뜨고, 웹 브라우저에서는 기존 팝업 방식이 그대로 동작**합니다. 다만 아래 설정 없이는 네이티브에서 실패합니다:

1. 위 7번의 `google-services.json` (Android), `GoogleService-Info.plist` (iOS) 등록이 먼저 되어 있어야 합니다.
2. **iOS만 추가로 필요**: `GoogleService-Info.plist`를 열어 `REVERSED_CLIENT_ID` 값(예: `com.googleusercontent.apps.123-abc`)을 복사 → Xcode에서 프로젝트 선택 → **Info** 탭 → **URL Types** → **+** → URL Schemes에 그 값을 붙여넣기.
3. Android는 3번의 SHA-1 등록만 되어 있으면 추가 설정이 필요 없습니다.

## 9. 로컬에서 테스트

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 접속 → "Continue with Google" 클릭 → 실제 Google 계정으로 로그인되는지 확인 → 상품 등록해보고 Firebase 콘솔의 Firestore Database에 실제로 문서가 생기는지, 사진이 Storage에 올라가는지 확인하세요.

## 10. 네이티브 앱으로 빌드하기 (실제 스토어 제출용)

이 단계부터는 각 플랫폼의 개발 도구가 필요합니다 (챗을 통해 원격으로 대신해 드릴 수 없는 부분입니다).

### Android (Windows/Mac/Linux 어디서나 가능 — Android Studio 필요)
```bash
npm run cap:android
```
Android Studio가 열리면: **Build → Generate Signed Bundle / APK** → keystore 생성(최초 1회, 안전하게 보관 필수 — 분실 시 업데이트 불가) → 서명된 `.aab` 생성 → [Google Play Console](https://play.google.com/console) (연 $25 등록비, 1회)에 업로드.

### iOS (**macOS + Xcode 필수**)
```bash
npm run cap:ios
```
Xcode가 열리면: 상단에서 Team 선택(Apple Developer 계정 필요, 연 $99) → **Product → Archive** → App Store Connect에 업로드 → [App Store Connect](https://appstoreconnect.apple.com)에서 심사 제출.

### 스토어 등록 시 필요한 URL
- 개인정보처리방침: `https://[배포한 도메인]/privacy.html`
- 이용약관: `https://[배포한 도메인]/terms.html`
(둘 다 이미 `public/` 폴더에 준비되어 있고, 어디에 배포하든 자동으로 저 경로에 뜹니다.)

---

## 아직 안 되어 있는 것 (다음 단계 후보)

- **AI 상품 설명 생성 기능**: `server/index.js`의 `/api/generate-description`을 실제로 어딘가(Cloud Run 등)에 배포해야 프로덕션에서 동작합니다.
- **채팅/거래완료 시 신뢰점수 시스템**: 채팅 메시지 자체는 이제 실시간 Firestore 연동이지만, "거래 완료 & 평가" 시 올라가는 신뢰점수(Sero Trust Score)는 아직 로컬 계산 로직입니다 (별도 요청 시 진행 가능).
