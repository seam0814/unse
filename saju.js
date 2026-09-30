/* 사주 계산 엔진 — lunar-javascript(Solar/Lunar/EightChar) 필요.
   절기 기준 팔자 계산 + 한글/오행 매핑 + 해석 데이터 */
window.Saju=(function(){
  var GAN={"甲":{kr:"갑",oh:"목",yy:"양"},"乙":{kr:"을",oh:"목",yy:"음"},"丙":{kr:"병",oh:"화",yy:"양"},"丁":{kr:"정",oh:"화",yy:"음"},"戊":{kr:"무",oh:"토",yy:"양"},"己":{kr:"기",oh:"토",yy:"음"},"庚":{kr:"경",oh:"금",yy:"양"},"辛":{kr:"신",oh:"금",yy:"음"},"壬":{kr:"임",oh:"수",yy:"양"},"癸":{kr:"계",oh:"수",yy:"음"}};
  var ZHI={"子":{kr:"자",oh:"수",an:"쥐"},"丑":{kr:"축",oh:"토",an:"소"},"寅":{kr:"인",oh:"목",an:"호랑이"},"卯":{kr:"묘",oh:"목",an:"토끼"},"辰":{kr:"진",oh:"토",an:"용"},"巳":{kr:"사",oh:"화",an:"뱀"},"午":{kr:"오",oh:"화",an:"말"},"未":{kr:"미",oh:"토",an:"양"},"申":{kr:"신",oh:"금",an:"원숭이"},"酉":{kr:"유",oh:"금",an:"닭"},"戌":{kr:"술",oh:"토",an:"개"},"亥":{kr:"해",oh:"수",an:"돼지"}};
  var SHENG={목:"화",화:"토",토:"금",금:"수",수:"목"};
  var KEQ={목:"토",화:"금",토:"수",금:"목",수:"화"};
  var OH_COLOR={목:"초록",화:"빨강",토:"노랑",금:"흰색",수:"파랑"};
  var OH_NUM={목:[3,8],화:[2,7],토:[5,10],금:[4,9],수:[1,6]};
  var SAMHAP=[["申","子","辰"],["亥","卯","未"],["寅","午","戌"],["巳","酉","丑"]];
  var CHUNG={"子":"午","午":"子","丑":"未","未":"丑","寅":"申","申":"寅","卯":"酉","酉":"卯","辰":"戌","戌":"辰","巳":"亥","亥":"巳"};
  var DAYMASTER={
    갑:{t:"큰 나무",d:"곧고 우직한 리더형. 한번 정하면 밀어붙이는 추진력이 강하고 자존심이 높습니다. 굽히기보다 부러지는 타입이라 유연함을 배우면 크게 됩니다."},
    을:{t:"화초·덩굴",d:"부드럽고 유연한 생활력의 소유자. 환경 적응이 빠르고 사람을 편하게 하지만, 속으로는 목표를 향해 끈질기게 감아 올라갑니다."},
    병:{t:"태양",d:"밝고 화끈한 열정가. 표현이 시원하고 주변을 밝히지만 감정 기복이 있습니다. 벌인 일을 끝까지 마무리하면 인정받습니다."},
    정:{t:"촛불·등불",d:"따뜻하고 섬세한 헌신형. 세심하게 챙기고 분위기를 살립니다. 예민함을 자기 재능으로 돌리면 깊은 전문가가 됩니다."},
    무:{t:"큰 산",d:"듬직하고 포용력 있는 중심형. 믿음직하고 스케일이 크지만 고집이 셉니다. 한번 마음 열면 끝까지 지키는 의리파."},
    기:{t:"기름진 밭",d:"현실적이고 배려 깊은 실속형. 조용히 키워내는 힘이 있어 사람·재물이 모입니다. 결정을 미루는 습관만 줄이면 좋습니다."},
    경:{t:"무쇠·원석",d:"강직하고 결단력 있는 의리형. 불의를 못 참고 추진이 빠릅니다. 말이 직설적이라 부드러움을 더하면 리더로 큽니다."},
    신:{t:"보석",d:"세련되고 예민한 완벽주의자. 감각과 디테일이 뛰어나 전문·예술 분야에 강합니다. 자기 기준이 높아 스스로를 힘들게 하지 않도록."},
    임:{t:"바다·강",d:"지혜롭고 자유로운 포용형. 생각이 넓고 임기응변이 좋습니다. 흐름을 타되 한 우물을 깊게 파면 큰물에서 놉니다."},
    계:{t:"이슬·비",d:"감성 풍부하고 통찰력 있는 침착형. 조용히 스며들어 사람 마음을 읽습니다. 시작한 일을 끝까지 지키면 재능이 빛납니다."}
  };
  function split(gz){return [gz.charAt(0),gz.charAt(1)]}
  function ready(){return typeof Solar!=="undefined"}
  function compute(y,m,d,hour,hasTime){
    var solar=Solar.fromYmdHms(y,m,d,hasTime?hour:12,0,0);
    var ec=solar.getLunar().getEightChar();
    var raw={year:ec.getYear(),month:ec.getMonth(),day:ec.getDay(),time:ec.getTime()};
    function pil(gz){var a=split(gz),g=GAN[a[0]],z=ZHI[a[1]];
      return {ganHz:a[0],zhiHz:a[1],ganKr:g.kr,zhiKr:z.kr,ganOh:g.oh,zhiOh:z.oh,yy:g.yy,animal:z.an}}
    var P={year:pil(raw.year),month:pil(raw.month),day:pil(raw.day),time:pil(raw.time)};
    var keys=hasTime?["year","month","day","time"]:["year","month","day"];
    var el={목:0,화:0,토:0,금:0,수:0};
    keys.forEach(function(k){el[P[k].ganOh]++;el[P[k].zhiOh]++});
    return {P:P,hasTime:hasTime,el:el,dayGanKr:P.day.ganKr,dayOh:P.day.ganOh,
            animal:P.year.animal, solar:solar};
  }
  function dayMaster(kr){return DAYMASTER[kr]}
  function strongestWeakest(el){
    var mx=-1,mn=99,s="",w="";for(var k in el){if(el[k]>mx){mx=el[k];s=k}if(el[k]<mn){mn=el[k];w=k}}
    return {strong:s,weak:w};
  }
  function relation(a,b){ // a 기준 b와의 오행 관계
    if(a===b)return "비화";
    if(SHENG[a]===b)return "설기";       // 내가 b를 생 (기운 나감)
    if(SHENG[b]===a)return "생조";       // b가 나를 생 (도움)
    if(KEQ[a]===b)return "재성";         // 내가 b를 극 (재물·목표)
    if(KEQ[b]===a)return "관성";         // b가 나를 극 (압박·규율)
    return "비화";
  }
  function lucky(oh,seed){
    var nums=OH_NUM[SHENG[oh]]||OH_NUM[oh]; // 나를 생하는 오행의 수 = 도움되는 수
    var n=nums[Math.abs(seed)%nums.length];
    return {color:OH_COLOR[SHENG[oh]]||OH_COLOR[oh], num:n};
  }
  function gunghap(a,b){ // a,b = compute 결과
    var rel=relation(a.dayOh,b.dayOh);
    var base;
    if(rel==="비화")base=72; else if(rel==="생조"||rel==="설기")base=86; else base=60;
    var az=a.P.day.zhiHz,bz=b.P.day.zhiHz, note=[];
    var sam=SAMHAP.some(function(g){return g.indexOf(az)>=0&&g.indexOf(bz)>=0&&az!==bz});
    if(sam){base+=9;note.push("일지 삼합 — 손발이 잘 맞아요")}
    if(CHUNG[az]===bz){base-=10;note.push("일지 충 — 티격태격하지만 끌림도 강함")}
    var score=Math.max(42,Math.min(98,base));
    return {score:score,rel:rel,note:note};
  }
  return {ready:ready,compute:compute,dayMaster:dayMaster,strongestWeakest:strongestWeakest,
          relation:relation,lucky:lucky,gunghap:gunghap,OH_COLOR:OH_COLOR};
})();
