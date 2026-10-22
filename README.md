# profeshare-frontend-v1
profeshare-frontend-v1


## Frontend prototype

Open `index.html` through a static web server or Netlify. It launches
`profeshare-glass-chat-layout-20.html`; Discover, Library, and Community are
loaded from their sibling HTML files. Keep all image and document assets alongside them.

### Live chat

The frontend connects to `http://localhost:8001`, configured with
`window.PROFESHARE_API` in the main HTML. Load order is the client, adapter,
then the page script. The backend is maintained separately and is not included here.

Run the Profeshare Job API with `LLM_PROVIDER=codex-cli` and `MOCK_LLM=0`
on port 8001 using an authenticated local Codex CLI. The included
`start-profeshare-backend.command` is a helper for the original development
Mac; update its `backend_dir` for your local backend checkout before using it.

Type “Prepare my full application” in chat. The assistant requests CV and
job-posting text, then creates fit evaluation, tailored documents, and interview
preparation. Follow-ups use the shared conversation history. Enter sends;
Shift + Enter adds a line. Type “retry” after a failed workflow step.

A Netlify-hosted page configured for localhost requires the backend to be running
on the machine viewing it. Allow browser local-network access if prompted.
For other devices, configure a reachable backend URL and its allowed origins.

No frontend build step is required. External React, Babel, Tailwind, and font
resources are loaded by the existing HTML. Backend credentials are not included.
