// Drop-in client for the Profeshare Job API.
// Set window.PROFESHARE_API (default http://localhost:8000) and optionally window.PROFESHARE_KEY before use.
(function (g) {
  const base = () => (g.PROFESHARE_API || "http://localhost:8000").replace(/\/$/, "");
  const headers = () => { const h = { "Content-Type": "application/json" }; if (g.PROFESHARE_KEY) h["X-API-Key"] = g.PROFESHARE_KEY; return h; };
  const connectionError = () => {
    if (g.navigator && g.navigator.onLine === false) return new Error("You’re offline. Reconnect to the internet, then send your message again.");
    return new Error(`Could not connect to the AI service at ${base()}. The backend may be stopped, or your browser may be blocking access. Start the backend and allow local-network access for this site, then try again.`);
  };
  const serverError = async response => {
    let detail = (await response.text()).trim();
    try { const body = JSON.parse(detail); detail = typeof body.detail === 'string' ? body.detail : typeof body.message === 'string' ? body.message : detail; } catch (_) {}
    const reasons = {401: "The AI service requires authentication.", 403: "The AI service denied access.", 422: "The AI service could not process the supplied information.", 429: "The AI service is receiving too many requests. Wait a moment before retrying.", 502: "The AI backend could not generate a response.", 503: "The AI service is temporarily unavailable.", 504: "The AI service took too long to respond."};
    return new Error(`${reasons[response.status] || 'The AI service could not complete this request.'}${detail ? ' ' + detail : ''} (HTTP ${response.status})`);
  };
  // Local integration deadline: abort the actual request, including streamed reads.
  async function withDeadline(work, milliseconds = 180000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), milliseconds);
    try { return await work(controller.signal); }
    catch (e) {
      if (controller.signal.aborted) throw new Error("The AI service did not finish within 3 minutes. It may still be busy. Please try again in a moment.");
      if (e instanceof TypeError && /fetch|network|load failed|connection|terminated/i.test(e.message)) throw connectionError();
      if (e instanceof SyntaxError) throw new Error("The AI service returned an unreadable response. Please try again; if it repeats, check the backend logs.");
      throw e;
    } finally { clearTimeout(timer); }
  }
  async function post(path, body, signal) {
    const r = await fetch(base() + path, { method: "POST", headers: headers(), body: JSON.stringify(body), signal });
    if (!r.ok) throw await serverError(r);
    return r;
  }
  const json = (p, b) => withDeadline(async signal => (await post(p, b, signal)).json());

  // Streams a chat reply. onToken(text) is called per chunk; resolves with the full reply.
  async function streamReply(messages, opts = {}, signal) {
    const res = await post("/api/chat", { messages, profile: opts.profile, posting: opts.posting }, signal);
    const reader = res.body.getReader(), dec = new TextDecoder();
    let buf = "", full = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const parts = buf.split("\n\n"); buf = parts.pop();
      for (const p of parts) {
        const d = p.replace(/^data: /, "");
        if (d === "[DONE]") continue;
        const j = JSON.parse(d);
        if (j.error) throw new Error(j.error);
        full += j.t; if (opts.onToken) opts.onToken(j.t);
      }
    }
    return full;
  }
  const chatStream = (messages, opts = {}) => withDeadline(signal => streamReply(messages, opts, signal));

  g.Profeshare = {
    health: () => withDeadline(async signal => {
      const r = await fetch(base() + "/health", { signal });
      if (!r.ok) throw await serverError(r);
      return r.json();
    }, 12000),   // {ok, mode, live, model}
    parseProfile: (cvText) => json("/api/profile/parse", { cv_text: cvText }),
    evaluate: (profile, posting) => json("/api/evaluate", { profile, posting }),
    apply: (profile, posting) => json("/api/apply", { profile, posting }),
    interviewPrep: (profile, posting) => json("/api/interview-prep", { profile, posting }),
    chatStream,
  };
})(window);
