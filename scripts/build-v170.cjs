const fs=require('fs'),esbuild=require('esbuild');
const files=['profeshare-glass-chat-layout-20.html','library.html','community.html','discover.html'];
fs.mkdirSync('dist',{recursive:true});
esbuild.buildSync({entryPoints:['app/v170-main.jsx'],bundle:true,outfile:'dist/profeshare-v170.js',format:'iife',target:'es2020',jsxFactory:'React.createElement',jsxFragment:'React.Fragment',minify:true});
let total=0;
for(const file of files){
 const html=fs.readFileSync(file,'utf8');let index=0;
 for(const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)){
  if(/\bsrc=/.test(match[1])||!match[2].trim())continue;
  const result=esbuild.transformSync(match[2],{loader:match[1].includes('babel')?'jsx':'js',target:'es2020',jsxFactory:'React.createElement',jsxFragment:'React.Fragment',sourcefile:file+'-script-'+(++index)});
  total++;
 }
 for(const match of html.matchAll(/(?:src|href)="([^"?#]+)(?:[?#][^"]*)?"/g)){
  const value=match[1];if(/^(https?:|data:|blob:|mailto:|\/)/.test(value)||value.includes('{'))continue;
  if(!fs.existsSync(value))throw Error(file+': missing '+value);
 }
}
esbuild.transformSync(fs.readFileSync('scripts/v170-accessibility.js','utf8'),{loader:'js',target:'es2020'});
esbuild.transformSync(fs.readFileSync('scripts/library-workspace.js','utf8'),{loader:'js',target:'es2020'});
console.log('v170: '+files.length+' screens, '+total+' inline scripts, accessibility script and local dependencies verified.');
