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
})();
