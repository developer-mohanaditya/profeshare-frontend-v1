// Drop-in client for the Profeshare Job API.
// Set window.PROFESHARE_API (default http://localhost:8000) and optionally window.PROFESHARE_KEY before use.
(function (g) {
  const base = () => (g.PROFESHARE_API || "http://localhost:8000").replace(/\/$/, "");
  const headers = () => { const h = { "Content-Type": "application/json" }; if (g.PROFESHARE_KEY) h["X-API-Key"] = g.PROFESHARE_KEY; return h; };
  // Local integration deadline: abort the actual request, including streamed reads.
  async function withDeadline(work, milliseconds = 180000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), milliseconds);
    try { return await work(controller.signal); }
    catch (e) {
      if (controller.signal.aborted) throw new Error("The API request timed out. Please try again.");
      throw e;
    } finally { clearTimeout(timer); }
  }
  async function post(path, body, signal) {
    const r = await fetch(base() + path, { method: "POST", headers: headers(), body: JSON.stringify(body), signal });
    if (!r.ok) throw new Error(r.status + " " + (await r.text()));
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
      if (!r.ok) throw new Error(r.status + " " + await r.text());
      return r.json();
    }, 12000),   // {ok, mode, live, model}
    parseProfile: (cvText) => json("/api/profile/parse", { cv_text: cvText }),
    evaluate: (profile, posting) => json("/api/evaluate", { profile, posting }),
    apply: (profile, posting) => json("/api/apply", { profile, posting }),
    interviewPrep: (profile, posting) => json("/api/interview-prep", { profile, posting }),
    chatStream,
  };
})(window);
