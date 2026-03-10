# Portfolio (React + Firebase)

This portfolio now supports Firebase Hosting + Cloud Firestore as the primary content source.

If Firebase env vars are missing, the app automatically falls back to local static data in `src/data/portfolioData.js`.

## 1. Local setup

```bash
npm install
cp .env.example .env.local
```

Fill `.env.local` with values from Firebase Console > Project settings > Your apps > Web app config.

## 2. Firebase project setup

1. Create a Firebase project.
2. Enable Firestore Database (production mode).
3. Create a Web app in that project and copy config values into `.env.local`.
4. Set your project id in `.firebaserc`:

```json
{
  "projects": {
    "default": "your-real-project-id"
  }
}
```

## 3. Firestore structure

Create these collections:

- `profile` with doc `main`
- `siteConfig` with doc `main`
- `techStack`
- `stats`
- `experience`
- `projects`
- `updates`
- `blogPosts`

Recommended fields:

- `profile/main`:
  `brandInitial`, `brandName`, `brandAccent`, `openToWorkLabel`, `headingLead`, `headingHighlight`, `summary`, `resumeLabel`, `resumeUrl`, `email`, `phone`, `updatesHandle`, `footerText`, `socialLinks`
- `siteConfig/main`:
  `sectionIds` (array), `navItems` (array), optional `projectImages` (object)
- Collection docs:
  include `order` number for sorting.

## 4. Run locally

```bash
npm start
```

## 5. Deploy with GitHub Actions (recommended)

This repo includes a workflow at `.github/workflows/firebase-deploy.yml`.
It deploys Hosting + Firestore rules/indexes automatically on every push to `master` or `main`.

### Required GitHub repository secrets

1. `FIREBASE_PROJECT_ID`
2. `FIREBASE_SERVICE_ACCOUNT` (full JSON key content)
3. `REACT_APP_FIREBASE_API_KEY`
4. `REACT_APP_FIREBASE_AUTH_DOMAIN`
5. `REACT_APP_FIREBASE_PROJECT_ID`
6. `REACT_APP_FIREBASE_STORAGE_BUCKET`
7. `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
8. `REACT_APP_FIREBASE_APP_ID`

To get `FIREBASE_SERVICE_ACCOUNT`:

1. Open Firebase Console > Project settings > Service accounts.
2. Click **Generate new private key**.
3. Copy the whole JSON file content into the GitHub secret.

After secrets are added, push to `master`/`main` (or run the workflow manually from the Actions tab).

This deploys:

- Hosting config from `firebase.json`
- Firestore rules from `firestore.rules`
- Firestore indexes from `firestore.indexes.json`

## 6. Optional local deploy

```bash
npx firebase-tools login
npx firebase-tools use --add
npm run firebase:deploy
```

## Security note

Current `firestore.rules` are public read / no writes:

- `allow read: if true`
- `allow write: if false`

This is suitable for a public portfolio. Adjust rules later if you add authenticated admin writes.
