(function () {
  var KEY = 'cel_archive_countdown';
  var t = parseInt(sessionStorage.getItem(KEY), 10);
  if (isNaN(t)) t = 1807; /* 00:30:07 */

  var bar = document.createElement('div');
  bar.id = 'sysbar';
  bar.innerHTML = '<span class="node">CEL-ARCHIVE PUBLIC ACCESS NODE</span>'
    + '<span class="warn">&#9632; 비인가 열람 감지</span>'
    + '<span id="sys-cd"></span>';
  document.body.insertBefore(bar, document.body.firstChild);

  var foot = document.createElement('div');
  foot.id = 'sysfoot';
  foot.innerHTML = '자동 복귀 페이지: <a href="index.html">셀레스티아 공식 관광 안내</a>';
  document.body.appendChild(foot);

  var cd = document.getElementById('sys-cd');
  function p(n) { return (n < 10 ? '0' : '') + n; }
  function tick() {
    cd.textContent = '열람 종료까지 00:' + p(Math.floor(t / 60)) + ':' + p(t % 60);
    if (t <= 0) {
      sessionStorage.removeItem(KEY);
      location.href = 'index.html';
      return;
    }
    t--;
    sessionStorage.setItem(KEY, String(t));
    setTimeout(tick, 1000);
  }
  tick();
})();
