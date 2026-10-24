#!/bin/sh
set -eu
backend_dir='/Users/samarpankarra/Downloads/profeshare-job-api 2'
cd "$backend_dir"
export LLM_PROVIDER=codex-cli
export MOCK_LLM=0
export PYTHONDONTWRITEBYTECODE=1
exec .venv/bin/python -m uvicorn app.main:app --host 127.0.0.1 --port 8001
