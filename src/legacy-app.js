import * as THREE from 'three';
import { BUILDINGS } from './data/buildings.js';

export function startLegacyApp() {
// ---------- DATA (sample layout: replace with traced campus GeoJSON later) ----------
const B = BUILDINGS;
const SC={free:['Free','#2ea043',0x2ea043],on:['Event ongoing','#e5484d',0xe5484d],up:['Upcoming','#f5a623',0xf5a623]};
const now0=new Date(),NM=now0.getHours()*60+now0.getMinutes(),cl=v=>Math.max(0,Math.min(1439,v));
let events=[
 {v:'aud',t:'Tech Fest Inauguration',o:'Student Council',s:cl(NM-30),e:cl(NM+60)},
 {v:'conf',t:'Guest Lecture: AI in Healthcare',o:'CSE Dept',s:cl(NM+90),e:cl(NM+180)},
 {v:'soe',t:'Internal Exam Session',o:'Exam Cell',s:cl(NM+30),e:cl(NM+150)}
];
let saved=[];try{saved=JSON.parse(localStorage.getItem('bbd_ev')||'[]').filter(x=>x.d===now0.toDateString())}catch(e){}
events=events.concat(saved);
const fmt=m=>{const h=Math.floor(m/60),mm=String(m%60).padStart(2,'0');return ((h+11)%12+1)+':'+mm+(h<12?' AM':' PM')};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function status(v){const d=new Date(),m=d.getHours()*60+d.getMinutes(),l=events.filter(x=>x.v===v).sort((a,b)=>a.s-b.s);
 const on=l.find(x=>m>=x.s&&m<x.e);if(on)return['on',on];const up=l.find(x=>x.s>m);return up?['up',up]:['free',null]}

// ---------- 3D SCENE ----------
const cv=document.getElementById('c'),R=new THREE.WebGLRenderer({canvas:cv,antialias:true});
R.setPixelRatio(Math.min(devicePixelRatio,2));
const S=new THREE.Scene(),cam=new THREE.PerspectiveCamera(50,1,1,600);
const dark=matchMedia('(prefers-color-scheme:dark)').matches;
S.background=new THREE.Color(dark?0x10171e:0xe8eff6);
S.add(new THREE.AmbientLight(0xffffff,dark?0.55:0.75));
const sun=new THREE.DirectionalLight(0xffffff,0.7);sun.position.set(40,80,30);S.add(sun);
const box=(w,h,d,c,x,y,z)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshLambertMaterial({color:c}));m.position.set(x,y,z);S.add(m);return m};
box(130,1,110,dark?0x24313c:0xcfdccf,0,-0.5,-5);
box(130,.2,4,0x6b7782,0,0.1,18);box(3,.2,56,0x6b7782,1,0.1,-10);box(3,.2,26,0x6b7782,0,0.1,32);
function label(t){const c=document.createElement('canvas');c.width=320;c.height=64;const g=c.getContext('2d');
 g.fillStyle='rgba(20,32,43,.82)';g.fillRect(0,8,320,48);g.fillStyle='#fff';g.font='bold 26px sans-serif';g.textAlign='center';g.fillText(t,160,43);
 const s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),depthTest:false}));s.scale.set(16,3.2,1);return s}
const meshes=[],beacons={};
B.forEach(b=>{const m=box(b.w,b.h,b.d,b.c,b.x,b.h/2,b.z);m.userData.id=b.id;meshes.push(m);b.m=m;
 const bc=new THREE.Mesh(new THREE.SphereGeometry(1.3,16,12),new THREE.MeshBasicMaterial({color:0x2ea043}));bc.position.set(b.x,b.h+4,b.z);S.add(bc);beacons[b.id]=bc;
 const l=label(b.n.replace('College of Dental Sciences','Dental College').replace('BBD ',''));l.position.set(b.x,b.h+8,b.z);S.add(l)});
function refreshStatus(){B.forEach(b=>{const s=status(b.id)[0];beacons[b.id].material.color.setHex(SC[s][2])});render()}

// ---------- SATELLITE-STYLE GROUND (simulated aerial texture) ----------
let satOn=true;
const sat=(function(){const W=2048,H=1732,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');
 const X=x=>(x+65)/130*W,Y=z=>(z+60)/110*H,k=W/130;let sd=7;const rnd=()=>(sd=(sd*16807)%2147483647)/2147483647;
 g.fillStyle='#6d8250';g.fillRect(0,0,W,H);
 for(let i=0;i<1400;i++){const r=20+rnd()*90;g.fillStyle=['rgba(88,112,64,.35)','rgba(120,140,80,.3)','rgba(150,140,100,.22)','rgba(70,95,55,.3)'][i%4];g.beginPath();g.ellipse(rnd()*W,rnd()*H,r,r*(.5+rnd()*.6),rnd()*3,0,7);g.fill()}
 // lawns and plots
 g.fillStyle='rgba(98,140,72,.55)';[[-62,-46,20,50],[30,62,26,48],[-28,-14,-34,-22]].forEach(a=>g.fillRect(X(a[0]),Y(a[2]),(a[1]-a[0])*k,(a[3]-a[2])*k));
 // roads
 const road=(x0,z0,x1,z1,w)=>{g.lineCap='butt';g.strokeStyle='#4f5256';g.lineWidth=(w+.9)*k;g.beginPath();g.moveTo(X(x0),Y(z0));g.lineTo(X(x1),Y(z1));g.stroke();g.strokeStyle='#6c7075';g.lineWidth=w*k;g.stroke();g.strokeStyle='rgba(235,235,225,.75)';g.lineWidth=.18*k;g.setLineDash([1.6*k,1.4*k]);g.stroke();g.setLineDash([])};
 road(-65,18,65,18,4);road(1,-38,1,18,3);road(0,18,0,42,3);road(-40,-22,-5,-22,2.4);
 // parking near gate
 g.fillStyle='#585b60';g.fillRect(X(6),Y(30),16*k,9*k);for(let i=0;i<9;i++)for(let j=0;j<2;j++){g.fillStyle=['#c0392b','#ecf0f1','#2c3e50','#f1c40f','#3498db'][(i+j*3)%5];g.fillRect(X(7+i*1.7),Y(31+j*5),1.1*k,2*k)}
 // sports ground with track
 const sx=X(18),sy=Y(-42);g.fillStyle='#3f8a45';g.fillRect(X(3),Y(-50),30*k,16*k);g.strokeStyle='#b5543a';g.lineWidth=2.2*k;g.beginPath();g.ellipse(sx,sy,12*k,5.2*k,0,0,7);g.stroke();g.fillStyle='#4aa253';g.beginPath();g.ellipse(sx,sy,10*k,4*k,0,0,7);g.fill();g.strokeStyle='rgba(255,255,255,.8)';g.lineWidth=.2*k;g.strokeRect(sx-6*k,sy-3*k,12*k,6*k);
 // building roofs + shadows
 B.forEach(b=>{if(b.id==='sports')return;const x0=X(b.x-b.w/2),y0=Y(b.z-b.d/2),w=b.w*k,d=b.d*k;g.fillStyle='rgba(0,0,0,.34)';g.beginPath();g.moveTo(x0,y0);g.lineTo(x0-b.h*.55*k,y0-b.h*.35*k);g.lineTo(x0+w-b.h*.55*k,y0-b.h*.35*k);g.lineTo(x0+w,y0);g.lineTo(x0+w,y0+d);g.lineTo(x0,y0+d);g.fill();g.fillStyle='#d9d3c6';g.fillRect(x0,y0,w,d);g.strokeStyle='rgba(60,60,60,.6)';g.lineWidth=.3*k;g.strokeRect(x0,y0,w,d);g.fillStyle='rgba(120,120,120,.35)';g.fillRect(x0+w*.1,y0+d*.15,w*.8,d*.7)});
 // trees
 for(let i=0;i<260;i++){const x=-62+rnd()*124,z=-56+rnd()*104;if(B.some(b=>Math.abs(x-b.x)<b.w/2+3&&Math.abs(z-b.z)<b.d/2+3)||Math.abs(z-18)<4||Math.abs(x-1)<3)continue;const r=(1+rnd()*1.1)*k;g.fillStyle='rgba(0,0,0,.28)';g.beginPath();g.arc(X(x)-r*.4,Y(z)-r*.3,r,0,7);g.fill();g.fillStyle=['#2f6b34','#3c7d3e','#285c2e'][i%3];g.beginPath();g.arc(X(x),Y(z),r,0,7);g.fill();g.fillStyle='rgba(150,200,110,.35)';g.beginPath();g.arc(X(x)+r*.3,Y(z)+r*.3,r*.45,0,7);g.fill()}
 const t=new THREE.CanvasTexture(c);t.anisotropy=4;const m=new THREE.Mesh(new THREE.PlaneGeometry(130,110),new THREE.MeshBasicMaterial({map:t}));m.rotation.x=-Math.PI/2;m.position.set(0,.4,-5);S.add(m);return m})();
function setSat(on){satOn=on;sat.visible=on;B.forEach(b=>{b.m.material.color.setHex(on?lerpHex(b.c,0xcfc8bb,.6):b.c);if(b.id==='sports')b.m.visible=!on});document.getElementById('note').style.display=on?'block':'none'}
function lerpHex(a,b,t){const f=s=>[(s>>16)&255,(s>>8)&255,s&255];const A=f(a),Bb=f(b);return (Math.round(A[0]+(Bb[0]-A[0])*t)<<16)|(Math.round(A[1]+(Bb[1]-A[1])*t)<<8)|Math.round(A[2]+(Bb[2]-A[2])*t)}

// ---------- 3D CHATBOT ROBOT ----------
const robot=new THREE.Group(),rp=new THREE.Vector3(4,9,34),rt=rp.clone();
(function(){const L=(g,c,x,y,z)=>{const m=new THREE.Mesh(g,new THREE.MeshLambertMaterial({color:c}));m.position.set(x,y,z);robot.add(m);return m},BS=(g,c,x,y,z)=>{const m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:c}));m.position.set(x,y,z);robot.add(m);return m};
 const bd=L(new THREE.SphereGeometry(1.5,24,18),0xffffff,0,0,0);bd.scale.y=1.1;
 L(new THREE.BoxGeometry(2.8,2,2.3),0x1f6feb,0,2.5,0);L(new THREE.BoxGeometry(2.2,1.2,.15),0x12263f,0,2.5,1.2);
 BS(new THREE.SphereGeometry(.24,12,10),0x00e5ff,-.55,2.55,1.3);BS(new THREE.SphereGeometry(.24,12,10),0x00e5ff,.55,2.55,1.3);
 L(new THREE.CylinderGeometry(.09,.09,1,8),0x93a4b4,0,4,0);BS(new THREE.SphereGeometry(.28,12,10),0xf5a623,0,4.6,0);
 [-1.55,1.55].forEach(x=>{const e=L(new THREE.CylinderGeometry(.45,.45,.3,16),0xc8553d,x,2.5,0);e.rotation.z=Math.PI/2});
 const ring=BS(new THREE.TorusGeometry(2.2,.14,8,32),0xf5a623,0,-1.9,0);ring.rotation.x=Math.PI/2;
 robot.scale.setScalar(1.7);S.add(robot)})();
const bubble=new THREE.Sprite(new THREE.SpriteMaterial({depthTest:false,transparent:true}));bubble.center.set(.5,0);bubble.scale.set(24,8.25,1);bubble.visible=false;S.add(bubble);
let bTimer=0;
function say(t){const c=document.createElement('canvas');c.width=640;c.height=220;const g=c.getContext('2d');g.font='bold 30px sans-serif';
 t=t.replace(/\s*\(Sample[^)]*\)/,'');let L=[],cur='';t.split(/\s+/).forEach(w=>{if(g.measureText(cur+' '+w).width>560&&cur){L.push(cur);cur=w}else cur=(cur+' '+w).trim()});L.push(cur);if(L.length>4){L=L.slice(0,4);L[3]=L[3].replace(/.{0,3}$/,'...')}
 const h=L.length*38+36,y0=220-26-h;g.fillStyle='rgba(255,255,255,.97)';g.strokeStyle='#1f6feb';g.lineWidth=4;g.beginPath();const x0=20,w=600,r=24;
 g.moveTo(x0+r,y0);g.arcTo(x0+w,y0,x0+w,y0+h,r);g.arcTo(x0+w,y0+h,x0,y0+h,r);g.arcTo(x0,y0+h,x0,y0,r);g.arcTo(x0,y0,x0+w,y0,r);g.closePath();g.fill();g.stroke();
 g.beginPath();g.moveTo(300,y0+h);g.lineTo(320,220);g.lineTo(340,y0+h);g.fill();g.fillStyle='#14202b';L.forEach((l,i)=>g.fillText(l,42,y0+44+i*38));
 bubble.material.map=new THREE.CanvasTexture(c);bubble.material.needsUpdate=true;bubble.visible=true;clearTimeout(bTimer);bTimer=setTimeout(()=>bubble.visible=false,9000)}
function robotGo(id){const b=B.find(x=>x.id===id);if(b)rt.set(b.x+b.w/2+2,b.h+7,b.z+b.d/2+3)}
function animRobot(){rp.lerp(rt,.05);robot.position.set(rp.x,rp.y+Math.sin(T*1.5)*.5,rp.z);robot.rotation.y=Math.atan2(cam.position.x-rp.x,cam.position.z-rp.z);
 robot.rotation.z=Math.max(-.25,Math.min(.25,(rt.x-rp.x)*.02));bubble.position.set(rp.x,rp.y+9,rp.z)}
setSat(true);setTimeout(()=>say('Hi! I am your campus assistant. Tap me or ask about any building.'),600);

// ---------- CAMERA CONTROLS (drag rotate, pinch/wheel zoom, tap select) ----------
let th=0.5,ph=0.95,rad=115,tgt=new THREE.Vector3(0,0,0),goal=tgt.clone(),T=0;
const P=new Map();let moved=0,pd=0;
cv.addEventListener('pointerdown',e=>{cv.setPointerCapture(e.pointerId);P.set(e.pointerId,[e.clientX,e.clientY]);moved=0;if(P.size==2){const a=[...P.values()];pd=Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1])}});
cv.addEventListener('pointermove',e=>{if(!P.has(e.pointerId))return;const o=P.get(e.pointerId);
 if(P.size==1){th-=(e.clientX-o[0])*.006;ph=Math.max(.25,Math.min(1.45,ph-(e.clientY-o[1])*.006));moved+=Math.abs(e.clientX-o[0])+Math.abs(e.clientY-o[1])}
 P.set(e.pointerId,[e.clientX,e.clientY]);
 if(P.size==2){const a=[...P.values()],d=Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1]);rad=Math.max(35,Math.min(190,rad*pd/d));pd=d;moved=99}});
const up=e=>{if(P.size==1&&moved<6)pick(e);P.delete(e.pointerId)};
cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',e=>P.delete(e.pointerId));
cv.addEventListener('wheel',e=>{e.preventDefault();rad=Math.max(35,Math.min(190,rad*(1+e.deltaY*.001)))},{passive:false});
function pick(e){const r=cv.getBoundingClientRect(),rc=new THREE.Raycaster();
 rc.setFromCamera(new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),cam);
 const rh=rc.intersectObject(robot,true)[0];if(rh){view='chat';say('Hi! Ask me about any building or event.');draw();return}
 const h=rc.intersectObjects(meshes)[0];if(h)select(h.object.userData.id)}
function resize(){const w=cv.clientWidth,h=cv.clientHeight;R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}
addEventListener('resize',resize);
function render(){tgt.lerp(goal,.1);
 cam.position.set(tgt.x+rad*Math.sin(ph)*Math.sin(th),tgt.y+rad*Math.cos(ph),tgt.z+rad*Math.sin(ph)*Math.cos(th));cam.lookAt(tgt);R.render(S,cam)}
(function loop(){T+=.04;B.forEach(b=>beacons[b.id].position.y=b.h+4+Math.sin(T+b.x)*.6);animRobot();render();requestAnimationFrame(loop)})();

// ---------- CHATBOT + HELP DESK (rule-based: free, offline, no API) ----------
// College staff: edit FAQ answers and HELPDESK contacts below with official information.
const SAMPLE=' (Sample answer: college to add official details.)';
const AL={gate:['gate','entry','entrance'],admin:['admin','office','accounts'],soe:['school of engineering','engineering','soe'],nitm:['nitm','bbdnitm'],aud:['auditorium','audi'],conf:['conference','seminar hall'],dental:['dental','dentist','opd'],lib:['library','books'],hostel:['hostel','residence'],canteen:['canteen','food','cafeteria','mess'],sports:['sport','ground','playground','cricket','football']};
const FAQ=[
 [['fee','tuition'],'Fee structure depends on the course and year. Please check the accounts section in the Admin Block or the official website.'],
 [['admission','apply','eligibility','counselling'],'For admissions, visit the admission cell in the Admin Block or the official website for dates, eligibility and documents.'],
 [['exam','result','admit card','datesheet','time table','timetable'],'Exam schedules, admit cards and results come from the Exam Cell. Check your department notice board and student portal.'],
 [['warden','hostel fee','hostel rule','hostel allotment'],'For hostel allotment, rules and fees, contact the hostel warden office.'],
 [['wifi','wi fi','internet'],'For Wi-Fi problems, raise a Technical ticket from the Help desk with your roll number.'],
 [['bus','transport','shuttle'],'Transport routes and timings are handled by the transport office. Raise a ticket if you need your route.'],
 [['placement','internship','job'],'The training and placement cell shares drives and eligibility. Watch department notices.'],
 [['scholarship'],'Scholarship details and forms are available at the Admin Block.'],
 [['id card','lost','found'],'For ID card or lost-and-found issues, contact the help desk.'],
 [['timing','timings','hours'],'Timings vary by place. Open the building on the map or ask the help desk.']
];
const HELPDESK={where:'Admin Block, ground floor',phone:'+91-XXXXXXXXXX',email:'helpdesk@example.edu',hours:'Mon to Sat, 9 AM to 5 PM'};
const has=(s,k)=>new RegExp('\\b'+k+'s?\\b').test(s);
function reply(q){
 const s=' '+q.toLowerCase().replace(/[^a-z0-9 ]/g,' ')+' ',words=s.trim().split(/\s+/).length;
 if(words<4&&/\b(hi|hello|hey)\b/.test(s))return{t:'Hello! Ask me about a building, today\'s events, or services like fees, exams and hostel.'};
 if(/\b(thanks|thank)\b/.test(s))return{t:'You\'re welcome! 😊'};
 if(/(help ?desk|ticket|complaint|complain|grievance)/.test(s))return{t:'You can reach the help desk at '+HELPDESK.where+', or raise a ticket.',hd:1};
 const b=B.find(b=>(AL[b.id]||[]).some(k=>has(s,k)));
 const ev=/(event|happening|ongoing|today|free|busy|occupied|booked|schedule|going on|open)/.test(s);
 if(b&&ev){const[st,e]=status(b.id);return{t:b.n+' is '+SC[st][0].toLowerCase()+'.'+(e?' "'+e.t+'", '+fmt(e.s)+' to '+fmt(e.e)+'.':' No events scheduled right now.'),go:b.id}}
 const f=FAQ.find(x=>x[0].some(k=>has(s,k)));
 if(f)return{t:f[1]+SAMPLE};
 if(b){const[st]=status(b.id);return{t:b.n+': '+b.i+' Current status: '+SC[st][0].toLowerCase()+'.',go:b.id}}
 if(ev){const l=[...events].sort((a,c)=>a.s-c.s);return{t:l.length?'Today\'s events:\n'+l.map(x=>'• '+x.t+' at '+B.find(y=>y.id===x.v).n+', '+fmt(x.s)+' to '+fmt(x.e)).join('\n'):'No events are scheduled today.'}}
 return{t:'I don\'t have an answer for that yet. Try a building name or a topic like fees or exams, or contact the help desk.',hd:1}}
let msgs=[{r:'b',t:'Hi! I\'m the campus assistant. Ask where a building is, what\'s on at the auditorium today, or about fees, exams, hostel and more.'}],fl=0,tkMsg='';
function chatHTML(){return '<h2>Campus assistant</h2><div>'+msgs.map(m=>`<div class="m ${m.r}">${esc(m.t)}${m.go?`<br><button class="chip go" data-go="${m.go}">📍 Show on map</button>`:''}${m.hd?'<br><button class="chip hd">🛟 Open help desk</button>':''}</div>`).join('')+'</div><div class="chips">'+['Where is the dental college?','Is the auditorium free?','Today\'s events','Exam info'].map(q=>`<button class="chip qk">${esc(q)}</button>`).join('')+'</div><div class="row"><div style="flex:4"><input id="ci" maxlength="200" placeholder="Ask a question..."></div><div><button class="btn pri" id="cs" style="width:100%">Send</button></div></div>'}
function ask(q){q=q.trim();if(!q)return;const r=reply(q);msgs.push({r:'u',t:q},Object.assign({r:'b'},r));say(r.t);if(r.go){const b=B.find(x=>x.id===r.go);goal.set(b.x,0,b.z);robotGo(r.go)}draw()}
function bindChat(){const ci=document.getElementById('ci');
 document.getElementById('cs').onclick=()=>{fl=1;ask(ci.value)};ci.onkeydown=e=>{if(e.key==='Enter'){fl=1;ask(ci.value)}};
 sh.querySelectorAll('.qk').forEach(c=>c.onclick=()=>ask(c.textContent));
 sh.querySelectorAll('.go').forEach(c=>c.onclick=()=>select(c.dataset.go));
 sh.querySelectorAll('.hd').forEach(c=>c.onclick=()=>{view='help';draw()});
 sh.scrollTop=sh.scrollHeight;if(fl){ci.focus();fl=0}}
function helpHTML(){return `<h2>Help desk</h2><p class="mut" style="margin:0 0 4px">📍 ${esc(HELPDESK.where)}<br>📞 ${esc(HELPDESK.phone)} · ✉️ ${esc(HELPDESK.email)}<br>🕘 ${esc(HELPDESK.hours)}<br><i>(Sample contact details: replace with real ones.)</i></p>
 <label>Name</label><input id="tn" maxlength="60"><label>Roll no. or phone</label><input id="tc" maxlength="40">
 <label>Category</label><select id="tg">${['Academics','Hostel','Fees','Transport','Technical / Wi-Fi','Other'].map(x=>`<option>${x}</option>`).join('')}</select>
 <label>Your issue</label><textarea id="tr" maxlength="500" rows="3"></textarea>
 <p class="legend">Prototype: tickets save on this device only. The real version should send them to a Google Form or Sheet that help desk staff monitor.</p>
 <button class="btn pri" id="tsub" style="width:100%">Submit ticket</button><p id="te" class="legend">${esc(tkMsg)}</p>`}
function bindHelp(){document.getElementById('tsub').onclick=()=>{const g=id=>document.getElementById(id).value.trim(),n=g('tn'),c=g('tc'),m=g('tr');
 if(!n||!c||!m){document.getElementById('te').textContent='Please fill in name, contact and your issue.';return}
 const id='T-'+(1000+Math.floor(Math.random()*9000));
 try{const a=JSON.parse(localStorage.getItem('bbd_tk')||'[]');a.push({id,n,c,cat:g('tg'),m,at:new Date().toISOString()});localStorage.setItem('bbd_tk',JSON.stringify(a))}catch(e){}
 msgs.push({r:'b',t:'Your ticket '+id+' ('+g('tg')+') was submitted. Please note the ID.'});tkMsg='';view='chat';draw()}}

// ---------- UI ----------
const sh=document.getElementById('sheet');let view='events',sel=null;
const evHTML=x=>`<div class="ev"><b>${esc(x.t)}</b><br><span class="mut">${fmt(x.s)} – ${fmt(x.e)} · ${esc(x.o||'—')}${x.v?' · '+esc(B.find(b=>b.id===x.v).n):''}</span></div>`;
function badge(s){return `<span class="badge" style="background:${SC[s][1]}">${SC[s][0]}</span>`}
function chips(){return '<div class="chips">'+B.map(b=>`<button class="chip" data-id="${b.id}"><i style="background:${SC[status(b.id)[0]][1]}"></i>${esc(b.n)}</button>`).join('')+'</div>'}
function draw(){
 [['bEv','events'],['bChat','chat'],['bHelp','help'],['bAdd','add']].forEach(p=>document.getElementById(p[0]).classList.toggle('on',view===p[1]));
 sh.style.maxHeight=view==='chat'||view==='help'?'62%':'48%';
 B.forEach(b=>b.m.material.emissive.setHex(b.id===sel&&view==='building'?0x335577:0));
 let h='';
 if(view==='events'){const l=[...events].sort((a,b)=>a.s-b.s);
  h=`<h2>Today's events</h2>${l.length?l.map(evHTML).join(''):'<p class="mut">No events today.</p>'}${chips()}
  <div class="legend">🟢 Free &nbsp; 🔴 Event ongoing &nbsp; 🟠 Upcoming · Drag to rotate, pinch to zoom, tap a building.</div>`}
 else if(view==='building'){const b=B.find(x=>x.id===sel),[s]=status(sel),l=events.filter(x=>x.v===sel).sort((a,c)=>a.s-c.s);
  h=`<h2>${esc(b.n)} ${badge(s)}</h2><p class="mut" style="margin:0 0 6px">${esc(b.i)}</p>
  ${l.length?l.map(evHTML).join(''):'<p class="mut">No events scheduled today.</p>'}${chips()}`}
 else if(view==='chat'){h=chatHTML()}
 else if(view==='help'){h=helpHTML()}
 else{h=`<h2>Add an event</h2>
  <label>Venue</label><select id="fv">${B.map(b=>`<option value="${b.id}"${b.id===sel?' selected':''}>${esc(b.n)}</option>`).join('')}</select>
  <label>Event name</label><input id="ft" maxlength="80" placeholder="e.g. Annual Seminar">
  <label>Organizer</label><input id="fo" maxlength="60" placeholder="e.g. ECE Department">
  <div class="row"><div><label>Start</label><input id="fs" type="time"></div><div><label>End</label><input id="fe" type="time"></div></div>
  <p class="legend">Prototype: anyone can add. The real version should use a login (Firebase Auth) or a Google Sheet that only coordinators edit.</p>
  <button class="btn pri" id="fsub" style="width:100%;margin-top:6px">Publish to map</button><p id="fm" class="legend"></p>`}
 sh.innerHTML=h;
 sh.querySelectorAll('.chip[data-id]').forEach(c=>c.onclick=()=>select(c.dataset.id));
 const sub=document.getElementById('fsub');if(sub)sub.onclick=add;
 if(view==='chat')bindChat();if(view==='help')bindHelp();
}
function select(id){sel=id;view='building';const b=B.find(x=>x.id===id);goal.set(b.x,0,b.z);robotGo(id);draw()}
function add(){const t=fv('ft').trim(),s=fv('fs'),e=fv('fe');
 if(!t||!s||!e){document.getElementById('fm').textContent='Please fill name, start and end time.';return}
 const tm=x=>+x.split(':')[0]*60+ +x.split(':')[1],ev={v:fv('fv'),t,o:fv('fo').trim(),s:tm(s),e:tm(e),d:new Date().toDateString()};
 if(ev.e<=ev.s){document.getElementById('fm').textContent='End time must be after start time.';return}
 events.push(ev);try{saved.push(ev);localStorage.setItem('bbd_ev',JSON.stringify(saved))}catch(x){}
 sel=ev.v;view='building';refreshStatus();draw();select(ev.v)}
const fv=id=>document.getElementById(id).value;
document.getElementById('bEv').onclick=()=>{view='events';draw()};
document.getElementById('bAdd').onclick=()=>{view='add';draw()};
document.getElementById('bChat').onclick=()=>{view='chat';draw()};
document.getElementById('bHelp').onclick=()=>{view='help';draw()};
document.getElementById('bSat').onclick=function(){setSat(!satOn);this.classList.toggle('on',satOn)};
resize();refreshStatus();draw();setInterval(()=>{refreshStatus();if(view==='events'||view==='building')draw()},30000);
}
// Inside your building selection event handler in legacy-app.js:
function selectBuilding(buildingName) {
  // Existing legacy logic (highlighting meshes, showing info panel)
  highlightBuildingMesh(buildingName);
  
  // Broadcast event to hybrid routing bridge
  window.dispatchEvent(new CustomEvent('building-selected', {
    detail: { name: buildingName }
  }));
}
export function initViewSwitcher() {
  const btn3D = document.querySelector('button:has-text("Campus 3D"), button:nth-child(1)'); // adjust selector based on your button classes/IDs
  const btnFloor = document.querySelector('button:has-text("Floor plan + route")');
  const btnPanorama = document.querySelector('button:has-text("360° checkpoint")');

  const view3DContainer = document.getElementById('campus-3d-container') || document.querySelector('canvas').parentElement;
  const floorContainer = document.getElementById('floor-map-container');
  const panoContainer = document.getElementById('pano-container');

  // Helper to switch active views
  function switchView(activeType) {
    if (view3DContainer) view3DContainer.style.display = activeType === '3d' ? 'block' : 'none';
    if (floorContainer) floorContainer.style.display = activeType === 'floor' ? 'block' : 'none';
    if (panoContainer) panoContainer.style.display = activeType === 'pano' ? 'block' : 'none';
  }

  // Attach event listeners to your UI tabs
  const tabButtons = document.querySelectorAll('.tab-bar button, header button'); 
  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const text = btn.textContent.trim();
      if (text.includes('Campus 3D')) switchView('3d');
      if (text.includes('Floor plan')) switchView('floor');
      if (text.includes('360°')) switchView('pano');
    });
  });
}
