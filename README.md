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
- The streak is saved per account in this browser only. It goes up by one for each finished breathing or work session.

## Set up login (Firebase)

All pages except `/login` need a logged-in user, so do this first.

1. Create a project in the [Firebase console](https://console.firebase.google.com/) and add a web app.
2. Under Authentication > Sign-in method, enable Email/Password and Google.
   Under Authentication > Settings > Authorized domains, make sure the domain you
   open the app on is listed (add `localhost` for local development).
3. Copy `.env.example` to `.env.local` and fill in the web app's `apiKey`, `authDomain` and `projectId`.
4. Restart `npm run dev`, open `/login` and choose "Create an account".

Protected routes only control what the app shows. Protect stored data with Firebase security rules.
