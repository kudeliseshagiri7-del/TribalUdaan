
/* =========================
   DATA
========================= */
const EXAMS={
  "TET & DSC":{group:"Teaching",syllabus:["Child Development & Pedagogy","Language I & II","Mathematics","Environmental Studies","Teaching Methodology"]},
  "APPSC Group 1":{group:"APPSC",syllabus:["History & Culture","Indian Constitution & Polity","Economy & Development","Science & Technology","Geography","Current Affairs"]},
  "APPSC Group 2":{group:"APPSC",syllabus:["Indian Constitution & Polity","Indian Economy","History & Culture","Science & Technology","Geography","Current Affairs"]},
  "APPSC Group 3":{group:"APPSC",syllabus:["General Studies","Mental Ability","Rural Development","Current Affairs","Indian History & Culture"]},
  "APPSC Group 4":{group:"APPSC",syllabus:["General Studies","Mental Ability","English","General Science","Current Affairs"]},
  "UPSC Civil Services":{group:"UPSC",syllabus:["Indian Polity","History","Geography","Economy","Environment","Science & Technology","Current Affairs"]},
  "UPSC CDS":{group:"UPSC",syllabus:["English","General Knowledge","Elementary Mathematics","Current Affairs"]},
  "UPSC NDA":{group:"UPSC",syllabus:["Mathematics","General Ability","English","Physics","Chemistry","General Science"]},
  "UPSC CAPF":{group:"UPSC",syllabus:["General Ability & Intelligence","General Studies","Essay & Comprehension","Current Affairs"]},
  "SSC CGL":{group:"SSC",syllabus:["General Intelligence & Reasoning","General Awareness","Quantitative Aptitude","English Comprehension"]},
  "SSC CHSL":{group:"SSC",syllabus:["English","General Intelligence","Quantitative Aptitude","General Awareness"]},
  "SSC MTS":{group:"SSC",syllabus:["Numerical Ability","Reasoning Ability","General Awareness","English"]},
  "IBPS Banking":{group:"Banking",syllabus:["Quantitative Aptitude","Reasoning","English Language","General Awareness","Computer Knowledge"]},
  "SBI Banking":{group:"Banking",syllabus:["Quantitative Aptitude","Reasoning","English Language","General/Banking Awareness","Computer Aptitude"]},
  "RBI":{group:"Banking",syllabus:["Economic & Social Issues","Finance","Reasoning","English","Quantitative Aptitude","Current Affairs"]},
  "RRB NTPC":{group:"Railway",syllabus:["Mathematics","General Intelligence & Reasoning","General Awareness","Current Affairs"]},
  "RRB Group D":{group:"Railway",syllabus:["Mathematics","General Intelligence","General Science","General Awareness"]},
  "CTET":{group:"Teaching",syllabus:["Child Development & Pedagogy","Language I","Language II","Mathematics","Environmental Studies / Science & Social Studies"]},
  "Other Government Exam":{group:"Other",syllabus:["General Studies","Reasoning","Quantitative Aptitude","English","Current Affairs"]}
};
const RESOURCES=[
 {cat:'notes',type:'PDF',title:'Indian Polity – VisionIAS',desc:'Reference notes for Indian Polity.',url:'https://cdn.visionias.in/value_added_material/5ca16-polity.pdf'},
 {cat:'notes',type:'PDF',title:'Quantitative Aptitude – YCMOU',desc:'Quantitative Aptitude reference material.',url:'https://ycmou.ac.in/wp-content/uploads/custom-assets/ebooks/CMP332_Quantative%20Aptitude.pdf'},
 {cat:'notes',type:'PDF',title:'Computer Basics – VFU',desc:'Computer Basics reference PDF.',url:'https://www.vfu.bg/en/e-Learning/Computer-Basics--computer_basics2.pdf'},
 {cat:'notes',type:'PDF',title:'General Studies – CBSE Academic',desc:'General Studies reference material.',url:'https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/GeneralStudies_SecP2_2026-27.pdf'},
 {cat:'links',type:'WEB',title:'APPSC Group 1 Study Material',desc:'APPSC Group 1 preparation resource.',url:'https://kpiasacademy.com/appsc-group-1-study-material/'},
 {cat:'links',type:'WEB',title:'Current Affairs – Abhyas IAS Academy',desc:'Current affairs resource for UPSC/APPSC/TGPSC preparation.',url:'https://abhyasiasacademy.com/free-current-affairs-for-upsc-appsc-tgpsc/'},
 {cat:'links',type:'WEB',title:'Computer Basics – GeeksforGeeks',desc:'Computer fundamentals and operations.',url:'https://www.geeksforgeeks.org/computer-science-fundamentals/basics-of-computer-and-its-operations/'},
 {cat:'practice',type:'QUIZ',title:'CareerRide Aptitude Test',desc:'Online aptitude practice.',url:'https://www.careerride.com/online-aptitude-test.aspx#google_vignette'},
 {cat:'pyq',type:'PYQ',title:'Previous Year Papers – Testbook',desc:'Previous-year papers and practice collection.',url:'https://testbook.com/previous-year-papers'},
 {cat:'videos',type:'VIDEO',title:'Reference Class 1',desc:'YouTube reference class supplied for this project.',url:'https://www.youtube.com/watch?v=mGgNtaqR8Aw'},
 {cat:'videos',type:'VIDEO',title:'Reference Class 2',desc:'YouTube reference class supplied for this project.',url:'https://www.youtube.com/watch?v=pPf-i6Ks_eg'},
 {cat:'videos',type:'VIDEO',title:'Quantitative Aptitude Reference Class',desc:'Quantitative Aptitude video class.',url:'https://www.youtube.com/watch?v=fDmUQSr_XJo'}
];
const QUESTIONS=[
 {q:'Which part of the Indian Constitution deals with Fundamental Rights?',o:['Part I','Part II','Part III','Part IV'],a:2,topic:'Indian Polity'},
 {q:'If a train travels 60 km in 1.5 hours, its average speed is:',o:['30 km/h','40 km/h','45 km/h','60 km/h'],a:1,topic:'Aptitude'},
 {q:'Which is commonly used to represent data flow in a process?',o:['Flowchart','Paragraph','Index','Title page'],a:0,topic:'General Studies'},
 {q:'Which branch of government generally makes laws?',o:['Legislature','Judiciary','Election Commission','Audit office'],a:0,topic:'Indian Polity'},
 {q:'A synonym of “rapid” is:',o:['Slow','Quick','Weak','Late'],a:1,topic:'English'},
 {q:'Which device is primarily used to enter text into a computer?',o:['Monitor','Keyboard','Speaker','Projector'],a:1,topic:'Computer Basics'},
 {q:'The study of maps and places is most closely related to:',o:['Geography','Economics','Grammar','Biology'],a:0,topic:'Geography'},
 {q:'25% of 200 is:',o:['25','40','50','75'],a:2,topic:'Aptitude'},
 {q:'Current affairs preparation is most useful when it is:',o:['Ignored until the exam','Updated regularly','Done only once','Limited to one topic'],a:1,topic:'Current Affairs'},
 {q:'A structured sequence of connected learning steps is called a:',o:['Learning path','Password','Folder','Bookmark'],a:0,topic:'Study Skills'}
];

let state={account:null,quiz:null,mock:null,weekend:null};
const $=id=>document.getElementById(id);
function getAccounts(){return JSON.parse(localStorage.getItem('tuAccounts')||'[]')}
function saveAccounts(a){localStorage.setItem('tuAccounts',JSON.stringify(a))}
function getSession(){const email=localStorage.getItem('tuSession');if(!email)return null;return getAccounts().find(a=>a.email===email)||null}
function saveAccount(acc){const all=getAccounts();const i=all.findIndex(a=>a.email===acc.email);if(i>=0)all[i]=acc;else all.push(acc);saveAccounts(all)}
function blankProgress(exam){return {exam,lessons:{},quizHistory:[],mockHistory:[],activity:[],uploadedPDFs:[],apiEndpoint:'',certificates:[]}}
function initials(name){return (name||'S').trim().split(/\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase()}
function switchAuth(mode){$('registerTab').classList.toggle('active',mode==='register');$('loginTab').classList.toggle('active',mode==='login');$('registerForm').classList.toggle('hidden',mode!=='register');$('loginForm').classList.toggle('hidden',mode!=='login')}
function fillExamSelect(id,value){const el=$(id);el.innerHTML=Object.keys(EXAMS).map(x=>`<option value="${escapeHtml(x)}" ${x===value?'selected':''}>${escapeHtml(x)}</option>`).join('')}
function registerUser(e){e.preventDefault();const name=regName.value.trim();const email=regEmail.value.trim().toLowerCase();const password=regPassword.value;const exam=regExam.value;const all=getAccounts();if(all.some(a=>a.email===email)){ regError.textContent='An account already exists. Please use Login.';return}const acc={name,email,password,exam,progress:blankProgress(exam)};saveAccount(acc);localStorage.setItem('tuSession',email);openApp();toast('Account created. Welcome to Tribal Uddan!')}
function loginUser(e){e.preventDefault();const email=loginEmail.value.trim().toLowerCase();const password=loginPassword.value;const acc=getAccounts().find(a=>a.email===email&&a.password===password);if(!acc){loginError.textContent='Email or password is incorrect.';return}localStorage.setItem('tuSession',email);openApp();toast('Login successful.')}
function openApp(){state.account=getSession();$('authScreen').classList.add('hidden');$('app').classList.remove('hidden');initializeApp()}
function initializeApp(){state.account.progress=state.account.progress||blankProgress(state.account.exam);if(!state.account.progress.exam)state.account.progress.exam=state.account.exam;saveAccount(state.account);fillExamSelect('regExam',state.account.exam);fillExamSelect('examSelector',state.account.exam);fillExamSelect('profileExam',state.account.exam);updateHeader();renderCourses();renderResources('notes');renderResources('videos');renderResources('links');renderResources('pyq');renderRevision();renderProgress();renderCertificates();renderNotifications();loadAPI();loadQuiz();updateMockSummary()}
function updateHeader(){const a=state.account;$('topName').textContent=a.name;$('topExam').textContent=a.exam;$('topAvatar').textContent=initials(a.name);$('welcomeName').textContent=a.name.toUpperCase();$('homeExam').textContent=a.exam;$('profileName').value=a.name;$('profileEmail').value=a.email;$('profileExam').value=a.exam;const p=overallProgress();$('homeProgress').textContent=p+'%';$('homeProgressFill').style.width=p+'%';$('statCourses').textContent=courseCount();$('statTests').textContent=a.progress.quizHistory.length+a.progress.mockHistory.length;$('statBadges').textContent=achievementsCount();$('statCertificates').textContent=a.progress.certificates.length}
function showPage(id){document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));$(id).classList.add('active');document.querySelectorAll('.menu-item').forEach(b=>b.classList.toggle('active',b.dataset.page===id));if(id==='progressPage')renderProgress();if(id==='coursePage')renderCourses();if(id==='profilePage')loadProfile();if(id==='noticePage')renderNotifications();if(id==='certPage')renderCertificates();if(window.innerWidth<820)toggleSidebar(false);window.scrollTo({top:0,behavior:'smooth'})}
function toggleSidebar(force){const s=$('sidebar');if(force===false)s.classList.remove('open');else s.classList.toggle('open')}
function toggleProfileMenu(){$('profileDropdown').classList.toggle('hidden')}
document.addEventListener('click',e=>{if(!e.target.closest('.profile-mini')&&!e.target.closest('.profile-dropdown'))$('profileDropdown').classList.add('hidden')})
function toggleTheme(){document.body.classList.toggle('dark');localStorage.setItem('tuTheme',document.body.classList.contains('dark')?'dark':'light')}
if(localStorage.getItem('tuTheme')==='dark')document.body.classList.add('dark');
function logoutUser(){localStorage.removeItem('tuSession');location.reload()}
function saveProfile(){const a=state.account;a.name=$('profileName').value.trim()||a.name;a.exam=$('profileExam').value;a.progress.exam=a.exam;saveAccount(a);updateHeader();fillExamSelect('examSelector',a.exam);renderCourses();toast('Profile updated successfully.')}
function loadProfile(){if(state.account){$('profileName').value=state.account.name;$('profileEmail').value=state.account.email;$('profileExam').value=state.account.exam}}
function changeExam(exam){state.account.exam=exam;state.account.progress.exam=exam;saveAccount(state.account);$('profileExam').value=exam;updateHeader();renderCourses();renderRevision();toast('Target exam changed to '+exam)}
function courseData(){const syllabus=EXAMS[state.account.exam]?.syllabus||[];return syllabus.map((topic,i)=>({id:'course_'+slug(topic),title:topic,icon:['📚','🏛️','🌍','🔬','➗','📰','💻'][i%7],desc:'Learn '+topic+' through study material, reference video and practice.',topics:[topic+' basics',topic+' important concepts',topic+' practice',topic+' revision']}))}
function slug(x){return x.toLowerCase().replace(/[^a-z0-9]+/g,'_')}
function courseProgress(c){const l=state.account.progress.lessons[c.id]||{completed:0,total:c.topics.length};return Math.min(100,Math.round((l.completed/l.total)*100))}
function courseStatus(p){return p===100?'Completed':p===0?'Pending':'In Progress'}
function renderCourses(){if(!state.account)return;fillExamSelect('examSelector',state.account.exam);const filter=($('courseFilter')?.value||'').toLowerCase();const data=courseData().filter(c=>(c.title+c.desc).toLowerCase().includes(filter));$('courseGrid').innerHTML=data.map(c=>{const p=courseProgress(c);return `<div class="course-card"><div class="course-cover">${c.icon}</div><div class="course-body"><h3>${escapeHtml(c.title)}</h3><div class="tags"><span class="tag">${courseStatus(p)}</span><span class="tag">${p}%</span></div><p>${escapeHtml(c.desc)}</p><div class="bar"><div class="fill" style="width:${p}%"></div></div><button class="btn primary" style="margin-top:12px" onclick="openCourse('${c.id}')">${p===0?'Start Learning':p===100?'Review Course':'Continue'}</button></div></div>`}).join('')||'<div class="card">No matching course.</div>';renderSyllabus()}
function renderSyllabus(){const ex=EXAMS[state.account.exam];$('syllabusBox').innerHTML=`<h3>${escapeHtml(state.account.exam)} — Syllabus</h3><div class="syllabus-list">${ex.syllabus.map((x,i)=>`<div><b>${i+1}.</b> ${escapeHtml(x)}</div>`).join('')}</div>`}
function openCourse(id){const c=courseData().find(x=>x.id===id);if(!c)return;const data=state.account.progress.lessons[id]||{completed:0,total:c.topics.length,topics:{}};$('modalTitle').textContent=c.title;$('modalBody').innerHTML=`<p style="color:var(--muted);font-size:12px;margin-bottom:15px">${escapeHtml(c.desc)}</p><div class="lesson-list">${c.topics.map((t,i)=>{const done=!!data.topics?.[i];return `<div class="lesson"><div style="font-size:22px">${done?'✅':'📘'}</div><div class="lesson-main"><b>${escapeHtml(t)}</b><small style="display:block">Lesson ${i+1} • Study → Practice → Revise</small></div><span class="status ${done?'done':''}">${done?'Completed':'Pending'}</span><button class="btn ${done?'outline':'primary'}" onclick="completeLesson('${id}',${i})">${done?'Undo':'Complete'}</button></div>`}).join('')}</div>`;openModal()}
function completeLesson(id,index){const p=state.account.progress;const old=p.lessons[id]||{completed:0,total:courseData().find(c=>c.id===id).topics.length,topics:{}};old.topics=old.topics||{};if(old.topics[index]){delete old.topics[index];old.completed=Math.max(0,old.completed-1)}else{old.topics[index]=true;old.completed=Math.min(old.total,old.completed+1);recordActivity('lesson')}p.lessons[id]=old;saveAccount(state.account);renderCourses();updateHeader();openCourse(id);renderProgress();toast(old.topics[index]?'Lesson completed!':'Lesson marked pending.')}
function recordActivity(type){state.account.progress.activity=state.account.progress.activity||[];state.account.progress.activity.push({date:new Date().toISOString().slice(0,10),type});state.account.progress.activity=state.account.progress.activity.slice(-60);saveAccount(state.account)}
function courseCount(){return courseData().length}
function overallProgress(){const d=courseData();if(!d.length)return 0;return Math.round(d.reduce((s,c)=>s+courseProgress(c),0)/d.length)}
function renderResources(cat){let target=cat==='notes'?'notesGrid':cat==='videos'?'videoGrid':cat==='links'?'linksGrid':cat==='pyq'?'pyqGrid':null;if(!target)return;let arr=RESOURCES.filter(r=>r.cat===cat);if(cat==='notes'&&state.account){const uploaded=state.account.progress.uploadedPDFs||[];arr=arr.concat(uploaded)}if(cat==='notes'){const q=($('resourceSearch')?.value||'').toLowerCase();arr=arr.filter(r=>(r.title+r.desc).toLowerCase().includes(q))}$(target).innerHTML=arr.map(resourceCard).join('')||'<div class="card">No resources found.</div>'}
function resourceCard(r){return `<div class="resource-card"><div class="resource-type">${escapeHtml(r.type)}</div><h3>${escapeHtml(r.title)}</h3><p>${escapeHtml(r.desc)}</p><div class="resource-actions"><button class="btn primary" onclick="openResource('${encodeURIComponent(r.url)}')">Open</button>${r.type==='PDF'?`<button class="btn outline" onclick="downloadResource('${encodeURIComponent(r.url)}')">PDF</button>`:''}</div></div>`}
function openResource(encoded){const url=decodeURIComponent(encoded);window.open(url,'_blank','noopener,noreferrer')}
function downloadResource(encoded){const url=decodeURIComponent(encoded);const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener';a.click()}
function uploadPDFs(e){const files=[...e.target.files];const good=files.filter(f=>f.type==='application/pdf');if(!good.length)return toast('Please select PDF files.');Promise.all(good.map(file=>new Promise(res=>{const rd=new FileReader();rd.onload=()=>res({cat:'notes',type:'UPLOAD',title:file.name,desc:'Student uploaded offline PDF note.',url:rd.result});rd.readAsDataURL(file)}))).then(items=>{state.account.progress.uploadedPDFs=(state.account.progress.uploadedPDFs||[]).concat(items).slice(-10);saveAccount(state.account);renderResources('notes');toast(good.length+' PDF(s) saved locally for this browser.')})}
function renderRevision(){if(!state.account)return;const topics=EXAMS[state.account.exam].syllabus;const arrows=['Basics','Key concepts','Important facts','Practice questions','Quick revision'];$('revisionGrid').innerHTML=topics.map((t,i)=>`<div class="feature"><div class="big">🔄</div><h2>${escapeHtml(t)}</h2><p>${arrows.map((x,j)=>`${j? ' → ':''}${x}`).join('')}</p><button class="btn secondary" onclick="openRevision('${encodeURIComponent(t)}')">Open Flowchart</button></div>`).join('')}
function openRevision(enc){const t=decodeURIComponent(enc);$('modalTitle').textContent=t+' — Revision Flowchart';$('modalBody').innerHTML=`<div style="display:grid;gap:9px">${['Understand the topic','Read the study material','Watch/review the reference class','Attempt practice questions','Mark difficult points','Revise from quick notes'].map((x,i)=>`<div style="padding:13px;background:#f2f8f5;border-radius:9px;font-weight:600">${i+1}. ${x}</div>${i<5?'<div style="text-align:center;color:#087a5c">↓</div>':''}`).join('')}</div><button class="btn primary" style="margin-top:15px" onclick="recordActivity('revision');closeModal();toast('Revision activity recorded.')">Mark Revision Done</button>`;openModal()}
function loadQuiz(){const q=QUESTIONS[Math.floor(Math.random()*QUESTIONS.length)];state.quiz={items:[q],index:0,answers:[]};renderQuiz()}
function startQuiz(){showPage('quizPage');loadQuiz()}
function renderQuiz(){const q=state.quiz?.items?.[state.quiz.index];if(!q){$('quizBox').innerHTML='<div class="result"><b>Quiz completed.</b></div>';return}$('quizBox').innerHTML=`<div class="quiz-top"><span>Daily Quiz</span><span>Question ${state.quiz.index+1} / ${state.quiz.items.length}</span></div><div class="question">${escapeHtml(q.q)}</div>${q.o.map((x,i)=>`<button class="option" onclick="answerQuiz(${i})">${String.fromCharCode(65+i)}. ${escapeHtml(x)}</button>`).join('')}`}
function answerQuiz(i){const q=state.quiz.items[state.quiz.index];state.quiz.answers.push(i===q.a);if(state.quiz.index<state.quiz.items.length-1){state.quiz.index++;renderQuiz()}else finishQuiz(state.quiz.answers)}
function finishQuiz(answers){const score=Math.round(answers.filter(Boolean).length/answers.length*100);state.account.progress.quizHistory.push({date:new Date().toISOString().slice(0,10),score,type:'Daily Quiz'});recordActivity('quiz');saveAccount(state.account);$('quizBox').innerHTML=`<div class="result"><h2>${score}%</h2><p style="margin:7px 0;color:var(--muted)">You answered ${answers.filter(Boolean).length} of ${answers.length} correctly.</p><button class="btn primary" onclick="loadQuiz()">Try Another</button> <button class="btn outline" onclick="showPage('progressPage')">View Progress</button></div>`;updateHeader();renderProgress();toast('Quiz result saved.')}
function startPractice(kind){showPage('weekendPage');state.weekend={items:QUESTIONS.slice(0,6).sort(()=>Math.random()-.5),index:0,answers:[]};renderPractice()}
function renderPractice(){const q=state.weekend?.items?.[state.weekend.index];if(!q){const score=Math.round(state.weekend.answers.filter(Boolean).length/state.weekend.answers.length*100);state.account.progress.quizHistory.push({date:new Date().toISOString().slice(0,10),score,type:'Weekend Practice'});recordActivity('practice');saveAccount(state.account);$('weekendQuiz').innerHTML=`<div class="quiz-box"><div class="result"><h2>${score}%</h2><p>Weekend practice saved.</p><button class="btn primary" onclick="startPractice('weekend')">Retry</button></div></div>`;updateHeader();renderProgress();return}$('weekendQuiz').innerHTML=`<div class="quiz-box"><div class="quiz-top"><span>Weekend Practice</span><span>${state.weekend.index+1}/${state.weekend.items.length}</span></div><div class="question">${escapeHtml(q.q)}</div>${q.o.map((x,i)=>`<button class="option" onclick="answerPractice(${i})">${String.fromCharCode(65+i)}. ${escapeHtml(x)}</button>`).join('')}</div>`}
function answerPractice(i){const q=state.weekend.items[state.weekend.index];state.weekend.answers.push(i===q.a);state.weekend.index++;renderPractice()}
function startMock(){showPage('mockPage');state.mock={items:[...QUESTIONS].sort(()=>Math.random()-.5).slice(0,10),index:0,answers:[],seconds:600};renderMock();clearInterval(state.mock.timer);state.mock.timer=setInterval(()=>{state.mock.seconds--;const el=$('mockTimer');if(el)el.textContent=formatTime(state.mock.seconds);if(state.mock.seconds<=0){clearInterval(state.mock.timer);finishMock()}},1000)}
function renderMock(){const q=state.mock.items[state.mock.index];$('mockArea').innerHTML=`<div class="quiz-box"><div class="quiz-top"><span>Mini Mock • ${state.mock.index+1}/${state.mock.items.length}</span><span id="mockTimer">${formatTime(state.mock.seconds)}</span></div><div class="question">${escapeHtml(q.q)}</div>${q.o.map((x,i)=>`<button class="option" onclick="answerMock(${i})">${String.fromCharCode(65+i)}. ${escapeHtml(x)}</button>`).join('')}</div>`}
function answerMock(i){const q=state.mock.items[state.mock.index];state.mock.answers.push(i===q.a);state.mock.index++;if(state.mock.index>=state.mock.items.length)finishMock();else renderMock()}
function finishMock(){if(!state.mock)return;clearInterval(state.mock.timer);const score=Math.round(state.mock.answers.filter(Boolean).length/state.mock.items.length*100);state.account.progress.mockHistory.push({date:new Date().toISOString().slice(0,10),score,type:'Mini Mock'});recordActivity('mock');saveAccount(state.account);$('mockArea').innerHTML=`<div class="quiz-box"><div class="result"><h2>Mock Score: ${score}%</h2><p>${state.mock.answers.filter(Boolean).length}/${state.mock.items.length} correct.</p><button class="btn primary" onclick="startMock()">Retake</button><button class="btn outline" onclick="showPage('progressPage')">Analytics</button></div></div>`;updateMockSummary();updateHeader();renderProgress();toast('Mock test result saved.');state.mock=null}
function formatTime(s){return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')}
function updateMockSummary(){if(!state.account)return;const h=state.account.progress.mockHistory||[];$('mockSummary').textContent=h.length?`Latest score: ${h[h.length-1].score}% on ${h[h.length-1].date}.`:'No mock test completed yet.'}
function renderProgress(){if(!state.account)return;const d=courseData();$('progressList').innerHTML=d.map(c=>{const p=courseProgress(c);return `<div class="p-row"><div class="p-head"><span>${escapeHtml(c.title)}</span><b>${p}%</b></div><div class="bar"><div class="fill" style="width:${p}%"></div></div></div>`}).join('');$('courseChart').innerHTML=barChart(d.map(c=>({label:c.title,value:courseProgress(c)})));const qh=state.account.progress.quizHistory||[];$('quizChart').innerHTML=lineChart(qh.slice(-8).map((x,i)=>({label:x.date.slice(5),value:x.score})));const total=d.length,done=d.filter(c=>courseProgress(c)===100).length;$('completionChart').innerHTML=donutChart(done,total-done);const ah=state.account.progress.activity||[];const by={};ah.forEach(x=>by[x.date]=(by[x.date]||0)+1);const labels=Object.keys(by).slice(-10);$('activityChart').innerHTML=lineChart(labels.map(x=>({label:x.slice(5),value:by[x]})));}
function barChart(items){const w=700,h=210,left=170,barH=22,gap=10,max=Math.max(100,...items.map(x=>x.value));return `<svg viewBox="0 0 ${w} ${h}">${items.slice(0,7).map((x,i)=>{const y=10+i*(barH+gap),bw=(w-left-35)*(x.value/max);return `<text x="0" y="${y+16}">${escapeHtml(x.label.slice(0,24))}</text><rect x="${left}" y="${y}" width="${w-left-35}" height="${barH}" rx="7" fill="#e4eee9"/><rect x="${left}" y="${y}" width="${bw}" height="${barH}" rx="7" fill="#20a875"/><text x="${left+bw+7}" y="${y+16}">${x.value}%</text>`}).join('')}</svg>`}
function lineChart(items){if(!items.length)return '<div style="padding:60px;text-align:center;color:#718078">Complete quizzes or activities to generate this graph.</div>';const w=700,h=210,p=35,max=Math.max(100,...items.map(x=>x.value));const pts=items.map((x,i)=>{const xx=p+i*((w-2*p)/Math.max(1,items.length-1));const yy=h-p-(x.value/max)*(h-2*p);return [xx,yy,x]});return `<svg viewBox="0 0 ${w} ${h}"><line x1="${p}" y1="${h-p}" x2="${w-p}" y2="${h-p}" stroke="#d8e4de"/><polyline fill="none" stroke="#087a5c" stroke-width="4" points="${pts.map(x=>x[0]+','+x[1]).join(' ')}"/>${pts.map(x=>`<circle cx="${x[0]}" cy="${x[1]}" r="5" fill="#20a875"/><text x="${x[0]-12}" y="${h-12}">${escapeHtml(x[2].label)}</text><text x="${x[0]-7}" y="${x[1]-9}">${x[2].value}</text>`).join('')}</svg>`}
function donutChart(done,pending){const total=done+pending||1;const pct=Math.round(done/total*100);return `<div style="display:grid;place-items:center;height:100%"><div style="width:145px;height:145px;border-radius:50%;background:conic-gradient(#20a875 ${pct}%,#e3ece7 0);display:grid;place-items:center"><div style="width:95px;height:95px;border-radius:50%;background:var(--card);display:grid;place-items:center;font-size:20px;font-weight:800">${pct}%</div></div><small style="margin-top:8px;color:var(--muted)">${done} completed • ${pending} pending</small></div>`}
function achievementsCount(){let n=0;n+=courseData().filter(c=>courseProgress(c)===100).length;n+=(state.account.progress.quizHistory||[]).filter(x=>x.score>=80).length;n+=(state.account.progress.mockHistory||[]).filter(x=>x.score>=80).length;return n}
function renderCertificates(){const completed=courseData().filter(c=>courseProgress(c)===100);const certs=state.account.progress.certificates||[];if(completed.length){completed.forEach(c=>{if(!certs.includes(c.title))certs.push(c.title)});state.account.progress.certificates=certs;saveAccount(state.account)}$('certificateArea').innerHTML=certs.length?certs.map(x=>`<div class="feature"><div class="big">🏆</div><h2>Course Completion</h2><p>${escapeHtml(x)} completed successfully.</p><button class="btn outline" onclick="printCertificate('${encodeURIComponent(x)}')">View Certificate</button></div>`).join(''):'<div class="feature"><div class="big">🎓</div><h2>No certificate yet</h2><p>Complete a course to generate a completion record.</p></div>';updateHeader()}
function printCertificate(enc){const course=decodeURIComponent(enc),name=state.account.name;const w=window.open('','_blank');w.document.write(`<html><head><title>Tribal Uddan Certificate</title><style>body{font-family:Arial;background:#f3f7f4;padding:50px;text-align:center}.cert{background:white;border:10px solid #087a5c;padding:70px;max-width:800px;margin:auto}.green{color:#087a5c}</style></head><body><div class="cert"><h1 class="green">TRIBAL UDDAN</h1><h2>Certificate of Course Completion</h2><p style="margin:30px">This certifies that</p><h1>${escapeHtml(name)}</h1><p>has completed</p><h2 class="green">${escapeHtml(course)}</h2><p style="margin-top:35px">Target Exam: ${escapeHtml(state.account.exam)}</p><button onclick="print()">Print</button></div></body></html>`);w.document.close()}
function renderNotifications(){const a=state.account;const notices=[['📚','Learning progress','Your current overall course progress is '+overallProgress()+'%.'],['📝','Practice activity','You have completed '+(a.progress.quizHistory.length+a.progress.mockHistory.length)+' quiz/mock activities.'],['🎯','Target exam','Your current target is '+a.exam+'.']];$('notifications').innerHTML=notices.map(x=>`<div class="notice"><b>${x[0]} ${x[1]}</b><p>${escapeHtml(x[2])}</p></div>`).join('');$('noticeCount').textContent=notices.length}
function globalSearch(){const q=$('globalSearch').value.trim().toLowerCase();if(!q)return;const match=courseData().find(c=>(c.title+c.desc).toLowerCase().includes(q))||RESOURCES.find(r=>(r.title+r.desc).toLowerCase().includes(q));if(match){if(match.cat==='notes')showPage('learnPage');else if(match.cat==='videos')showPage('videoPage');else if(match.cat==='links')showPage('linksPage');else showPage('coursePage')}}
/* =========================================
   AI STUDY ASSISTANT
   Wikipedia Study Assistant
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const wikiForm = document.getElementById("wikiSearchForm");
    const wikiQuestion = document.getElementById("wikiQuestion");
    const wikiButton = document.getElementById("wikiSearchButton");
    const wikiStatus = document.getElementById("wikiStatus");
    const wikiAnswer = document.getElementById("wikiAnswer");

    // Check whether all required HTML elements exist
    if (!wikiForm || !wikiQuestion || !wikiButton ||
        !wikiStatus || !wikiAnswer) {

        console.error("AI Assistant elements are missing from HTML.");
        return;
    }


    /* =========================================
       FORM SUBMIT
       ========================================= */

    wikiForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const question = wikiQuestion.value.trim();

        // Empty question check
        if (question === "") {

            showError("Please enter a study question.");

            wikiQuestion.focus();

            return;
        }

        // Start loading
        startLoading();

        try {

            const answer = await searchWikipedia(question);

            if (!answer) {
                throw new Error(
                    "No useful information was found for this topic."
                );
            }

            displayAnswer(answer);

        } catch (error) {

            console.error("AI Assistant Error:", error);

            showError(
                "Sorry, I couldn't find an answer right now. " +
                "Please check your internet connection or try another question."
            );

        } finally {

            stopLoading();

        }

    });


    /* =========================================
       WIKIPEDIA SEARCH
       ========================================= */

    async function searchWikipedia(question) {

        /*
         * First search Wikipedia for the topic.
         */

        const searchURL =
            "https://en.wikipedia.org/w/api.php" +
            "?action=query" +
            "&list=search" +
            "&srsearch=" + encodeURIComponent(question) +
            "&format=json" +
            "&origin=*" +
            "&srlimit=1";

        const searchResponse = await fetch(searchURL);

        if (!searchResponse.ok) {
            throw new Error("Wikipedia search failed.");
        }

        const searchData = await searchResponse.json();

        if (
            !searchData.query ||
            !searchData.query.search ||
            searchData.query.search.length === 0
        ) {
            return null;
        }

        const pageTitle = searchData.query.search[0].title;


        /*
         * Now request the summary of the topic.
         */

        const summaryURL =
            "https://en.wikipedia.org/api/rest_v1/page/summary/" +
            encodeURIComponent(pageTitle);

        const summaryResponse = await fetch(summaryURL);

        if (!summaryResponse.ok) {
            throw new Error("Wikipedia summary failed.");
        }

        const summaryData = await summaryResponse.json();

        return {
            title: summaryData.title || pageTitle,

            description:
                summaryData.description ||
                "Study topic",

            extract:
                summaryData.extract ||
                "No summary is available for this topic.",

            image:
                summaryData.thumbnail
                    ? summaryData.thumbnail.source
                    : null,

            page:
                summaryData.content_urls &&
                summaryData.content_urls.desktop
                    ? summaryData.content_urls.desktop.page
                    : "https://en.wikipedia.org/"
        };
    }


    /* =========================================
       LOADING ANIMATION
       ========================================= */

    function startLoading() {

        wikiButton.disabled = true;

        wikiButton.innerHTML =
            '<span class="ai-spinner"></span> Thinking...';

        wikiStatus.innerHTML =
            "🤖 AI Assistant is searching for your answer...";

        wikiStatus.style.display = "block";

        wikiAnswer.classList.add("hidden");

        wikiAnswer.innerHTML = "";
    }


    /* =========================================
       STOP LOADING
       ========================================= */

    function stopLoading() {

        wikiButton.disabled = false;

        wikiButton.innerHTML = "🤖 Ask AI";
    }


    /* =========================================
       DISPLAY ANSWER
       ========================================= */

    function displayAnswer(data) {

        wikiStatus.innerHTML =
            "✅ Answer found successfully.";

        wikiStatus.style.display = "block";


        let imageHTML = "";

        if (data.image) {

            imageHTML = `
                <img
                    src="${data.image}"
                    alt="${escapeHTML(data.title)}"
                    class="wiki-answer-image"
                >
            `;
        }


        wikiAnswer.innerHTML = `

            <div class="ai-answer-header">

                <div>

                    <span class="ai-badge">
                        🤖 AI Study Assistant
                    </span>

                    <h3>
                        ${escapeHTML(data.title)}
                    </h3>

                    <p class="ai-description">
                        ${escapeHTML(data.description)}
                    </p>

                </div>

                ${imageHTML}

            </div>


            <div class="ai-answer-content">

                <h4>📚 Explanation</h4>

                <p>
                    ${escapeHTML(data.extract)}
                </p>

            </div>


            <div class="ai-answer-footer">

                <span>
                    📖 Source: Wikipedia
                </span>

                <a
                    href="${data.page}"
                    target="_blank"
                    rel="noopener noreferrer">
                    Read More →
                </a>

            </div>
        `;


        wikiAnswer.classList.remove("hidden");
    }


    /* =========================================
       ERROR MESSAGE
       ========================================= */

    function showError(message) {

        wikiStatus.innerHTML =
            "❌ " + escapeHTML(message);

        wikiStatus.style.display = "block";

        wikiAnswer.innerHTML = `
            <div class="ai-error-box">

                <div class="ai-error-icon">
                    ⚠️
                </div>

                <h3>
                    Something went wrong
                </h3>

                <p>
                    ${escapeHTML(message)}
                </p>

                <button
                    class="btn primary"
                    id="retryAIButton"
                    type="button">
                    🔄 Try Again
                </button>

            </div>
        `;

        wikiAnswer.classList.remove("hidden");


        // Retry button
        const retryButton =
            document.getElementById("retryAIButton");

        if (retryButton) {

            retryButton.addEventListener("click", () => {

                wikiQuestion.focus();

                wikiForm.dispatchEvent(
                    new Event("submit")
                );

            });
        }
    }


    /* =========================================
       ESCAPE HTML
       Prevents unwanted HTML injection
       ========================================= */

    function escapeHTML(text) {

        const div = document.createElement("div");

        div.textContent = text;

        return div.innerHTML;
    }


    /* =========================================
       ENTER KEY SUPPORT
       ========================================= */

    wikiQuestion.addEventListener("keydown", function (event) {

        if (event.key === "Enter" && !event.shiftKey) {

            event.preventDefault();

            wikiForm.requestSubmit();
        }

    });

});

    async function searchWikipedia(event){event.preventDefault();
    const question=$('wikiQuestion').value.trim(),status=$('wikiStatus'),answer=$('wikiAnswer'),button=$('wikiSearchButton');answer.replaceChildren();answer.classList.add('hidden');if(!question){status.textContent='Please enter a question.';return}status.textContent='🔍 Searching Wikipedia...';button.disabled=true;try{const searchURL=new URL('https://en.wikipedia.org/w/rest.php/v1/search/page');searchURL.searchParams.set('q',question);searchURL.searchParams.set('limit','5');searchURL.searchParams.set('origin','*');const searchResponse=await fetch(searchURL);if(!searchResponse.ok)throw new Error('Wikipedia search failed (HTTP '+searchResponse.status+').');const searchData=await searchResponse.json();const page=searchData.pages?.[0];if(!page){status.textContent='❌ No information found.';return}const summaryURL=new URL('https://en.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(page.key));summaryURL.searchParams.set('origin','*');const summaryResponse=await fetch(summaryURL);if(!summaryResponse.ok)throw new Error('Wikipedia summary failed (HTTP '+summaryResponse.status+').');const summaryData=await summaryResponse.json();if(!summaryData.extract){status.textContent='Information was found, but a summary is not available.';return}const title=document.createElement('h3');title.textContent=summaryData.title||page.title;const extract=document.createElement('p');extract.textContent=summaryData.extract;answer.append(title,extract);const articleURL=summaryData.content_urls?.desktop?.page;if(articleURL){const parsedURL=new URL(articleURL);if(parsedURL.protocol==='https:'&&parsedURL.hostname==='en.wikipedia.org'){const link=document.createElement('a');link.href=parsedURL.href;link.target='_blank';link.rel='noopener noreferrer';link.textContent='📖 Read full article';answer.append(link)}}answer.classList.remove('hidden');status.textContent='Summary found on Wikipedia.'}catch(error){console.error('Wikipedia study search failed:',error);status.textContent='⚠️ Could not search Wikipedia. Please check your connection and try again.'}finally{button.disabled=false}}
function openModal(){ $('modal').classList.add('show')}function closeModal(){ $('modal').classList.remove('show')}
$('modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal()});
$('wikiSearchForm').addEventListener('submit',searchWikipedia);
function toast(msg){const t=$('toast');t.textContent=msg;t.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove('show'),2600)}
function escapeHtml(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function updateClock(){const d=new Date();$('clock').textContent=d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}
setInterval(updateClock,1000);updateClock();

/* START */
fillExamSelect('regExam',Object.keys(EXAMS)[2]);
if(getSession())openApp();
