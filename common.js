(function(){
  var ROOT=window.SITE_ROOT||"./";
  (function(){var l=document.createElement("link");l.rel="stylesheet";
    l.href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Noto+Serif+KR:wght@500;700&display=swap";
    document.head.appendChild(l);})();
  var GA_ID="",CLARITY_ID="";
  if(GA_ID){var gs=document.createElement("script");gs.async=true;gs.src="https://www.googletagmanager.com/gtag/js?id="+GA_ID;document.head.appendChild(gs);
    window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag("js",new Date());gtag("config",GA_ID);}
  if(CLARITY_ID){(function(c,l,a,r,i){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};var t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;var y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script",CLARITY_ID);}
  window.track=function(n,p){try{if(window.gtag)gtag("event",n,p||{})}catch(e){}try{if(window.clarity)clarity("event",n)}catch(e){}};
  window.store={get:function(k,d){try{var v=localStorage.getItem("unse_"+k);return v===null?d:v}catch(e){return d}},set:function(k,v){try{localStorage.setItem("unse_"+k,v)}catch(e){}}};
  /* 달묘가 기운을 읽는 연출 후 결과 공개 (cb: 공개 직후 실행) */
  window.reveal=function(el,msg,cb){
    var box=document.createElement("div");box.className="divining";
    box.innerHTML='<div class="orb"></div><p>🐱 달묘가 기운을 읽는 중…</p>';
    el.parentNode.insertBefore(box,el);
    setTimeout(function(){if(box.parentNode)box.remove();el.classList.add("show");
      try{el.scrollIntoView({behavior:"smooth",block:"nearest"})}catch(e){}
      if(typeof cb==="function")cb();},1500);
  };
  /* 캐릭터(달묘)가 한 글자씩 말하기 */
  var MOON_SVG='<svg class="emblem" viewBox="0 0 120 120" aria-hidden="true">'
    +'<defs><radialGradient id="au" cx="50%" cy="45%" r="55%"><stop offset="0%" stop-color="#b79bff" stop-opacity=".6"/><stop offset="55%" stop-color="#7b5cff" stop-opacity=".14"/><stop offset="100%" stop-color="#7b5cff" stop-opacity="0"/></radialGradient>'
    +'<linearGradient id="gd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f5e2b0"/><stop offset="1" stop-color="#d29b40"/></linearGradient></defs>'
    +'<circle cx="60" cy="60" r="58" fill="url(#au)"/>'
    +'<g class="ring"><circle cx="60" cy="60" r="47" fill="none" stroke="#e8c582" stroke-opacity=".5" stroke-width="1" stroke-dasharray="1.5 8"/></g>'
    +'<g class="ring2"><circle cx="60" cy="60" r="40" fill="none" stroke="#e8c582" stroke-opacity=".35" stroke-width="1" stroke-dasharray="0.5 6"/></g>'
    +'<circle cx="60" cy="60" r="35" fill="none" stroke="url(#gd)" stroke-width="1.3" stroke-opacity=".85"/>'
    +'<path fill="url(#gd)" d="M70 37a24 24 0 1 0 12 41A20 20 0 0 1 70 37z"/>'
    +'<g fill="#f5e2b0"><path d="M46 48l1.5 3.8 3.8 1.5-3.8 1.5L46 58.6l-1.5-3.8L40.7 53.3l3.8-1.5z"/><circle cx="80" cy="53" r="1.5"/><circle cx="53" cy="76" r="1.1"/><circle cx="74" cy="86" r="1"/></g></svg>';
  window.speak=function(el,text){
    if(!el)return;var w=document.createElement("div");w.className="mascot";
    w.innerHTML='<div class="avatar">'+MOON_SVG+'</div><div class="bubble"><span class="say"></span><span class="caret">▋</span></div>';
    el.insertBefore(w,el.firstChild);
    var span=w.querySelector(".say"),caret=w.querySelector(".caret"),i=0;
    (function t(){if(i<=text.length){span.textContent=text.slice(0,i++);setTimeout(t,36)}else if(caret)caret.style.display="none"})();
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
  var emb=document.getElementById("emblem");if(emb)emb.innerHTML=MOON_SVG;
  var grid=document.getElementById("tools");
  if(grid){function card(t){return '<a class="toolcard" href="'+ROOT+t.path+'">'+(t.pop?'<span class="pop">인기</span>':'')+'<span class="ic">'+t.ic+'</span><b>'+t.title+'</b><small>'+t.desc+'</small></a>'}
    var g=h('<div class="grid"></div>');TOOLS.forEach(function(t){g.appendChild(h(card(t)))});grid.appendChild(g)}

  /* ===== 생년월일 드롭다운(년·월·일) — 달력 대신 탭 3번 ===== */
  window.dateSelect=function(mount){
    mount.innerHTML='<div class="dsel">'
      +'<input class="dy" type="number" inputmode="numeric" placeholder="예) 1990" min="1900" max="2100">'
      +'<input class="dm" type="number" inputmode="numeric" placeholder="월" min="1" max="12">'
      +'<input class="dd" type="number" inputmode="numeric" placeholder="일" min="1" max="31"></div>';
    var dy=mount.querySelector(".dy"),dm=mount.querySelector(".dm"),dd=mount.querySelector(".dd"),thisY=new Date().getFullYear();
    // 자동 포커스 이동: 년 4자리 -> 월, 월 2자리 -> 일
    dy.addEventListener("input",function(){if(dy.value.length>=4)dm.focus()});
    dm.addEventListener("input",function(){if(+dm.value>=2||dm.value.length>=2)dd.focus()});
    return {get:function(){var y=+dy.value,m=+dm.value,d=+dd.value;
        if(!(y>=1900&&y<=thisY&&m>=1&&m<=12&&d>=1))return null;
        if(d>new Date(y,m,0).getDate())return null;
        return {y:y,m:m,d:d}},
      val:function(){return(dy.value&&dm.value&&dd.value)?dy.value+"-"+dm.value+"-"+dd.value:""},
      set:function(v){if(!v)return;var p=(""+v).split("-");if(p.length<3)return;dy.value=+p[0];dm.value=+p[1];dd.value=+p[2];}};
  };

  /* ===== 결과 공유 카드 (설정 0, 순수 클라이언트) ===== */
  function rr(x,a,b,w,h,r){x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath()}
  function wrapC(x,t,cx,y,maxW,lh){var line="",yy=y;for(var i=0;i<t.length;i++){var test=line+t[i];
    if(x.measureText(test).width>maxW&&line){x.fillText(line,cx,yy);line=t[i];yy+=lh}else line=test}
    if(line)x.fillText(line,cx,yy);return yy+lh}
  window.shareCard=function(o){
    var W=1080,H=1350,c=document.createElement("canvas");c.width=W;c.height=H;var x=c.getContext("2d");
    var g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,"#7c5cff");g.addColorStop(1,"#b06cff");x.fillStyle=g;x.fillRect(0,0,W,H);
    x.fillStyle="rgba(255,255,255,0.12)";rr(x,70,190,W-140,H-380,44);x.fill();
    x.textAlign="center";x.fillStyle="#fff";
    x.font="700 46px sans-serif";x.fillText("🌙 달빛운세",W/2,140);
    x.font="150px sans-serif";x.fillText(o.emoji||"🔮",W/2,430);
    x.font="800 78px sans-serif";var yy=wrapC(x,o.title||"",W/2,560,W-240,92);
    x.font="400 44px sans-serif";x.fillStyle="rgba(255,255,255,0.95)";
    (o.lines||[]).forEach(function(ln){yy=wrapC(x,ln,W/2,yy+20,W-260,60)});
    x.font="600 36px sans-serif";x.fillStyle="rgba(255,255,255,0.9)";x.fillText("seam0814.github.io/unse",W/2,H-96);
    x.font="400 30px sans-serif";x.fillStyle="rgba(255,255,255,0.75)";x.fillText("※ 재미로 보는 운세",W/2,H-50);
    c.toBlob(function(blob){if(!blob)return;var file=null;
      try{file=new File([blob],"unse.png",{type:"image/png"})}catch(e){}
      if(file&&navigator.canShare&&navigator.canShare({files:[file]})){
        navigator.share({files:[file],title:"달빛운세",text:o.share||"내 운세 결과 ✨"}).then(function(){track("card_share")}).catch(function(){});
      }else{var u=URL.createObjectURL(blob),a=document.createElement("a");a.href=u;a.download="달빛운세.png";a.click();
        setTimeout(function(){URL.revokeObjectURL(u)},1000);track("card_download");}
    },"image/png");
  };

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
    // 실시간 이야기방 (Firestore 실시간 리스너)
    el.querySelector(".board").insertAdjacentHTML("beforeend",
      '<h3 style="margin-top:22px">🔮 실시간 이야기방</h3><div class="chatbox" id="bChat"></div>'
      +'<form id="cForm" class="brow" style="margin-top:8px"><input id="cName" maxlength="16" placeholder="닉네임" style="flex:1"><input id="cMsg" maxlength="120" placeholder="메시지를 남겨보세요" style="flex:2"><button class="btn sec" type="submit" style="width:auto;margin:0;padding:12px 16px">전송</button></form>');
    db.collection("chat").orderBy("createdAt").limitToLast(60).onSnapshot(function(q){
      var html="";q.forEach(function(d){var m=d.data();html+='<div class="cmsg"><b>'+esc(m.name||"익명")+'</b> '+esc(m.text)+'</div>'});
      var box=document.getElementById("bChat");if(box){box.innerHTML=html||'<p class="disc" style="margin:8px 0">첫 메시지를 남겨보세요 ✨</p>';box.scrollTop=box.scrollHeight;}
    },function(){});
    document.getElementById("cForm").addEventListener("submit",function(e){e.preventDefault();
      var t=(document.getElementById("cMsg").value||"").trim();if(!t)return;
      db.collection("chat").add({name:(document.getElementById("cName").value||"").trim().slice(0,16),text:t.slice(0,120),createdAt:firebase.firestore.FieldValue.serverTimestamp()}).catch(function(){});
      document.getElementById("cMsg").value="";track("chat_send");
    });
  }
})();

/* 캔버스 별밤 배경 (반짝임·미세 드리프트) */
(function(){
  var c=document.createElement("canvas");c.id="stars";
  c.style.cssText="position:fixed;inset:0;z-index:-1;pointer-events:none";
  (document.body||document.documentElement).insertBefore(c,document.body?document.body.firstChild:null);
  var x=c.getContext("2d"),S=[],W=0,H=0,dpr=Math.min(2,window.devicePixelRatio||1);
  function dark(){return window.matchMedia&&matchMedia("(prefers-color-scheme:dark)").matches}
  function resize(){W=c.width=Math.floor(innerWidth*dpr);H=c.height=Math.floor(innerHeight*dpr);
    c.style.width=innerWidth+"px";c.style.height=innerHeight+"px";
    var n=Math.min(160,Math.floor(innerWidth*innerHeight/8000));S=[];
    for(var i=0;i<n;i++)S.push({x:Math.random()*W,y:Math.random()*H,r:(Math.random()*1.2+0.35)*dpr,p:Math.random()*6.28,sp:0.015+Math.random()*0.03,dx:(Math.random()-0.5)*0.04*dpr});}
  function frame(){x.clearRect(0,0,W,H);var col="245,234,205";
    for(var i=0;i<S.length;i++){var s=S[i];s.p+=s.sp;s.x+=s.dx;if(s.x<0)s.x=W;if(s.x>W)s.x=0;
      var a=0.28+0.5*(0.5+0.5*Math.sin(s.p));
      x.beginPath();x.arc(s.x,s.y,s.r,0,6.2832);x.fillStyle="rgba("+col+","+a.toFixed(3)+")";x.fill();}
    requestAnimationFrame(frame);}
  window.addEventListener("resize",resize);resize();frame();
})();
