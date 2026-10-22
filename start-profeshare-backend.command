#!/bin/zsh
set -eu
# Runs the existing backend without installing packages or editing its files.
backend_dir='/Users/samarpankarra/Downloads/profeshare-job-api 2'
if curl --silent --fail --max-time 2 http://localhost:8001/health >/dev/null; then
  echo 'A backend is already running at http://localhost:8001. Open /health to check its mode.'
  exit 0
fi
umask 077
runtime_dir='/private/tmp/profeshare-codex-runtime'
mkdir -p "$runtime_dir"
if [[ -f "$HOME/.codex/auth.json" ]]; then
  cp "$HOME/.codex/auth.json" "$runtime_dir/auth.json"
  chmod 600 "$runtime_dir/auth.json"
fi
cd "$backend_dir"
echo 'Profeshare live backend: http://localhost:8001 — keep this terminal open. Ctrl+C stops it.'
exec env CODEX_HOME="$runtime_dir" PYTHONDONTWRITEBYTECODE=1 LLM_PROVIDER=codex-cli MOCK_LLM=0 ALLOWED_ORIGINS='*' "$backend_dir/.venv/bin/python" -B -m uvicorn app.main:app --host 127.0.0.1 --port 8001
