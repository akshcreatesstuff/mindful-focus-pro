# Mindful Focus Pro

React, TypeScript, Vite, Redux Toolkit, React Router, Tailwind CSS 3 and Firebase.

## Run it

Needs Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

Then open the address Vite prints (usually http://localhost:5173).

## Colors, fonts and sizes

- Colors, the font and text sizes are set in `tailwind.config.js`.
- Shared styles such as `btn-primary`, `input`, `card` and `page` are in `src/index.css`.
- The Lexend font is loaded from Google Fonts in `index.html`.

## Set up login (Firebase)

All pages except `/login` need a logged-in user, so do this first.

1. Create a project in the [Firebase console](https://console.firebase.google.com/) and add a web app.
2. Under Authentication > Sign-in method, enable Email/Password and Google.
   Under Authentication > Settings > Authorized domains, make sure the domain you
   open the app on is listed (add `localhost` for local development).
3. Copy `.env.example` to `.env.local` and fill in the web app's `apiKey`, `authDomain` and `projectId`.
4. Restart `npm run dev`, open `/login` and choose "Create an account".

Protected routes only control what the app shows. Protect stored data with Firebase security rules.
