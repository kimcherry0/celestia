(function () {
  var MENU = [
    { t: '도시안내', items: [['about.html', '셀레스티아 소개'], ['federation.html', '르셰연방 안내'], ['history.html', '대붕괴 역사관']] },
    { t: '심층·아카샤', items: [['deep.html', '심층 안내'], ['akasha.html', '아카샤 소개'], ['resonance.html', '공명률 안내'], ['agent.html', '에이전트 제도 안내']] },
    { t: '주요기관', items: [['orgs.html', '주요 기관 안내']] },
    { t: '생활·방문', items: [['life.html', '시민 생활 안내'], ['traffic.html', '교통 안내'], ['species.html', '다종족 공존 안내'], ['visit.html', '방문객 안내']] }
  ];

  var path = location.pathname.split('/').pop() || 'index.html';
  try { path = decodeURIComponent(path); } catch (e) { }

  var curCat = null, curPage = null, i, j;
  for (i = 0; i < MENU.length; i++) {
    for (j = 0; j < MENU[i].items.length; j++) {
      if (MENU[i].items[j][0] === path) { curCat = MENU[i]; curPage = MENU[i].items[j]; }
    }
  }

  var h = ''
    + '<div id="topbar"><div class="inner"><span>본 누리집은 르셰연방 공식 전자정부 누리집입니다.</span><span class="right"><a href="index.html">홈</a></span></div></div>'
    + '<div id="header"><div class="inner"><h1><a href="index.html"><img src="셀레스티아 로고.png" alt="셀레스티아"></a></h1>'
    + '<form id="search" onsubmit="return false;"><input type="text" title="통합검색"><button type="submit">검색</button></form></div></div>'
    + '<div id="gnb"><div class="inner"><ul id="gnb-list">';

  for (i = 0; i < MENU.length; i++) {
    var c = MENU[i];
    h += '<li' + (curCat === c ? ' class="on"' : '') + '><a href="' + c.items[0][0] + '">' + c.t + '</a>';
    if (c.items.length > 1) {
      h += '<ul>';
      for (j = 0; j < c.items.length; j++) h += '<li><a href="' + c.items[j][0] + '">' + c.items[j][1] + '</a></li>';
      h += '</ul>';
    }
    h += '</li>';
  }
  h += '<li class="gl"><a class="glitch" href="archive.html" data-text="정보공개">정&#9618;보공&#65533;개</a></li>';
  h += '</ul></div></div>';

  var wrap = document.getElementById('wrap');
  wrap.insertAdjacentHTML('afterbegin', h);

  var container = document.getElementById('container');
  if (container && curCat) {
    var sb = '<div id="sidebar"><h2>' + curCat.t + '</h2><ul>';
    for (j = 0; j < curCat.items.length; j++) {
      var it = curCat.items[j];
      sb += '<li' + (it[0] === path ? ' class="on"' : '') + '><a href="' + it[0] + '">' + it[1] + '</a></li>';
    }
    sb += '</ul></div>';
    container.insertAdjacentHTML('afterbegin', sb);

    var content = document.getElementById('content');
    if (content && curPage) {
      content.insertAdjacentHTML('afterbegin', '<div id="breadcrumb">홈 &gt; ' + curCat.t + ' &gt; <strong>' + curPage[1] + '</strong></div>');
    }
  }

  wrap.insertAdjacentHTML('beforeend',
    '<div id="footer"><div class="inner"><p class="flogo"><img src="셀레스티아 로고.png" alt="셀레스티아"></p>'
    + '<p>COPYRIGHT &copy; CELESTIA. ALL RIGHTS RESERVED.</p></div></div>');

  /* 글리치 메뉴 → 전환 연출 후 이동 */
  document.addEventListener('click', function (e) {
    var t = e.target;
    while (t && t !== document && !(t.classList && t.classList.contains('glitch'))) t = t.parentNode;
    if (!t || t === document) return;
    e.preventDefault();
    var ov = document.createElement('div');
    ov.id = 'glitch-ov';
    document.body.appendChild(ov);
    setTimeout(function () { location.href = t.getAttribute('href'); }, 650);
  });
})();
