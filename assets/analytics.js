/* Single instrumentation boundary. Approved 18 November 2026 in this chat.
   Effective remote privacy is checked before each SDK initialization. */
(() => {
'use strict';
const KEY='1c867be258598bb9e3e42f64ae6b954d', STORE='hotpoint.session.v1', preview=document.body.dataset.screen==='preview';
if(preview)return;
const SOURCE_MAPPING={"sources":{"search":[["google","www.google.com"],["bing","www.bing.com"],["duckduckgo","duckduckgo.com"]],"organic search":[["google","www.google.com"],["bing","www.bing.com"],["duckduckgo","duckduckgo.com"],["yahoo","search.yahoo.com"],["ecosia","www.ecosia.org"],["brave","search.brave.com"],["qwant","www.qwant.com"],["startpage","www.startpage.com"],["mojeek","www.mojeek.com"]],"social":[["facebook","www.facebook.com"],["instagram","www.instagram.com"],["linkedin","www.linkedin.com"],["twitter","twitter.com"],["tiktok","www.tiktok.com"],["snapchat","www.snapchat.com"],["pinterest","www.pinterest.com"],["reddit","www.reddit.com"],["threads","www.threads.net"]],"affiliate":[["awin","www.awin.com"],["quidco","www.quidco.com"],["topcashback","www.topcashback.co.uk"],["hotukdeals","www.hotukdeals.com"]],"llm":[["open_ai","chatgpt.com"],["anthropic","claude.ai"],["microsoft_ai","copilot.microsoft.com"],["you_com","you.com"],["phind","phind.com"],["cohere","cohere.com"],["mistral","mistral.ai"]]},"channels":{"search":"Paid Search","organic search":"Organic Search","social":"Paid Social","affiliate":"Affiliates","llm":"LLM Search","direct":"Direct"}};
const authorization={approved:true,reference:'Khaled: Go — 18 November 2026',privacyVerified:false};
const registrations=[];
let effectiveConfig=null, sdkClient=null;
const read=(k,f)=>{try{return JSON.parse(localStorage.getItem(k))??f}catch{return f}};
const write=(k,v)=>{if(!preview)localStorage.setItem(k,JSON.stringify(v))};
let state=preview?null:read(STORE,null), buffer=preview?[]:read('hotpoint.records.v1',[]), initialized=false, initPromise=null;
let pageSent=false, failure=null;
const pendingRecords=new Map();
const uid=()=>crypto.randomUUID();
const today=()=>new Date().toISOString().slice(0,10).replaceAll('-','');
function cleanProperties(p){const bad=/^(name|alias|postcode|address|email|card|payment|raw_)/i;return Object.fromEntries(Object.entries(p||{}).filter(([k,v])=>!bad.test(k)&&v!==undefined));}
function record(name,properties,options,status){if(!preview&&!read('hotpoint.recorder',false))return null;const r={id:uid(),event:name,properties:cleanProperties(properties),options:cleanProperties(options),user_id:state?.userId,device_id:state?.deviceId,session_id:state?.sessionId,time:Date.now(),status};buffer.push(r);buffer=buffer.slice(-1500);write('hotpoint.records.v1',buffer);return r;}
function save(){write(STORE,state)}
function sourceTouch(){
 if(preview)return;
 const u=new URL(location.href),p={};for(const k of ['utm_source','utm_medium','utm_campaign']){const v=u.searchParams.get(k);if(v&&/^[a-z0-9_ -]{1,80}$/i.test(v))p[k]=v;}
 try{if(document.referrer&&new URL(document.referrer).origin!==location.origin){p.referrer=new URL(document.referrer).origin+'/';p.referring_domain=new URL(document.referrer).hostname}}catch{}
 const previous=read('hotpoint.attribution',{}),now=Date.now();
 const hasTouch=Object.keys(p).length>0;
 let label='direct';
 for(const [candidate,list]of Object.entries(SOURCE_MAPPING.sources)){
  const medium=({search:'cpc',social:'paid_social'})[candidate]||candidate;
  if(p.utm_source&&p.utm_medium===medium&&list.some(([src])=>src===p.utm_source))label=candidate;
  if(!p.utm_source&&p.referring_domain&&candidate!=='search'&&candidate!=='social'&&list.some(([,host])=>host===p.referring_domain))label=candidate;
 }
 p.acquisition_label=label;p.channel=SOURCE_MAPPING.channels[label];
 // Only a genuine external landing or an explicitly tagged landing changes raw acquisition.
 if(hasTouch||!document.referrer||!previous.raw){previous.raw=p;if(hasTouch)previous.last={properties:p,time:now};if(!previous.initial)previous.initial=p;write('hotpoint.attribution',previous)}
}
sourceTouch();
if(state&&state.date!==today()){state=null;localStorage.removeItem(STORE);localStorage.removeItem('hotpoint.shop');}
const attribution=()=>preview?{}:read('hotpoint.attribution',{});
function campaign(){const a=attribution();return a.last&&Date.now()-a.last.time<7*86400000?a.last.properties:{}}
function script(url){return new Promise((resolve,reject)=>{if([...document.scripts].some(s=>s.src===url))return reject(Error('Duplicate loader refused'));const s=document.createElement('script');s.src=url;s.onload=resolve;s.onerror=()=>reject(Error('SDK script failed'));document.head.appendChild(s)})}
async function liveInit(){
 if(!authorization.approved)return false;
 if(initPromise)return initPromise;
 initPromise=(async()=>{
   const response=await fetch(`https://sr-client-cfg.amplitude.com/config/${KEY}?config_group=browser`);
   if(!response.ok)throw Error('Replay privacy configuration could not be read; initialization stopped');
   const config=await response.json();
   if(config.configs?.sessionReplay?.sr_privacy_config?.defaultMaskLevel!=='medium')throw Error('Remote Replay privacy differs from approved Medium; initialization stopped');
   authorization.privacyVerified=true;
   await script(`https://cdn.amplitude.com/script/${KEY}.js`);
   sdkClient=window.amplitude;
   if(!sdkClient?.init||!window.sessionReplay?.plugin)throw Error('Unified loader contract mismatch');
  const a=sdkClient;
  const enrichment={name:'hotpoint-country',type:'enrichment',setup(config){effectiveConfig=config;},async execute(event){
   event.country='United Kingdom';event.event_properties={...event.event_properties,country:'United Kingdom',currency:'GBP'};
   if(!pendingRecords.has(event.insert_id)){
    const r=record(event.event_type,event.event_properties,{insert_id:event.insert_id},'queued');
    if(r){r.user_id=event.user_id;r.device_id=event.device_id;r.session_id=event.session_id;write('hotpoint.records.v1',buffer);}
   }
   return event;
  }};
  a.add(enrichment);registrations.push('hotpoint-country');
  if(!preview){a.add(window.sessionReplay.plugin({sampleRate:1,serverZone:'US',privacyConfig:{defaultMaskLevel:'medium'}}));registrations.push('session-replay');}
  const initializedAnalytics=a.init(KEY,state.userId,{serverZone:'US',deviceId:state.deviceId,sessionId:state.sessionId,sessionTimeout:1800000,fetchRemoteConfig:true,autocapture:false,defaultTracking:false});
  await initializedAnalytics.promise;
  if(!preview){
  await script(`https://cdn.amplitude.com/script/${KEY}.engagement.js`);
  if(typeof window.engagement?.plugin!=='function')throw Error('Engagement plugin unavailable');
  await a.add(window.engagement.plugin({serverZone:'US'})).promise;registrations.push('engagement');
  if(!window.webExperiment?.isRunning||typeof window.webExperiment.getExperimentClient!=='function')throw Error('Web Experiment client not running');
  }
  await identifyState();
  state.deviceId=a.getDeviceId();state.sessionId=a.getSessionId();save();initialized=true;return true;
 })().catch(e=>{failure=e.message;throw e});
 return initPromise;
}
async function identifyState(){
 const a=sdkClient;
  const identify=new window.amplitude.Identify().set('country','United Kingdom').set('shopping_readiness',state.readiness).set('delivery_preferences_saved',state.ready);
  const t=attribution();
  for(const k of ['utm_source','utm_medium','utm_campaign','referrer','referring_domain']){if(t.raw?.[k])identify.set(k,t.raw[k]);else identify.unset(k);if(t.initial?.[k])identify.setOnce('initial_'+k,t.initial[k]);}
  await a.identify(identify,{country:'United Kingdom'}).promise;
 }
async function ready(){if(!state)return false;await liveInit();return true}
async function track(name,p={},options={}){
 if(!state)return {status:'no-persona'};
 if(p.country!==undefined&&p.country!=='United Kingdom')throw Error('Country outside allowed list');
 await ready();state.lastActivity=Date.now();save();
 const props=cleanProperties({country:'United Kingdom',currency:'GBP',device_type:innerWidth<700?'mobile':innerWidth<1100?'tablet':'desktop',shopping_readiness:state.readiness,delivery_preferences_saved:state.ready,...(attribution().raw||{}),...p});
 const eventOptions={...options,insert_id:options.insert_id||uid(),country:'United Kingdom'};
 const r=record(name,props,eventOptions,initialized?'queued':preview?'blocked-preview':'offline-only');
 if(initialized)pendingRecords.set(eventOptions.insert_id,r);
 if(!initialized)return {status:'offline-only'};
 try{const result=await sdkClient.track(name,props,eventOptions).promise;if(r){r.status=result.code===200?'acknowledged':'failed';r.code=result.code;write('hotpoint.records.v1',buffer)}return result}catch(e){if(r){r.status='failed';write('hotpoint.records.v1',buffer)}throw e}finally{pendingRecords.delete(eventOptions.insert_id)}
}
async function flush(){if(!initialized)return;await Promise.race([sdkClient.flush().promise,new Promise(r=>setTimeout(r,1800))]);}
async function trackThenGo(name,p,url,options){const outcome=await Promise.race([track(name,p,options),new Promise(r=>setTimeout(()=>r({status:'timeout-unknown'}),2200))]);if(outcome?.status==='timeout-unknown'){const r=buffer.findLast(r=>r.event===name&&r.status==='queued');if(r){r.status='timeout-unknown';write('hotpoint.records.v1',buffer)}}await flush();location.assign(url)}
async function establish(alias,run,readiness){
 if(initialized)sdkClient.reset();
 const clean=alias.trim().toLowerCase().replace(/[^a-z0-9]+/g,'')||'visitor';
 const switched=initialized;
 const existing=state;const base=`${clean}_${run}_${today()}_${readiness}`;
 state={userId:preview?`preview_${uid()}`:base,deviceId:uid(),sessionId:Date.now(),date:today(),readiness,ready:false,run,started:false,lastActivity:Date.now(),pageCounter:0};
 if(existing?.userId!==base&&!preview)for(const k of ['hotpoint.shop','hotpoint.order'])localStorage.removeItem(k);
 save();if(switched){sdkClient.setUserId(state.userId);state.deviceId=sdkClient.getDeviceId();sdkClient.setSessionId(state.sessionId);save();await identifyState();}await ready();await startSession();return state;
}
async function startSession(){if(!state)return;if(!state.started){state.started=true;save();await track('Session Started',{})}}
async function page(){
 if(!state||pageSent)return;
 if(Date.now()-state.lastActivity>1800000){await track('Session Ended',{session_duration_seconds:Math.round((state.lastActivity-state.sessionId)/1000)});state.sessionId=Date.now();state.started=false;state.pageCounter=0;save();}
 await startSession();pageSent=true;state.pageCounter=(state.pageCounter||0)+1;save();
 const u=new URL(location.href);u.search='';u.hash='';
 const locationSafe=new URL(u);for(const k of ['utm_source','utm_medium','utm_campaign']){const v=attribution().raw?.[k];if(v)locationSafe.searchParams.set(k,v)}
 await track('[Amplitude] Page Viewed',{'[Amplitude] Page Domain':location.hostname,'[Amplitude] Page Location':locationSafe.href,'[Amplitude] Page Path':location.pathname.replace(/index\.html$/,''),'[Amplitude] Page Title':document.title,'[Amplitude] Page URL':u.href,'[Amplitude] Page Counter':state.pageCounter,page_path:location.pathname.replace(/index\.html$/,'')});
}
function sdkCheck(){const scripts=[...document.scripts].map(s=>s.src).filter(s=>s.includes('amplitude'));return {project:911671,organization:432322,region:'US',authorization,initialized,failure,effectiveConfig:effectiveConfig?{autocapture:effectiveConfig.autocapture,defaultTracking:effectiveConfig.defaultTracking,serverZone:effectiveConfig.serverZone,serverUrl:effectiveConfig.serverUrl,sessionTimeout:effectiveConfig.sessionTimeout,fetchRemoteConfig:effectiveConfig.fetchRemoteConfig,identityStorage:effectiveConfig.identityStorage,instanceName:effectiveConfig.instanceName,eventStorage:preview?'memory':'SDK persistent storage'}:null,registrations,scripts,duplicates:scripts.filter((s,i)=>scripts.indexOf(s)!==i),versions:{analytics:initialized?'2.42.4 (loaded)':'2.42.4 (selected)',replay:!preview&&initialized?'1.32.1 (loaded)':preview?'not loaded on standalone preview':'1.32.1 (selected)',experiment:!preview&&initialized?'0.29.2 (running)':'not loaded'},clients:{analytics:initialized,Experiment:{type:typeof window.Experiment},webExperiment:{type:typeof window.webExperiment,running:window.webExperiment?.isRunning===true},WebExperiment:{type:typeof window.WebExperiment,initialize:typeof window.WebExperiment?.initialize},engagement:!!window.engagement?._analytics?.hasBooted},identity:state?{user_id:state.userId,device_id:state.deviceId,session_id:state.sessionId}:null,privacy:{localMask:'medium',remoteVerified:authorization.privacyVerified},records:buffer.reduce((o,r)=>(o[r.status]=(o[r.status]||0)+1,o),{}),requests:performance.getEntriesByType('resource').map(x=>x.name).filter(x=>/amplitude/.test(x)).map(x=>x.split('?')[0])};}
window.analytics={ready,track,trackThenGo,flush,establish,page,state:()=>state,campaign,records:()=>structuredClone(buffer),recorder(on){if(!preview)localStorage.setItem('hotpoint.recorder',JSON.stringify(!!on));},async setReadiness(ready){if(!state)return;state.ready=ready;save();if(initialized){const i=new window.amplitude.Identify().set('delivery_preferences_saved',ready).set('shopping_readiness',state.readiness);await sdkClient.identify(i,{country:'United Kingdom'}).promise}},async end(){await track('Session Ended',{session_duration_seconds:Math.round((Date.now()-state.sessionId)/1000)});await flush();if(initialized)sdkClient.reset();state=null;if(!preview)localStorage.removeItem(STORE);},sdkCheck};
window.sdkCheck=sdkCheck;
})();
