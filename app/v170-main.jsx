
    const { useState, useEffect, useRef } = React;
    const CHAT_CLI_NAME = "Codex CLI";

    const Icons = {
      PanelCollapse: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16m7-11-3 3 3 3"/></svg>,
      PanelExpand: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16m4-11 3 3-3 3"/></svg>,
      Menu: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>,
      ArrowUp: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>,
      ArrowRight: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>,
      X: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
      Plus: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
      Paperclip: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>,
      Camera: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 4 16 7h4a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4l1.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>,
      Folder: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 5h6l2 2h10v12H3z"></path></svg>,
      Github: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.61-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.82a9.5 9.5 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.77c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"></path></svg>,
      Plug: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 22 3-3-3-3"></path><path d="M18 13V9a6 6 0 0 0-12 0v4"></path><path d="M8 2v4M16 2v4M5 13h14"></path></svg>,
      Globe: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"></path></svg>,
      MoreHorizontal: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" {...props}><circle cx="5" cy="12" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle></svg>,
      MessageSquare: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
      MapPin: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
      Briefcase: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>,
      DollarSign: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>,
      Bookmark: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>,
      User: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
      Users: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
      Edit: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>,
      Download: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>,
      ExternalLink: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>,
      Link: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>,
      Mail: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
      Phone: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
      Calendar: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
      Compass: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><polygon points="16 8 14 14 8 16 10 10 16 8"></polygon></svg>,
      Clock: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
      CheckCircle: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
      Circle: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle></svg>,
      Search: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
      Sliders: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>,
      ChevronLeft: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="15 18 9 12 15 6"></polyline></svg>,
      ChevronDown: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="6 9 12 15 18 9"></polyline></svg>,
      ChevronRight: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="9 18 15 12 9 6"></polyline></svg>,
      Award: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>,
      FileText: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
      Eye: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
      Upload: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>,
      Activity: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>,
      ThumbsUp: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M7 10v12"></path><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h3.76a2 2 0 0 0 1.8-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path></svg>,
      ThumbsDown: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17 14V2"></path><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.76a2 2 0 0 0-1.8 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"></path></svg>,
      Mic: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>,
    };

    const PROMPT_STARTERS = {
      Roles: [
        'Find product design internships at Apple, Figma or Google this summer.',
        'Remote senior backend engineer roles at Stripe-scale startups with equity.',
        'Entry-level data analyst jobs in Bangalore with hybrid WFH options.'
      ],
      Mentors: [
        'Connect with a senior UX researcher at Google for career mentoring.',
        'Find a fintech product strategy mentor who scaled Stripe\'s payments team.',
        'Need a design-to-PM transition mentor with experience from Airbnb.'
      ],
      Collaborators: [
        'Looking for a React Native developer for my AI-powered portfolio builder.',
        'Need a technical co-founder with B2B SaaS experience for my HR analytics platform.',
        'Find a computational linguist to collaborate on an NLP research paper.'
      ],
      Courses: [
        'DeepLearning.AI prompt engineering certificate on Coursera.',
        'IDF UX design certification with Don Norman — hands-on portfolio projects.',
        'Advanced SQL for analytics on DataCamp — window functions, CTEs, query tuning.'
      ],
      Events: [
        'AI/ML Hackathon by Google Cloud — $25K in prizes, remote participation.',
        'Bangalore Product Management meetup this Thursday at Whitefield.',
        'NeurIPS 2025 workshop sessions on LLM alignment — virtual attendance open.'
      ],
      Communities: [
        'Join Designers Guild — 45K+ product designers sharing daily UX critiques.',
        'Founder Circles — 12K SaaS founders doing weekly growth AMAs.',
        'Data Science Hub — 35K members with project showcases and peer code reviews.'
      ],
      Candidates: [
        'Shortlist senior backend engineers with Stripe/Razorpay payment experience.',
        'Find UX designers with 4+ years in fintech, open for founding product roles.',
        'Product designers from Figma/Apple looking for early-stage startup roles.'
      ]
    };

    const ContextMenuRow = ({ icon: Icon, mark, label, meta, chevron, selected, open, trailing, onClick, onMouseEnter, onMouseLeave, children, dataId }) => (
      <div className="context-menu-row-wrap" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <button
          type="button"
          role="menuitem"
          className={`context-menu-row ${open ? 'is-open' : ''}`}
          onClick={onClick}
          aria-haspopup={chevron ? 'menu' : undefined}
          aria-expanded={chevron ? !!open : undefined}
          aria-pressed={selected === undefined ? undefined : selected}
          data-od-id={dataId}
        >
          {Icon ? <Icon className="context-menu-icon" /> : <span className="context-menu-icon-mark">{mark}</span>}
          <span className="context-menu-label">{label}</span>
          {meta && <span className="context-menu-meta">{meta}</span>}
          {selected && !chevron && !trailing && <span className="context-menu-check" aria-hidden="true">✓</span>}
          {trailing}
          {chevron && <Icons.ChevronRight className="context-menu-chevron" />}
        </button>
        {children}
      </div>
    );

    const ChatComposer = ({
      input,
      setInput,
      handleKeyDown,
      handleSend,
      isGenerating,
      placeholderList,
      placeholderIndex,
      setIsInputFocused,
      ariaLabel = 'Search for a role or candidate',
      dataId = 'chat-composer'
    }) => {
      const [contextOpen, setContextOpen] = useState(false);
      const [connectorsOpen, setConnectorsOpen] = useState(false);
      const [addConnectorOpen, setAddConnectorOpen] = useState(false);
      const [webSearch, setWebSearch] = useState(true);
      const [connectorStates, setConnectorStates] = useState({ linkedin: false, gmail: false, calendar: false });
      const contextRef = useRef(null);
      const closeTimer = useRef(null);
      const supportsContextMenu = true;
      const api = React.useContext(ApiContext);
      const [listening,setListening] = useState(false);
      const [voiceError,setVoiceError] = useState('');
      const recognitionRef = useRef(null);
      const voiceBase = useRef('');
      useEffect(()=>()=>{ recognitionRef.current?.abort(); clearCloseTimer(); },[]);
      const toggleVoice = () => {
        if (listening) { recognitionRef.current?.stop(); return; }
        const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!Recognition) { setVoiceError('Voice input is unavailable in this browser. You can type your message.'); return; }
        setVoiceError('');
        const recognition = new Recognition();
        recognitionRef.current = recognition; voiceBase.current = input.trim();
        recognition.continuous = true; recognition.interimResults = true; recognition.lang = document.documentElement.lang || 'en';
        recognition.onstart = ()=>setListening(true);
        recognition.onend = ()=>setListening(false);
        recognition.onerror = event=>{setListening(false); if(['aborted','not-allowed','service-not-allowed'].includes(event.error)){setVoiceError('');return;}setVoiceError('Voice input stopped. Please try again or type your message.');};
        recognition.onresult = event=>{ const transcript=Array.from(event.results).map(result=>result[0].transcript).join(' ');setInput([voiceBase.current,transcript].filter(Boolean).join(' ')); };
        try { recognition.start(); } catch(error) { setListening(false);setVoiceError('Could not start voice input. Please try again.'); }
      };
      const sendMessage = () => { recognitionRef.current?.stop(); handleSend(); };

      const connectors = [
        { id: 'linkedin', label: 'LinkedIn', mark: 'in' },
        { id: 'gmail', label: 'Gmail', icon: Icons.Mail },
        { id: 'calendar', label: 'Google Calendar', icon: Icons.Calendar }
      ];

      const clearCloseTimer = () => {
        if (closeTimer.current) window.clearTimeout(closeTimer.current);
      };
      const closeNestedAfterDelay = (level) => {
        clearCloseTimer();
        closeTimer.current = window.setTimeout(() => {
          if (level === 'connectors') {
            setConnectorsOpen(false);
            setAddConnectorOpen(false);
          } else {
            setAddConnectorOpen(false);
          }
        }, 180);
      };
      const closeContextMenu = () => {
        setContextOpen(false);
        setConnectorsOpen(false);
        setAddConnectorOpen(false);
      };
      const chooseContextAction = (value) => {
        setInput(value);
        closeContextMenu();
      };

      useEffect(() => {
        if (!contextOpen) return undefined;
        const handleOutside = (event) => {
          if (!contextRef.current?.contains(event.target)) closeContextMenu();
        };
        const handleEscape = (event) => {
          if (event.key === 'Escape') closeContextMenu();
        };
        document.addEventListener('mousedown', handleOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
          document.removeEventListener('mousedown', handleOutside);
          document.removeEventListener('keydown', handleEscape);
          clearCloseTimer();
        };
      }, [contextOpen]);

      return (
      <div className="relative chat-input-box input-glass" data-od-id={dataId}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={event => { if(event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) recognitionRef.current?.stop(); handleKeyDown(event); }}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          placeholder="What role or candidate are you looking for?"
          aria-label={ariaLabel}
          rows={2}
          className="chat-input-field placeholder:text-transparent autofill:text-white caret-white"
        />
        {input.trim().length === 0 && (
          <div className="rotating-placeholder" aria-hidden="true">
            <span key={placeholderIndex} className="rotating-placeholder__span">
              {placeholderList[placeholderIndex]}
            </span>
          </div>
        )}
        <div className="chat-controls">
          <div className="chat-controls-left">
            <div className="context-menu-anchor" ref={contextRef}>
              <button
                type="button"
                aria-label="Add context"
                aria-haspopup={supportsContextMenu ? 'menu' : undefined}
                aria-expanded={supportsContextMenu ? contextOpen : undefined}
                className="ctrl-btn"
                onClick={() => supportsContextMenu && setContextOpen((value) => !value)}
                data-od-id="home-add-context-button"
              >
                <Icons.Plus className="w-4 h-4" />
              </button>
              {supportsContextMenu && contextOpen && (
                <div className="context-menu-panel context-menu-primary" role="menu" aria-label="Add context" data-od-id="home-add-context-menu">
                  <ContextMenuRow icon={Icons.Paperclip} label="Add files or photos" meta="⌘U" onClick={() => chooseContextAction('Review the attached files or photos.')} />
                  <ContextMenuRow icon={Icons.Folder} label="Add to project" chevron />
                  <ContextMenuRow icon={Icons.Github} label="Add from GitHub" onClick={() => chooseContextAction('Review this GitHub repository.')} />
                  <div className="context-menu-divider" role="separator" />
                  <ContextMenuRow icon={Icons.Bookmark} label="Skills" chevron />
                  <ContextMenuRow
                    icon={Icons.Plug}
                    label="Connectors"
                    chevron
                    open={connectorsOpen}
                    dataId="home-connectors-menu-item"
                    onClick={() => setConnectorsOpen((value) => !value)}
                    onMouseEnter={() => { clearCloseTimer(); setConnectorsOpen(true); }}
                    onMouseLeave={() => closeNestedAfterDelay('connectors')}
                  >
                    {connectorsOpen && (
                      <div
                        className="context-menu-panel context-menu-flyout context-menu-connectors-flyout"
                        role="menu"
                        aria-label="Connectors"
                        data-od-id="home-connectors-flyout"
                        onMouseEnter={clearCloseTimer}
                        onMouseLeave={() => closeNestedAfterDelay('connectors')}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <ContextMenuRow
                          icon={Icons.Plus}
                          label="Add connector"
                          chevron
                          open={addConnectorOpen}
                          dataId="home-add-connector-menu-item"
                          onClick={() => setAddConnectorOpen((value) => !value)}
                          onMouseEnter={() => { clearCloseTimer(); setAddConnectorOpen(true); }}
                          onMouseLeave={() => closeNestedAfterDelay('add')}
                        >
                          {addConnectorOpen && (
                            <div
                              className="context-menu-panel context-menu-flyout context-menu-add-flyout"
                              role="menu"
                              aria-label="Add connector"
                              data-od-id="home-add-connector-flyout"
                              onMouseEnter={clearCloseTimer}
                              onMouseLeave={() => closeNestedAfterDelay('add')}
                              onClick={(event) => event.stopPropagation()}
                            >
                              <ContextMenuRow icon={Icons.Bookmark} label="Browse connectors" onClick={() => chooseContextAction('Browse available connectors.')} />
                              <ContextMenuRow icon={Icons.MoreHorizontal} label="Add custom connector" onClick={() => chooseContextAction('Add a custom connector.')} />
                            </div>
                          )}
                        </ContextMenuRow>
                        <ContextMenuRow icon={Icons.Briefcase} label="Manage connectors" onClick={() => chooseContextAction('Manage my connected services.')} />
                        <div className="context-menu-divider" role="separator" />
                        {connectors.map((connector) => (
                          <ContextMenuRow
                            key={connector.id}
                            icon={connector.icon}
                            mark={connector.mark}
                            label={connector.label}
                            selected={connectorStates[connector.id]}
                            onClick={() => setConnectorStates((current) => ({ ...current, [connector.id]: !current[connector.id] }))}
                            trailing={<span className={`context-menu-switch ${connectorStates[connector.id] ? 'is-on' : ''}`} aria-hidden="true" />}
                          />
                        ))}
                      </div>
                    )}
                  </ContextMenuRow>
                  <div className="context-menu-divider" role="separator" />
                  <ContextMenuRow icon={Icons.Globe} label="Web search" selected={webSearch} onClick={() => setWebSearch((value) => !value)} />
                </div>
              )}
            </div>
          </div>
          <div className="chat-controls-right">
            <span className="cli-status" role="status" aria-label={`${CHAT_CLI_NAME}: ${api.health === 'live' ? 'connected and live' : api.health === 'offline' ? 'unreachable' : api.health === 'mock' ? 'connected in mock mode' : 'checking connection'}`} data-od-id="chat-cli-status">
              <span>{CHAT_CLI_NAME}</span><span className={`cli-status-dot is-${api.health}`} aria-hidden="true" />
            </span>
            <button type="button" aria-label={listening ? 'Stop voice input' : 'Voice input'} aria-pressed={listening} onClick={toggleVoice} className={`ctrl-btn ${listening ? 'is-listening' : ''}`} data-od-id="chat-voice-button">
              <Icons.Mic className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={sendMessage}
              disabled={!input.trim() || isGenerating}
              aria-label="Send message" data-od-id="chat-submit-button"
              className="submit-btn"
            >
              <Icons.ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
        {voiceError && <p className="chat-voice-error" role="alert">{voiceError}</p>}
      </div>
      );
    };

    const FEEDBACK_REASONS = {
      like: [
        'The results were relevant',
        'The explanation was clear',
        'The results were well organized',
        'The response helped me decide what to do next'
      ],
      dislike: [
        'The results were not relevant enough',
        'The response missed important context',
        'The results were too broad or repetitive',
        'The explanation was unclear',
        'I expected a different type of result'
      ]
    };

    const FeedbackModal = ({ feedback, onClose, onSubmit }) => {
      const [reason, setReason] = useState('');
      const [notes, setNotes] = useState('');
      const isLike = feedback?.type === 'like';

      useEffect(() => {
        if (!feedback) return undefined;
        setReason('');
        setNotes('');
        const handleEscape = (event) => { if (event.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
      }, [feedback, onClose]);

      if (!feedback) return null;

      return (
        <div className="feedback-modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
          <section className="feedback-modal" role="dialog" aria-modal="true" aria-labelledby="feedback-modal-title">
            <div className="feedback-modal-head">
              <div>
                <p className="text-[10px] uppercase tracking-[0.1em] text-white/45 mb-1">Response feedback</p>
                <h2 id="feedback-modal-title" className="text-lg font-medium text-white">
                  {isLike ? 'What worked well?' : 'What could be better?'}
                </h2>
              </div>
              <button type="button" className="feedback-close" onClick={onClose} aria-label="Close feedback dialog">
                <Icons.X className="w-5 h-5" />
              </button>
            </div>
            <div className="feedback-modal-body">
              <p className="mb-5 text-sm leading-relaxed text-white/62">
                {isLike ? 'Choose the part of this response that was most useful.' : 'Tell us what was missing so future responses can be more useful.'}
              </p>
              <label className="feedback-field-label" htmlFor="feedback-reason">Reason</label>
              <select id="feedback-reason" className="feedback-select" value={reason} onChange={(e) => setReason(e.target.value)}>
                <option value="">Select a reason</option>
                {FEEDBACK_REASONS[feedback.type].map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
              <label className="feedback-field-label mt-5" htmlFor="feedback-notes">Additional feedback <span className="font-normal text-white/38">(optional)</span></label>
              <textarea
                id="feedback-notes"
                className="feedback-textarea"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={isLike ? 'What should we keep doing?' : 'What should we change or include next time?'}
              />
            </div>
            <div className="feedback-modal-foot">
              <button type="button" className="feedback-cancel" onClick={onClose}>Cancel</button>
              <button type="button" className="feedback-submit" onClick={() => onSubmit({ ...feedback, reason, notes })}>Submit feedback</button>
            </div>
          </section>
        </div>
      );
    };

    // Category-specific placeholder copy for the Home AI Chat input (see useRotatingPlaceholder below).
    // Order of keys defines the rotation order when no category chip is selected.
    const PLACEHOLDER_COPY = {
      Roles: 'What role are you looking for?',
      Mentors: 'Looking for a mentor in a specific field?',
      Collaborators: 'Who do you want to build something with?',
      Courses: 'What skill do you want to learn next?',
      Events: 'Looking for events to attend or host?',
      Communities: 'Which community do you want to join?',
      Candidates: 'What kind of candidate are you hiring for?'
    };
    const PLACEHOLDER_ROTATION_MS = 2800; // ~2.5–3s per item as specified

    const PIPELINE_STAGES = ["Applied", "Email Received", "Call Scheduled", "Interview", "HR Round", "Selected"];

    const USER_PROFILE = {
      firstName: "Samarpan",
      fullName: "Samarpan Karra",
      title: "Building Profeshare AI · Product Design · Strategy",
      tagline: "Andhra Pradesh, India",
      status: "Building Profeshare AI",
      email: "samarpankarra@gmail.com",
      phone: "",
      linkedin: "linkedin.com/in/samarpankarra",
      github: "",
      website: "",
      portfolio: "",
      about: "I work with founders who are stuck in the fog of too many ideas, conflicting priorities, and uncertain next steps. My mission is to bring clarity to the chaos—turning confused visions into clear, actionable product strategies that users love. I help founders understand what their users actually need through user psychology and proven experience methodologies: real insight that drives real decisions. I translate founder vision into product strategy rooted in human behavior, guide product decisions through user psychology and experience design, prioritize what matters, create clarity around product-market fit through systematic user research, and design intuitive experiences built on behavioral insight. My approach moves teams from confusion to clarity, assumptions to evidence, feature bloat to intentional design, gut feelings to user psychology, and chaos to confidence. The result is products that make sense to build, use, and scale—and founders who move forward with confidence.",
      resume: { name: "Profile.pdf", uploadDate: "August 20, 2026", size: "74 KB" },
      education: { degree: "Bachelor of Technology (BTech), Computer Science", school: "Rajiv Gandhi University of Knowledge Technologies, Nuzvid", year: "February 2020 – May 2024" },
      skills: ["Start-up Leadership", "Co-creation", "Wireframing"],
      languages: [
        { name: "Hindi", proficiency: "Elementary" },
        { name: "Telugu", proficiency: "Full Professional" },
        { name: "English", proficiency: "Full Professional" }
      ],
      experience: [
        { company: "Stealth AI Startup", role: "Building AI Startup", period: "January 2025 – Present", duration: "1 year 8 months", location: "India", description: "Building a verified network where real people create credible profiles, find relevant roles, and meet trusted collaborators. People can state what they want in plain words and act in one place." },
        { company: "The MA Studio Co.", role: "Design Lead", period: "March 2023 – March 2026", duration: "3 years 1 month", location: "India", description: "Led the product team building user interfaces for a studio focused on brand identity, brand strategy, brand elements, and websites." },
        { company: "FyrstGen", role: "Associate Partner", period: "June 2024 – January 2026", duration: "1 year 8 months", location: "United Kingdom", description: "Supported the official community partnership between Tech Innovation Hub and FyrstGen / The FactorY, helping innovators pursue entrepreneurship and global opportunities through the CBaaS® model." },
        { company: "Tech Innovation Hub", role: "Founder", period: "March 2024 – January 2026", duration: "1 year 11 months", location: "Nuzvid, Andhra Pradesh, India", description: "Built a startup-incubator ecosystem for innovation, entrepreneurship, and collaboration within the college community, supporting emerging leaders, creators, and problem-solvers." },
        { company: "Perplexity", role: "AI Business Fellow", period: "March 2025 – August 2025", duration: "6 months", location: "United States", description: "Selected for Perplexity's AI Business Fellowship to deepen expertise in AI's role in business strategy and operations, including decision-making, workflows, and new business opportunities." },
        { company: "Artflix Design Agency", role: "Founder & CEO", period: "March 2022 – January 2025", duration: "2 years 11 months", location: "India", description: "Led a creative agency delivering web development, UI/UX, SEO, branding, digital marketing, and content. Combined behavioral patterns, data science, and information architecture to design user-centered experiences." },
        { company: "Department of CSE, RGUKT Nuzvid", role: "Event Coordinator", period: "March 2023 – July 2024", duration: "1 year 5 months", location: "India", description: "Coordinated CSE workshops and events, leading student teams under the guidance of the Head of Department and faculty." },
        { company: "Department of CSE, RGUKT Nuzvid", role: "Social Media Manager", period: "September 2022 – August 2023", duration: "1 year", location: "India", description: "Managed social media for the CSE Department at RGUKT Nuzvid." },
        { company: "Jio", role: "Internship Trainee", period: "May 2023 – August 2023", duration: "4 months", location: "India", description: "Completed an internship trainee assignment at Jio." },
        { company: "SDCAC RGUKTN", role: "UX Designer", period: "January 2022 – July 2023", duration: "1 year 7 months", location: "India", description: "Worked as a UX designer after an earlier frontend development role." },
        { company: "SDCAC RGUKTN", role: "Frontend Developer", period: "July 2021 – December 2021", duration: "6 months", location: "India", description: "Worked as a frontend developer." },
        { company: "Sense Semiconductor & IT Solutions Pvt. Ltd", role: "UX Designer", period: "August 2021 – July 2023", duration: "2 years", location: "India", description: "Worked as a UX designer." },
        { company: "Teckzite, RGUKT Nuzvid", role: "User Interface Designer", period: "January 2021 – March 2023", duration: "2 years 3 months", location: "Andhra Pradesh, India", description: "Designed interfaces and contributed to website development for RGUKT Nuzvid's all-India technical festival." },
        { company: "MeeBuddy", role: "UX Designer", period: "February 2022 – February 2023", duration: "1 year 1 month", location: "India", description: "Designed user experiences for a rural online store." },
        { company: "MeeBuddy", role: "Designing Manager", period: "December 2021 – February 2023", duration: "1 year 3 months", location: "India", description: "Managed design for MeeBuddy while completing a bachelor's degree in computer science." },
        { company: "Rajiv Gandhi University of Knowledge Technologies, Nuzvid", role: "Computer Science Student", period: "August 2018 – April 2020", duration: "1 year 9 months", location: "Nuzvid, Andhra Pradesh, India", description: "Studied computer science before beginning the Bachelor of Technology program." }
      ],
      certifications: [
        { name: "Enterprise Design Thinking Practitioner", issuer: "Credential listed on LinkedIn", year: "" },
        { name: "Social Media Marketing: Strategy and Optimization", issuer: "Credential listed on LinkedIn", year: "" },
        { name: "Ultimate Web Designer & Web Developer Course 2021", issuer: "Credential listed on LinkedIn", year: "2021" },
        { name: "React JS Tutorial", issuer: "Credential listed on LinkedIn", year: "" },
        { name: "Front End Development – HTML", issuer: "Credential listed on LinkedIn", year: "" }
      ]
    };

    function renderModalContent(item, category) {
      const getBadgeText = () => {
        switch(category) {
          case 'Roles': return { label: 'RECOMMENDED ROLE', detail: item.type || 'Full-time' };
          case 'Mentors': return { label: 'MENTOR', detail: item.availability || 'Available' };
          case 'Collaborators': return { label: 'OPEN TO COLLABORATE', detail: '' };
          case 'Courses': return { label: 'COURSE', detail: item.level || 'Beginner' };
          case 'Events': return { label: 'EVENT', detail: item.format || 'Online' };
          case 'Communities': return { label: 'COMMUNITY', detail: '' };
          case 'Candidates': return { label: 'OPEN TO WORK', detail: '' };
          default: return { label: 'RECOMMENDED', detail: '' };
        }
      };

      const getMetricValue = () => {
        if (category === 'Mentors') return item.rating || item.match || 0;
        return item.match || item.attendees || 0;
      };

      const getMetricLabel = () => {
        if (category === 'Mentors') return 'Rating';
        if (category === 'Events') return 'Attendees';
        return 'Match score';
      };

      const getPrimaryButtonText = () => {
        const btns = {
          'Roles': 'Apply now',
          'Mentors': 'Request mentorship',
          'Collaborators': 'Connect',
          'Courses': 'Enroll now',
          'Events': 'Register',
          'Communities': 'Join community',
          'Candidates': 'Contact candidate'
        };
        return btns[category] || 'Apply now';
      };

      return {
        badge: getBadgeText(),
        metric: getMetricValue(),
        metricLabel: getMetricLabel(),
        primaryButtonText: getPrimaryButtonText()
      };
    }

    const DetailModal = ({ item, onClose }) => {
      const [isSaved, setIsSaved] = useState(false);
      const [hasApplied, setHasApplied] = useState(false);
      const category = item?.category || 'Roles';
      const modalContent = item ? renderModalContent(item, category) : null;

      useEffect(() => {
        if (!item) return undefined;
        setIsSaved(false);
        setHasApplied(false);
        const handleEscape = (event) => {
          if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
      }, [item, onClose]);

      if (!item || !modalContent) return null;

      const getSubtitle = () => {
        switch(category) {
          case 'Roles': return item.company;
          case 'Mentors': return item.title;
          case 'Collaborators': return `${item.skills?.slice(0,2).join(', ') || item.title} · ${item.timezone}`;
          case 'Courses': return `${item.provider} · ${item.instructor}`;
          case 'Events': return item.organizer;
          case 'Communities': return `${item.members} members`;
          case 'Candidates': return item.title;
          default: return '';
        }
      };

      const getChips = () => {
        switch(category) {
          case 'Roles': return [
            { text: item.location, icon: 'MapPin' },
            { text: item.salary, icon: 'DollarSign' },
            { text: item.type, icon: 'Briefcase' }
          ];
          case 'Mentors': return (item.expertise || []).slice(0, 3).map(e => ({ text: e }));
          case 'Collaborators': return (item.skills || []).slice(0, 3).map(s => ({ text: s }));
          case 'Courses': return [
            { text: item.duration, icon: 'Clock' },
            { text: item.level, icon: 'BookOpen' },
            { text: item.price, icon: 'DollarSign' }
          ];
          case 'Events': return [
            { text: item.date, icon: 'Calendar' },
            { text: item.location, icon: 'MapPin' },
            { text: item.format, icon: 'Video' }
          ];
          case 'Communities': return [{ text: item.focus, icon: 'Award' }, ...(item.verification ? [{ text: '✓ Verified', icon: 'CheckCircle' }] : [])];
          case 'Candidates': return (item.skills || []).slice(0, 3).map(s => ({ text: s }));
          default: return [];
        }
      };

      const renderLeftContent = () => {
        switch(category) {
          case 'Roles':
            return (
              <>
                <section>
                  <h3 className="font-display text-xl text-white mb-3">About the role</h3>
                  <p className="text-white leading-relaxed">{item.about}</p>
                </section>
                <section>
                  <h3 className="font-display text-xl text-white mb-4">What you'll do</h3>
                  <ul className="space-y-3">
                    {(item.responsibilities || []).map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white leading-relaxed">
                        <span className="text-[var(--accent-1)] mt-1.5 text-lg leading-none">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            );

          case 'Mentors':
            return (
              <>
                <section>
                  <h3 className="font-display text-xl text-white mb-3">About</h3>
                  <p className="text-white leading-relaxed">{item.about}</p>
                </section>
                <section>
                  <h3 className="font-display text-xl text-white mb-4">Can help you with</h3>
                  <ul className="space-y-3">
                    {(item.canHelpWith || []).map((help, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white leading-relaxed">
                        <span className="text-[var(--accent-1)] mt-1.5 text-lg leading-none">•</span>
                        <span>{help}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                {item.background && (
                  <section>
                    <h3 className="font-display text-xl text-white mb-3">Background</h3>
                    <p className="text-white leading-relaxed">{item.background}</p>
                  </section>
                )}
              </>
            );

          case 'Collaborators':
            return (
              <>
                <section>
                  <h3 className="font-display text-xl text-white mb-3">About</h3>
                  <p className="text-white leading-relaxed">{item.about}</p>
                </section>
                <section>
                  <h3 className="font-display text-xl text-white mb-4">Looking to collaborate on</h3>
                  <ul className="space-y-3">
                    {(item.lookingToCollaborateOn || []).map((collab, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white leading-relaxed">
                        <span className="text-[var(--accent-1)] mt-1.5 text-lg leading-none">•</span>
                        <span>{collab}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                {item.pastProjects && item.pastProjects.length > 0 && (
                  <section>
                    <h3 className="font-display text-xl text-white mb-4">Past projects</h3>
                    <ul className="space-y-3">
                      {(item.pastProjects || []).map((proj, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-white leading-relaxed">
                          <span className="text-[var(--accent-1)] mt-1.5 text-lg leading-none">✦</span>
                          <span>{proj}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </>
            );

          case 'Courses':
            return (
              <>
                <section>
                  <h3 className="font-display text-xl text-white mb-3">About this course</h3>
                  <p className="text-white leading-relaxed">{item.description}</p>
                </section>
                <section>
                  <h3 className="font-display text-xl text-white mb-4">What you'll learn</h3>
                  <ul className="space-y-3">
                    {(item.whatYouLearn || []).map((learn, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white leading-relaxed">
                        <span className="text-[var(--accent-1)] mt-1.5 text-lg leading-none">•</span>
                        <span>{learn}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            );

          case 'Events':
            return (
              <>
                <section>
                  <h3 className="font-display text-xl text-white mb-3">About the event</h3>
                  <p className="text-white leading-relaxed">{item.description}</p>
                </section>
                <section>
                  <h3 className="font-display text-xl text-white mb-4">Agenda / Highlights</h3>
                  <ul className="space-y-3">
                    {(item.agenda || []).map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white leading-relaxed">
                        <span className="text-[var(--accent-1)] mt-1.5 text-lg leading-none">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            );

          case 'Communities':
            return (
              <>
                <section>
                  <h3 className="font-display text-xl text-white mb-3">About</h3>
                  <p className="text-white leading-relaxed">{item.description}</p>
                </section>
                <section>
                  <h3 className="font-display text-xl text-white mb-4">What members discuss</h3>
                  <ul className="space-y-3">
                    {(item.whatMembersDiscuss || []).map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white leading-relaxed">
                        <span className="text-[var(--accent-1)] mt-1.5 text-lg leading-none">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                {item.recentActivity && item.recentActivity.length > 0 && (
                  <section>
                    <h3 className="font-display text-xl text-white mb-4">Recent activity</h3>
                    <ul className="space-y-3">
                      {(item.recentActivity || []).map((act, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-white leading-relaxed">
                          <span className="text-[var(--accent-1)] mt-1.5 text-lg leading-none">✦</span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </>
            );

          case 'Candidates':
            return (
              <>
                <section>
                  <h3 className="font-display text-xl text-white mb-3">About</h3>
                  <p className="text-white leading-relaxed">{item.about}</p>
                </section>
                <section>
                  <h3 className="font-display text-xl text-white mb-4">Experience highlights</h3>
                  <ul className="space-y-3">
                    {(item.experienceHighlights || []).map((exp, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white leading-relaxed">
                        <span className="text-[var(--accent-1)] mt-1.5 text-lg leading-none">•</span>
                        <span>{exp}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            );

          default: return null;
        }
      };

      const renderRightBox = () => {
        switch(category) {
          case 'Roles':
            return (
              <section className="details-section">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <h3 className="font-display text-lg text-white">What they need</h3>
                  <span className="text-[10px] uppercase tracking-[0.1em] text-white">{(item.requirements || []).length} signals</span>
                </div>
                <div className="flex flex-col gap-3">
                  {(item.requirements || []).map((req, idx) => (
                    <div key={idx} className="text-sm text-white flex gap-2">
                      <svg className="w-4 h-4 text-[var(--accent-2)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </section>
            );

          case 'Courses':
            return (
              <section className="details-section">
                <h3 className="font-display text-lg text-white mb-4">Skills covered</h3>
                <div className="flex flex-wrap gap-2">
                  {(item.skills || []).map((s, i) => (
                    <span key={i} className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white">{s}</span>
                  ))}
                </div>
                {item.certificate && (
                  <div className="mt-4 text-sm text-white flex items-center gap-2">
                    <Icons.CheckCircle className="w-4 h-4 text-white" />
                    Certificate included
                  </div>
                )}
              </section>
            );

          case 'Events':
            return (
              <section className="details-section">
                <h3 className="font-display text-lg text-white mb-4">Speakers/Hosts</h3>
                <ul className="space-y-2">
                  {(item.speakers || []).map((speaker, idx) => (
                    <li key={idx} className="text-sm text-white">{speaker}</li>
                  ))}
                </ul>
              </section>
            );

          case 'Communities':
            return (
              <section className="details-section">
                <h3 className="font-display text-lg text-white mb-4">Recent activity</h3>
                <ul className="space-y-2">
                  {(item.recentActivity || []).map((activity, idx) => (
                    <li key={idx} className="text-sm text-white">{activity}</li>
                  ))}
                </ul>
              </section>
            );

          default: return null;
        }
      };

      const subtitle = getSubtitle();
      const chips = getChips();
      const decisionContext = {
        Roles: [
          ['Review focus', `Compare the role’s ${(item.requirements || []).length} stated requirements with your recent work and preferred scope.`],
          ['Hiring context', `${item.type || 'Role'} based in ${item.location || 'the listed location'}, with compensation shown as ${item.salary || 'not disclosed'}.`],
          ['Suggested next step', 'Save the role, tailor your strongest evidence to the responsibilities, then start the application.']
        ],
        Mentors: [
          ['Best for', `Focused guidance across ${(item.expertise || []).slice(0, 3).join(', ') || 'the mentor’s listed specialties'}.`],
          ['Working style', `${item.availability || 'Availability shared on request'} with practical sessions grounded in current career decisions.`],
          ['Suggested next step', 'Prepare one concrete goal, two blockers, and the outcome you want from the first conversation.']
        ],
        Collaborators: [
          ['Collaboration fit', `${item.experience_years || 'Experienced'}-year practitioner working across ${(item.skills || []).slice(0, 3).join(', ')}.`],
          ['Project intent', item.looking_for || 'Open to a clearly scoped, outcome-led collaboration.'],
          ['Suggested next step', 'Send a concise scope covering ownership, expected weekly time, decision rights, and success criteria.']
        ],
        Courses: [
          ['Learning outcome', `Build working capability across ${(item.skills || []).slice(0, 3).join(', ') || 'the listed curriculum'}.`],
          ['Commitment', `${item.duration || 'See course schedule'} at ${item.level || 'the listed level'}, priced at ${item.price || 'the listed price'}.`],
          ['Suggested next step', 'Check prerequisites, reserve weekly study time, and confirm whether the certificate matters for your goal.']
        ],
        Events: [
          ['Who it suits', `${item.difficulty || 'All experience levels'} participants interested in ${item.category || 'the event topic'}.`],
          ['Attendance plan', `${item.format || 'Event'} in ${item.location || 'the listed venue'} with ${(item.speakers || []).length || 'multiple'} announced speakers or hosts.`],
          ['Suggested next step', 'Review the agenda, select priority sessions, and prepare two people or topics to follow up with.']
        ],
        Communities: [
          ['Community fit', `${item.members || 'Active'} members centered on ${item.focus || 'the stated community focus'}.`],
          ['Participation signal', `${item.activity || 'Regular member activity'} with current discussions and peer-led contributions.`],
          ['Suggested next step', 'Read recent activity, introduce yourself with a specific goal, and contribute before requesting help.']
        ],
        Candidates: [
          ['Role alignment', `${item.experience_years || 'Several'} years across ${(item.skills || []).slice(0, 3).join(', ')}.`],
          ['Availability context', `${item.open_to || 'Open to relevant roles'} in ${item.location || 'the listed location'}, expecting ${item.salary_expected || 'compensation discussion'}.`],
          ['Suggested next step', 'Review evidence against the scorecard, then invite the candidate with role scope and interview expectations.']
        ]
      }[category] || [];

      return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 animate-[fadeIn_0.3s_ease-out]" role="dialog" aria-modal="true" aria-labelledby="job-detail-title">
          <div className="details-overlay" onClick={onClose}></div>
          <div className="details-glass relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-[24px] overflow-hidden animate-[slideUp_0.4s_ease-out]">
            
            <div className="details-header flex-shrink-0 p-6 sm:p-8">
              <button onClick={onClose} aria-label="Close details" className="absolute top-5 right-5 sm:top-6 sm:right-6 min-w-11 min-h-11 flex items-center justify-center rounded-full hover:bg-white/10 text-white hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                <Icons.X className="w-5 h-5" />
              </button>
              
              <div className="flex items-start justify-between gap-5 pr-10 sm:pr-12">
                <div className="flex gap-4 sm:gap-5 items-center min-w-0">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="font-display text-2xl font-bold text-white">
                      {(item.title || item.name || '?').charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--accent-1)]">{modalContent.badge.label}</span>
                      {modalContent.badge.detail && <span className="text-[10px] uppercase tracking-[0.1em] text-white">{modalContent.badge.detail}</span>}
                    </div>
                    <h2 id="job-detail-title" className="font-display text-2xl sm:text-3xl font-semibold text-white leading-tight">{item.title || item.name}</h2>
                    {subtitle && <div className="text-white font-medium text-base sm:text-lg mt-2">{subtitle}</div>}
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-end text-right flex-shrink-0">
                  <div className="text-3xl font-display font-bold text-white leading-none">
                    {modalContent.metric}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.12em] text-white mt-2">{modalContent.metricLabel}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                {chips.map((chip, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white">
                    {chip.icon && chip.icon === 'Clock' && <Icons.Clock className="w-3.5 h-3.5" />}
                    {chip.icon && chip.icon === 'DollarSign' && <Icons.DollarSign className="w-3.5 h-3.5" />}
                    {chip.icon && chip.icon === 'MapPin' && <Icons.MapPin className="w-3.5 h-3.5" />}
                    {chip.icon && chip.icon === 'Briefcase' && <Icons.Briefcase className="w-3.5 h-3.5" />}
                    {chip.icon && chip.icon === 'Calendar' && <Icons.Calendar className="w-3.5 h-3.5" />}
                    {chip.icon && chip.icon === 'Award' && <Icons.Award className="w-3.5 h-3.5" />}
                    {chip.icon && chip.icon === 'CheckCircle' && <Icons.CheckCircle className="w-3.5 h-3.5" />}
                    {chip.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="details-body flex-1 overflow-y-auto custom-scroll p-6 sm:p-8">
              <div className={`grid gap-8 md:gap-10 ${renderRightBox() ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1'}`}>
                <div className={renderRightBox() ? 'md:col-span-2 space-y-8' : 'space-y-8'}>
                  {renderLeftContent()}
                </div>
                {renderRightBox() && (
                  <div className="space-y-6">
                    {renderRightBox()}
                    <div className="sm:hidden bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between">
                      <div className="text-xs uppercase tracking-[0.12em] text-white">{modalContent.metricLabel}</div>
                      <div className="text-2xl font-display font-bold text-white">
                        {modalContent.metric}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <dl className="details-context-grid" aria-label="Decision context">
                {decisionContext.map(([label, value]) => (
                  <div className="details-context-card" key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="details-footer flex-shrink-0 p-4 sm:p-6 flex items-center justify-between gap-3 sm:gap-4">
              <button onClick={() => setIsSaved(!isSaved)} aria-pressed={isSaved} className={`min-h-11 flex items-center gap-2 px-4 sm:px-5 py-3 rounded-xl border transition-colors font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${isSaved ? 'bg-white/10 border-white/20 text-white' : 'hover:bg-white/5 border-transparent hover:border-white/10 text-white'}`}>
                <Icons.Bookmark className="w-5 h-5" />
                <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save for later'}</span>
              </button>
              <button onClick={() => setHasApplied(true)} className="min-h-11 px-5 sm:px-8 py-3 rounded-xl bg-white text-[var(--bg)] font-medium hover:shadow-[0_0_8px_rgba(255,255,255,0.29)] transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                {hasApplied ? 'In progress' : modalContent.primaryButtonText}
              </button>
            </div>
            
          </div>
        </div>
      );
    };


    const PipelineVis = ({ stages }) => {
      const lastCompleted = stages.reduce((last, s, i) => s.completed ? i : last, -1);
      return (
        <div className="flex items-center w-full">
          {stages.map((s, i) => (
            <React.Fragment key={s.stage}>
              <div className="flex flex-col items-center gap-1.5" style={{ flex: i === 0 || i === stages.length - 1 ? '0 0 auto' : '1' }}>
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.completed ? 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.4)]' : !s.completed && i === lastCompleted + 1 ? 'bg-white/50 border-2 border-white/80' : 'bg-white/12 border border-white/15'}`} />
                <span className={`text-[8px] whitespace-nowrap tracking-[0.04em] uppercase ${s.completed ? 'text-white/80' : 'text-white'}`}>{s.stage}</span>
              </div>
              {i < stages.length - 1 && (
                <div className={`h-px flex-1 min-w-[6px] ${s.completed ? 'bg-white/35' : 'bg-white/10'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      );
    };

    const JobTimelineModal = ({ job, onClose }) => {
      useEffect(() => {
        if (!job) return undefined;
        const handleEscape = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
      }, [job, onClose]);

      if (!job) return null;
      const completedCount = job.stages.filter(s => s.completed).length;
      const currentStage = [...job.stages].reverse().find(stage => stage.completed) || job.stages[0];
      const nextStage = job.stages.find(stage => !stage.completed);
      return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 animate-[fadeIn_0.2s_ease-out]" role="dialog" aria-modal="true">
          <div className="details-overlay" onClick={onClose}></div>
          <div className="details-glass relative w-full max-w-2xl max-h-[86vh] rounded-[24px] overflow-hidden animate-[slideUp_0.3s_ease-out]">
            <div className="details-header flex items-center justify-between p-5 sm:p-6">
              <div>
                <div className="text-[10px] uppercase tracking-[0.1em] text-white/50 mb-2">Application details</div>
                <h3 className="font-display text-2xl text-white">{job.role}</h3>
                <p className="text-sm text-white/70 mt-1">{job.company} · Applied {job.appliedDate}</p>
              </div>
              <button onClick={onClose} className="min-w-10 min-h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white hover:text-white transition-colors">
                <Icons.X className="w-5 h-5" />
              </button>
            </div>
            <div className="details-body p-5 sm:p-6 overflow-y-auto custom-scroll max-h-[68vh]">
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-7">
                <div className="details-context-card"><dt>Current stage</dt><dd>{currentStage.stage}</dd></div>
                <div className="details-context-card"><dt>Next step</dt><dd>{nextStage ? nextStage.stage : 'Process complete'}</dd></div>
                <div className="details-context-card"><dt>Progress</dt><dd>{completedCount} of {job.stages.length} stages completed</dd></div>
              </dl>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs uppercase tracking-[0.1em] text-white">Application timeline</span>
                <span className="text-xs text-white">{completedCount}/{job.stages.length} stages</span>
              </div>
              <div className="relative">
                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/10"></div>
                <div className="space-y-0">
                  {job.stages.map((s, i) => (
                    <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
                      <div className="relative z-10 flex-shrink-0 w-6 flex justify-center">
                        {s.completed ? (
                          <Icons.CheckCircle className="w-5 h-5 text-white" />
                        ) : s.date ? (
                          <div className="w-5 h-5 rounded-full border-2 border-white/30 bg-white/5" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-white/10 bg-white/[0.03]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <p className={`text-sm font-medium ${s.completed ? 'text-white' : s.date ? 'text-white/60' : 'text-white/30'}`}>{s.stage}</p>
                        {s.date ? (
                          <p className="text-xs text-white mt-0.5">{s.date}</p>
                        ) : (
                          <p className="text-xs text-white/20 mt-0.5 italic">Pending</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <section className="details-section mt-7">
                <h4 className="font-display text-lg text-white mb-2">Recommended preparation</h4>
                <p className="text-sm text-white/70 leading-relaxed">
                  {nextStage
                    ? `Prepare for the ${nextStage.stage.toLowerCase()} by reviewing the original role scope, your submitted portfolio evidence, and the questions raised during the ${currentStage.stage.toLowerCase()}. Keep availability and compensation expectations ready for the recruiter.`
                    : 'The tracked process is complete. Save the final communication, record the outcome, and note any follow-up commitments or onboarding dates.'}
                </p>
              </section>
            </div>
          </div>
        </div>
      );
    };

    const ProfilePage = ({ profile: initialProfile }) => {
      const [profile,setProfile] = useState(()=>{try{return {...initialProfile,...JSON.parse(localStorage.getItem('profeshare.v170.profile')||'{}')};}catch{return initialProfile;}});
      const [aboutExpanded,setAboutExpanded]=useState(false);
      const [newSkill,setNewSkill]=useState(''),[editing,setEditing]=useState(false),[draft,setDraft]=useState({}),[resumeURL,setResumeURL]=useState('Profile.pdf'),[notice,setNotice]=useState('');
      const resumeFile=useRef(null),uploadURL=useRef(null);
      useEffect(()=>()=>{if(uploadURL.current)URL.revokeObjectURL(uploadURL.current);},[]);
      useEffect(()=>{if(!editing)return;const close=e=>{if(e.key==='Escape')setEditing(false);};window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close);},[editing]);
      function persist(next){setProfile(next);try{localStorage.setItem('profeshare.v170.profile',JSON.stringify(next));setNotice('Profile saved on this device.');}catch{setNotice('Profile updated for this session. Browser storage is unavailable.');}}
      function addSkill(){const skill=newSkill.trim();if(!skill)return;if((profile.skills||[]).some(s=>s.toLowerCase()===skill.toLowerCase())){setNotice('This skill is already listed.');return;}persist({...profile,skills:[...(profile.skills||[]),skill]});setNewSkill('');}
      function edit(){setDraft({...profile});setEditing(true);}
      function save(e){e.preventDefault();if(!draft.fullName?.trim())return;persist({...draft,fullName:draft.fullName.trim()});setEditing(false);}
      function replaceResume(e){const file=e.target.files?.[0];if(!file)return;if(file.type!=='application/pdf'&&!/\.pdf$/i.test(file.name)){setNotice('Choose a PDF resume.');return;}if(uploadURL.current)URL.revokeObjectURL(uploadURL.current);uploadURL.current=URL.createObjectURL(file);setResumeURL(uploadURL.current);setProfile(p=>({...p,resume:{name:file.name,size:(file.size/1024).toFixed(0)+' KB',uploadDate:new Date().toLocaleDateString()}}));setNotice('Resume replaced for this session.');}
      const web=value=>/^https?:\/\//i.test(value)?value:'https://'+value;
      const contacts=[['Email',profile.email,profile.email?'mailto:'+profile.email:''],['Phone',profile.phone,profile.phone?'tel:'+profile.phone.replace(/[^+\d]/g,''):''],['LinkedIn',profile.linkedin,profile.linkedin?web(profile.linkedin):''],['GitHub',profile.github,profile.github?web(profile.github):''],['Website',profile.website,profile.website?web(profile.website):'']].filter(([,value])=>value);
      const initials=profile.fullName?.split(/\s+/).map(w=>w[0]).slice(0,2).join('')||'SK';
      return <div className="profile-page profile-redesigned" data-od-id="profile-page">
        <div className="profile-scroll custom-scroll"><article className="profile-unified glass glass-card" data-od-id="profile-unified-container" aria-label="Candidate profile">
          <header className="profile-cover" data-od-id="profile-header">
            <div className="profile-identity"><div className="profile-avatar" aria-hidden="true">{initials}</div><div className="profile-heading-copy"><div className="profile-kicker">MY PROFILE</div><h1>{profile.fullName}</h1><p className="profile-headline">{profile.title}</p><p className="profile-subtitle">{profile.tagline}</p></div></div>
            <div className="profile-header-side">{profile.status&&<span className="profile-status">{profile.status}</span>}<button className="profile-action" onClick={edit} data-od-id="profile-edit"><Icons.Edit aria-hidden="true"/><span>Edit profile</span></button></div>
          </header>
          <div className="profile-compact-grid"><div id="profile-view-content" className="profile-view-content">
          <section className="profile-divider-section" data-od-id="profile-about"><div className="profile-section-label"><h2>About</h2></div><div className="profile-section-content"><div className={'profile-about-preview'+(aboutExpanded?' is-expanded':'')}><p id="profile-about-text" className="profile-bio">{profile.about}</p><button type="button" className="profile-about-toggle" aria-expanded={aboutExpanded} aria-controls="profile-about-text" onClick={()=>setAboutExpanded(value=>!value)} data-od-id="profile-about-toggle">{aboutExpanded?'See less':'See more'}</button></div></div></section>
          <section className="profile-divider-section" data-od-id="profile-skills"><div className="profile-section-label"><h2>Skills & tools</h2><p>{profile.skills?.length||0} skills</p></div><div className="profile-section-content"><div className="profile-skill-list">{(profile.skills||[]).map((skill,i)=><span className="profile-skill" key={i}>{skill}</span>)}</div><form className="profile-add-skill" onSubmit={e=>{e.preventDefault();addSkill();}}><label className="sr-only" htmlFor="profile-new-skill">Add a skill</label><input id="profile-new-skill" value={newSkill} onChange={e=>setNewSkill(e.target.value)} placeholder="Add a skill…" data-od-id="profile-skill-input"/><button className="profile-action" disabled={!newSkill.trim()} type="submit" data-od-id="profile-add-skill"><Icons.Plus aria-hidden="true"/><span>Add</span></button></form></div></section>
          <section className="profile-divider-section" data-od-id="profile-experience"><div className="profile-section-label"><h2>Experience</h2><p>{profile.experience?.length||0} roles</p></div><div tabIndex={0} role="region" aria-label="Experience details" className="profile-section-content profile-records">{(profile.experience||[]).map((item,i)=><div className="profile-record" key={i} data-od-id={'profile-role-'+i}><div className="profile-record-heading"><div><h3>{item.role}</h3><p className="profile-company">{item.company}</p></div><p className="profile-meta">{item.period}{item.duration?' · '+item.duration:''}</p></div><p className="profile-meta">{item.location}</p><p className="profile-record-description">{item.description}</p></div>)}</div></section>
          </div><aside className="profile-quick-details" aria-label="Education, credentials, resume and contact details">
          <section className="profile-divider-section" data-od-id="profile-education"><div className="profile-section-label"><h2>Education</h2></div><div className="profile-section-content"><h3>{profile.education?.degree}</h3><p>{profile.education?.school}</p><p className="profile-meta">{profile.education?.year}</p></div></section>
          <section className="profile-divider-section" data-od-id="profile-certifications"><div className="profile-section-label"><h2>Certifications</h2></div><div tabIndex={0} role="region" aria-label="Certifications" className="profile-section-content profile-records">{(profile.certifications||[]).map((cert,i)=><div className="profile-record" key={i}><h3>{cert.name}</h3><p className="profile-meta">{[cert.issuer,cert.year].filter(Boolean).join(' · ')}</p></div>)}</div></section>
          <section className="profile-divider-section" data-od-id="profile-languages"><div className="profile-section-label"><h2>Languages</h2></div><div className="profile-section-content profile-language-list">{(profile.languages||[]).map((item,i)=><div className="profile-language" key={i}><h3>{item.name}</h3><span className="profile-meta">{item.proficiency}</span></div>)}</div></section>

          <section className="profile-divider-section" data-od-id="profile-resume"><div className="profile-section-label"><h2>Resume</h2></div><div className="profile-section-content"><div className="profile-resume-row"><Icons.FileText aria-hidden="true"/><div className="profile-resume-copy"><h3>{profile.resume?.name||'Resume.pdf'}</h3><p className="profile-meta">{profile.resume?.size}{profile.resume?.uploadDate?' · Uploaded '+profile.resume.uploadDate:''}</p></div><div className="profile-resume-actions"><a className="profile-action" href={resumeURL} target="_blank" rel="noopener noreferrer" data-od-id="profile-view-resume">View</a><a className="profile-action" href={resumeURL} download={profile.resume?.name||'Resume.pdf'} data-od-id="profile-download-resume"><Icons.Download aria-hidden="true"/>Download</a><button className="profile-action" onClick={()=>resumeFile.current?.click()} data-od-id="profile-replace-resume">Replace</button></div></div><input type="file" accept="application/pdf,.pdf" ref={resumeFile} onChange={replaceResume} hidden aria-label="Replace resume PDF"/></div></section>
          {profile.portfolio&&<section className="profile-divider-section" data-od-id="profile-portfolio"><div className="profile-section-label"><h2>Portfolio</h2></div><div className="profile-section-content"><a className="profile-contact-link" href={web(profile.portfolio)} target="_blank" rel="noopener noreferrer"><span>{profile.portfolio}</span><Icons.ExternalLink aria-hidden="true"/></a></div></section>}
          <section className="profile-divider-section" data-od-id="profile-contact"><div className="profile-section-label"><h2>Contact & links</h2></div><div tabIndex={0} role="region" aria-label="Contact and links" className="profile-section-content profile-contact-grid">{contacts.map(([label,value,href])=><a className="profile-contact-link" key={label} href={href} target={href.startsWith('http')?'_blank':undefined} rel={href.startsWith('http')?'noopener noreferrer':undefined} data-od-id={'profile-contact-'+label.toLowerCase()}><div><span className="profile-meta">{label}</span><p>{value}</p></div><Icons.ExternalLink aria-hidden="true"/></a>)}</div></section>
          </aside></div>
          {notice&&<p className="profile-notice" role="status">{notice}</p>}
        </article></div>
        {editing&&<div className="feedback-modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setEditing(false);}}><section className="profile-edit-dialog glass" role="dialog" aria-modal="true" aria-labelledby="profile-edit-title" data-od-id="profile-edit-dialog"><form onSubmit={save}><div className="profile-dialog-heading"><h2 id="profile-edit-title">Edit profile</h2><button type="button" className="profile-action" onClick={()=>setEditing(false)}>Close</button></div><p className="profile-meta">Changes are saved on this device.</p><div className="profile-edit-fields">{[['fullName','Full name'],['title','Headline'],['tagline','Location / tagline'],['email','Email'],['phone','Phone'],['linkedin','LinkedIn'],['github','GitHub'],['website','Website'],['portfolio','Portfolio']].map(([key,label])=><label key={key}>{label}<input required={key==='fullName'} type={key==='email'?'email':key==='phone'?'tel':'text'} value={draft[key]||''} onChange={e=>setDraft({...draft,[key]:e.target.value})}/></label>)}<label className="profile-edit-about">About<textarea rows={5} value={draft.about||''} onChange={e=>setDraft({...draft,about:e.target.value})}/></label></div><div className="profile-dialog-actions"><button className="profile-action" type="button" onClick={()=>setEditing(false)}>Cancel</button><button className="profile-action profile-save" type="submit">Save profile</button></div></form></section></div>}
      </div>;
    };

    function HighlightsRow({ items }) {
      if (!items || items.length === 0) return null;
      return (
        <div className="mt-auto pt-3 space-y-1">
          {items.slice(0, 3).map((h, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <span className="text-[10px] text-white mt-0.5 flex-shrink-0">◆</span>
              <span className="text-[11px] text-white/60 leading-snug">{h}</span>
            </div>
          ))}
        </div>
      );
    }

    function renderResultCard(result, category) {
      const baseClasses = "glass glass-card glass-interactive result-card-shell p-5 flex flex-col justify-between h-full group relative overflow-hidden cursor-pointer";
      
      switch(category) {
        case 'Roles':
          return (
            <div className={baseClasses}>
              <div className="absolute top-4 right-4 flex flex-col items-end leading-none">
                <span className="font-display text-2xl text-white">{result.match}%</span>
                <span className="mt-1 text-[9px] uppercase tracking-[0.1em] text-white">Match</span>
              </div>
              <div className="pr-20">
                <h4 className="font-display text-[17px] font-semibold text-white mb-1.5 leading-snug">{result.title}</h4>
                <div className="text-white text-xs font-medium uppercase tracking-wide mb-2">{result.company}</div>
              </div>
              <p className="text-white text-[13px] leading-relaxed mb-2">{result.salary}</p>
              <div className="flex flex-wrap gap-1.5 mb-1">
                <span className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-white/70">{result.location}</span>
                <span className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-white/70">{result.type}</span>
              </div>
              <HighlightsRow items={result.highlights} />
            </div>
          );
        case 'Mentors':
          return (
            <div className={baseClasses}>
              <div className="absolute top-4 right-4 flex flex-col items-end leading-none">
                <span className="font-display text-2xl text-white">{result.rating}</span>
                <span className="mt-1 text-[9px] uppercase tracking-[0.1em] text-white">Rating</span>
              </div>
              <div className="pr-20">
                <h4 className="font-display text-[17px] font-semibold text-white mb-1.5 leading-snug">{result.name}</h4>
                <div className="text-white text-xs font-medium uppercase tracking-wide mb-2">{result.title}</div>
              </div>
              <p className="text-white text-[13px] leading-relaxed mb-2">{result.sessionsCompleted}+ sessions · {result.mentees} mentees</p>
              <div className="flex flex-wrap gap-1.5 mb-1">
                {result.expertise.slice(0, 2).map((e, i) => (
                  <span key={i} className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-white/70">{e}</span>
                ))}
              </div>
              <HighlightsRow items={result.highlights} />
            </div>
          );
        case 'Collaborators':
          return (
            <div className={baseClasses}>
              <div className="absolute top-4 right-4 flex flex-col items-end leading-none">
                <span className="font-display text-lg text-white">{result.experience_years}yrs</span>
                <span className="mt-1 text-[9px] uppercase tracking-[0.1em] text-white">Exp</span>
              </div>
              <div className="pr-20">
                <h4 className="font-display text-[17px] font-semibold text-white mb-1.5 leading-snug">{result.name}</h4>
                <div className="text-white text-xs font-medium uppercase tracking-wide mb-2">{result.title}</div>
              </div>
              <p className="text-white text-[13px] leading-relaxed mb-2">{result.looking_for}</p>
              <div className="flex flex-wrap gap-1.5 mb-1">
                {result.skills.slice(0, 2).map((s, i) => (
                  <span key={i} className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-white/70">{s}</span>
                ))}
              </div>
              <HighlightsRow items={result.highlights} />
            </div>
          );
        case 'Courses':
          return (
            <div className={baseClasses}>
              <div className="absolute top-4 right-4 flex flex-col items-end leading-none">
                <span className="font-display text-lg text-white">{result.rating}</span>
                <span className="mt-1 text-[9px] uppercase tracking-[0.1em] text-white">Rating</span>
              </div>
              <div className="pr-20">
                <h4 className="font-display text-[17px] font-semibold text-white mb-1.5 leading-snug">{result.title}</h4>
                <div className="text-white text-xs font-medium uppercase tracking-wide mb-2">{result.platform}</div>
              </div>
              <p className="text-white text-[13px] leading-relaxed mb-2">{result.duration} · {result.level} · {result.students}</p>
              <div className="flex flex-wrap gap-1.5 mb-1">
                <span className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-white/70">{result.price}</span>
                {result.certificate && <span className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-white/70">Certificate</span>}
              </div>
              <HighlightsRow items={result.highlights} />
            </div>
          );
        case 'Events':
          return (
            <div className={baseClasses}>
              <div className="absolute top-4 right-4 flex flex-col items-end leading-none">
                <span className="font-display text-lg text-white">{result.attendees}</span>
                <span className="mt-1 text-[9px] uppercase tracking-[0.1em] text-white">Attendees</span>
              </div>
              <div className="pr-20">
                <h4 className="font-display text-[17px] font-semibold text-white mb-1.5 leading-snug">{result.name}</h4>
                <div className="text-white text-xs font-medium uppercase tracking-wide mb-2">{result.organizer}</div>
              </div>
              <p className="text-white text-[13px] leading-relaxed mb-2">{result.date} · {result.format}</p>
              <div className="flex flex-wrap gap-1.5 mb-1">
                <span className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-white/70">{result.location}</span>
                <span className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-white/70">{result.difficulty}</span>
              </div>
              <HighlightsRow items={result.highlights} />
            </div>
          );
        case 'Communities':
          return (
            <div className={baseClasses}>
              <div className="absolute top-4 right-4 flex flex-col items-end leading-none">
                <span className="font-display text-xl text-white">{result.join_rate}</span>
                <span className="mt-1 text-[9px] uppercase tracking-[0.1em] text-white">Rating</span>
              </div>
              <div className="pr-20">
                <h4 className="font-display text-[17px] font-semibold text-white mb-1.5 leading-snug">{result.name}</h4>
                <div className="text-white text-xs font-medium uppercase tracking-wide mb-2">{result.members} · {result.activity}</div>
              </div>
              <p className="text-white text-[13px] leading-relaxed mb-2">{result.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-1">
                {result.verification && <span className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-white/70">✓ Verified</span>}
              </div>
              <HighlightsRow items={result.highlights} />
            </div>
          );
        case 'Candidates':
          return (
            <div className={baseClasses}>
              <div className="absolute top-4 right-4 flex flex-col items-end leading-none">
                <span className="font-display text-2xl text-white">{result.rating}</span>
                <span className="mt-1 text-[9px] uppercase tracking-[0.1em] text-white">Rating</span>
              </div>
              <div className="pr-20">
                <h4 className="font-display text-[17px] font-semibold text-white mb-1.5 leading-snug">{result.name}</h4>
                <div className="text-white text-xs font-medium uppercase tracking-wide mb-2">{result.title}</div>
              </div>
              <p className="text-white text-[13px] leading-relaxed mb-2">{result.open_to} · {result.salary_expected}</p>
              <div className="flex flex-wrap gap-1.5 mb-1">
                <span className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-white/70">{result.experience_years}+ yrs</span>
                {result.verified && <span className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-white/70">✓ Verified</span>}
              </div>
              <HighlightsRow items={result.highlights} />
            </div>
          );
        default:
          return null;
      }
    }

    const CALENDAR_DAYS = [
      { key: '2026-07-27', day: 'Mon', date: 27 },
      { key: '2026-07-28', day: 'Tue', date: 28 },
      { key: '2026-07-29', day: 'Wed', date: 29, today: true },
      { key: '2026-07-30', day: 'Thu', date: 30 },
      { key: '2026-07-31', day: 'Fri', date: 31 },
      { key: '2026-08-01', day: 'Sat', date: 1 },
      { key: '2026-08-02', day: 'Sun', date: 2 }
    ];

    const INITIAL_CALENDAR_EVENTS = [
      { id: 'cal-1', date: '2026-07-27', time: '09:30–10:15', title: 'Backend Engineer — technical interview', category: 'interview', project: 'Platform hiring', participants: ['AK', 'RS'], participantNames: 'Aarav Kapoor, Rhea Shah', status: 'Confirmed', location: 'Google Meet', note: 'System-design round focused on multi-tenant architecture and queue reliability.' },
      { id: 'cal-2', date: '2026-07-27', time: '13:00–14:30', title: 'Project Atlas sprint planning', category: 'project', project: 'Project Atlas', participants: ['SM', 'JD', '+2'], participantNames: 'Sam, Jamie, David, Nina', status: 'In progress', location: 'Project room', note: 'Finalize sprint 14 scope, owners, dependencies, and delivery risks.' },
      { id: 'cal-3', date: '2026-07-28', time: '10:00–10:30', title: 'Hiring pipeline review', category: 'meeting', project: 'Platform hiring', participants: ['SM', 'NL'], participantNames: 'Sam, Nina Larsson', status: 'Confirmed', location: 'Profeshare room', note: 'Review candidates awaiting feedback and unblock two pending offer decisions.' },
      { id: 'cal-4', date: '2026-07-28', time: '14:00–15:00', title: 'Design lead portfolio review', category: 'interview', project: 'Design hiring', participants: ['SC', 'SM'], participantNames: 'Sofia Chen, Sam', status: 'Confirmed', location: 'Google Meet', note: 'Portfolio walkthrough with focus on systems thinking and complex workflow design.' },
      { id: 'cal-5', date: '2026-07-28', time: '16:30–17:00', title: 'Approve research brief', category: 'task', project: 'Project Atlas', participants: ['SM'], participantNames: 'Sam', status: 'To do', location: 'Async', note: 'Review the updated recruiting criteria before participant outreach begins.' },
      { id: 'cal-6', date: '2026-07-29', time: '09:00–09:45', title: 'Product manager interview', category: 'interview', project: 'Product hiring', participants: ['MK', 'SM'], participantNames: 'Maya Krishnan, Sam', status: 'Confirmed', location: 'Google Meet', note: 'Case interview covering prioritization, product judgment, and stakeholder alignment.' },
      { id: 'cal-7', date: '2026-07-29', time: '11:00–12:00', title: 'AI matching model review', category: 'project', project: 'Project Atlas', participants: ['OH', 'DC', 'SM'], participantNames: 'Oman Hassan, David Chen, Sam', status: 'In progress', location: 'AI lab room', note: 'Evaluate ranking changes against the current candidate-match quality benchmark.' },
      { id: 'cal-8', date: '2026-07-29', time: '15:30–16:00', title: 'Client delivery sync', category: 'meeting', project: 'Northstar rollout', participants: ['RL', 'SM'], participantNames: 'Rohan Lal, Sam', status: 'Confirmed', location: 'Zoom', note: 'Confirm rollout sequence and surface open dependencies before Friday delivery.' },
      { id: 'cal-9', date: '2026-07-30', time: '10:30–11:15', title: 'Frontend engineer culture interview', category: 'interview', project: 'Platform hiring', participants: ['AN', 'NL'], participantNames: 'Anika Nair, Nina Larsson', status: 'Tentative', location: 'Google Meet', note: 'Values and collaboration interview with the product engineering lead.' },
      { id: 'cal-10', date: '2026-07-30', time: '13:00–14:00', title: 'Northstar implementation block', category: 'project', project: 'Northstar rollout', participants: ['SM', 'JD'], participantNames: 'Sam, Jamie Doe', status: 'In progress', location: 'Focus time', note: 'Protected work block for permissions mapping and client workspace configuration.' },
      { id: 'cal-11', date: '2026-07-31', time: '12:00', title: 'Candidate scorecards due', category: 'deadline', project: 'Platform hiring', participants: ['Team'], participantNames: 'Hiring panel', status: 'Due today', location: 'Profeshare', note: 'All interview scorecards must be submitted before the hiring decision review.' },
      { id: 'cal-12', date: '2026-07-31', time: '15:00–15:30', title: 'Weekly project review', category: 'meeting', project: 'Project Atlas', participants: ['SM', 'OH', '+3'], participantNames: 'Sam, Oman, Product team', status: 'Confirmed', location: 'Project room', note: 'Weekly health check across delivery, hiring, risks, and next-week priorities.' },
      { id: 'cal-13', date: '2026-08-01', time: '11:00', title: 'Send final candidate feedback', category: 'task', project: 'Design hiring', participants: ['SM'], participantNames: 'Sam', status: 'To do', location: 'Async', note: 'Send structured portfolio feedback and next-step details to the candidate.' },
      { id: 'cal-14', date: '2026-08-02', time: '18:00', title: 'Atlas release scope lock', category: 'deadline', project: 'Project Atlas', participants: ['Team'], participantNames: 'Project Atlas team', status: 'At risk', location: 'Profeshare', note: 'Final cutoff for scope changes before release candidate testing begins.' }
    ];

    const CALENDAR_CATEGORY_LABELS = {
      interview: 'Interview',
      project: 'Project work',
      meeting: 'Meeting',
      task: 'Task',
      deadline: 'Deadline'
    };

    const CalendarEventPreview = ({ preview }) => {
      if (!preview) return null;
      const event = preview.event;
      return (
        <aside
          id="calendar-event-preview"
          className={`calendar-event-preview category-${event.category}`}
          style={{ left: `${preview.left}px`, top: `${preview.top}px` }}
          role="tooltip"
          aria-live="polite"
          data-od-id="calendar-event-preview"
        >
          <div className="calendar-preview-head">
            <div>
              <div className="calendar-preview-category">{CALENDAR_CATEGORY_LABELS[event.category]}</div>
              <h3 className="calendar-preview-title">{event.title}</h3>
            </div>
            <span className="calendar-preview-status">{event.status}</span>
          </div>
          <dl className="calendar-preview-grid">
            <div className="calendar-preview-detail"><dt>Date & time</dt><dd>{event.date} · {event.time}</dd></div>
            <div className="calendar-preview-detail"><dt>Project</dt><dd>{event.project}</dd></div>
            <div className="calendar-preview-detail"><dt>Participants</dt><dd>{event.participantNames}</dd></div>
            <div className="calendar-preview-detail"><dt>Location</dt><dd>{event.location}</dd></div>
          </dl>
          <p className="calendar-preview-note">{event.note}</p>
          <div className="calendar-preview-hint"><Icons.Eye className="w-3 h-3" /> Click for full details</div>
        </aside>
      );
    };

    const CalendarEventCard = ({ event, onSelect, onPreview, onPreviewEnd }) => (
      <button
        type="button"
        className={`calendar-event category-${event.category}`}
        onClick={() => onSelect(event)}
        onMouseEnter={(e) => onPreview(event, e.currentTarget)}
        onMouseLeave={onPreviewEnd}
        onFocus={(e) => onPreview(event, e.currentTarget)}
        onBlur={onPreviewEnd}
        aria-label={`${event.title}, ${event.time}, ${event.status}, ${event.project}. Focus to preview; activate for full details.`}
        data-od-id={`calendar-event-${event.id}`}
      >
        <div className="calendar-event-time">{event.time}</div>
        <div className="calendar-event-title">{event.title}</div>
        <div className="calendar-event-project">{event.project} · {event.location}</div>
        <div className="calendar-event-meta">
          <div className="calendar-avatar-stack" aria-label={event.participantNames}>
            {event.participants.slice(0, 3).map((participant, index) => (
              <span className="calendar-avatar" key={`${participant}-${index}`}>{participant}</span>
            ))}
          </div>
          <span className="calendar-status">{event.status}</span>
        </div>
      </button>
    );

    const CalendarModal = ({ event, mode, onClose, onCancel, onCreate }) => {
      const [draft, setDraft] = useState({
        title: '',
        date: '2026-07-30',
        time: '10:00',
        category: 'meeting',
        project: 'Project Atlas',
        participantNames: 'Sam, Project team'
      });

      useEffect(() => {
        const handleEscape = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
      }, [onClose]);

      if (!event && mode !== 'add') return null;

      const eventContext = event ? {
        interview: {
          agenda: ['Welcome and role context', 'Structured competency discussion', 'Candidate questions and next steps'],
          preparation: ['Review the interview scorecard', 'Confirm panel roles and evaluation areas', 'Open the candidate profile and portfolio']
        },
        project: {
          agenda: ['Review current progress and open risks', 'Confirm decisions and accountable owners', 'Lock the next delivery checkpoint'],
          preparation: ['Read the latest project update', 'Bring unresolved dependencies', 'Update assigned work before the session']
        },
        meeting: {
          agenda: ['Align on the desired outcome', 'Work through the decision topics', 'Capture owners, due dates, and follow-ups'],
          preparation: ['Review the shared notes', 'Add agenda topics before the meeting', 'Check participant availability and context']
        },
        task: {
          agenda: ['Review the requested output', 'Complete the assigned work', 'Share the result and close the task'],
          preparation: ['Open linked project material', 'Confirm acceptance criteria', 'Flag blockers before the due time']
        },
        deadline: {
          agenda: ['Validate completion criteria', 'Resolve remaining blockers', 'Submit or approve the final deliverable'],
          preparation: ['Review all dependent work', 'Confirm the final owner', 'Prepare a contingency if the deadline is at risk']
        }
      }[event.category] : null;

      if (mode === 'add') {
        return (
          <div className="calendar-modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="calendar-modal" role="dialog" aria-modal="true" aria-labelledby="add-event-title">
              <div className="calendar-modal-head">
                <div>
                  <div className="calendar-modal-label">New calendar item</div>
                  <h2 id="add-event-title">Add event</h2>
                </div>
                <button type="button" className="calendar-modal-close" onClick={onClose} aria-label="Close add event dialog"><Icons.X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-3">
                <label className="block text-[11px] text-white/60">
                  <span className="block mb-1.5">Event title</span>
                  <input className="calendar-input !pl-3" value={draft.title} onChange={(e) => setDraft({...draft, title: e.target.value})} placeholder="e.g. Candidate interview" />
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="block text-[11px] text-white/60">
                    <span className="block mb-1.5">Date</span>
                    <input className="calendar-input !pl-3" type="date" value={draft.date} onChange={(e) => setDraft({...draft, date: e.target.value})} />
                  </label>
                  <label className="block text-[11px] text-white/60">
                    <span className="block mb-1.5">Time</span>
                    <input className="calendar-input !pl-3" type="time" value={draft.time} onChange={(e) => setDraft({...draft, time: e.target.value})} />
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <label className="block text-[11px] text-white/60">
                    <span className="block mb-1.5">Category</span>
                    <select className="calendar-select !pl-3" value={draft.category} onChange={(e) => setDraft({...draft, category: e.target.value})}>
                      {Object.entries(CALENDAR_CATEGORY_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </select>
                  </label>
                  <label className="block text-[11px] text-white/60">
                    <span className="block mb-1.5">Project</span>
                    <select className="calendar-select !pl-3" value={draft.project} onChange={(e) => setDraft({...draft, project: e.target.value})}>
                      <option>Project Atlas</option><option>Platform hiring</option><option>Design hiring</option><option>Northstar rollout</option>
                    </select>
                  </label>
                </div>
                <label className="block text-[11px] text-white/60">
                  <span className="block mb-1.5">Participants</span>
                  <input className="calendar-input !pl-3" value={draft.participantNames} onChange={(e) => setDraft({...draft, participantNames: e.target.value})} />
                </label>
              </div>
              <button
                type="button"
                className="calendar-primary w-full mt-6"
                disabled={!draft.title.trim()}
                onClick={() => onCreate(draft)}
              >
                <Icons.Plus className="w-4 h-4" /> Create event
              </button>
            </div>
          </div>
        );
      }

      return (
        <div className="calendar-modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
          <div className={`calendar-modal category-${event.category}`} role="dialog" aria-modal="true" aria-labelledby="calendar-event-title">
            <div className="calendar-modal-head">
              <div>
                <div className="calendar-modal-label">{CALENDAR_CATEGORY_LABELS[event.category]}</div>
                <h2 id="calendar-event-title">{event.title}</h2>
              </div>
              <button type="button" className="calendar-modal-close" onClick={onClose} aria-label="Close event details"><Icons.X className="w-4 h-4" /></button>
            </div>
            <dl className="calendar-modal-details">
              <div className="calendar-modal-detail"><dt>Date & time</dt><dd>{event.date} · {event.time}</dd></div>
              <div className="calendar-modal-detail"><dt>Status</dt><dd>{event.status}</dd></div>
              <div className="calendar-modal-detail"><dt>Project</dt><dd>{event.project}</dd></div>
              <div className="calendar-modal-detail"><dt>Location</dt><dd>{event.location}</dd></div>
              <div className="calendar-modal-detail col-span-2"><dt>Participants</dt><dd>{event.participantNames}</dd></div>
            </dl>
            <div className="calendar-modal-content-grid">
              <section className="calendar-modal-panel">
                <h3>Context and expected outcome</h3>
                <p className="calendar-modal-note">{event.note}</p>
              </section>
              <section className="calendar-modal-panel">
                <h3>Agenda</h3>
                <ul>{eventContext.agenda.map(item => <li key={item}>{item}</li>)}</ul>
              </section>
              <section className="calendar-modal-panel">
                <h3>Preparation checklist</h3>
                <ul>{eventContext.preparation.map(item => <li key={item}>{item}</li>)}</ul>
              </section>
              <section className="calendar-modal-panel">
                <h3>Scheduling notes</h3>
                <ul>
                  <li>Notifications are set for 30 minutes before the event.</li>
                  <li>Changes will be shared with {event.participantNames}.</li>
                  <li>The event is connected to {event.project}.</li>
                </ul>
              </section>
            </div>
            <div className="calendar-modal-actions">
              <button type="button" className="calendar-modal-action" onClick={onClose}>Edit</button>
              <button type="button" className="calendar-modal-action" onClick={onClose}>Reschedule</button>
              <button type="button" className="calendar-modal-action is-danger" onClick={() => onCancel(event.id)}>Cancel event</button>
            </div>
          </div>
        </div>
      );
    };

    const CalendarPage = () => {
      const [view, setView] = useState('month');
      const [periodOffset, setPeriodOffset] = useState(0);
      const [events, setEvents] = useState(INITIAL_CALENDAR_EVENTS);
      const [selectedEvent, setSelectedEvent] = useState(null);
      const [modalMode, setModalMode] = useState(null);
      const [search, setSearch] = useState('');
      const [category, setCategory] = useState('all');
      const [project, setProject] = useState('all');
      const [participant, setParticipant] = useState('all');
      const [status, setStatus] = useState('all');
      const [eventPreview, setEventPreview] = useState(null);

      const filteredEvents = events.filter(event => {
        const haystack = `${event.title} ${event.project} ${event.participantNames}`.toLowerCase();
        return (!search || haystack.includes(search.toLowerCase()))
          && (category === 'all' || event.category === category)
          && (project === 'all' || event.project === project)
          && (participant === 'all' || event.participantNames.includes(participant))
          && (status === 'all' || event.status === status);
      });

      const activeDate = new Date('2026-07-29T12:00:00');
      activeDate.setDate(activeDate.getDate() + periodOffset);
      const visibleDateLabel = view === 'day'
        ? activeDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
        : periodOffset === 0
          ? (view === 'month' ? 'July 2026' : '27 July – 2 August')
          : periodOffset < 0
            ? (view === 'month' ? 'June 2026' : '20 – 26 July')
            : (view === 'month' ? 'August 2026' : '3 – 9 August');

      const displayDays = CALENDAR_DAYS.map(day => {
        const shiftedDate = new Date(`${day.key}T12:00:00`);
        shiftedDate.setDate(shiftedDate.getDate() + (periodOffset * 7));
        return {
          ...day,
          key: shiftedDate.toISOString().slice(0, 10),
          date: shiftedDate.getDate(),
          today: periodOffset === 0 && day.today
        };
      });
      const todayEvents = filteredEvents.filter(event => event.date === '2026-07-29');
      const selectedDay = new Date('2026-07-29T12:00:00');
      selectedDay.setDate(selectedDay.getDate() + periodOffset);
      const selectedDayKey = selectedDay.toISOString().slice(0, 10);
      const selectedDayEvents = filteredEvents.filter(event => event.date === selectedDayKey);
      const upNextEvent = selectedDayEvents[0] || null;
      const monthScheduleEvents = filteredEvents
        .filter(event => event.date.startsWith('2026-07'))
        .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
      const reminderEvents = monthScheduleEvents.filter(event => event.category === 'deadline' || event.category === 'task').slice(0, 3);
      const timelineStartHour = 6;
      const timelineHours = Array.from({ length: 16 }, (_, index) => timelineStartHour + index);
      const timelineHourHeight = 64;
      const parseEventMinutes = (time) => {
        const match = time.match(/^(\d{1,2}):(\d{2})/);
        return match ? (Number(match[1]) * 60) + Number(match[2]) : 12 * 60;
      };
      const parseEventDuration = (time) => {
        const matches = [...time.matchAll(/(\d{1,2}):(\d{2})/g)];
        if (matches.length < 2) return 45;
        const start = (Number(matches[0][1]) * 60) + Number(matches[0][2]);
        const end = (Number(matches[1][1]) * 60) + Number(matches[1][2]);
        return Math.max(30, end - start);
      };
      const selectEvent = (event) => { setEventPreview(null); setSelectedEvent(event); setModalMode('details'); };
      const showEventPreview = (event, anchor) => {
        if (!anchor || typeof window === 'undefined') return;
        const rect = anchor.getBoundingClientRect();
        const previewWidth = Math.min(320, window.innerWidth - 32);
        const previewHeight = 292;
        const gap = 12;
        let left = rect.right + gap;
        if (left + previewWidth > window.innerWidth - 16) left = rect.left - previewWidth - gap;
        left = Math.max(16, Math.min(left, window.innerWidth - previewWidth - 16));
        const top = Math.max(16, Math.min(rect.top - 8, window.innerHeight - previewHeight - 16));
        setEventPreview({ event, left, top });
      };
      const hideEventPreview = () => setEventPreview(null);
      useEffect(() => {
        setEventPreview(null);
      }, [view, periodOffset, search, category, project, participant, status]);
      const closeModal = () => { setSelectedEvent(null); setModalMode(null); };
      const cancelEvent = (id) => { setEvents(current => current.filter(event => event.id !== id)); closeModal(); };
      const createEvent = (draft) => {
        const initials = draft.participantNames.split(',').slice(0, 2).map(name => name.trim().split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase());
        setEvents(current => [...current, {
          ...draft,
          id: `cal-${Date.now()}`,
          time: draft.time,
          participants: initials.length ? initials : ['SM'],
          status: 'Confirmed',
          location: 'Profeshare room',
          note: 'Newly scheduled event. Add an agenda and preparation notes before the event begins.'
        }]);
        closeModal();
      };

      const renderWeek = () => (
        <>
          <div className="calendar-week-head" role="row">
            {displayDays.map(day => (
              <div className={`calendar-day-head ${day.today ? 'is-today' : ''}`} key={day.key} role="columnheader">
                <span>{day.day}</span><span className="calendar-day-number">{day.date}</span>
              </div>
            ))}
          </div>
          <div className="calendar-week-grid">
            {displayDays.map(day => {
              const dayEvents = filteredEvents.filter(event => event.date === day.key);
              return (
                <div className={`calendar-day-column ${day.today ? 'is-today' : ''}`} key={day.key} data-od-id={`calendar-day-${day.key}`}>
                  <div className="calendar-event-list"><h3 className="mobile-day-label">{day.day} {day.date}</h3>
                    {dayEvents.map(event => <CalendarEventCard key={event.id} event={event} onSelect={selectEvent} onPreview={showEventPreview} onPreviewEnd={hideEventPreview} />)}
                    {dayEvents.length === 0 && (
                      <div className="calendar-empty">
                        <Icons.Calendar />
                        <span>No events scheduled</span>
                        <button type="button" onClick={() => setModalMode('add')}>Add one</button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      );

      const renderDay = () => (
        <div className="calendar-day-timeline custom-scroll" data-od-id="calendar-day-timeline">
          <div className="timeline-date-strip">
            <div className="timeline-date-tile">
              <span>{activeDate.toLocaleDateString('en-GB', { month: 'short' })}</span>
              <strong>{activeDate.getDate()}</strong>
            </div>
            <div>
              <div className="timeline-date-title">{activeDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div>
            <div className="timeline-date-summary">{selectedDayEvents.length} scheduled {selectedDayEvents.length === 1 ? 'event' : 'events'} · 6 AM–10 PM · all times local</div>
            </div>
          </div>
          <div className="timeline-canvas" style={{ height: `${timelineHours.length * timelineHourHeight}px` }}>
            {timelineHours.map(hour => (
              <div className="timeline-hour" key={hour} style={{ top: `${(hour - timelineStartHour) * timelineHourHeight}px` }}>
                <span>{hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}</span>
              </div>
            ))}
            <div className="timeline-events-layer">
              {periodOffset === 0 && (
                <div className="timeline-now-line" style={{ top: `${((10 * 60 + 20 - timelineStartHour * 60) / 60) * timelineHourHeight}px` }}>
                  <span>10:20 AM</span>
                </div>
              )}
              {selectedDayEvents.map(event => {
                const startMinutes = parseEventMinutes(event.time);
                const duration = parseEventDuration(event.time);
                return (
                  <button
                    type="button"
                    key={event.id}
                    className={`timeline-event-card category-${event.category}`}
                    style={{
                      top: `${((startMinutes - timelineStartHour * 60) / 60) * timelineHourHeight}px`,
                      height: `${Math.max(78, (duration / 60) * timelineHourHeight - 4)}px`
                    }}
                    onClick={() => selectEvent(event)}
                    onMouseEnter={(e) => showEventPreview(event, e.currentTarget)}
                    onMouseLeave={hideEventPreview}
                    onFocus={(e) => showEventPreview(event, e.currentTarget)}
                    onBlur={hideEventPreview}
                    aria-label={`${event.title}, ${event.time}, ${event.status}`}
                    data-od-id={`timeline-event-${event.id}`}
                  >
                    <span className="timeline-event-accent"></span>
                    <span className="timeline-event-copy">
                      <strong>{event.title}</strong>
                      <span>{event.time} · {event.location}</span>
                      <span className="timeline-event-details">{event.project} · {event.participantNames}</span>
                    </span>
                    <span className="calendar-status">{event.status}</span>
                  </button>
                );
              })}
              {selectedDayEvents.length === 0 && (
                <div className="timeline-empty">
                  <Icons.Calendar />
                  <strong>Your day is clear</strong>
                  <span>No scheduled events for this date.</span>
                  <button type="button" onClick={() => setModalMode('add')}>Add an event</button>
                </div>
              )}
            </div>
          </div>
        </div>
      );

      const monthDates = [
        { n: 29, muted: true, key: '2026-06-29' }, { n: 30, muted: true, key: '2026-06-30' },
        ...Array.from({ length: 31 }, (_, index) => ({ n: index + 1, key: `2026-07-${String(index + 1).padStart(2, '0')}` })),
        { n: 1, muted: true, key: '2026-08-01' }, { n: 2, muted: true, key: '2026-08-02' }
      ];

      const renderMonth = () => (
        <>
          <div className="calendar-week-head" role="row">
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(day => <div className="calendar-day-head" key={day}>{day}</div>)}
          </div>
          <div className="calendar-month-grid">
            {monthDates.map((day, index) => {
              const dayEvents = filteredEvents.filter(event => event.date === day.key);
              return (
                <div className={`calendar-month-cell ${day.muted ? 'is-muted' : ''}`} key={`${day.key}-${index}`}>
                  <div className="calendar-month-cell-number">{day.n}</div>
                  {dayEvents.slice(0, 3).map(event => (
                    <button
                      key={event.id}
                      type="button"
                      className={`calendar-month-event category-${event.category}`}
                      onClick={() => selectEvent(event)}
                      onMouseEnter={(e) => showEventPreview(event, e.currentTarget)}
                      onMouseLeave={hideEventPreview}
                      onFocus={(e) => showEventPreview(event, e.currentTarget)}
                      onBlur={hideEventPreview}
                      aria-label={`${event.title}, ${event.time}, ${event.status}, ${event.project}. Focus to preview; activate for full details.`}
                    >
                      <span className="truncate">{event.time} · {event.title}</span>
                    </button>
                  ))}
                  {dayEvents.length > 3 && <div className="text-[9px] text-white/40">+{dayEvents.length - 3} more</div>}
                </div>
              );
            })}
          </div>
        </>
      );

      return (
        <main className="calendar-page calendar-rethemed custom-scroll" data-od-id="calendar-page" onScrollCapture={hideEventPreview}>
          <div className="calendar-shell">
            <section className="calendar-unified" data-od-id="calendar-unified-workspace">
              <header className="calendar-header">
                <div>
                  <h1 className="calendar-title" data-od-id="calendar-title">Calendar</h1>
                  <p className="calendar-subtitle">Interviews, project work, meetings, tasks, and deadlines—organized around the people and work that need your attention.</p>
                </div>
                <button type="button" className="calendar-primary" onClick={() => setModalMode('add')} data-od-id="calendar-add-event">
                  <Icons.Plus className="w-4 h-4" /> Add Event
                </button>
              </header>

              <section className="calendar-toolbar" aria-label="Calendar navigation" data-od-id="calendar-toolbar">
              <div className="calendar-toolbar-group">
                <button type="button" className="calendar-control" onClick={() => setPeriodOffset(value => value - 1)} aria-label="Previous date range"><Icons.ChevronLeft className="w-4 h-4" /></button>
                <button type="button" className="calendar-control" onClick={() => setPeriodOffset(0)}><span>Today</span></button>
                <button type="button" className="calendar-control" onClick={() => setPeriodOffset(value => value + 1)} aria-label="Next date range"><Icons.ChevronRight className="w-4 h-4" /></button>
                <div className="calendar-date-label" aria-live="polite">{visibleDateLabel}</div>
              </div>
              <div className="calendar-view-switcher" aria-label="Calendar view">
                {['day', 'week', 'month'].map(option => (
                  <button
                    type="button"
                    key={option}
                    className={`calendar-view-button ${view === option ? 'is-active' : ''}`}
                    onClick={() => setView(option)}
                    aria-pressed={view === option}
                  >
                    {option[0].toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </div>
              </section>

              <section className="calendar-filters" aria-label="Calendar filters" data-od-id="calendar-filters">
              <label className="calendar-field">
                <Icons.Search />
                <span className="sr-only">Search events</span>
                <input className="calendar-input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search events, projects, or people" />
              </label>
              <label className="calendar-field">
                <Icons.Sliders />
                <span className="sr-only">Event type</span>
                <select className="calendar-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="all">All event types</option>
                  {Object.entries(CALENDAR_CATEGORY_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
              <label className="calendar-field">
                <Icons.Briefcase />
                <span className="sr-only">Project</span>
                <select className="calendar-select" value={project} onChange={(e) => setProject(e.target.value)}>
                  <option value="all">All projects</option><option>Project Atlas</option><option>Platform hiring</option><option>Design hiring</option><option>Product hiring</option><option>Northstar rollout</option>
                </select>
              </label>
              <label className="calendar-field">
                <Icons.User />
                <span className="sr-only">Participant</span>
                <select className="calendar-select" value={participant} onChange={(e) => setParticipant(e.target.value)}>
                  <option value="all">All participants</option><option>Sam</option><option>Nina</option><option>Oman</option><option>David</option>
                </select>
              </label>
              <label className="calendar-field">
                <Icons.CheckCircle />
                <span className="sr-only">Status</span>
                <select className="calendar-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="all">All statuses</option><option>Confirmed</option><option>In progress</option><option>To do</option><option>Tentative</option><option>At risk</option>
                </select>
              </label>
              </section>

              <div className="calendar-layout">
                <section className="calendar-board" aria-label={`${view} calendar view`} data-od-id="calendar-board">
                  {view === 'week' ? renderWeek() : view === 'day' ? renderDay() : renderMonth()}
                </section>
                <aside className="calendar-agenda calendar-context-rail" data-od-id="calendar-context-rail">
                  <section className="mini-calendar" aria-label="July 2026 mini calendar" data-od-id="mini-calendar">
                    <div className="mini-calendar-head">
                      <button type="button" aria-label="Previous month"><Icons.ChevronLeft /></button>
                      <h2>July 2026</h2>
                      <button type="button" aria-label="Next month"><Icons.ChevronRight /></button>
                    </div>
                    <div className="mini-calendar-weekdays" aria-hidden="true">
                      {['M','T','W','T','F','S','S'].map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}
                    </div>
                    <div className="mini-calendar-grid">
                      {monthDates.slice(0, 35).map((day, index) => {
                        const hasEvents = events.some(event => event.date === day.key);
                        const isSelected = day.key === selectedDayKey;
                        const dayDifference = Math.round((new Date(`${day.key}T12:00:00`) - new Date('2026-07-29T12:00:00')) / 86400000);
                        return (
                          <button
                            type="button"
                            key={`mini-${day.key}-${index}`}
                            className={`${day.muted ? 'is-muted' : ''} ${isSelected ? 'is-selected' : ''}`}
                            onClick={() => { setPeriodOffset(dayDifference); setView('day'); }}
                            aria-current={isSelected ? 'date' : undefined}
                            aria-label={`${day.n} July${hasEvents ? ', events scheduled' : ''}`}
                          >
                            <span>{day.n}</span>
                            {hasEvents && <i aria-hidden="true"></i>}
                          </button>
                        );
                      })}
                    </div>
                  </section>
                  <section className="calendar-rail-section" data-od-id="calendar-reminders">
                    <div className="calendar-rail-heading"><h2>Reminders</h2><span>{reminderEvents.length} active</span></div>
                    <div className="reminder-list" tabIndex={0} role="region" aria-label="Scrollable reminders">
                      {reminderEvents.map(event => (
                        <button type="button" key={`reminder-${event.id}`} className="reminder-item" onClick={() => selectEvent(event)}>
                          <span className="reminder-date">{new Date(`${event.date}T12:00:00`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
                          <span className="reminder-copy"><strong>{event.title}</strong><span>{event.time} · {event.status}</span></span>
                        </button>
                      ))}
                    </div>
                  </section>
                  <section className="calendar-rail-section" data-od-id="calendar-month-schedule">
                    <div className="calendar-rail-heading"><h2>Schedule</h2><span>Full month</span></div>
                    <div className="month-schedule-list" tabIndex={0} role="region" aria-label="Scrollable schedule">
                      {monthScheduleEvents.map(event => (
                        <button type="button" key={`schedule-${event.id}`} className={`agenda-item category-${event.category}`} onClick={() => selectEvent(event)}>
                          <div className="agenda-item-row"><span className="agenda-item-time">{new Date(`${event.date}T12:00:00`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} · {event.time}</span><span className="calendar-status">{CALENDAR_CATEGORY_LABELS[event.category]}</span></div>
                          <div className="agenda-item-title">{event.title}</div>
                          <div className="agenda-item-project">{event.project} · {event.location}</div>
                        </button>
                      ))}
                    </div>
                  </section>
                </aside>
              </div>
            </section>
          </div>
          <CalendarEventPreview preview={eventPreview} />
          <CalendarModal event={selectedEvent} mode={modalMode} onClose={closeModal} onCancel={cancelEvent} onCreate={createEvent} />
        </main>
      );
    };

    const DiscoverPage = () => (
      <main className="w-full h-full bg-[#0f0f0f]" data-od-id="discover-page-frame">
        <iframe
          src="discover.html?embedded=1"
          title="Discover"
          className="block w-full h-full border-0"
          data-od-id="discover-page-iframe"
        />
      </main>
    );

    const LibraryPage = () => (
      <main className="w-full h-full bg-transparent" data-od-id="library-page-frame">
        <iframe
          src="library.html?embedded=1&v=20260828"
          title="Library"
          className="block w-full h-full border-0"
          data-od-id="library-page-iframe"
        />
      </main>
    );

    const CommunityPage = () => (
      <main className="w-full h-full bg-[#0f0f0f]" data-od-id="community-page-frame">
        <iframe
          src="community.html?embedded=1"
          title="Community"
          className="block w-full h-full border-0"
          data-od-id="community-page-iframe"
        />
      </main>
    );


    // Safe markdown: React escapes all server content; raw HTML is never injected.
    const Markdown = ({text = ''}) => {
      const inline = value => String(value).split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g).map((part,i) => {
        if (part.startsWith('**')) return <strong key={i}>{part.slice(2,-2)}</strong>;
        if (part.startsWith('`')) return <code key={i}>{part.slice(1,-1)}</code>;
        const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
        return link ? <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer">{link[1]}</a> : part;
      });
      let fenced = false;
      return <div className="ps-markdown">{String(text).split('\n').map((line,i) => {
        if (line.startsWith('```')) { fenced = !fenced; return null; }
        if (fenced) return <pre key={i}>{line}</pre>;
        const heading = line.match(/^(#{1,6})\s+(.+)/);
        if (heading) return <h3 key={i}>{inline(heading[2])}</h3>;
        if (/^\s*[-*_]{3,}\s*$/.test(line)) return <hr key={i}/>;
        if (/^\s*([-*+] |\d+\. )/.test(line)) return <ul key={i}><li>{inline(line.replace(/^\s*([-*+] |\d+\. )/,''))}</li></ul>;
        if (line.startsWith('> ')) return <blockquote key={i}>{inline(line.slice(2))}</blockquote>;
        return line ? <p key={i}>{inline(line)}</p> : <div key={i} className="h-2"/>;
      })}</div>;
    };
    const ResultList = ({title, items}) => <section><h3>{title}</h3>{items?.length ? <ul>{items.map((v,i)=><li key={i}>{String(v)}</li>)}</ul> : <p>None returned.</p>}</section>;
    const ApiResponse = ({msg}) => {
      const r = msg.result;
      return <div className="glass glass-card chat-message-bubble ai-response-copy ps-response" data-od-id={`api-response-${msg.id}`} aria-busy={!!msg.pending}>
        {msg.content && <Markdown text={msg.content}/>}
        {msg.outputs?.map((output,i)=><ApiResponse key={i} msg={{...output,id:`${msg.id}-${i}`}}/>)}
        {msg.pending && <p role="status">{msg.status || 'Receiving response…'}</p>}
        {msg.pending && msg.action === 'apply' && <progress aria-label="Preparing documents"/>}
        {msg.error && <p role="alert" className="ps-error">{msg.error}</p>}
        {r && msg.action === 'evaluate' && <>
          <div className="ps-score"><strong>{r.overall ?? '—'}<small>/100</small></strong><span className="ps-chip">{r.recommendation || 'No recommendation returned'}</span></div>
          {['skills_match','experience_level','culture_values','location_workmode','career_alignment'].map(key=><div key={key} className="ps-dimension"><label htmlFor={`${msg.id}-${key}`}>{key.replaceAll('_',' ')} <span>{r.dimensions?.[key] ?? '—'}/100</span></label><progress id={`${msg.id}-${key}`} max="100" value={r.dimensions?.[key] ?? 0}/></div>)}
          <ResultList title="Strengths" items={r.strengths}/><ResultList title="Gaps" items={r.gaps}/>
          {!!r.deal_breakers?.length && <ResultList title="Deal breakers" items={r.deal_breakers}/>}
          {r.reasoning && <Markdown text={r.reasoning}/>}
        </>}
        {r && msg.action === 'apply' && <>
          <h3>CV</h3><Markdown text={r.cv_markdown || 'No CV returned.'}/>
          <h3>Cover letter</h3><Markdown text={r.cover_letter_markdown || 'No cover letter returned.'}/>
          <ResultList title="Keyword gaps" items={r.keyword_gaps}/>
          <h3>Review notes</h3><Markdown text={r.review_notes || 'No review notes returned.'}/>
        </>}
        {r && msg.action === 'interviewPrep' && <Markdown text={r.markdown || 'No interview preparation returned.'}/>}
      </div>;
    };
    const ApiContext = React.createContext(null);
    const App = () => {
      const [messages, setMessages] = useState([]);
      const [input, setInput] = useState(() => new URLSearchParams(window.location.search).get('prompt') || '');
      const [isGenerating, setIsGenerating] = useState(false);
      const [isSidebarOpen, setSidebarOpen] = useState(false);
      const [isSidebarExpanded, setSidebarExpanded] = useState(false);
      const [selectedItem, setSelectedItem] = useState(null);
      const [feedback, setFeedback] = useState(null);
      const [currentPage, setCurrentPage] = useState('home');
      const [selectedCategory, setSelectedCategory] = useState(null);
      const messagesEndRef = useRef(null);
      const busyRef = useRef(false);
      const sequence = useRef(0);
      const [apiHealth,setApiHealth] = useState('checking');
      useEffect(()=>{
        let active = true, timer;
        const checkHealth = async () => {
          try {
            const health = await window.Profeshare.health();
            if(active) setApiHealth(health.ok ? (health.live ? 'live' : 'mock') : 'offline');
          } catch(error) { if(active) setApiHealth('offline'); }
          finally { if(active) timer = window.setTimeout(checkHealth, 10000); }
        };
        checkHealth();
        return ()=>{active=false;window.clearTimeout(timer);};
      },[]);
      const updateReply = (id,patch) => setMessages(prev=>prev.map(m=>m.id===id ? {...m,...(typeof patch==='function'?patch(m):patch)} : m));
      const runRequest = async text => {
        if (busyRef.current || !text.trim()) return;
        busyRef.current=true; setIsGenerating(true); setCurrentPage('results');
        const id = ++sequence.current;
        setMessages(prev=>[...prev,{role:'user',content:text},{role:'ai',id,content:'',pending:true}]);
        try {
          const reply = await window.ProfeshareSession.converse(text, {
            onToken: token => updateReply(id,m=>({content:m.content+token})),
            onStatus: status => updateReply(id,{status}),
            onResult: output => updateReply(id,m=>({outputs:[...(m.outputs || []),output]}))
          });
          updateReply(id,{content:reply.content || ''});
        } catch(e) { updateReply(id,{error:e.message || String(e)}); }
        finally { updateReply(id,{pending:false}); busyRef.current=false; setIsGenerating(false); }
      };

      // Rotating category-specific placeholder for the Home AI Chat input.
      // - Active list locks to a single entry when a category chip is selected.
      // - Rotation pauses on focus or once the user starts typing.
      // - placeholderIndex drives a single span that remounts on change (key=placeholderIndex) to re-run the CSS crossfade.
      const placeholderList = selectedCategory
        ? [PLACEHOLDER_COPY[selectedCategory]]
        : Object.keys(PLACEHOLDER_COPY).map(key => PLACEHOLDER_COPY[key]);
      const [placeholderIndex, setPlaceholderIndex] = useState(0);
      const [isInputFocused, setIsInputFocused] = useState(false);
      const rotationPaused = isInputFocused || input.trim().length > 0;

      useEffect(() => {
        if (rotationPaused || placeholderList.length <= 1) return undefined;
        const id = setInterval(() => {
          setPlaceholderIndex(i => (i + 1) % placeholderList.length);
        }, PLACEHOLDER_ROTATION_MS);
        return () => clearInterval(id);
      }, [rotationPaused, placeholderList.length]);

      // When the locked category changes, snap to its (single) copy without animating.
      useEffect(() => {
        setPlaceholderIndex(0);
      }, [selectedCategory]);

      const scrollToBottom = () => {
        const scrollRegion = messagesEndRef.current?.closest('.overflow-y-auto');
        if (scrollRegion) scrollRegion.scrollTo({ top: scrollRegion.scrollHeight, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      };

      useEffect(() => {
        scrollToBottom();
      }, [messages]);

      const handleSend = () => {
        if (!input.trim() || busyRef.current) return;
        const text = input.trim(); setInput('');
        return runRequest(text);
      };


      const handleFeedbackSubmit = (submittedFeedback) => {
        setFeedback(null);
      };

      const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
          e.preventDefault();
          handleSend();
        }
      };

      const handlePromptClick = (text) => {
        setInput(text);
      };

      const handleNavigateToProfile = () => {
        setCurrentPage('profile');
        setSidebarOpen(false);
      };

      return (
          <ApiContext.Provider value={{health:apiHealth}}>
          <div className={`h-screen w-full relative flex overflow-hidden ${['home', 'results', 'calendar', 'discover', 'library', 'community', 'profile'].includes(currentPage) ? 'home-sidebar-layout' : ''} ${currentPage === 'calendar' ? 'calendar-page-active' : ''}`}>
          <div className="app-background" aria-hidden="true"></div>
          
          <aside id="primary-sidebar" className={`app-sidebar relative z-30 h-full flex-shrink-0 sidebar-glass flex flex-col transition-[width] duration-200 ease-[cubic-bezier(0.2,0,0,1)] overflow-visible ${isSidebarExpanded ? 'w-72 is-expanded' : 'w-[76px] is-collapsed'}`} data-od-id="persistent-sidebar">
            <div className="sidebar-header p-6 flex items-center justify-between relative" data-od-id="sidebar-header">
              <div className={`sidebar-brand flex items-center gap-2 min-w-0 ${isSidebarExpanded ? '' : 'justify-center w-full'}`}>
                <img src="Profeshare-AI-Logo.svg" alt="Profeshare AI" className={`sidebar-logo object-contain ${isSidebarExpanded ? '' : 'hidden'}`} />
              </div>
              <button onClick={() => setSidebarExpanded(value => !value)} className="sidebar-toggle p-0 flex items-center justify-center rounded-lg transition-colors text-white" aria-label={isSidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'} aria-expanded={isSidebarExpanded} aria-controls="primary-sidebar" data-od-id="sidebar-toggle">
                {isSidebarExpanded ? <Icons.PanelCollapse className="w-5 h-5" /> : <Icons.PanelExpand className="w-5 h-5" />}
              </button>
            </div>
            
            <div className="px-4">
              <button data-od-id="new-chat-button" aria-label="New conversation" onClick={() => { if (busyRef.current) return; window.ProfeshareSession.reset(); setMessages([]); setCurrentPage('home'); setSidebarOpen(false); setInput(''); }} className={`w-full py-3 rounded-xl flex items-center gap-3 text-sm font-medium ${isSidebarExpanded ? 'px-4 justify-start' : 'px-3 justify-center'}`} title={isSidebarExpanded ? undefined : 'New Chat'}>
                <Icons.Plus className="w-4 h-4" />
                <span className={`sidebar-label ${isSidebarExpanded ? '' : 'hidden'}`}>New Chat</span>
              </button>
              <button
                type="button"
                onClick={() => { setCurrentPage('calendar'); setSidebarOpen(false); }}
                className={`w-full mt-2 py-3 rounded-xl flex items-center gap-3 text-sm font-medium transition-colors border ${isSidebarExpanded ? 'px-4 justify-start' : 'px-3 justify-center'} ${
                  currentPage === 'calendar'
                    ? 'bg-white/10 border-white/15 text-white'
                    : 'bg-white/[0.025] border-white/[0.08] text-white/70 hover:bg-white/[0.07] hover:text-white'
                }`}
                aria-label="Calendar" data-od-id="sidebar-calendar"
                title={isSidebarExpanded ? undefined : 'Calendar'}
              >
                <Icons.Calendar className="w-4 h-4" />
                <span className={`sidebar-label ${isSidebarExpanded ? '' : 'hidden'}`}>Calendar</span>
              </button>
              <button
                type="button"
                onClick={() => { setCurrentPage('discover'); setSidebarOpen(false); }}
                className={`w-full mt-2 py-3 rounded-xl flex items-center gap-3 text-sm font-medium transition-colors border ${isSidebarExpanded ? 'px-4 justify-start' : 'px-3 justify-center'} ${
                  currentPage === 'discover'
                    ? 'bg-white/10 border-white/15 text-white'
                    : 'bg-white/[0.025] border-white/[0.08] text-white/70 hover:bg-white/[0.07] hover:text-white'
                }`}
                aria-label="Discover" data-od-id="sidebar-discover"
                title={isSidebarExpanded ? undefined : 'Discover'}
              >
                <Icons.Compass className="w-4 h-4" />
                <span className={`sidebar-label ${isSidebarExpanded ? '' : 'hidden'}`}>Discover</span>
              </button>
              <button
                type="button"
                onClick={() => { setCurrentPage('library'); setSidebarOpen(false); }}
                className={`w-full mt-2 py-3 rounded-xl flex items-center gap-3 text-sm font-medium transition-colors border ${isSidebarExpanded ? 'px-4 justify-start' : 'px-3 justify-center'} ${
                  currentPage === 'library'
                    ? 'bg-white/10 border-white/15 text-white'
                    : 'bg-white/[0.025] border-white/[0.08] text-white/70 hover:bg-white/[0.07] hover:text-white'
                }`}
                aria-label="Library" data-od-id="sidebar-library"
                title={isSidebarExpanded ? undefined : 'Library'}
              >
                <Icons.Bookmark className="w-4 h-4" />
                <span className={`sidebar-label ${isSidebarExpanded ? '' : 'hidden'}`}>Library</span>
              </button>
              <button
                type="button"
                onClick={() => { setCurrentPage('community'); setSidebarOpen(false); }}
                className={`w-full mt-2 py-2.5 rounded-xl flex items-center gap-3 text-sm transition-colors border ${isSidebarExpanded ? 'px-4 justify-start' : 'px-3 justify-center'} ${
                  currentPage === 'community'
                    ? 'bg-white/10 border-white/15 text-white'
                    : 'bg-white/[0.018] border-white/[0.06] text-white/60 hover:bg-white/[0.07] hover:text-white'
                }`}
                aria-label="Community" data-od-id="sidebar-community"
                aria-current={currentPage === 'community' ? 'page' : undefined}
                title={isSidebarExpanded ? undefined : 'Community'}
              >
                <Icons.Users className="w-4 h-4" />
                <span className={`sidebar-label ${isSidebarExpanded ? '' : 'hidden'}`}>Community</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scroll">
              {isSidebarExpanded && (
                <div className="p-4 mt-4" data-od-id="sidebar-recent-chats">
                  <div className="text-xs font-semibold text-white uppercase tracking-wider mb-3 px-2">Recent</div>
                  <div className="space-y-1">
                    {messages.filter(m => m.role === 'user').map((m, i) => (
                      <button key={i} onClick={() => { setCurrentPage('results'); setSidebarOpen(false); }} className="w-full py-2.5 rounded-lg hover:bg-white/5 transition-colors text-sm text-white hover:text-white flex items-center gap-3 truncate text-left px-3 justify-start">
                        <Icons.MessageSquare className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate sidebar-label">{m.content}</span>
                      </button>
                    ))}
                    {messages.length === 0 && (
                      <div className="px-3 py-2 text-sm text-white/30 italic">No recent searches</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Section at Bottom of Sidebar */}
            <div className={`flex-shrink-0 p-4 border-t border-white/10 ${isSidebarExpanded ? '' : 'px-3'}`}>
              <button
                onClick={handleNavigateToProfile}
                aria-label="Your profile" title={isSidebarExpanded ? undefined : 'Your Profile'}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${isSidebarExpanded ? 'justify-start' : 'justify-center'} ${
                  currentPage === 'profile'
                    ? 'bg-white/10 border border-white/15'
                    : 'hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-sm font-bold text-white">SK</span>
                </div>
                <div className={`flex-1 min-w-0 text-left sidebar-label ${isSidebarExpanded ? '' : 'hidden'}`}>
                  <p className="text-sm font-medium text-white">Sam</p>
                  <p className="text-xs text-white truncate">View profile</p>
                </div>
                {isSidebarExpanded && <Icons.ChevronRight className="w-4 h-4 text-white" />}
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <div id="workspace-content" tabIndex={-1} className="flex-1 flex flex-col h-full relative z-10 transition-all duration-500 main-content-surface">
            {currentPage === 'profile' ? (
              <ProfilePage profile={USER_PROFILE} />
            ) : currentPage === 'calendar' ? (
              <CalendarPage />
            ) : currentPage === 'discover' ? (
              <DiscoverPage />
            ) : currentPage === 'community' ? (
              <CommunityPage />
            ) : currentPage === 'library' ? (
              <LibraryPage />
            ) : messages.length === 0 ? (
              <div className="home-empty-state animate-[fadeIn_0.5s_ease-out]">
                <div className="home-background" aria-hidden="true"></div>
                <div className="home-primary-stack" data-od-id="home-primary-chat">
                  <h1 className="home-greeting font-display text-4xl sm:text-5xl text-white tracking-[-0.04em]">
                    Good afternoon, Sam.
                  </h1>
                  
                  <div className="home-chat-wrap relative group">
                    <ChatComposer
                      input={input}
                      setInput={setInput}
                      handleKeyDown={handleKeyDown}
                      handleSend={handleSend}
                      isGenerating={isGenerating}
                      placeholderList={placeholderList}
                      placeholderIndex={placeholderIndex}
                      setIsInputFocused={setIsInputFocused}
                      dataId="home-chat-composer"
                    />
                  </div>

                  <div className="prompt-suggestions" data-od-id="prompt-suggestions">
                    <div className="prompt-option-panel" role="group" aria-label="Suggested prompts">
                      {[
                        ['candidate-profile', 'Interview me one question at a time to build my candidate profile.'],
                        ['full-application', 'Evaluate my fit for this role and prepare my full application.'],
                        ['mock-interview', 'Prepare me for my interview with a mock Q&A, one question at a time.']
                      ].map(([id, prompt]) => (
                        <button
                          type="button"
                          key={id}
                          className="prompt-option-row"
                          onClick={() => handlePromptClick(prompt)}
                          data-od-id={`prompt-option-${id}`}
                        >
                          <span className="prompt-option-copy">
                            <span className="prompt-option-text">{prompt}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex-1 flex flex-col h-full overflow-hidden w-full max-w-5xl mx-auto animate-[fadeIn_0.3s_ease-out]">
                
                <div className="results-message-scroll flex-1 overflow-y-auto custom-scroll p-4 sm:p-6">
                  <div className="chat-message-list flex flex-col max-w-5xl mx-auto" role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions text" data-od-id="chat-message-list">
                    {messages.map((msg, idx) => (
                      <div key={idx} className={`chat-message-row ${msg.role === 'user' ? 'is-user' : 'is-assistant'}`} data-od-id={`chat-message-${idx}`}>
                        {msg.role === 'user' ? (
                          <div className="glass glass-card chat-message-bubble chat-message-user" aria-label="Your message">
                            <p>{msg.content}</p>
                          </div>
                        ) : (
                          <div className="chat-message-assistant" aria-label="Profeshare message">
                            <ApiResponse msg={msg} />
                          </div>
                        )}
                      </div>
                    ))}

                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <div className="results-chat-dock">
                  <div className="results-chat-inner">
                    <ChatComposer
                      input={input}
                      setInput={setInput}
                      handleKeyDown={handleKeyDown}
                      handleSend={handleSend}
                      isGenerating={isGenerating}
                      placeholderList={placeholderList}
                      placeholderIndex={placeholderIndex}
                      setIsInputFocused={setIsInputFocused}
                      ariaLabel="Refine or start a new search"
                      dataId="results-chat-composer"
                    />
                  </div>
                </div>
                
              </div>
            )}
          </div>
          
          <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
          <FeedbackModal feedback={feedback} onClose={() => setFeedback(null)} onSubmit={handleFeedbackSubmit} />
          
        </div>
        </ApiContext.Provider>
      );
    };

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  