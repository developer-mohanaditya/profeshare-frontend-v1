// Plug-in for an EXISTING chat UI. Load after profeshare-client.js:
//   <script src="profeshare-client.js"></script><script src="profeshare-adapter.js"></script>
// Keeps conversation history, profile and posting, so follow-up questions just work.
(function (g) {
  const S = { history: [], profile: null, posting: "" };
  const P = () => g.Profeshare;
  const need = (what) => {
    if (what.includes("profile") && !S.profile) throw new Error("Add your CV/profile first.");
    if (what.includes("posting") && !S.posting) throw new Error("Paste a job posting first.");
  };
  const remember = (u, a) => S.history.push({ role: "user", content: u }, { role: "assistant", content: String(a).slice(0, 4000) });

  g.ProfeshareSession = {
    state: S,
    reset() { S.history = []; },
    setPosting(t) { S.posting = t; },
    setProfile(p) { S.profile = p; },
    async parseProfile(cvText) { S.profile = await P().parseProfile(cvText); return S.profile; },

    // Normal chat AND follow-ups: pass the user's text; tokens stream to onToken; resolves with the full reply.
    async ask(text, onToken) {
      S.history.push({ role: "user", content: text });
      try {
        const reply = await P().chatStream(S.history, { profile: S.profile, posting: S.posting, onToken });
        S.history.push({ role: "assistant", content: reply });
        return reply;
      } catch (e) { S.history.pop(); throw e; }
    },

    // Structured actions (optional buttons). Results are added to history so follow-ups can refer to them.
    async evaluate() {
      need("profile posting");
      const r = await P().evaluate(S.profile, S.posting);
      remember("Evaluate my fit for this job.",
        `Fit ${r.overall}/100 (${r.recommendation}). Strengths: ${(r.strengths || []).join("; ")}. Gaps: ${(r.gaps || []).join("; ")}.`);
      return r;
    },
    async apply() {
      need("profile posting");
      const r = await P().apply(S.profile, S.posting);
      remember("Tailor my CV and cover letter for this job.", `CV:\n${r.cv_markdown}\n\nCover letter:\n${r.cover_letter_markdown}`);
      return r;
    },
    async interviewPrep() {
      need("profile posting");
      const r = await P().interviewPrep(S.profile, S.posting);
      remember("Prepare me for the interview.", r.markdown);
      return r;
    },
  };
})(window);

// Conversational orchestration for the local UI. The backend API stays unchanged.
(function (g) {
  const session = g.ProfeshareSession;
  let expected = '', pending = [], retry = [];
  const originalReset = session.reset;
  session.reset = function () { originalReset.call(session); expected=''; pending=[]; retry=[]; };
  const notice = (text, content) => {
    session.state.history.push({role:'user',content:text},{role:'assistant',content});
    return {content};
  };
  const plan = text => {
    const t = text.toLowerCase().trim().replace(/[.!?]+$/, '');
    if (/^(?:please\s+)?(?:run (?:everything|all(?: the)?(?: response creation| responses| steps)?)|prepare my (?:full|complete) application|(?:create|generate) (?:my )?(?:full|complete) application(?: package)?)$/.test(t)) return ['evaluate','apply','interviewPrep'];
    if (/^(?:please\s+)?(?:(?:evaluate|assess|score|check|rate)\b.*\b(?:fit|match|job|role|posting)\b|am i (?:a )?(?:good )?(?:fit|match)\b.*|should i apply\b.*)/.test(t)) return ['evaluate'];
    if (/^(?:please\s+)?(?:(?:tailor|write|draft|create|generate|prepare)\b.*\b(?:cv|resume|cover letter|application documents)\b)/.test(t)) return ['apply'];
    if (/^(?:please\s+)?(?:(?:prepare|prep|help|practice)\b.*\binterview\b|interview prep(?:aration)?\b)/.test(t)) return ['interviewPrep'];
    return [];
  };
  session.converse = async function (text, {onToken,onStatus=()=>{},onResult=()=>{}}={}) {
    const input=text.trim();
    if (/^(cancel|stop|never mind|nevermind)$/i.test(input)) {
      expected='';pending=[];retry=[];return notice(input,'Cancelled. What would you like to work on next?');
    }
    if (/^(retry|try again)$/i.test(input) && retry.length) { pending=[...retry];retry=[]; }
    const cv = input.match(/^(?:here(?:'s| is) |this is )?(?:my )?(?:cv|resume|profile)\s*:\s*([\s\S]*)$/i);
    const job = input.match(/^(?:here(?:'s| is) |this is )?(?:the |my )?(?:job posting|job description|posting)\s*:\s*([\s\S]*)$/i);
    const addCv=/^(?:i (?:want|need|would like) to |please )?(?:add|update|replace|upload|share|provide) (?:my |a )?(?:cv|resume|profile)[.!]?$/i.test(input);
    const addJob=/^(?:i (?:want|need|would like) to |please )?(?:add|update|replace|share|provide) (?:the |my |a )?(?:job posting|job description|posting)[.!]?$/i.test(input);
    let confirmation='';
    if (cv || job || addCv || addJob) expected = cv || addCv ? 'profile' : 'posting';
    const explicitData = cv ? cv[1].trim() : job ? job[1].trim() : '';
    const newPlan=plan(input);
    if (newPlan.length && !cv && !job) { pending=newPlan;expected=''; }
    const waitingForData = expected && !newPlan.length;
    if (waitingForData) {
      const data=explicitData || (!(cv || job || addCv || addJob) ? input : '');
      if (!data) return notice(input,expected==='profile' ? 'Paste your CV text here. You can use multiple lines with Shift + Enter.' : 'Paste the full job posting here, including the responsibilities and requirements.');
      if (expected==='profile') {
        onStatus('Reading your CV…');
        const profile=await session.parseProfile(data);
        if (!profile || typeof profile!=='object' || Array.isArray(profile)) throw new Error('No profile returned. Please paste your CV again.');
        confirmation=`Your CV is ready${profile.name ? `, ${profile.name}` : ''}. `;
      } else {
        session.setPosting(data); confirmation='Your job posting is ready. ';
      }
      expected='';
    }
    if (pending.length) {
      if (!session.state.profile) {expected='profile';return notice(input,confirmation+'Paste your CV text here first. I’ll continue your request once I have it and the job posting.');}
      if (!session.state.posting) {expected='posting';return notice(input,confirmation+'Now paste the full job posting here. I’ll then continue your request.');}
      if (confirmation) notice(input,confirmation.trim());
      while (pending.length) {
        const action=pending[0];
        onStatus(action==='apply' ? 'Preparing your CV and cover letter… This can take 10–60 seconds.' : action==='evaluate' ? 'Evaluating your fit…' : 'Preparing your interview guide…');
        try {
          const result=await session[action]();
          if (!result || typeof result!=='object' || !Object.keys(result).length) throw new Error('The API returned an empty result. Please try again.');
          onResult({action,result});pending.shift();
        } catch(e) {retry=[...pending];pending=[];throw new Error((e.message || String(e))+' Type “retry” to continue from this step.');}
      }
      retry=[];return {content:'Your requested preparation is below. Ask me to explain or revise any part.'};
    }
    if (confirmation) return notice(input,confirmation+'What would you like to do next: assess your fit, tailor your application, or prepare for an interview?');
    const reply=await session.ask(input,onToken);
    return {content:reply || 'The API returned an empty reply. Please try again.'};
  };
})(window);
