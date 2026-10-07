
/* ================= REALISTIC COURSE DATA ================= */
const courses={
"HTML & CSS Mastery":{
category:"web",image:"img-html",lessons:[
["HTML Document Structure","Learn DOCTYPE, html, head, body and semantic page structure.","HTML structure","18 min"],
["Headings, Paragraphs & Links","Create readable content and navigation using core HTML elements.","HTML elements","22 min"],
["Images, Audio & Video","Add multimedia content and understand useful media attributes.","HTML media","20 min"],
["Forms & Input Controls","Build forms with labels, inputs, buttons and validation attributes.","HTML forms","25 min"],
["CSS Selectors","Target elements using tag, class, id, attribute and pseudo selectors.","CSS selectors","24 min"],
["Box Model","Understand margin, border, padding and content dimensions.","CSS layout","26 min"],
["Flexbox Layout","Build responsive one-dimensional layouts using Flexbox.","Responsive CSS","30 min"],
["CSS Grid","Create powerful two-dimensional website layouts with CSS Grid.","Grid layout","30 min"],
["Responsive Design","Use media queries and mobile-first techniques.","Responsive design","28 min"],
["Final Website Project","Combine HTML and CSS to build a complete responsive webpage.","Project","45 min"]
]},
"JavaScript Mastery":{
category:"web",image:"img-js",lessons:[
["JavaScript Introduction","Understand JavaScript, where it runs and how scripts connect to HTML.","JavaScript basics","18 min"],
["Variables & Data Types","Learn let, const, strings, numbers, booleans, null and undefined.","Variables","24 min"],
["Operators","Use arithmetic, comparison, logical and assignment operators.","Operators","25 min"],
["If / Else Statements","Make decisions in programs using conditions and branching.","Control flow","27 min"],
["Loops","Repeat tasks using for, while and do...while loops.","Loops","30 min"],
["Functions","Create reusable blocks of code with parameters and return values.","Functions","32 min"],
["Arrays","Store collections of values and use common array methods.","Arrays","34 min"],
["Objects","Represent structured data using properties and methods.","Objects","35 min"],
["DOM Manipulation","Select HTML elements and change content, styles and attributes.","DOM","38 min"],
["Mini Project","Build a small interactive JavaScript application.","Project","50 min"]
]},
"Python Programming":{
category:"programming",image:"img-python",lessons:[
["Python Introduction","Install Python, run your first program and understand indentation.","Python basics","20 min"],
["Variables & Data Types","Work with strings, integers, floats, booleans and type conversion.","Data types","25 min"],
["Operators","Use arithmetic, comparison and logical operators in Python.","Operators","25 min"],
["Conditions","Control program flow with if, elif and else.","Control flow","28 min"],
["Loops","Automate repeated work using for and while loops.","Loops","30 min"],
["Functions","Write reusable functions with parameters and return values.","Functions","32 min"],
["Lists & Tuples","Store and process collections of data.","Collections","35 min"],
["Dictionaries & Sets","Work with key-value data and unique collections.","Collections","35 min"],
["Files & Exceptions","Read files and handle runtime errors safely.","File handling","40 min"],
["Python Project","Build a beginner-friendly command-line project.","Project","55 min"]
]},
"AI & Machine Learning":{
category:"ai",image:"img-ai",lessons:[
["AI Fundamentals","Understand artificial intelligence, machine learning and common applications.","AI basics","22 min"],
["Data & Features","Learn how data and features are prepared for machine learning.","Data","28 min"],
["Supervised Learning","Understand classification and regression with practical examples.","Machine learning","32 min"],
["Unsupervised Learning","Explore clustering and pattern discovery.","Machine learning","30 min"],
["Training & Testing","Learn why datasets are split into training and testing sets.","Model evaluation","27 min"],
["Model Accuracy","Understand accuracy and other basic evaluation concepts.","Evaluation","25 min"],
["Neural Networks","Learn the basic idea behind neurons, layers and neural networks.","Deep learning","35 min"],
["Computer Vision","Explore how AI systems process and understand images.","Computer vision","30 min"],
["Natural Language Processing","Learn how machines process and analyze human language.","NLP","32 min"],
["AI Mini Project","Plan a simple AI workflow from data to model evaluation.","Project","50 min"]
]},
"Java Programming":{
category:"programming",image:"img-java",lessons:[
["Java Introduction","Understand Java, the JVM and the structure of a Java program.","Java basics","20 min"],
["Variables & Data Types","Learn Java primitive types, variables and constants.","Data types","25 min"],
["Operators","Use arithmetic, relational and logical operators.","Operators","25 min"],
["Conditions","Control execution using if, else and switch.","Control flow","28 min"],
["Loops","Use for, while and do-while loops.","Loops","30 min"],
["Methods","Create reusable Java methods and pass arguments.","Methods","32 min"],
["Arrays","Store and process multiple values using arrays.","Arrays","30 min"],
["Classes & Objects","Understand object-oriented programming fundamentals.","OOP","40 min"],
["Inheritance & Polymorphism","Build reusable class hierarchies and understand polymorphism.","OOP","42 min"],
["Java Project","Create a small console application using OOP.","Project","55 min"]
]},
"SQL Database":{
category:"ai",image:"img-sql",lessons:[
["Database Fundamentals","Understand tables, rows, columns, primary keys and relationships.","Database basics","20 min"],
["SELECT Queries","Retrieve information from tables using SELECT.","SQL basics","25 min"],
["WHERE & Filtering","Filter records using conditions and comparison operators.","Filtering","24 min"],
["ORDER BY & LIMIT","Sort results and control the number of returned records.","Querying","22 min"],
["INSERT, UPDATE & DELETE","Modify database records safely.","Data modification","30 min"],
["Aggregate Functions","Use COUNT, SUM, AVG, MIN and MAX.","Functions","28 min"],
["GROUP BY","Group records and calculate summaries.","Aggregation","30 min"],
["JOINs","Combine related information from multiple tables.","Relationships","38 min"],
["Subqueries","Use one query inside another query.","Advanced SQL","35 min"],
["Database Project","Design tables and write queries for a small application.","Project","55 min"]
]}
};

const defaultVideo="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
let currentCourse="JavaScript Mastery",currentLesson=0,progress=0;
let courseProgress={};
let videoWatchTimer=null;

/* ================= NAVIGATION ================= */
function showPage(page){
document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
const target=document.getElementById(page); if(target)target.classList.add("active");
document.querySelectorAll(".side-btn").forEach(b=>b.classList.remove("active"));
window.scrollTo({top:0,behavior:"smooth"});
}

/* ================= LOGIN / USER NAME ================= */
function openLogin(){document.getElementById("loginModal").style.display="flex"}
function closeLogin(){document.getElementById("loginModal").style.display="none"}

/* ================= MULTI-USER SESSION DATA ================= */
function getAccounts(){
try{return JSON.parse(localStorage.getItem("svAccounts")||"[]");}catch(e){return [];}
}
function saveAccounts(accounts){localStorage.setItem("svAccounts",JSON.stringify(accounts));}
function getStudents(){
try{return JSON.parse(localStorage.getItem("svStudents")||"[]");}catch(e){return [];}
}
function saveStudents(students){localStorage.setItem("svStudents",JSON.stringify(students));}
function migrateLegacyAccount(){
let accounts=getAccounts();
if(accounts.length)return accounts;
const n=localStorage.getItem("svAccountName"),e=localStorage.getItem("svAccountEmail"),pw=localStorage.getItem("svAccountPassword");
if(n&&e&&pw){accounts=[{name:n,email:e,password:pw}];saveAccounts(accounts);}
return accounts;
}
function recordRecentStudent(name,email){
let students=getStudents();
const key=email.toLowerCase();
const idx=students.findIndex(x=>(x.email||"").toLowerCase()===key);
const record={name,email,course:currentCourse,progress:getCoursePercent(currentCourse),status:getCoursePercent(currentCourse)>=100?"Completed":"Active",lastLogin:Date.now()};
if(idx>=0)students[idx]=record;else students.unshift(record);
students.sort((a,b)=>(b.lastLogin||0)-(a.lastLogin||0));
saveStudents(students.slice(0,10));
renderRecentStudents();
}

function renderRecentStudents(){
const body=document.getElementById("recentStudentsBody"); if(!body)return;
const students=getStudents();
if(!students.length){body.innerHTML='<tr><td colspan="5" style="color:var(--muted);text-align:center">No students have logged in yet.</td></tr>';return;}
body.innerHTML=students.map(x=>`<tr><td>${escapeHtml(x.name||"Student")}</td><td>${escapeHtml(x.email||"")}</td><td>${escapeHtml(x.course||"JavaScript Mastery")}</td><td>${Number(x.progress||0)}%</td><td>${escapeHtml(x.status||"Active")}</td></tr>`).join("");
}
function progressKey(email){
return "svProgress_"+(email||"guest").trim().toLowerCase();
}
function getUserProgress(email){
try{return JSON.parse(localStorage.getItem(progressKey(email))||"{}");}catch(e){return {};}
}
function saveUserProgress(email){
if(!email)return;
localStorage.setItem(progressKey(email),JSON.stringify(courseProgress));
}
function getCourseActivityState(course){
const c=courses[course];
if(!courseProgress[course])courseProgress[course]={videos:[],materials:[],completed:[]};
const state=courseProgress[course];
state.videos=Array.isArray(state.videos)?state.videos:[];
state.materials=Array.isArray(state.materials)?state.materials:[];
state.completed=Array.isArray(state.completed)?state.completed:[];
return state;
}
function getCoursePercent(course){
const c=courses[course]; if(!c)return 0;
const state=getCourseActivityState(course);
const materialCount=(courseMaterials[course]||[]).length+1;
const total=c.lessons.length+materialCount;
const done=new Set([...state.videos.map(x=>"v"+x),...state.materials.map(x=>"m"+x)]);
return Math.min(100,Math.round((done.size/total)*100));
}
function refreshProgressUI(){
progress=getCoursePercent(currentCourse);
const bar=document.getElementById("mainProgress"); if(bar)bar.style.width=progress+"%";
const txt=document.getElementById("mainProgressText"); if(txt)txt.innerText=progress+"% completed";
const avg=Object.keys(courses).reduce((sum,name)=>sum+getCoursePercent(name),0)/Object.keys(courses).length;
const avgEl=document.getElementById("averageProgress"); if(avgEl)avgEl.innerText=Math.round(avg)+"%";
const completedEl=document.getElementById("completedLessons");
if(completedEl)completedEl.innerText=Object.values(courseProgress).reduce((n,x)=>n+(x.completed||[]).length,0);
renderCourses();
recordCurrentStudentProgress(false);
}
function recordCurrentStudentProgress(updateLoginTime=true){
const email=localStorage.getItem("svUserEmail"),name=localStorage.getItem("svUserName");
if(!email||!name)return;
let students=getStudents();
const key=email.toLowerCase();
const idx=students.findIndex(x=>(x.email||"").toLowerCase()===key);
const record={name,email,course:currentCourse,progress:getCoursePercent(currentCourse),status:getCoursePercent(currentCourse)>=100?"Completed":"Active",lastLogin:updateLoginTime?Date.now():(students[idx]?.lastLogin||Date.now())};
if(idx>=0)students[idx]=record;else students.unshift(record);
students.sort((a,b)=>(b.lastLogin||0)-(a.lastLogin||0));
saveStudents(students.slice(0,10));
renderRecentStudents();
}
function markVideoViewed(course,index){
const state=getCourseActivityState(course);
if(!state.videos.includes(index)){state.videos.push(index);
const email=localStorage.getItem("svUserEmail"); saveUserProgress(email);
if(course===currentCourse){refreshProgressUI();showToast("▶️ Video viewed — progress updated!");}
}
}
function startVideoTracking(){
clearTimeout(videoWatchTimer);
const course=currentCourse,index=currentLesson;
videoWatchTimer=setTimeout(()=>markVideoViewed(course,index),10000);
}
function markMaterialViewed(course,key){
const state=getCourseActivityState(course);
if(!state.materials.includes(key)){state.materials.push(key);
const email=localStorage.getItem("svUserEmail"); saveUserProgress(email);
if(course===currentCourse){refreshProgressUI();showToast("📂 Material viewed — progress updated!");}
}
}
function resetForNewUser(){
currentCourse="JavaScript Mastery";
currentLesson=0;
progress=0;
courseProgress={};
currentQuestion=0;
quizAnswers=new Array(questions.length).fill(null);
quizSubmitted=false;
clearTimeout(videoWatchTimer);
const score=document.getElementById("quizScore"),review=document.getElementById("quizReview");
if(score){score.style.display="none";score.innerHTML="";}
if(review){review.style.display="none";review.innerHTML="";}
const bar=document.getElementById("mainProgress");if(bar)bar.style.width="0%";
const txt=document.getElementById("mainProgressText");if(txt)txt.innerText="0% completed";
if(typeof loadQuestion==='function')loadQuestion();
}
function loadUserProgress(email){
courseProgress=getUserProgress(email);
Object.keys(courses).forEach(c=>getCourseActivityState(c));
currentCourse="JavaScript Mastery";
currentLesson=0;
progress=getCoursePercent(currentCourse);
}

function login(){
const name=document.getElementById("loginName").value.trim();
const email=document.getElementById("loginEmail").value.trim().toLowerCase();
const password=document.getElementById("loginPassword").value;
const msg=document.getElementById("loginMessage");
if(!name){msg.innerText="Please enter your full name.";return}
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){msg.innerText="Please enter a valid email.";return}
if(!password || password.length < 6){msg.innerText="Password must be at least 6 characters.";return}
const accounts=migrateLegacyAccount();
const account=accounts.find(a=>(a.email||"").toLowerCase()===email && a.password===password);
if(!account){msg.innerText="❌ Email or password is incorrect. If you are new, click Create Account.";return;}
localStorage.setItem("svUserName",account.name);
localStorage.setItem("svUserEmail",account.email);
loadUserProgress(account.email);
setUser(account.name,account.email);
recordRecentStudent(account.name,account.email);
refreshProgressUI();
msg.innerText="✅ Login successful!";
showToast("Login successful!");
setTimeout(()=>{closeLogin();showPage("home")},700);
}

function register(){
const name=document.getElementById("loginName").value.trim();
const email=document.getElementById("loginEmail").value.trim().toLowerCase();
const password=document.getElementById("loginPassword").value;
const msg=document.getElementById("loginMessage");
if(!name){msg.innerText="Please enter your full name to create an account.";document.getElementById("loginName").focus();return}
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){msg.innerText="Please enter a valid email address.";document.getElementById("loginEmail").focus();return}
if(!password || password.length < 6){msg.innerText="Please create a password with at least 6 characters.";document.getElementById("loginPassword").focus();return}
let accounts=migrateLegacyAccount();
if(accounts.some(a=>(a.email||"").toLowerCase()===email)){msg.innerText="❌ An account with this email already exists. Please login.";return;}
accounts.push({name,email,password});
saveAccounts(accounts);
localStorage.setItem("svAccountName",name);
localStorage.setItem("svAccountEmail",email);
localStorage.setItem("svAccountPassword",password);
localStorage.setItem("svUserName",name);
localStorage.setItem("svUserEmail",email);
resetForNewUser();
courseProgress={};
saveUserProgress(email);
setUser(name,email);
recordRecentStudent(name,email);
refreshProgressUI();
msg.innerText="🎉 Account created successfully!";
showToast("Account created successfully!");
setTimeout(()=>{closeLogin();showPage("home")},700);
}

function setUser(name,email){
document.getElementById("navUserName").innerText=name;
document.getElementById("navAvatar").innerText=name.charAt(0).toUpperCase();
document.getElementById("welcomeName").innerText=name;
document.getElementById("profileName").innerText=name;
document.getElementById("profileNameRow").innerText=name;
document.getElementById("profileEmail").innerText=email||"";
document.getElementById("profileAvatar").innerText=name.charAt(0).toUpperCase();
document.getElementById("certificateName").innerText=name;
}
function logout(){
localStorage.removeItem("svUserName");localStorage.removeItem("svUserEmail");
resetForNewUser();
setUser("Student","student@seshuvidhyavanth.com");showToast("Logged out successfully!");
setTimeout(openLogin,500);
}

/* ================= COURSES ================= */
function renderCourses(){
const grid=document.getElementById("courseGrid");grid.innerHTML="";
Object.entries(courses).forEach(([name,c])=>{
const completed=getCoursePercent(name);
grid.innerHTML+=`<div class="course-card" data-category="${c.category}" data-name="${name.toLowerCase()}">
<div class="course-img ${c.image}"></div><div class="course-body">
<h3>${name}</h3><p>${courseSummary(name)}</p>
<div class="course-meta"><span>${c.lessons.length} Lessons</span><span>${Math.ceil(c.lessons.reduce((s,x)=>s+parseInt(x[3]),0)/60)} Hours</span></div>
<div class="progress"><div class="progress-bar" style="width:${completed}%"></div></div><p>${completed}% completed</p>
<button class="btn primary full" onclick="openCourse('${name.replace(/'/g,"\\'")}')">${completed?"Continue":"Start Course"}</button>
</div></div>`;
});
}
function courseSummary(name){
return {
"HTML & CSS Mastery":"Build responsive websites with semantic HTML and modern CSS layouts.",
"JavaScript Mastery":"Learn JavaScript fundamentals, DOM manipulation and interactive projects.",
"Python Programming":"Learn Python from beginner syntax through functions, collections and projects.",
"AI & Machine Learning":"Understand AI, data, machine learning workflows and model fundamentals.",
"Java Programming":"Learn Java syntax and object-oriented programming from the ground up.",
"SQL Database":"Learn SQL queries, relationships, aggregation, joins and database projects."
}[name];
}
function filterCourses(){
const search=document.getElementById("courseSearch").value.toLowerCase();
const cat=document.getElementById("categoryFilter").value;
document.querySelectorAll(".course-card").forEach(card=>{
card.style.display=card.dataset.name.includes(search)&&(cat==="all"||card.dataset.category===cat)?"block":"none";
});
}
function openCourse(course){
currentCourse=course;currentLesson=0;progress=getCoursePercent(course);document.getElementById("currentCourse").innerText=course;renderMaterials();
document.getElementById("certificateCourse").innerText=course;
renderLessons();selectLesson(0);showPage("lesson");showToast(course+" opened");
}

/* ================= REAL VIDEO + COURSE CONTENT ================= */
function renderLessons(){
const box=document.getElementById("lessonItems");box.innerHTML="";
courses[currentCourse].lessons.forEach((l,i)=>{
box.innerHTML+=`<div class="lesson-item ${i===currentLesson?"active":""}" onclick="selectLesson(${i})">
${i+1}. ${l[0]} <small style="float:right">${l[3]}</small></div>`;
});
}
function selectLesson(index){
currentLesson=index;const l=courses[currentCourse].lessons[index];
document.getElementById("lessonTitle").innerText=l[0];
document.getElementById("lessonDescription").innerText=l[1];
document.getElementById("lessonTopic").innerText=l[2];
document.getElementById("lessonDuration").innerText=l[3];
document.getElementById("dashboardCourse").innerText=currentCourse;
document.getElementById("dashboardLesson").innerText=`Lesson ${index+1} of ${courses[currentCourse].lessons.length}`;
document.getElementById("certificateCourse").innerText=currentCourse;
renderLessons();
const courseVideoIds={
"HTML & CSS Mastery":"dX8396ZmSPk",
"JavaScript Mastery":"PkZNo7MFNFg",
"Python Programming":"rfscVS0vtbw",
"AI & Machine Learning":"i_LwzRVP7bg",
"Java Programming":"GoXwIVyNvX0",
"SQL Database":"HXV3zeQKqGY"
};
const videoId=courseVideoIds[currentCourse] || courseVideoIds["JavaScript Mastery"];
document.getElementById("lessonVideo").src=`https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1`;
startVideoTracking();
refreshProgressUI();
showToast("Lesson selected: "+l[0]);
}
function playVideo(){document.getElementById("lessonVideo").scrollIntoView({behavior:"smooth",block:"center"});}
function completeLesson(){
markVideoViewed(currentCourse,currentLesson);
const state=getCourseActivityState(currentCourse);
if(!state.completed.includes(currentLesson))state.completed.push(currentLesson);
const email=localStorage.getItem("svUserEmail");saveUserProgress(email);
if(currentLesson<courses[currentCourse].lessons.length-1)currentLesson++;
refreshProgressUI();
selectLesson(currentLesson);
showToast("✓ Lesson/video completed! Progress updated.");
}


/* ================= COURSE MATERIALS ================= */
const courseMaterials={
"HTML & CSS Mastery":[
["📘","HTML & CSS Notes","Structured notes covering HTML elements, CSS selectors, box model, Flexbox, Grid and responsive design.","Open Notes"],
["🧪","Practice Exercises","Practice tasks for building responsive pages, forms, navigation bars and layouts.","Start Practice"],
["💻","Project Guide","Step-by-step guide for the final responsive website project.","View Guide"],
["🔗","Reference Sheet","Quick reference for common HTML tags and CSS properties.","Open Reference"]
],
"JavaScript Mastery":[
["📘","JavaScript Notes","Variables, data types, operators, conditions, loops, functions, arrays, objects and DOM.","Open Notes"],
["🧪","Coding Exercises","Hands-on JavaScript exercises for each lesson with small programming challenges.","Start Practice"],
["💻","Mini Project Guide","Build an interactive webpage using events, DOM manipulation and JavaScript logic.","View Guide"],
["🔗","JavaScript Reference","Quick reference for common syntax, methods and browser APIs.","Open Reference"]
],
"Python Programming":[
["📘","Python Notes","Beginner-friendly notes covering syntax, variables, conditions, loops, functions and collections.","Open Notes"],
["🧪","Python Exercises","Practice problems for programming logic, functions, lists and dictionaries.","Start Practice"],
["💻","Project Guide","Build a command-line Python project step by step.","View Guide"],
["🔗","Python Reference","Quick reference for common Python syntax and built-in functions.","Open Reference"]
],
"AI & Machine Learning":[
["📘","AI & ML Notes","Fundamentals of AI, datasets, supervised learning, evaluation, neural networks and NLP.","Open Notes"],
["🧪","Data Practice","Exercises for understanding features, training data, testing and model evaluation.","Start Practice"],
["💻","AI Project Guide","Plan a simple machine-learning workflow from data preparation to evaluation.","View Guide"],
["🔗","AI Reference","Quick reference for important machine-learning terminology.","Open Reference"]
],
"Java Programming":[
["📘","Java Notes","Java syntax, variables, control flow, methods, arrays and object-oriented programming.","Open Notes"],
["🧪","Java Exercises","Programming exercises for methods, arrays, classes and objects.","Start Practice"],
["💻","OOP Project Guide","Build a small console application using classes, objects and inheritance.","View Guide"],
["🔗","Java Reference","Quick reference for Java keywords, syntax and common APIs.","Open Reference"]
],
"SQL Database":[
["📘","SQL Notes","Tables, SELECT, filtering, aggregation, GROUP BY, JOINs and subqueries.","Open Notes"],
["🧪","SQL Practice","Query-writing exercises using realistic student and course database examples.","Start Practice"],
["💻","Database Project Guide","Design tables and write queries for a small learning-platform database.","View Guide"],
["🔗","SQL Reference","Quick reference for common SQL commands and clauses.","Open Reference"]
]
};

const coursePdfData={"HTML & CSS Mastery":"JVBERi0xLjQKJZOMi54gUmVwb3J0TGFiIEdlbmVyYXRlZCBQREYgZG9jdW1lbnQgKG9wZW5zb3VyY2UpCjEgMCBvYmoKPDwKL0YxIDIgMCBSIC9GMiAzIDAgUiAvRjMgNCAwIFIgL0Y0IDUgMCBSCj4+CmVuZG9iagoyIDAgb2JqCjw8Ci9CYXNlRm9udCAvSGVsdmV0aWNhIC9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nIC9OYW1lIC9GMSAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL0Jhc2VGb250IC9IZWx2ZXRpY2EtQm9sZCAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvTmFtZSAvRjIgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iago0IDAgb2JqCjw8Ci9CYXNlRm9udCAvQ291cmllciAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvTmFtZSAvRjMgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iago1IDAgb2JqCjw8Ci9CYXNlRm9udCAvWmFwZkRpbmdiYXRzIC9OYW1lIC9GNCAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjYgMCBvYmoKPDwKL0NvbnRlbnRzIDEwIDAgUiAvTWVkaWFCb3ggWyAwIDAgNTk1LjI3NTYgODQxLjg4OTggXSAvUGFyZW50IDkgMCBSIC9SZXNvdXJjZXMgPDwKL0ZvbnQgMSAwIFIgL1Byb2NTZXQgWyAvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJIF0KPj4gL1JvdGF0ZSAwIC9UcmFucyA8PAoKPj4gCiAgL1R5cGUgL1BhZ2UKPj4KZW5kb2JqCjcgMCBvYmoKPDwKL1BhZ2VNb2RlIC9Vc2VOb25lIC9QYWdlcyA5IDAgUiAvVHlwZSAvQ2F0YWxvZwo+PgplbmRvYmoKOCAwIG9iago8PAovQXV0aG9yIChMaWdodCB3aXRoIGtub3dsZWRnZSBMTVMpIC9DcmVhdGlvbkRhdGUgKEQ6MjAyNjA5MjQxNzU4NDUrMDAnMDAnKSAvQ3JlYXRvciAoXCh1bnNwZWNpZmllZFwpKSAvS2V5d29yZHMgKCkgL01vZERhdGUgKEQ6MjAyNjA5MjQxNzU4NDUrMDAnMDAnKSAvUHJvZHVjZXIgKFJlcG9ydExhYiBQREYgTGlicmFyeSAtIFwob3BlbnNvdXJjZVwpKSAKICAvU3ViamVjdCAoXCh1bnNwZWNpZmllZFwpKSAvVGl0bGUgKEhUTUwgJiBDU1MgTWFzdGVyeSkgL1RyYXBwZWQgL0ZhbHNlCj4+CmVuZG9iago5IDAgb2JqCjw8Ci9Db3VudCAxIC9LaWRzIFsgNiAwIFIgXSAvVHlwZSAvUGFnZXMKPj4KZW5kb2JqCjEwIDAgb2JqCjw8Ci9GaWx0ZXIgWyAvQVNDSUk4NURlY29kZSAvRmxhdGVEZWNvZGUgXSAvTGVuZ3RoIDExMzYKPj4Kc3RyZWFtCkdhdUhKOTk3Z2MmQUlWOlFyQzchXVd0KDRaQ00rXWAqRzssNDVJb2YnXjE3OkJTZUg0V1smVWc7PXFWOS1wSm47REg/J1QhV2FMYWEzNktHRGFZX2RMWGJlIiJGLTd1Rz0kZ1Y4PHVPOzVwKTc9Z2E+JTFoaVJmWUJGb2ooKEsyLz07KSFyPUsoajQnMDlXKjMjYSxmKykkXEslOEZcZGBKPCU6PG1YdFovSGVEaitRbEwjJC1hUDkiIlFUOnRCJDw7UltRZC5NJCdKQS9HOkVaJnIuMzA/LiEzZ2QmayFsXGlRKGItbmwoZGtVVENSRFtDK0wvLGE4S0YqVVFrYE5xTSsuJVdmLClbZFpSRURXKjYoKHIwLDNLbkdBKCJnIXNGOD1ub19WUi0pImtVMUVNKWdYVl82OWZfVidQTXQkUFFIXCk6YD1ZUVtvOlMyJmg0LiJwciQpWTRzTXRfMThrVyFZRVZVNEkpdWghLjBuc3MrMF4udWJYaz90Ii9aUmZBP0BVZkVvaVspVVQ/dFg8WWUqRCtHRzkpQD5cZlJGVks8J0lAVTYyRThRNWBRKk9WNVE/PSEpZ1l0LmVkNUE/NydmLkMiWD1BMEFLaipGWDhzWE48UWVJWmA9QypiOiVLZT5vI04jYDMoZ2NHU1RCNEM/O2AmME0rUSVDbColYWdTMlchKURWZF8pUWlRdDVzUU0lISw8a0B1Olh0QjhqUFdJajEiLj9CWUFAUFpTLyJGc01maW0+JD9eakQ9PCwzMUFmaUc6XiRVc14scShuMDImSW4wRERhbjdYYUJAJG8tOlAoYkY/M01nW2FOPC1BXGw2JltdNl5Nb1ZkXExlLWRHcWgsNSpVK1FGNys0SDZqOFxpK0Q7NjQlbGpnKSMmQzRuNEcvazFzNF4kczpzXigtKXJeSylEQDBCS0s2MTtWcCxSIyEvJzNWaCouMFhnT3E6QjNRTUg/KDNZXTglLSRaQTdbKF9lJmx0a0JtLEQzKiJJXk8zJDIjMiFdbCJIK283QipQUmAlalNdR2JQXjhnOVFfIkQuaUlHYV5ASTE/ZVZdX10lYF1yZSFhSEVQdUhJXTNQX3A6LG1qZV9FNmY0NW9uISpCKiZsQlVrVVhJWENGY0YiWHUlZTVQTSs5Kkk9WUlGImI+QjJaaT9BYGosYWIuPHFgWTdDYzg3UzRBUCl1L1UzNGctJExyLUA8UW8vNFAkSEAsaHBbS25RLV1lI1g0TiFsNVtVcClHTlhWXSIvPSdLbXM1SGhnQk9eJzsucGtWMz09KV1GJkQhSTpkJFonPStqJmk6aEE1V0tkJ2dfPUdDczsmYSJGRkItS2lGYjJrNyRCOTA1RGcrOmhxPEpfSyg4S2o0QkU2ZiRedDIrRHNLQ3MsUj87LEJYNj1PdV0tMF5ISVw2Pi00Ny4/JE0rVzw/KFNEKFFlOEZlKW4hcClyU19EW3I6PiRWRGVpPyJgbzInKEpWYSc4WTJJdExSVHNYPjVhXX4+ZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgMTEKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDYxIDAwMDAwIG4gCjAwMDAwMDAxMjIgMDAwMDAgbiAKMDAwMDAwMDIyOSAwMDAwMCBuIAowMDAwMDAwMzQxIDAwMDAwIG4gCjAwMDAwMDA0NDYgMDAwMDAgbiAKMDAwMDAwMDUyOSAwMDAwMCBuIAowMDAwMDAwNzMzIDAwMDAwIG4gCjAwMDAwMDA4MDEgMDAwMDAgbiAKMDAwMDAwMTA5NyAwMDAwMCBuIAowMDAwMDAxMTU2IDAwMDAwIG4gCnRyYWlsZXIKPDwKL0lEIApbPGJjMzI5ODMzYWVmZTRkZTExZDcyYTE2YTRiYWM0OTU3PjxiYzMyOTgzM2FlZmU0ZGUxMWQ3MmExNmE0YmFjNDk1Nz5dCiUgUmVwb3J0TGFiIGdlbmVyYXRlZCBQREYgZG9jdW1lbnQgLS0gZGlnZXN0IChvcGVuc291cmNlKQoKL0luZm8gOCAwIFIKL1Jvb3QgNyAwIFIKL1NpemUgMTEKPj4Kc3RhcnR4cmVmCjIzODQKJSVFT0YK","JavaScript Mastery":"JVBERi0xLjQKJZOMi54gUmVwb3J0TGFiIEdlbmVyYXRlZCBQREYgZG9jdW1lbnQgKG9wZW5zb3VyY2UpCjEgMCBvYmoKPDwKL0YxIDIgMCBSIC9GMiAzIDAgUiAvRjMgNCAwIFIgL0Y0IDUgMCBSCj4+CmVuZG9iagoyIDAgb2JqCjw8Ci9CYXNlRm9udCAvSGVsdmV0aWNhIC9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nIC9OYW1lIC9GMSAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL0Jhc2VGb250IC9IZWx2ZXRpY2EtQm9sZCAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvTmFtZSAvRjIgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iago0IDAgb2JqCjw8Ci9CYXNlRm9udCAvQ291cmllciAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvTmFtZSAvRjMgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iago1IDAgb2JqCjw8Ci9CYXNlRm9udCAvWmFwZkRpbmdiYXRzIC9OYW1lIC9GNCAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjYgMCBvYmoKPDwKL0NvbnRlbnRzIDEwIDAgUiAvTWVkaWFCb3ggWyAwIDAgNTk1LjI3NTYgODQxLjg4OTggXSAvUGFyZW50IDkgMCBSIC9SZXNvdXJjZXMgPDwKL0ZvbnQgMSAwIFIgL1Byb2NTZXQgWyAvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJIF0KPj4gL1JvdGF0ZSAwIC9UcmFucyA8PAoKPj4gCiAgL1R5cGUgL1BhZ2UKPj4KZW5kb2JqCjcgMCBvYmoKPDwKL1BhZ2VNb2RlIC9Vc2VOb25lIC9QYWdlcyA5IDAgUiAvVHlwZSAvQ2F0YWxvZwo+PgplbmRvYmoKOCAwIG9iago8PAovQXV0aG9yIChMaWdodCB3aXRoIGtub3dsZWRnZSBMTVMpIC9DcmVhdGlvbkRhdGUgKEQ6MjAyNjA5MjQxNzU4NDUrMDAnMDAnKSAvQ3JlYXRvciAoXCh1bnNwZWNpZmllZFwpKSAvS2V5d29yZHMgKCkgL01vZERhdGUgKEQ6MjAyNjA5MjQxNzU4NDUrMDAnMDAnKSAvUHJvZHVjZXIgKFJlcG9ydExhYiBQREYgTGlicmFyeSAtIFwob3BlbnNvdXJjZVwpKSAKICAvU3ViamVjdCAoXCh1bnNwZWNpZmllZFwpKSAvVGl0bGUgKEphdmFTY3JpcHQgTWFzdGVyeSkgL1RyYXBwZWQgL0ZhbHNlCj4+CmVuZG9iago5IDAgb2JqCjw8Ci9Db3VudCAxIC9LaWRzIFsgNiAwIFIgXSAvVHlwZSAvUGFnZXMKPj4KZW5kb2JqCjEwIDAgb2JqCjw8Ci9GaWx0ZXIgWyAvQVNDSUk4NURlY29kZSAvRmxhdGVEZWNvZGUgXSAvTGVuZ3RoIDEwNzUKPj4Kc3RyZWFtCkdhdUhKOWxvI0ImQUA3Lm0mPD9VbEliWURTa00yb2RlKG0wKyJjOD8ldVMmTictZ0BHTEBGWkRPcy1NVTlmdHVwaXUqcXFIMiReXFZeRForZGhUQ01IayxYWyJAbGYjI1QvTEkmNEJoLVVCLW1GJVhvRSRTIWU5XXEoLDJWVWlHYm9Pc0heaGtkQmtjWDZCWFIjayE7YTBVYnAqInRbJVw9Xz5QVEBHbkNFQGU+K0s1aidZKW5tU11ES24yJV8lQkIoRU4zNlVdKD5mJ09QQC9kNWxRSVotaDE9UylJWlZ0JXJyNTBsVEUuUjUjLU0ubF5iT3VqL0RHZEJiP0FWNVRyRXItUzRlSlFgXi0nMVRVYTo5WEBiOiQpXi84dCgvb24mZyRnJ1orKiU4aDRtQWU9WjVARl0ka2dVVERoMyc5YUhcMG0nXWRlJWssKUFyMkQsPj0tcit0SFk8XyVMJ29FdHM9UUVcJk8rOnJsZFlHWzJWKl9dXEE7YUQxSFRJRS5obUxQN0BxbnAuZF5eRHVCVEAqXlstOW9uJTBzNEdUXklEOlRdL0VqKVVkQjcxbzFvIVU6WCU/Nzc1SXUoOmVrS0woYEQkXz4tIyc6JlhnNkNiKCheOCM+dWFfXS0rKXJGcUJFOjBWRGpFREJiOlIlcChrX0srJiItQSMmNTxUZzVbVW1OZHVLZ0sqcj80NFloKkA1J0ooWyFAXTdlJjpmcGpAJ048MUdSPFpzblgjPTw1LmtFZnFTSDw1MkM8MFIuQzA7QWRQUFx1PC1pS0AyNFMvTCUtLE11cU8hKmBDNms3XGJqXkg1XlVhcTlOOydCO0kkODtHI1c9KDN1JlpiRy5qTTJiNkEoOFE3W0U9PFxUYkRdQXE/VSUra105NHR1MyJiciYhIWgzV1E3MihDJG9vW0Vaby9hU0goO1xKQV9DWEN1cyIqXWg/M0wwKlBbNEBVXz4+O0Q4QG81cEwiJilmOD03JjRFSGYzUCQxMWUnT2BrTkVKZSJMK1leKkVjQjBEby9FXXNwW24+Iy9qK18rZzMoT21KZmUvJWFpKDEuXi1acFVAImsnSUduM2xjNVFndTcoaW5LRkY0MDAxMipeVXJjXzpKWyJaO18mUFwxWVc5ZC8rYjtPVjliWFBqMjltbTlJMjhrZVJOR15rZyhydFl1NTp1L14wZT5mOnQiSF40Om8xcTEsZDBdQ2RwODZnT0osZFEsMFpHLDdlXT1qVjRyPElnJ3RdR0BgKGpIWC1JYV5SZFM7QlJPIzEqQHNJTF5kPGJLWTVhM2xqQlRQVWtRQjgvTGsuMnBmXERLOXFvSSpPZ2MldSdMWjAzZWwoaVU3aUlfLkswRi8yVlowNEdiN1ttLDkkKihfMmp1MlY5IywyXSVCTyw4VjlncSlNZ2FaKm4vTD8jYDVNfj5lbmRzdHJlYW0KZW5kb2JqCnhyZWYKMCAxMQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwNjEgMDAwMDAgbiAKMDAwMDAwMDEyMiAwMDAwMCBuIAowMDAwMDAwMjI5IDAwMDAwIG4gCjAwMDAwMDAzNDEgMDAwMDAgbiAKMDAwMDAwMDQ0NiAwMDAwMCBuIAowMDAwMDAwNTI5IDAwMDAwIG4gCjAwMDAwMDA3MzMgMDAwMDAgbiAKMDAwMDAwMDgwMSAwMDAwMCBuIAowMDAwMDAxMDk3IDAwMDAwIG4gCjAwMDAwMDExNTYgMDAwMDAgbiAKdHJhaWxlcgo8PAovSUQgCls8NDNkMTZlMTUwOTQ5ZDJlMTU1N2ZjNmNmZGM3N2NlODE+PDQzZDE2ZTE1MDk0OWQyZTE1NTdmYzZjZmRjNzdjZTgxPl0KJSBSZXBvcnRMYWIgZ2VuZXJhdGVkIFBERiBkb2N1bWVudCAtLSBkaWdlc3QgKG9wZW5zb3VyY2UpCgovSW5mbyA4IDAgUgovUm9vdCA3IDAgUgovU2l6ZSAxMQo+PgpzdGFydHhyZWYKMjMyMwolJUVPRgo=","Python Programming":"JVBERi0xLjQKJZOMi54gUmVwb3J0TGFiIEdlbmVyYXRlZCBQREYgZG9jdW1lbnQgKG9wZW5zb3VyY2UpCjEgMCBvYmoKPDwKL0YxIDIgMCBSIC9GMiAzIDAgUiAvRjMgNCAwIFIgL0Y0IDUgMCBSCj4+CmVuZG9iagoyIDAgb2JqCjw8Ci9CYXNlRm9udCAvSGVsdmV0aWNhIC9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nIC9OYW1lIC9GMSAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL0Jhc2VGb250IC9IZWx2ZXRpY2EtQm9sZCAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvTmFtZSAvRjIgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iago0IDAgb2JqCjw8Ci9CYXNlRm9udCAvQ291cmllciAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvTmFtZSAvRjMgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iago1IDAgb2JqCjw8Ci9CYXNlRm9udCAvWmFwZkRpbmdiYXRzIC9OYW1lIC9GNCAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjYgMCBvYmoKPDwKL0NvbnRlbnRzIDEwIDAgUiAvTWVkaWFCb3ggWyAwIDAgNTk1LjI3NTYgODQxLjg4OTggXSAvUGFyZW50IDkgMCBSIC9SZXNvdXJjZXMgPDwKL0ZvbnQgMSAwIFIgL1Byb2NTZXQgWyAvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJIF0KPj4gL1JvdGF0ZSAwIC9UcmFucyA8PAoKPj4gCiAgL1R5cGUgL1BhZ2UKPj4KZW5kb2JqCjcgMCBvYmoKPDwKL1BhZ2VNb2RlIC9Vc2VOb25lIC9QYWdlcyA5IDAgUiAvVHlwZSAvQ2F0YWxvZwo+PgplbmRvYmoKOCAwIG9iago8PAovQXV0aG9yIChMaWdodCB3aXRoIGtub3dsZWRnZSBMTVMpIC9DcmVhdGlvbkRhdGUgKEQ6MjAyNjA5MjQxNzU4NDUrMDAnMDAnKSAvQ3JlYXRvciAoXCh1bnNwZWNpZmllZFwpKSAvS2V5d29yZHMgKCkgL01vZERhdGUgKEQ6MjAyNjA5MjQxNzU4NDUrMDAnMDAnKSAvUHJvZHVjZXIgKFJlcG9ydExhYiBQREYgTGlicmFyeSAtIFwob3BlbnNvdXJjZVwpKSAKICAvU3ViamVjdCAoXCh1bnNwZWNpZmllZFwpKSAvVGl0bGUgKFB5dGhvbiBQcm9ncmFtbWluZykgL1RyYXBwZWQgL0ZhbHNlCj4+CmVuZG9iago5IDAgb2JqCjw8Ci9Db3VudCAxIC9LaWRzIFsgNiAwIFIgXSAvVHlwZSAvUGFnZXMKPj4KZW5kb2JqCjEwIDAgb2JqCjw8Ci9GaWx0ZXIgWyAvQVNDSUk4NURlY29kZSAvRmxhdGVEZWNvZGUgXSAvTGVuZ3RoIDEwNjEKPj4Kc3RyZWFtCkdhdUhKOW9uJGUmQUBQOSkhIkxRSlFKLzltZjVAaU5VMUBYVWxFYnBbZzFWKmZvLkIuLHExb25kSnInc0E6Iz5AXS43XVReam1pJVVSPSZaKmYjW3NVZ01WNyhDZTEpJG1yRnE2ayFaYjZxTktVbGpobXVZNVlxZyVbTGZNS0lrQ2NqQ29NSD1WZkQvWmxGODRBcEhmZFU2RiU/QWRwYjJeXzYqdFEvNWRcJ2daIj1ON01WVk4nP1tjOGg5W01vWzw2KyZTaCtbQXROTiojLVBfTCxUJmJwbWtINEE1RCdURUA4dFw5RWtETWtwIyU3UVc2OktMaSJ1aSI8Wl0oT0ZfYFBGLWVEQ0dwZG1RU0UkKzElZ2trLjhfK3FLVFhIaFg2WEhqLTkrJE1oUXMyclo7NmRMWWY9VmQyR01jJicxKGpfak00Ni9qQz5HMS9PRVQraiVZXTNbWmBjLkB1XC0uRkEpSDcoSWpjTFhpNFRULls4S1MxWS4sa11GQFBLLSliYW89WlVvKzlKcmdjWkdHLzpgc3I1dCNXRiw+JktlZiFJdT88I1wnZEVwJ3JlZTVORi9YTlRLJjhLXCpNL0Y9QypEKC5gNiEuZy4tJCxkMSE1cj1ANj5FQiQzTVJuVTkiZlI4Ojc7Xj9fcGNoY0hAaUdMPTwnXTElN21UW2A1NkM8LFRcPWYvIUAhc0BXJToyLVVgXCZXbDR1TVBCMyNlUnQzY2wjOUptc18hJjQsLFliQmxxdUJZSS0yK1lHK2tcZz9qVjMlTTtIUUdBQ0gmcVNkKkYyaC9YKjFFcW9FISg3JTArTydlMjlSQk11UUQtNkltUl4nWFlMNDxSRG1icWNoREtyZmglJ0g+M2g9cGZ0alEuY1MxSzgsbCdWaColaVQ0am4qXjx0SC5ucCxdMCNvYGsoSVc5LWBvcz1DIkdYRWQoNSQyJjprTj4uIUttQWZyaltlPkZZUUNzOFUsKixuLnE1TSNGXFNnbEZGTVFPYD5LXCk0ZU1fXG5GRFU1a1hnM0xHTCt1KXBvT2hCOnBNZ0hPaFoqUjRrcFhJQiNBPy9dYFsiSXBWJCtxQ1JCVz9GZGJMXURsQllHcWJkPVdhOFddW25DUExvZ0U8TnJJV19sQ1JZWWRxXjNQVFlLXXJnW0NWTFlpNyNUNlRNZk5qLT5mc0VsYkUoaidJUi1ebEkrPlhvImBGMS5eLCpXJzdnJUxiLjA0ZSMiOVclJWZsciQyPyQva0NkbWkpMmokOzQlJmRQQEAmcGVIQ0NwRWxwVFBeTUVPOSRsbG4hL0l0OERPbE1qOjNcaW1pYC1FOSxFLGIkT0dGKV0sbFBmKzQpaEQtZVc7Pm1KcjZvYGgkbkFkUTltcSxCcEJEL1l0Y00vJChAY19wcHUzUSxBbX4+ZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgMTEKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDYxIDAwMDAwIG4gCjAwMDAwMDAxMjIgMDAwMDAgbiAKMDAwMDAwMDIyOSAwMDAwMCBuIAowMDAwMDAwMzQxIDAwMDAwIG4gCjAwMDAwMDA0NDYgMDAwMDAgbiAKMDAwMDAwMDUyOSAwMDAwMCBuIAowMDAwMDAwNzMzIDAwMDAwIG4gCjAwMDAwMDA4MDEgMDAwMDAgbiAKMDAwMDAwMTA5NyAwMDAwMCBuIAowMDAwMDAxMTU2IDAwMDAwIG4gCnRyYWlsZXIKPDwKL0lEIApbPDljNTAzM2RhYzk5MjRjYmExZjNlNTE2NmNiYjFiMjVlPjw5YzUwMzNkYWM5OTI0Y2JhMWYzZTUxNjZjYmIxYjI1ZT5dCiUgUmVwb3J0TGFiIGdlbmVyYXRlZCBQREYgZG9jdW1lbnQgLS0gZGlnZXN0IChvcGVuc291cmNlKQoKL0luZm8gOCAwIFIKL1Jvb3QgNyAwIFIKL1NpemUgMTEKPj4Kc3RhcnR4cmVmCjIzMDkKJSVFT0YK","AI & Machine Learning":"JVBERi0xLjQKJZOMi54gUmVwb3J0TGFiIEdlbmVyYXRlZCBQREYgZG9jdW1lbnQgKG9wZW5zb3VyY2UpCjEgMCBvYmoKPDwKL0YxIDIgMCBSIC9GMiAzIDAgUiAvRjMgNCAwIFIgL0Y0IDUgMCBSCj4+CmVuZG9iagoyIDAgb2JqCjw8Ci9CYXNlRm9udCAvSGVsdmV0aWNhIC9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nIC9OYW1lIC9GMSAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL0Jhc2VGb250IC9IZWx2ZXRpY2EtQm9sZCAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvTmFtZSAvRjIgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iago0IDAgb2JqCjw8Ci9CYXNlRm9udCAvQ291cmllciAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvTmFtZSAvRjMgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iago1IDAgb2JqCjw8Ci9CYXNlRm9udCAvWmFwZkRpbmdiYXRzIC9OYW1lIC9GNCAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjYgMCBvYmoKPDwKL0NvbnRlbnRzIDEwIDAgUiAvTWVkaWFCb3ggWyAwIDAgNTk1LjI3NTYgODQxLjg4OTggXSAvUGFyZW50IDkgMCBSIC9SZXNvdXJjZXMgPDwKL0ZvbnQgMSAwIFIgL1Byb2NTZXQgWyAvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJIF0KPj4gL1JvdGF0ZSAwIC9UcmFucyA8PAoKPj4gCiAgL1R5cGUgL1BhZ2UKPj4KZW5kb2JqCjcgMCBvYmoKPDwKL1BhZ2VNb2RlIC9Vc2VOb25lIC9QYWdlcyA5IDAgUiAvVHlwZSAvQ2F0YWxvZwo+PgplbmRvYmoKOCAwIG9iago8PAovQXV0aG9yIChMaWdodCB3aXRoIGtub3dsZWRnZSBMTVMpIC9DcmVhdGlvbkRhdGUgKEQ6MjAyNjA5MjQxNzU4NDUrMDAnMDAnKSAvQ3JlYXRvciAoXCh1bnNwZWNpZmllZFwpKSAvS2V5d29yZHMgKCkgL01vZERhdGUgKEQ6MjAyNjA5MjQxNzU4NDUrMDAnMDAnKSAvUHJvZHVjZXIgKFJlcG9ydExhYiBQREYgTGlicmFyeSAtIFwob3BlbnNvdXJjZVwpKSAKICAvU3ViamVjdCAoXCh1bnNwZWNpZmllZFwpKSAvVGl0bGUgKEFJICYgTWFjaGluZSBMZWFybmluZykgL1RyYXBwZWQgL0ZhbHNlCj4+CmVuZG9iago5IDAgb2JqCjw8Ci9Db3VudCAxIC9LaWRzIFsgNiAwIFIgXSAvVHlwZSAvUGFnZXMKPj4KZW5kb2JqCjEwIDAgb2JqCjw8Ci9GaWx0ZXIgWyAvQVNDSUk4NURlY29kZSAvRmxhdGVEZWNvZGUgXSAvTGVuZ3RoIDEwODEKPj4Kc3RyZWFtCkdhdUhKOWxLJk0mQUA3LmJjMShhWyMuQ0laQDBmZiUyLD1hPypvVEJqcSw9OVVsaW5aLStZQDVmRFlAXztLZ1g6bVxbIm49OXQjYCtgY0dQR3IkXnVLSDpvYzcxSmI4KjNTYEowRm1bXT07bihrVD5LRl5sSF51KHBiTmwuI3A4Okw3VGdMZm86NDJoUlxrZipBWmxPKTIpKiRaU3UldFJvK0xpOm1yWCEoSlohdGMsV29aRkstLFN0KygtRlFRIyUjLy1xa2tUalpBaVpLX111aUU0dV0ncTJMdCFVI0RhWzFpXGhjJCRCUihjMTJpJm8wQHJHLzMoajo4QixxRm5dQVcuaSlbPiwsITxCRGdxdGYhVG5PalApU29CKjx0OUUlWF5LdUtTXGZEPXBoKCwwVFYoV0NGbS9ZcidgKnJaRi5kNFBQUVQpbDpuRHApSy1PVG5UMEhmRGpIZCQsVk0ncEBlMTYxUkssIztAJEE/REQ1QFNzQWJaUnBGJFErY11JRzohXGBsOD44YTQtNE5dO1tjOiN1VF46J1ZtOkkkU2Bjbj43N2NPIkpwKFNVOWJHMi1zVVBMPiJVb1BVOT9APiMrQFk1WjhqVmUiKDc5c2FNZ05ZNipsZ2xiS2duJEZgWjY3TENXMidqKitha2s+cGpwSmpLY1k8P3FZX3FMTz85JnFMLnM7OjVWKyQ9MjhwIVNlJTRMQiFvOUI0VEM3SHMoY3A7SipMLiJhO1VYSGVAPzgvc1cvRS40dDYqQUhzIVZqK3BsKlc8ZDBzL1tXPiJvRzEuSVNORnVKNWckQVtiJmhbJz89bS4yNl5yNHBvV0V0O3IwcWhMWC1LRTImW0tELCJcIUtHI0YwZ2lnO2JVJiQzUSw2Z0ZDZz9RVm5YJWNaMmpmUTdlOUo2U0ldbjtTRSMpO1U0XzAnKG5gZThEVzVNNFpzOSVHcXA7OW5HNWY/KXJQNiQwSUJdXlNEaUtPImQrMWRsQCU9WiJQYl0vUDpKaGVDdSY1UEtRME5MVm8sU2tcZCNjSTUzXytDaVBNPWVnOEM3PDJxa2QlaWU6MUg3N2JBVE5IXSUpXC1SLWY0R04pK3A7X2A0KGtBKyUoLWA2TEJwUmBvN2NgSE9QSmZSRSZpOzlWMDNwNF43MSFtMXJxKj51RmE5JFFIUmhoc1tqcyNcOG05aWFnMk0pQ1InNXUtZkNKQFhvRiY3LmcqZlI0LyM4VihlVVEmdV5SXks0RD83MkMzV1JnUy8rKkctamtnQzxtN0szV1otW1NRZydDVDtZKEA7bFc1L2Y9RCFBPUMwXShvKiVoSkdHcHE4ZjoqaVY2XDteQj8xP14qaCc7KzUyPUVhdGVtS08rPTw1TykqXHMhUUs5LTExYm1kRGhia1ZVVzNeRnQ7TlpZP004PU82KDA8RTpqYG5ILldUfj5lbmRzdHJlYW0KZW5kb2JqCnhyZWYKMCAxMQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwNjEgMDAwMDAgbiAKMDAwMDAwMDEyMiAwMDAwMCBuIAowMDAwMDAwMjI5IDAwMDAwIG4gCjAwMDAwMDAzNDEgMDAwMDAgbiAKMDAwMDAwMDQ0NiAwMDAwMCBuIAowMDAwMDAwNTI5IDAwMDAwIG4gCjAwMDAwMDA3MzMgMDAwMDAgbiAKMDAwMDAwMDgwMSAwMDAwMCBuIAowMDAwMDAxMTAwIDAwMDAwIG4gCjAwMDAwMDExNTkgMDAwMDAgbiAKdHJhaWxlcgo8PAovSUQgCls8OGZkYzJjODRiMjExM2U4MWI2NDY3YjA5ZjEwOTk5Mjg+PDhmZGMyYzg0YjIxMTNlODFiNjQ2N2IwOWYxMDk5OTI4Pl0KJSBSZXBvcnRMYWIgZ2VuZXJhdGVkIFBERiBkb2N1bWVudCAtLSBkaWdlc3QgKG9wZW5zb3VyY2UpCgovSW5mbyA4IDAgUgovUm9vdCA3IDAgUgovU2l6ZSAxMQo+PgpzdGFydHhyZWYKMjMzMgolJUVPRgo=","Java Programming":"JVBERi0xLjQKJZOMi54gUmVwb3J0TGFiIEdlbmVyYXRlZCBQREYgZG9jdW1lbnQgKG9wZW5zb3VyY2UpCjEgMCBvYmoKPDwKL0YxIDIgMCBSIC9GMiAzIDAgUiAvRjMgNCAwIFIgL0Y0IDUgMCBSCj4+CmVuZG9iagoyIDAgb2JqCjw8Ci9CYXNlRm9udCAvSGVsdmV0aWNhIC9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nIC9OYW1lIC9GMSAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL0Jhc2VGb250IC9IZWx2ZXRpY2EtQm9sZCAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvTmFtZSAvRjIgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iago0IDAgb2JqCjw8Ci9CYXNlRm9udCAvQ291cmllciAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvTmFtZSAvRjMgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iago1IDAgb2JqCjw8Ci9CYXNlRm9udCAvWmFwZkRpbmdiYXRzIC9OYW1lIC9GNCAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjYgMCBvYmoKPDwKL0NvbnRlbnRzIDEwIDAgUiAvTWVkaWFCb3ggWyAwIDAgNTk1LjI3NTYgODQxLjg4OTggXSAvUGFyZW50IDkgMCBSIC9SZXNvdXJjZXMgPDwKL0ZvbnQgMSAwIFIgL1Byb2NTZXQgWyAvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJIF0KPj4gL1JvdGF0ZSAwIC9UcmFucyA8PAoKPj4gCiAgL1R5cGUgL1BhZ2UKPj4KZW5kb2JqCjcgMCBvYmoKPDwKL1BhZ2VNb2RlIC9Vc2VOb25lIC9QYWdlcyA5IDAgUiAvVHlwZSAvQ2F0YWxvZwo+PgplbmRvYmoKOCAwIG9iago8PAovQXV0aG9yIChMaWdodCB3aXRoIGtub3dsZWRnZSBMTVMpIC9DcmVhdGlvbkRhdGUgKEQ6MjAyNjA5MjQxNzU4NDUrMDAnMDAnKSAvQ3JlYXRvciAoXCh1bnNwZWNpZmllZFwpKSAvS2V5d29yZHMgKCkgL01vZERhdGUgKEQ6MjAyNjA5MjQxNzU4NDUrMDAnMDAnKSAvUHJvZHVjZXIgKFJlcG9ydExhYiBQREYgTGlicmFyeSAtIFwob3BlbnNvdXJjZVwpKSAKICAvU3ViamVjdCAoXCh1bnNwZWNpZmllZFwpKSAvVGl0bGUgKEphdmEgUHJvZ3JhbW1pbmcpIC9UcmFwcGVkIC9GYWxzZQo+PgplbmRvYmoKOSAwIG9iago8PAovQ291bnQgMSAvS2lkcyBbIDYgMCBSIF0gL1R5cGUgL1BhZ2VzCj4+CmVuZG9iagoxMCAwIG9iago8PAovRmlsdGVyIFsgL0FTQ0lJODVEZWNvZGUgL0ZsYXRlRGVjb2RlIF0gL0xlbmd0aCAxMTAwCj4+CnN0cmVhbQpHYXVJNTk1aVFFJkJGODgnU0RwPVkrbk9uPzpOPThoI3JZO10/TVw6RD4kNGZBIipvckMuWyxjVVpjcForVmdvVE9pRCw7J0VXKTZXMHVQVXJfcyJEKktnQFJDT2wuWDM1OkNwTUlBUSQtal5OUjo+ZlQtb14+WkxZVk9JVTBIT2dcakNvTUg9VmZEM29KbEsocCM6Y1k3I3NmOVIrPmUlTCxhL1dqLGwsNiVIQVNVTWpVKTMubGIoS0NCaUJvL01zTUQvZjFFPnI9JS42RTsnNWtLKHQ3YVZhMDdTIXRxRDwxbm9wLHMqXzhRN0FFczArKUM1akBXRT9JRyViQm5kS1xbXVksWClPV0BTc3RNdC5pN0knTCZfaUg+UCU7SmNQOyRcWlhCZ01jPDVnJWRASzxvYUwsUi1caTFBTmttQyIkTiVwZHVxIT9DQSZOPGJMYVxQQS1JcylGQigncylYIiVyUTNicCRuKD00X2t1I2cqQD0vQz0xVy5DIkRRJ1dBaCN1dFBHc1peTSJcUUhZVER0ciZKIjBtJT5SWzg+YlNXLz1XIzpwdVVLc203ISxKR2xSZ0Y7UmRDZVRvNCgsUEI2XStpcVJUWkthWV9NKkU7X2hEJUMqaGU5VzZKYThDIzVUcVQkSV84VDsrKSIhKDIwOy9kRigzSDJzRVwoWy5Xc2U2LixBUFxQTXRTZ0gsWEwvNEdFSF5LayRoJCloRW5fNFlLUD5YdF5vcjwsUSo8PmFyQ1dvQyliRVglSVFWNWlgMSxmZW87TyNoYjhpS0NcbEdMOVZrYlhqPk9cPi03YnFccV1QSitPQGBZdDhBKHI+XlFUbjluWC4iUSJlQiE7PihAWVc9WmAoNz5QZzc+T0gmTDg1SDlnJkszMEM9XGA3cW9SME8jYU1gY0EkJGxsYk90V28tL2JhSXJbMWMwJldoKG9MMiVjKElLI0s4SDwydWBuVG1yJTVTWFEyTGVLcy1cT0w1VS5zVyIoY1o1MTFXaTY9MDQrV2BSX0YjUSNDTFEtW0Y4SShDNCtkTGxQSkUjKzVgWCsoVTJEIUpcLU1YbTVzaDFnS1AzJk4yNlQ/WVpBRi1DOjpKPnBIUUljX0RqVXQ6S3E+NiViL1cqVWk9YGg+KDZCMiRESEFwSUtQRUdHX0Epa0A7Qz0+RzhkaEoqVCIhc1ZwRXM9LlVIMiRLXmZcdUhiaUY7M0peMGdnP189TkUuNDVBOklhKmw6USxfOytLTUctSVNOTE9YOz9YJC4+OGs7UkwnI0lwMXIiVzQrRHNjcj1uc01hV3U6Vy4jSDspRCpjRXAmLmJgLDdRMy0laDo+KmoyM0pVKzRxVCc4P1BTLTRVaXNkSzNfZjA1P1ZzJ01bbydJLjNDQFNMXGFNbS1CPjpOYmVzc19nW0FNM0dka2Q5QzhEODZUS3JuTlUuLmlwXmVOUHU1cj09MU9mWS5+PmVuZHN0cmVhbQplbmRvYmoKeHJlZgowIDExCjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDA2MSAwMDAwMCBuIAowMDAwMDAwMTIyIDAwMDAwIG4gCjAwMDAwMDAyMjkgMDAwMDAgbiAKMDAwMDAwMDM0MSAwMDAwMCBuIAowMDAwMDAwNDQ2IDAwMDAwIG4gCjAwMDAwMDA1MjkgMDAwMDAgbiAKMDAwMDAwMDczMyAwMDAwMCBuIAowMDAwMDAwODAxIDAwMDAwIG4gCjAwMDAwMDEwOTUgMDAwMDAgbiAKMDAwMDAwMTE1NCAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9JRCAKWzwwMzU1NDk3ZmQ4ZGYyMGQ3OWFmMmQ5MmIwMmVkNmRjMz48MDM1NTQ5N2ZkOGRmMjBkNzlhZjJkOTJiMDJlZDZkYzM+XQolIFJlcG9ydExhYiBnZW5lcmF0ZWQgUERGIGRvY3VtZW50IC0tIGRpZ2VzdCAob3BlbnNvdXJjZSkKCi9JbmZvIDggMCBSCi9Sb290IDcgMCBSCi9TaXplIDExCj4+CnN0YXJ0eHJlZgoyMzQ2CiUlRU9GCg==","SQL Database":"JVBERi0xLjQKJZOMi54gUmVwb3J0TGFiIEdlbmVyYXRlZCBQREYgZG9jdW1lbnQgKG9wZW5zb3VyY2UpCjEgMCBvYmoKPDwKL0YxIDIgMCBSIC9GMiAzIDAgUiAvRjMgNCAwIFIgL0Y0IDUgMCBSCj4+CmVuZG9iagoyIDAgb2JqCjw8Ci9CYXNlRm9udCAvSGVsdmV0aWNhIC9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nIC9OYW1lIC9GMSAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL0Jhc2VGb250IC9IZWx2ZXRpY2EtQm9sZCAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvTmFtZSAvRjIgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iago0IDAgb2JqCjw8Ci9CYXNlRm9udCAvQ291cmllciAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvTmFtZSAvRjMgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iago1IDAgb2JqCjw8Ci9CYXNlRm9udCAvWmFwZkRpbmdiYXRzIC9OYW1lIC9GNCAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjYgMCBvYmoKPDwKL0NvbnRlbnRzIDEwIDAgUiAvTWVkaWFCb3ggWyAwIDAgNTk1LjI3NTYgODQxLjg4OTggXSAvUGFyZW50IDkgMCBSIC9SZXNvdXJjZXMgPDwKL0ZvbnQgMSAwIFIgL1Byb2NTZXQgWyAvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJIF0KPj4gL1JvdGF0ZSAwIC9UcmFucyA8PAoKPj4gCiAgL1R5cGUgL1BhZ2UKPj4KZW5kb2JqCjcgMCBvYmoKPDwKL1BhZ2VNb2RlIC9Vc2VOb25lIC9QYWdlcyA5IDAgUiAvVHlwZSAvQ2F0YWxvZwo+PgplbmRvYmoKOCAwIG9iago8PAovQXV0aG9yIChMaWdodCB3aXRoIGtub3dsZWRnZSBMTVMpIC9DcmVhdGlvbkRhdGUgKEQ6MjAyNjA5MjQxNzU4NDUrMDAnMDAnKSAvQ3JlYXRvciAoXCh1bnNwZWNpZmllZFwpKSAvS2V5d29yZHMgKCkgL01vZERhdGUgKEQ6MjAyNjA5MjQxNzU4NDUrMDAnMDAnKSAvUHJvZHVjZXIgKFJlcG9ydExhYiBQREYgTGlicmFyeSAtIFwob3BlbnNvdXJjZVwpKSAKICAvU3ViamVjdCAoXCh1bnNwZWNpZmllZFwpKSAvVGl0bGUgKFNRTCBEYXRhYmFzZSkgL1RyYXBwZWQgL0ZhbHNlCj4+CmVuZG9iago5IDAgb2JqCjw8Ci9Db3VudCAxIC9LaWRzIFsgNiAwIFIgXSAvVHlwZSAvUGFnZXMKPj4KZW5kb2JqCjEwIDAgb2JqCjw8Ci9GaWx0ZXIgWyAvQVNDSUk4NURlY29kZSAvRmxhdGVEZWNvZGUgXSAvTGVuZ3RoIDEwNTcKPj4Kc3RyZWFtCkdhdUhKbXItb04mSC8zOEBRcD5yNmxeUGpLQCwqPl5lKE8jT2F0cDA4V2NhZShyMi1hVjxdRmxycTJnZmBzSkdSbktrKXMtLzdhbkJBUyIsRy5cbStGRW1MQT1UWSpARS1nSm9gdXBlJChIO0ZANGMjO3NZPUlJMFJwamNjUkdWRSEkcHVDVzFkKFZwVkhsOWNrIXAtJUhPOlpYWkQ8IVo9QzszOVEzbGAuL1ZmI1xVXFNGLVtJSkFNM2FEODxUJlUmSF4tSF1JLVNPQCMhN3U+KiMoZV5WNVdHSidbOmxkb2gxdCksWV9dMmlHcW9iYzBkZ002JmxyNT48SzhjYWxmZi9oO0leM0c/RidzT0ZNPywrOGJFL1FMInAydVNLbWUnaihJUi9pcXNeQCxBSjpMMC4/TWIpSEspUyEzUHBVLyE1XUxhTGEpYmRITGFBaidpP0dgRyUwZikoOyNLNjg6YjsjJ2wnbTJkZSpMbzV1YDNiZF5FRVRXRF0+aUxLKXFVZTRbWypSPHInOlhzTDE0azInaVI7RnFzSVs9SkwjOjI8TlQjYmBdJ1FnWlpsJnIpIWd1RlxpMVQ8KCEkVGtYZCQpczRROT49XWwnbF5iUClxREsqVVk7LzcpL1RqMiRDX2JtblUhUkFFQSkyV0Zuazk0NEdyR1kqLUw2UVNHdWxNOjNXNE0jQTEhZm08OTVFIikxJG5XX2ZaS2ZfKjsyYCFhMCZvTG5DRTQuRlAyY0U1SV8jQ01dNlcwMzFTZ0RLPjpjJSo8YUR1K1Q5cWc7UCViTCxoQWFzdXJPbHVSQWlCYSpdMSM0Xm9hKExKSFdDIk9GRzdNYEFmQzUlKmQ7UmZXUS9EMUFVKVhoaTkjQk9ETzheWVRmZ1JPXU0kNFldQSlaKzNDO045MFo8YDNZbGUkITw3WyMtKDBzL2Q9JWxEW0xzaHRWNVdpU2U8cmpSOVBRPGw4Y0QhVU8vQl1gOGhhOE9XLHAlVihWczk6KmA5bStCPjYhVHVDbCNbJSZMOlZfNSxMU3RkU2Z0Pjo1SEJkbkBfM1w3V04tLz5kXkFTJUVqJjQ7bDBMTVJYMGNLYGRLcCNUSUhvWStkRSZaWUZDcTNIOTY6KiVAXCxXTlA6P11CcCZkW2suOkA+R0ZZQCglcjc7ay1Ja3NfZ3BlWTwjVmlhRVpJVDdVQWxhW0xdYlEvOyRdTFJlM2IjJDtfYFc7dFxUQCtZRF1HJ2glL0QkZCInPUUxMCdjN0ZmQlcwVytMYj5DRXFJQkc4MkI9XC1IKDs2SWpyXTo+NCtPcWMlcVMyKD9DaU91bzdTW2ZKQjxPVmluR0whLUhKNmFFP2FiNU5FPEUvKDw0YjsyLlE3RGUkYSpuZ2Ywaz5kOmNSOSQlUyZfYF04RV5Mfj5lbmRzdHJlYW0KZW5kb2JqCnhyZWYKMCAxMQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwNjEgMDAwMDAgbiAKMDAwMDAwMDEyMiAwMDAwMCBuIAowMDAwMDAwMjI5IDAwMDAwIG4gCjAwMDAwMDAzNDEgMDAwMDAgbiAKMDAwMDAwMDQ0NiAwMDAwMCBuIAowMDAwMDAwNTI5IDAwMDAwIG4gCjAwMDAwMDA3MzMgMDAwMDAgbiAKMDAwMDAwMDgwMSAwMDAwMCBuIAowMDAwMDAxMDkxIDAwMDAwIG4gCjAwMDAwMDExNTAgMDAwMDAgbiAKdHJhaWxlcgo8PAovSUQgCls8MzUzOWVjNzk5ZDU5ZTliYWQ0MDZmYjdkMmUzYzU2NjU+PDM1MzllYzc5OWQ1OWU5YmFkNDA2ZmI3ZDJlM2M1NjY1Pl0KJSBSZXBvcnRMYWIgZ2VuZXJhdGVkIFBERiBkb2N1bWVudCAtLSBkaWdlc3QgKG9wZW5zb3VyY2UpCgovSW5mbyA4IDAgUgovUm9vdCA3IDAgUgovU2l6ZSAxMQo+PgpzdGFydHhyZWYKMjI5OQolJUVPRgo="};

function openCoursePDF(){
const data=coursePdfData[currentCourse];
if(!data){showToast("PDF material not available.");return;}
const win=window.open();
if(!win){showToast("Please allow pop-ups to open the PDF.");return;}
win.document.write('<title>'+escapeHtml(currentCourse)+' - PDF Notes</title><iframe src="data:application/pdf;base64,'+data+'" style="width:100%;height:100%;border:0"></iframe>');
win.document.close();
markMaterialViewed(currentCourse,"builtin_pdf");
showToast("📄 PDF notes opened");
}

function getUploadedMaterials(){
try{return JSON.parse(localStorage.getItem("svUploadedMaterials")||"[]");}catch(e){return [];}
}
function saveUploadedMaterials(items){localStorage.setItem("svUploadedMaterials",JSON.stringify(items));}

function uploadPDFMaterials(event){
const files=Array.from(event.target.files||[]);
if(!files.length)return;
const course=currentCourse;
let uploaded=getUploadedMaterials();
let pending=files.length;
files.forEach(file=>{
if(file.type!=="application/pdf" && !file.name.toLowerCase().endsWith(".pdf")){pending--;return;}
const reader=new FileReader();
reader.onload=()=>{
uploaded.push({id:Date.now()+"_"+Math.random().toString(36).slice(2),course,name:file.name,data:reader.result});
pending--;
if(pending===0){
saveUploadedMaterials(uploaded);
renderMaterials();
showToast("📄 PDF material uploaded successfully!");
document.getElementById("pdfUpload").value="";
}
};
reader.readAsDataURL(file);
});
}

function openUploadedPDF(id){
const item=getUploadedMaterials().find(x=>x.id===id);
if(!item)return;
const win=window.open();
if(!win){showToast("Please allow pop-ups to open the PDF.");return;}
win.document.write('<title>'+escapeHtml(item.name)+'</title><iframe src="'+item.data+'" style="width:100%;height:100%;border:0"></iframe>');
win.document.close();
markMaterialViewed(currentCourse,"upload_"+id);
}

function deleteUploadedPDF(id){
const updated=getUploadedMaterials().filter(x=>x.id!==id);
saveUploadedMaterials(updated);
renderMaterials();
showToast("PDF material removed.");
}

function renderMaterials(){
const title=document.getElementById("materialsCourseTitle");
const grid=document.getElementById("materialsGrid");
if(!title||!grid)return;
title.innerText=currentCourse+" — Materials";
const items=courseMaterials[currentCourse]||[];
const builtIn=`<div class="material-card">
<div class="material-icon">📄</div>
<h3>Official Course Study Notes</h3>
<p>Real PDF study notes prepared for ${escapeHtml(currentCourse)} with the main topics from this LMS course.</p>
<div class="material-actions"><button class="btn primary" onclick="openCoursePDF()">📄 Open PDF</button></div>
<div class="pdf-badge">PDF • Ready to open</div>
</div>`;
const cards=items.map((m,i)=>`
<div class="material-card">
<div class="material-icon">${m[0]}</div>
<h3>${m[1]}</h3>
<p>${m[2]}</p>
<div class="material-actions">
<button class="btn secondary" onclick="openMaterial(${i})">${m[3]}</button>
</div>
<div class="material-status" id="materialStatus${i}">✓ Available</div>
</div>`).join("");
const uploaded=getUploadedMaterials().filter(x=>x.course===currentCourse);
const uploadCards=uploaded.map(x=>`
<div class="material-card uploaded-material">
<div class="material-icon">📎</div>
<h3>${escapeHtml(x.name)}</h3>
<p>Your uploaded PDF material for ${escapeHtml(currentCourse)}.</p>
<div class="material-actions">
<button class="btn primary" onclick="openUploadedPDF('${x.id}')">📄 Open PDF</button>
<button class="btn secondary" onclick="deleteUploadedPDF('${x.id}')">Delete</button>
</div>
<div class="pdf-badge">Uploaded PDF</div>
</div>`).join("");
grid.innerHTML=builtIn+cards+uploadCards;
}
function openMaterial(index){
const item=(courseMaterials[currentCourse]||[])[index];
if(!item)return;
markMaterialViewed(currentCourse,"course_"+index);
showToast("📂 "+item[1]+" opened");
const status=document.getElementById("materialStatus"+index);
if(status)status.innerText="✓ Opened successfully";
}

/* ================= QUIZ ================= */
const questions=[
{q:"Which keyword declares a variable in JavaScript?",a:["print","let","define","integer"],c:1},
{q:"Which symbol is used for a single-line comment?",a:["//","&&","#","**"],c:0},
{q:"Which method prints output to the browser console?",a:["console.log()","print()","display()","write.console()"],c:0},
{q:"Which data type represents true or false?",a:["String","Number","Boolean","Array"],c:2},
{q:"Which operator checks strict equality?",a:["=","==","===","!="],c:2},
{q:"Which keyword creates a constant?",a:["constant","fixed","const","static"],c:2},
{q:"Which method adds an item to the end of an array?",a:["push()","add()","insert()","append()"],c:0},
{q:"Which loop repeats while a condition is true?",a:["if","while","switch","case"],c:1},
{q:"Which object represents the webpage document?",a:["WEB","PAGE","DOM","document"],c:3},
{q:"Which method converts JSON text into a JavaScript object?",a:["JSON.parse()","JSON.object()","JSON.convert()","JSON.read()"],c:0}
];
let currentQuestion=0,quizAnswers=new Array(questions.length).fill(null),quizSubmitted=false;
function loadQuestion(){
const q=questions[currentQuestion];
document.getElementById("questionNumber").innerText=`Question ${currentQuestion+1} of ${questions.length}`;
document.getElementById("questionText").innerText=q.q;
document.getElementById("options").innerHTML=q.a.map((x,i)=>`<button class="option ${quizAnswers[currentQuestion]===i?"selected":""}" onclick="selectAnswer(${i})">${x}</button>`).join("");
}
function selectAnswer(i){if(quizSubmitted)return;quizAnswers[currentQuestion]=i;loadQuestion()}
function nextQuestion(){if(quizSubmitted)return;if(currentQuestion<questions.length-1){currentQuestion++;loadQuestion()}else{showToast("You are on the last question. Click Submit Quiz.")}}
function previousQuestion(){if(quizSubmitted)return;if(currentQuestion>0){currentQuestion--;loadQuestion()}}
function finishQuiz(){
if(quizSubmitted)return;
const unanswered=quizAnswers.filter(x=>x===null).length;
if(unanswered>0){showToast(`Please answer all ${questions.length} questions before submitting.`);return;}
quizSubmitted=true;
const score=questions.reduce((sum,q,i)=>sum+(quizAnswers[i]===q.c?1:0),0);
const scoreBox=document.getElementById("quizScore");
scoreBox.style.display="block";
scoreBox.innerHTML=`<h2>🎉 Quiz Submitted</h2><p><strong>Score: ${score}/${questions.length}</strong></p><p>You got ${score} correct and ${questions.length-score} incorrect.</p>`;
const review=document.getElementById("quizReview");
review.style.display="block";
review.innerHTML='<h3 style="margin-top:22px">📋 Correct Answers</h3>'+questions.map((q,i)=>{
const chosen=quizAnswers[i];const ok=chosen===q.c;
return `<div class="answer-review ${ok?'correct':'wrong'}"><strong>Q${i+1}. ${q.q}</strong><div>Your answer: ${q.a[chosen]}</div><small>Correct answer: <strong>${q.a[q.c]}</strong> ${ok?'✓ Correct':'✗ Incorrect'}</small></div>`;
}).join("");
document.querySelectorAll("#options .option").forEach(b=>b.disabled=true);
showToast(`Quiz submitted: ${score}/${questions.length}`);
const activeName=localStorage.getItem("svUserName"),activeEmail=localStorage.getItem("svUserEmail");
if(activeName&&activeEmail){
let students=getStudents();
const idx=students.findIndex(x=>(x.email||"").toLowerCase()===activeEmail.toLowerCase());
if(idx>=0){students[idx].course=currentCourse;students[idx].progress=100;students[idx].status="Completed";students[idx].lastLogin=Date.now();saveStudents(students);renderRecentStudents();}
}
}

/* ================= CERTIFICATE / PROFILE ================= */
function printCertificate(){showToast("Opening certificate for printing...");setTimeout(()=>window.print(),500)}
function editProfile(){
const oldName=localStorage.getItem("svUserName")||document.getElementById("profileName").innerText||"Student";
const oldEmail=localStorage.getItem("svUserEmail")||document.getElementById("profileEmail").innerText||"";
const name=prompt("Enter your name:",oldName);
if(name===null)return;
const cleanName=name.trim();
if(!cleanName){showToast("Please enter a valid name.");return;}
const email=prompt("Enter your email:",oldEmail);
if(email===null)return;
const cleanEmail=email.trim().toLowerCase();
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)){showToast("Please enter a valid email.");return;}
const accounts=getAccounts();
const oldKey=oldEmail.toLowerCase();
if(cleanEmail!==oldKey && accounts.some(a=>(a.email||"").toLowerCase()===cleanEmail)){
showToast("That email is already registered.");return;
}
const accountIndex=accounts.findIndex(a=>(a.email||"").toLowerCase()===oldKey);
if(accountIndex>=0){accounts[accountIndex].name=cleanName;accounts[accountIndex].email=cleanEmail;saveAccounts(accounts);}
if(cleanEmail!==oldKey){
const oldProgress=getUserProgress(oldEmail); if(Object.keys(oldProgress).length) localStorage.setItem(progressKey(cleanEmail),JSON.stringify(oldProgress));
localStorage.removeItem(progressKey(oldEmail));
}
let students=getStudents();
const si=students.findIndex(x=>(x.email||"").toLowerCase()===oldKey);
if(si>=0){students[si].name=cleanName;students[si].email=cleanEmail;saveStudents(students);}
localStorage.setItem("svUserName",cleanName);localStorage.setItem("svUserEmail",cleanEmail);
setUser(cleanName,cleanEmail);loadUserProgress(cleanEmail);refreshProgressUI();renderRecentStudents();
showToast("Profile updated successfully!");
}
function editEmail(){
const oldEmail=localStorage.getItem("svUserEmail")||document.getElementById("profileEmail").innerText||"";
const cleanEmail=(prompt("Enter your new email:",oldEmail)||"").trim().toLowerCase();
if(!cleanEmail)return;
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)){showToast("Please enter a valid email.");return;}
const oldKey=oldEmail.toLowerCase();
const accounts=getAccounts();
if(cleanEmail!==oldKey && accounts.some(a=>(a.email||"").toLowerCase()===cleanEmail)){showToast("That email is already registered.");return;}
const ai=accounts.findIndex(a=>(a.email||"").toLowerCase()===oldKey);
if(ai>=0){accounts[ai].email=cleanEmail;saveAccounts(accounts);}
const oldProgress=getUserProgress(oldEmail); if(Object.keys(oldProgress).length) localStorage.setItem(progressKey(cleanEmail),JSON.stringify(oldProgress));
if(cleanEmail!==oldKey)localStorage.removeItem(progressKey(oldEmail));
let students=getStudents();const si=students.findIndex(x=>(x.email||"").toLowerCase()===oldKey);
if(si>=0){students[si].email=cleanEmail;saveStudents(students);}
localStorage.setItem("svUserEmail",cleanEmail);const name=localStorage.getItem("svUserName")||"Student";
setUser(name,cleanEmail);loadUserProgress(cleanEmail);refreshProgressUI();renderRecentStudents();showToast("Email updated successfully!");
}
function notificationClick(m){showToast("🔔 "+m)}
function addCourse(){const c=prompt("Enter new course name:");if(c)showToast("Course '"+c+"' added successfully!")}

/* ================= DARK MODE / AI ================= */
function toggleDark(){document.body.classList.toggle("dark");localStorage.setItem("svDark",document.body.classList.contains("dark"))}
function toggleAI(){const w=document.getElementById("aiWindow");w.style.display=w.style.display==="block"?"none":"block"}
function clearAI(){
const body=document.getElementById("aiBody");
const input=document.getElementById("aiInput");
body.innerHTML='<p><strong>AI:</strong> Hello! 👋 Ask me about HTML, CSS, JavaScript, Python, SQL or AI.</p>';
input.value="";
input.focus();
showToast("AI Assistant chat cleared.");
}
function sendAI(){
const input=document.getElementById("aiInput"),q=input.value.trim();if(!q)return;
const body=document.getElementById("aiBody");body.innerHTML+=`<p><strong>You:</strong> ${escapeHtml(q)}</p>`;
const l=q.toLowerCase();let a=l.includes("html")?"HTML creates the structure of a webpage.":l.includes("css")?"CSS controls webpage design and layout.":l.includes("javascript")?"JavaScript adds logic and interactivity to webpages.":l.includes("python")?"Python is a programming language used for software, automation, data and AI.":l.includes("ai")?"AI enables computer systems to perform tasks that normally require human intelligence.":"Ask me about HTML, CSS, JavaScript, Python, SQL or AI.";
body.innerHTML+=`<p><strong>AI:</strong> ${a}</p>`;input.value="";body.scrollTop=body.scrollHeight;
}
function escapeHtml(s){const d=document.createElement("div");d.textContent=s;return d.innerHTML}
function showToast(message){const t=document.getElementById("toast");t.innerText=message;t.style.display="block";clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.style.display="none",2500)}

/* ================= STARTUP ================= */
window.onload=function(){
renderCourses();loadQuestion();
migrateLegacyAccount(); renderRecentStudents();
const name=localStorage.getItem("svUserName"),email=localStorage.getItem("svUserEmail");
if(name)setUser(name,email);else setUser("Seshagiri","student@seshuvidhyavanth.com");
if(localStorage.getItem("svDark")==="true")document.body.classList.add("dark");
const activeEmail=localStorage.getItem("svUserEmail");
if(activeEmail){loadUserProgress(activeEmail);}else{courseProgress={};progress=0;}
renderCourses();
renderLessons();selectLesson(0);refreshProgressUI();renderMaterials();
};
