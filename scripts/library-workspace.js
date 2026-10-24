/* Library source cards; previews are deliberately labeled placeholders. */
(()=>{
 const safe=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const fileURLs=new Map();
 const originalRender=window.render;
 const originalOpen=window.openSource;
 const icon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M8 14h8M8 17h6"/></svg>';
 function count(rows){const el=document.getElementById('libraryResultCount');if(el)el.textContent=rows.length+' '+(rows.length===1?'source':'sources');}
 window.render=function(){
  if(state.tab!=='Sources'){originalRender();return;}
  const rows=filteredSources();count(rows);
  const root=document.getElementById('sourceList');root.className='library-document-grid';
  root.innerHTML=rows.length?rows.map(source=>{
   const title=source.title.replace(/--/g,': ').replace(/-/g,' ').replace(/\.(pdf|docx?|pptx?)$/i,'');
   const format=formatSource(source.type);
   return `<article class="document-card ${state.openId===source.id?'is-selected':''}" data-od-id="library-source-${source.id}">
    <button class="document-preview preview-${safe(source.type)}" onclick="openSource(${Number(source.id)})" aria-label="Open ${safe(source.title)}" data-od-id="source-preview-${source.id}">
     <span class="preview-format">${safe(format)}</span><span class="preview-sheet" aria-hidden="true">${icon}<span class="preview-paper-heading">${safe(title)}</span><span class="preview-lines"><i></i><i></i><i></i><i></i></span></span>
     <span class="preview-caption">Preview placeholder</span>
    </button>
    <div class="document-card-body"><div class="document-card-meta"><span>${safe(format)}</span><span class="document-reading-status">${safe(source.status)}</span></div>
     <h3><button onclick="openSource(${Number(source.id)})">${safe(title)}</button></h3><p class="document-author">${safe(source.author)}</p><p class="document-summary">${safe(source.summary)}</p>
     <div class="document-card-footer"><span>${safe(source.date)}</span><button class="source-context-action" onclick="libraryUseSource(${Number(source.id)})" aria-label="Use ${safe(source.title)} as AI context" data-od-id="source-context-${source.id}">${state.context.includes(source.title)?'Added to context':'Use as context'} <span aria-hidden="true">${state.context.includes(source.title)?'✓':'+'}</span></button></div>
    </div></article>`;
  }).join(''):'<div class="library-empty"><h3>No sources match</h3><p>Try a different search, format, or reading status.</p><button onclick="libraryResetFilters()">Clear filters</button></div>';
  updateAI();
 };
 window.libraryResetFilters=()=>{document.getElementById('listSearch').value='';document.getElementById('typeFilter').value='all';document.getElementById('statusFilter').value='all';state.theme='all';render();};
 window.libraryUseSource=id=>{const source=sources.find(s=>s.id===id);if(!source)return;state.openId=id;state.context=[source.title];render();const input=document.getElementById('chatInput');input.focus();input.placeholder='Ask about this source…';};
 window.openSource=id=>{
  const source=sources.find(s=>s.id===id);if(!source)return;
  if(id===1){originalOpen(id);return;}
  state.openId=id;state.context=[source.title];render();openDetail('source',Object.fromEntries(Object.entries(source).map(([key,value])=>[key,typeof value==='string'?safe(value):value])));
  const detail=document.getElementById('detailView');detail.setAttribute('role','dialog');detail.setAttribute('aria-modal','true');detail.setAttribute('aria-label',source.title);
  if(fileURLs.has(id)){
   const link=document.createElement('a');link.className='detail-action';link.textContent='Open uploaded file';link.href=fileURLs.get(id);link.target='_blank';link.rel='noopener';detail.querySelector('.detail-actions').prepend(link);
  }
 };
 const oldClose=window.closeDetail;
 window.closeDetail=()=>{oldClose();const detail=document.getElementById('detailView');detail.removeAttribute('aria-modal');detail.removeAttribute('role');};
 window.sendChat=()=>{
  const input=document.getElementById('chatInput'),question=input.value.trim();if(!question)return;
  const selected=sources.filter(s=>state.context.includes(s.title));
  const context=selected.map(s=>'Source: '+s.title+'\n'+s.summary).join('\n\n');
  const url=new URL('profeshare-glass-chat-layout-20.html',location.href);url.searchParams.set('page','home');url.searchParams.set('prompt',question+(context?'\n\nSaved source context (summary only):\n'+context:''));window.top.location.href=url.href;
 };
 window.handleUpload=input=>{
  const file=input.files?.[0];if(!file)return;
  const ext=file.name.split('.').pop().toLowerCase();if(!['pdf','doc','docx','ppt','pptx'].includes(ext)){alert('Choose a PDF, Word document, or presentation.');return;}
  const id=Date.now();fileURLs.set(id,URL.createObjectURL(file));sources.unshift({id,type:ext==='pdf'?'pdf':['doc','docx'].includes(ext)?'docs':'ppt',title:file.name,author:'Uploaded by you · This session',date:'Just added',status:'Unread',themes:[],summary:'Uploaded document. Paste relevant text into the AI workspace to discuss its contents.'});state.openId=id;state.context=[file.name];input.value='';render();
 };
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDetail();});
 const originalToggle=window.toggleAI;
 window.toggleAI=()=>{if(window.matchMedia('(max-width:1100px)').matches){toggleMobileAI();return;}originalToggle();};
 window.updateAI=()=>{
  const source=sources.find(s=>s.id===state.openId)||sources[0];
  const questions=source?[`Summarize the key ideas in “${source.title}”.`,'How can I apply these ideas to my next project?']:['Help me organize my sources.'];
  const suggestions=document.getElementById('suggestions');suggestions.replaceChildren();
  for(const text of questions){const button=document.createElement('button');button.className='suggestion';button.textContent=text;button.onclick=()=>quickAction(text);suggestions.append(button);}
  const context=document.getElementById('contextRow');context.replaceChildren();
  state.context.forEach((title,index)=>{const chip=document.createElement('span');chip.className='context-chip';const text=document.createElement('span');text.textContent=title;const remove=document.createElement('button');remove.textContent='×';remove.setAttribute('aria-label','Remove '+title);remove.onclick=()=>removeContext(index);chip.append(text,remove);context.append(chip);});
 };
 const detail=document.getElementById('detailView');detail.classList.add('library-source-detail');
 render();
})();
