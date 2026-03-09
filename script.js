/* ─── LOGIN ──────────────────────────────────────── */

if (document.getElementById('username')) {
  localStorage.removeItem('gh_logged_in');

  window.doLogin = function () {
    var u   = document.getElementById('username').value.trim();
    var p   = document.getElementById('password').value.trim();
    var err = document.getElementById('error-box');
    if (u === 'admin' && p === 'admin123') {
      localStorage.setItem('gh_logged_in', 'true');
      window.location.href = 'dashboard.html';
    } else {
      err.style.display = 'block';
    }
  };

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') window.doLogin();
  });
}

/* ─── DASHBOARD ──────────────────────────────────── */

if (document.getElementById('grid')) {

  if (localStorage.getItem('gh_logged_in') !== 'true') {
    window.location.href = 'index.html';
  }

  var OPEN_IMG   = 'assets/Open-Status.png';
  var CLOSED_IMG = 'assets/Closed-Status.png';

  function cardBadge(status) {
    var src = status === 'open' ? OPEN_IMG : CLOSED_IMG;
    return '<span class="badge-status ' + status + '">'
      + '<img src="' + src + '" alt="' + status + '" />'
      + '</span>';
  }

  function modalBadge(status) {
    var src = status === 'open' ? OPEN_IMG : CLOSED_IMG;
    return '<span class="modal-badge-status ' + status + '">'
      + '<img src="' + src + '" alt="' + status + '" />'
      + status
      + '</span>';
  }

  