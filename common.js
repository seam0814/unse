(function(){
  var ROOT=window.SITE_ROOT||"./";
  var GA_ID="",CLARITY_ID="";
  if(GA_ID){var gs=document.createElement("script");gs.async=true;gs.src="https://www.googletagmanager.com/gtag/js?id="+GA_ID;document.head.appendChild(gs);
    window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag("js",new Date());gtag("config",GA_ID);}
  if(CLARITY_ID){(function(c,l,a,r,i){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};var t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;var y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script",CLARITY_ID);}
  window.track=function(n,p){try{if(window.gtag)gtag("event",n,p||{})}catch(e){}try{if(window.clarity)clarity("event",n)}catch(e){}};
  window.store={get:function(k,d){try{var v=localStorage.getItem("unse_"+k);return v===null?d:v}catch(e){return d}},set:function(k,v){try{localStorage.setItem("unse_"+k,v)}catch(e){}}};
  /* "기운 모으는 중" 연출 후 결과 공개 */
  window.reveal=function(el,msg){
    var box=document.createElement("div");box.className="divining";
    box.innerHTML='<div class="orb"></div><p>'+(msg||"기운을 모으는 중…")+'</p>';
    el.parentNode.insertBefore(box,el);
    setTimeout(function(){if(box.parentNode)box.remove();el.classList.add("show");
      try{el.scrollIntoView({behavior:"smooth",block:"nearest"})}catch(e){}},1400);
  };
  var TOOLS=[
    {path:"saju/",     ic:"🔮", title:"사주팔자",   desc:"생년월일시로 내 사주 풀이", cat:"운세", pop:true},
    {path:"today/",    ic:"🌙", title:"오늘의 운세", desc:"매일 바뀌는 오늘 운세",    cat:"운세", pop:true},
    {path:"gunghap/",  ic:"💘", title:"궁합",       desc:"두 사람 사주 궁합 점수",   cat:"운세", pop:true},
    {path:"gwansang/", ic:"👀", title:"관상 (재미)", desc:"사진으로 보는 재미 관상",  cat:"재미"}
  ];
  window.TOOLS=TOOLS;
  window.SITE_NAME='달빛<span>운세</span>';
  function h(s){var d=document.createElement("div");d.innerHTML=s.trim();return d.firstChild}
  var head=document.getElementById("site-header");
  if(head){head.className="sitehead";head.appendChild(h('<a class="brand" href="'+ROOT+'">'+window.SITE_NAME+'</a>'));head.appendChild(h('<a class="home" href="'+ROOT+'">← 전체 운세</a>'));
    var trust=h('<div class="trustbar"><span>🆓 무료·무설치</span><span>🔒 생일·사진 업로드 안 함</span><span>🎯 절기 기준 정확 계산</span></div>');
    head.parentNode.insertBefore(trust,head.nextSibling);}
  var foot=document.getElementById("site-footer");
  if(foot){foot.className="sitefoot";var links=TOOLS.map(function(t){return '<a href="'+ROOT+t.path+'">'+t.title+'</a>'}).join("");
    foot.appendChild(h('<div class="fnav">'+links+'</div>'));
    foot.appendChild(h('<div>본 콘텐츠는 재미를 위한 것으로 실제 근거가 없습니다 · 입력·사진은 서버로 전송되지 않습니다 · <a href="'+ROOT+'privacy.html">개인정보처리방침</a></div>'))}
  var grid=document.getElementById("tools");
  if(grid){function card(t){return '<a class="toolcard" href="'+ROOT+t.path+'">'+(t.pop?'<span class="pop">인기</span>':'')+'<span class="ic">'+t.ic+'</span><b>'+t.title+'</b><small>'+t.desc+'</small></a>'}
    var g=h('<div class="grid"></div>');TOOLS.forEach(function(t){g.appendChild(h(card(t)))});grid.appendChild(g)}

  /* ===== 후기판·조회수 (Firebase) — 집에서 config 넣으면 자동 활성화 ===== */
  var FIREBASE_CONFIG={}; // 여기에 firebaseConfig 객체 붙여넣기 (apiKey, projectId 등)
  var revEl=document.getElementById("reviews");
  if(revEl && FIREBASE_CONFIG.apiKey){
    var s1=document.createElement("script");s1.src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js";
    s1.onload=function(){var s2=document.createElement("script");s2.src="https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js";
      s2.onload=function(){try{firebase.initializeApp(FIREBASE_CONFIG);board(firebase.firestore(),revEl)}catch(e){}};document.head.appendChild(s2)};
    document.head.appendChild(s1);
  }
  function esc(t){return String(t).replace(/[<>&]/g,function(c){return{"<":"&lt;",">":"&gt;","&":"&amp;"}[c]})}
  function board(db,el){
    el.innerHTML='<div class="board"><h3>💬 방문자 후기</h3><div class="views" id="bViews"></div>'
      +'<form id="bForm"><div class="brow"><input id="bName" maxlength="20" placeholder="닉네임(선택)"><select id="bRate"><option value="5">★★★★★</option><option value="4">★★★★</option><option value="3">★★★</option><option value="2">★★</option><option value="1">★</option></select></div>'
      +'<textarea id="bText" maxlength="200" placeholder="한 줄 후기를 남겨보세요"></textarea><button class="btn" type="submit">후기 남기기</button></form><div id="bList"></div></div>';
    var inc=firebase.firestore.FieldValue.increment(1),vref=db.collection("stats").doc("global");
    vref.set({count:inc},{merge:true}).then(function(){return vref.get()}).then(function(d){
      var n=(d.exists&&d.data().count)||0;document.getElementById("bViews").textContent="지금까지 "+n.toLocaleString()+"번 이용됐어요";}).catch(function(){});
    function load(){db.collection("reviews").orderBy("createdAt","desc").limit(20).get().then(function(q){
      var html="";q.forEach(function(doc){var r=doc.data();html+='<div class="rev"><div class="rh"><b>'+esc(r.name||"익명")+'</b><span>'+Array(( r.rating||5)+1).join("★")+'</span></div><p>'+esc(r.text)+'</p></div>'});
      document.getElementById("bList").innerHTML=html||'<p class="disc">첫 후기를 남겨보세요!</p>';}).catch(function(){});}
    load();
    document.getElementById("bForm").addEventListener("submit",function(e){e.preventDefault();
      var t=(document.getElementById("bText").value||"").trim();if(!t)return;
      db.collection("reviews").add({name:(document.getElementById("bName").value||"").trim().slice(0,20),rating:parseInt(document.getElementById("bRate").value),text:t.slice(0,200),createdAt:firebase.firestore.FieldValue.serverTimestamp()})
        .then(function(){document.getElementById("bText").value="";track("review_post");load();}).catch(function(){alert("잠시 후 다시 시도해주세요.")});
    });
  }
})();
