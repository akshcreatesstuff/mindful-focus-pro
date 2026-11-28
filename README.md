# Mindful Focus Pro

React, TypeScript, Vite, Redux Toolkit, React Router, Tailwind CSS 3 and Firebase.

## Run it

Needs Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

Then open the address Vite prints (usually http://localhost:5173).

## Code structure (SOLID)

| Principle | Rule in this project |
|---|---|
| Single responsibility | A file does one job: page, markup, hook, state or provider code |
| Open/closed | Add pages in `src/app/pages.ts` and form modes in `features/auth/authModes.ts` |
| Liskov substitution | Any `AuthService` must keep the promises written in `features/auth/types.ts` |
| Interface segregation | Ask only for what you use: `AuthSession`, `PasswordAuth` or `GoogleAuth` |
| Dependency inversion | Screens use `useAuthService()`. Only `features/auth/firebase/`, `services/firebase.ts` and `main.tsx` deal with Firebase |

## Theme and practices

- Colors, fonts, sizes and layout are in `src/styles/theme.css`.
- Fonts (Cormorant Garamond and DM Mono) are loaded in `index.html`.
- The five practices are listed in `src/features/practices/practices.ts`; their text is in `content/`.
- The streak counts finished breathing and work sessions in total.

## Set up login (Firebase)

All pages except `/login` need a logged-in user, so do this first.

1. Create a project in the [Firebase console](https://console.firebase.google.com/) and add a web app.
2. Under Authentication > Sign-in method, enable Email/Password and Google.
   Under Authentication > Settings > Authorized domains, make sure the domain you
   open the app on is listed (add `localhost` for local development).
3. Copy `.env.example` to `.env.local` and fill in the web app's `apiKey`, `authDomain` and `projectId`.
4. Restart `npm run dev`, open `/login` and choose "Create an account".

Protected routes only control what the app shows. Protect stored data with Firebase security rules.

## Saved data (Firestore)

1. In the Firebase console, create a Firestore database in **production mode**.
2. Publish the security rules: paste `firestore.rules` into Firestore > Rules, or run
   `npx firebase-tools deploy --only firestore:rules --project YOUR_PROJECT_ID`.

| Data | Path | Who can read it through the app's rules |
|---|---|---|
| Email, last visit | `users/{uid}` | The user, admin |
| Streak, timers, checklists, history | `users/{uid}/data/progress` | The user, admin |
| Journal | `users/{uid}/journal/{entry}` | Only the user |

To make an account an admin, add a document in the console: collection `admins`, document ID
equal to that account's user UID (any field). The app has no admin screen; view data in the console.

Anyone with owner or database access to the Firebase project can see **all** data, including
journals, in the console. Security rules do not apply there. Users can also change their own
progress, so do not treat streaks as tamper-proof.

## AI journal (Gemini)

1. In the Firebase console, open **AI Logic**, choose **Gemini Developer API** and finish setup.
2. Add `VITE_FIREBASE_APP_ID` to `.env.local` and restart the app.
3. Do not put a Gemini API key in the app; Firebase keeps it on its servers.
4. Before real users, set up **App Check** and add `VITE_RECAPTCHA_SITE_KEY`.

The default model is `gemini-3.8-flash`. On the free tier, Google may use entries to improve its
products and human reviewers may read them. Move to the paid tier before collecting real journals.
