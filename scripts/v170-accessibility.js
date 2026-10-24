/* Keyboard support for existing dynamic controls and modal dialogs. */
(()=>{
 let modal=null,returnFocus=null;
 const focusable='button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex="0"]';
 function refresh(){
  document.querySelectorAll('input:not([type="hidden"]),textarea,select').forEach(el=>{
   if(!el.labels?.length&&!el.hasAttribute('aria-label')&&!el.hasAttribute('aria-labelledby'))el.setAttribute('aria-label',el.placeholder||el.name||'Input');
  });
  const next=[...document.querySelectorAll('[role="dialog"][aria-modal="true"]')].find(el=>el.getClientRects().length);
  if(next!==modal){
   if(next){returnFocus=document.activeElement;modal=next;requestAnimationFrame(()=>{(modal?.querySelector(focusable)||modal)?.focus();});}
   else {modal=null;if(returnFocus?.isConnected)returnFocus.focus();returnFocus=null;}
  }
 }
 document.addEventListener('keydown',e=>{
  if(!modal||e.key!=='Tab')return;
  const items=[...modal.querySelectorAll(focusable)].filter(el=>el.getClientRects().length);
  if(!items.length){e.preventDefault();return;}
  const first=items[0],last=items[items.length-1];
  if(e.shiftKey&&(document.activeElement===first||!modal.contains(document.activeElement))){e.preventDefault();last.focus();}
  else if(!e.shiftKey&&(document.activeElement===last||!modal.contains(document.activeElement))){e.preventDefault();first.focus();}
 });
 new MutationObserver(refresh).observe(document.body,{childList:true,subtree:true});refresh();
})();
