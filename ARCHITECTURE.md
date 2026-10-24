# Profeshare frontend

Open `index.html` or `profeshare-glass-chat-layout-20.html` in the project preview.

## Active implementation

- `app/v170-main.jsx` owns the React app, navigation, chat, Calendar, and Profile.
- `library.html`, `community.html`, and `discover.html` are embedded workspace pages.
- `profile.html` and `calendar.html` redirect to their routes in the main app.
- `profeshare-client.js` and `profeshare-adapter.js` connect the interface to the API.
- `styles/v170-audit.css` holds shared interface styling and accessibility refinements.
- `styles/workspace-glass.css` binds Calendar, Community, and Library to the same glass material.
- `styles/calendar-theme.css`, `styles/library-workspace.css`, and `styles/community-workspace.css` contain page refinements.
- `scripts/library-workspace.js` provides Library cards, uploads, filtering, and context actions.
- `scripts/v170-accessibility.js` provides shared accessibility behavior.

Root images, logo, resume, and research documents are referenced by active pages. The background is `image.png`. Artifact metadata alongside active pages is maintained by the design host.

## Build

Run `npm install`, then `npm run build` after changing the React source. The build writes `dist/profeshare-v170.js` and checks the workspace scripts and local HTML dependencies. Keep the bundle so the preview opens without a build step. React is loaded by the main HTML; esbuild is the only package required for this build.

## Backend

`start-profeshare-backend.command` and `scripts/start-ai-backend.sh` launch the existing backend from its external directory. Backend source is not included in this workspace.
