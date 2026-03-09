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

  /* Card badge — image ONLY, no text */
  function cardBadge(status) {
    var src = status === 'open' ? OPEN_IMG : CLOSED_IMG;
    return '<span class="badge-status ' + status + '">'
      + '<img src="' + src + '" alt="' + status + '" />'
      + '</span>';
  }

  /* Modal badge — image + text */
  function modalBadge(status) {
    var src = status === 'open' ? OPEN_IMG : CLOSED_IMG;
    return '<span class="modal-badge-status ' + status + '">'
      + '<img src="' + src + '" alt="' + status + '" />'
      + status
      + '</span>';
  }

  var ALL_ISSUES = [
    { id:1,  title:"Fix navigation menu on mobile devices",        description:"The navigation menu doesn't collapse properly on mobile devices, need to fix the responsive behavior.",  status:"open",   labels:["bug","help wanted"],          priority:"high",   author:"john_doe",      assignee:"jane_smith",    createdAt:"2024-01-15T10:30:00Z", updatedAt:"2024-01-15T10:30:00Z" },
    { id:2,  title:"Update API documentation",                     description:"The API docs are outdated and missing new endpoints added in v2.",                                        status:"open",   labels:["documentation"],              priority:"medium", author:"doc_dan",        assignee:"tech_tina",     createdAt:"2024-01-16T09:00:00Z", updatedAt:"2024-01-16T09:00:00Z" },
    { id:3,  title:"Database query optimization",                  description:"Some queries take too long on large datasets, need indexing and query rewriting.",                        status:"closed", labels:["enhancement"],                priority:"high",   author:"db_debra",       assignee:"opt_oliver",    createdAt:"2024-01-17T11:00:00Z", updatedAt:"2024-01-20T14:00:00Z" },
    { id:4,  title:"Add dark mode support",                        description:"Users are requesting a dark mode theme across the entire application.",                                   status:"open",   labels:["enhancement","help wanted"],  priority:"medium", author:"ui_uma",         assignee:"style_sam",     createdAt:"2024-01-18T08:30:00Z", updatedAt:"2024-01-18T08:30:00Z" },
    { id:5,  title:"Fix broken image uploads",                     description:"The navigation menu doesn't collapse properly on mobile devices, need to fix the responsive behavior.",  status:"open",   labels:["bug","help wanted"],          priority:"high",   author:"img_ivan",       assignee:"fahim_ahmed",   createdAt:"2024-01-19T13:00:00Z", updatedAt:"2024-01-19T13:00:00Z" },
    { id:6,  title:"Implement user roles and permissions",         description:"Need role-based access control for admin, editor, and viewer roles.",                                    status:"closed", labels:["enhancement"],                priority:"high",   author:"sec_sara",       assignee:"perm_pete",     createdAt:"2024-01-20T10:00:00Z", updatedAt:"2024-01-25T16:00:00Z" },
    { id:7,  title:"Search functionality not working",             description:"Search returns incorrect results when using special characters in the query string.",                    status:"open",   labels:["bug"],                        priority:"high",   author:"srch_steve",     assignee:"fix_fiona",     createdAt:"2024-01-21T09:30:00Z", updatedAt:"2024-01-21T09:30:00Z" },
    { id:8,  title:"Email notification templates",                 description:"Update and standardize all email notification templates to match new branding guidelines.",              status:"closed", labels:["documentation"],              priority:"low",    author:"mail_mike",      assignee:"brand_beth",    createdAt:"2024-01-22T14:00:00Z", updatedAt:"2024-01-28T10:00:00Z" },
    { id:9,  title:"Performance issue on dashboard load",          description:"The dashboard takes more than 5 seconds to load due to unoptimized API calls.",                          status:"open",   labels:["bug","enhancement"],          priority:"high",   author:"perf_paula",     assignee:"fast_frank",    createdAt:"2024-01-23T11:00:00Z", updatedAt:"2024-01-23T11:00:00Z" },
    { id:10, title:"Add CSV export feature",                       description:"Allow users to export table data to CSV format for use in spreadsheet applications.",                    status:"open",   labels:["enhancement"],                priority:"medium", author:"csv_carl",       assignee:"export_erin",   createdAt:"2024-01-24T08:00:00Z", updatedAt:"2024-01-24T08:00:00Z" },
    { id:11, title:"Fix pagination bug on mobile",                 description:"Pagination controls overflow off-screen on devices with small widths.",                                  status:"closed", labels:["bug"],                        priority:"medium", author:"mob_mona",       assignee:"layout_larry",  createdAt:"2024-01-25T13:00:00Z", updatedAt:"2024-01-30T09:00:00Z" },
    { id:12, title:"Add password strength indicator",              description:"Show real-time password strength feedback during account registration.",                                  status:"open",   labels:["enhancement","help wanted"],  priority:"low",    author:"pwd_perry",      assignee:"ux_ursula",     createdAt:"2024-01-26T10:30:00Z", updatedAt:"2024-01-26T10:30:00Z" },
    { id:13, title:"Implement real-time notifications",            description:"Add WebSocket support for real-time notifications across the platform.",                                  status:"open",   labels:["enhancement"],                priority:"high",   author:"realtime_ron",   assignee:"alex_perf",     createdAt:"2024-01-23T10:00:00Z", updatedAt:"2024-01-23T10:00:00Z" },
    { id:14, title:"Broken link in footer navigation",             description:"The 'Contact Us' link in the footer returns a 404 error.",                                               status:"closed", labels:["bug"],                        priority:"low",    author:"link_lena",      assignee:"web_wendy",     createdAt:"2024-01-28T12:00:00Z", updatedAt:"2024-01-31T10:00:00Z" },
    { id:15, title:"Improve error messages for API failures",      description:"Generic error messages should be replaced with specific, user-friendly feedback.",                       status:"open",   labels:["enhancement","documentation"],priority:"medium", author:"err_emma",       assignee:"msg_mario",     createdAt:"2024-01-29T09:00:00Z", updatedAt:"2024-01-29T09:00:00Z" },
    { id:16, title:"Add two-factor authentication",                description:"Implement TOTP-based 2FA support for all user accounts.",                                                status:"open",   labels:["enhancement"],                priority:"high",   author:"auth_alice",     assignee:"secure_sean",   createdAt:"2024-01-30T14:00:00Z", updatedAt:"2024-01-30T14:00:00Z" },
    { id:17, title:"Refactor CSS styling to use variables",        description:"Replace all hardcoded color and spacing values with CSS custom properties for easier theming.",          status:"closed", labels:["enhancement"],                priority:"low",    author:"css_cathy",      assignee:"style_sam",     createdAt:"2024-01-31T11:00:00Z", updatedAt:"2024-02-05T09:00:00Z" },
    { id:18, title:"Add keyboard shortcuts",                       description:"Support keyboard shortcuts for common actions like create, search, and navigate.",                        status:"open",   labels:["enhancement","help wanted"],  priority:"low",    author:"key_kevin",      assignee:"",              createdAt:"2024-02-01T08:30:00Z", updatedAt:"2024-02-01T08:30:00Z" },
    { id:19, title:"Session timeout not working correctly",        description:"Users remain logged in past the configured session timeout period.",                                      status:"open",   labels:["bug"],                        priority:"high",   author:"sess_sam",       assignee:"auth_alice",    createdAt:"2024-02-02T10:00:00Z", updatedAt:"2024-02-02T10:00:00Z" },
    { id:20, title:"Add bulk operations support",                  description:"Allow users to perform bulk actions like delete or update status on multiple items.",                     status:"open",   labels:["enhancement"],                priority:"low",    author:"bulk_barry",     assignee:"",              createdAt:"2024-02-02T10:00:00Z", updatedAt:"2024-02-02T10:00:00Z" },
    { id:21, title:"Fix form validation on checkout page",         description:"Required fields are not properly validated, allowing incomplete form submissions.",                       status:"closed", labels:["bug"],                        priority:"high",   author:"form_fred",      assignee:"val_victor",    createdAt:"2024-02-03T09:00:00Z", updatedAt:"2024-02-07T11:00:00Z" },
    { id:22, title:"Integrate payment gateway",                    description:"Add Stripe payment gateway integration for subscription billing.",                                        status:"open",   labels:["enhancement"],                priority:"high",   author:"pay_patricia",   assignee:"stripe_steve",  createdAt:"2024-02-04T14:00:00Z", updatedAt:"2024-02-04T14:00:00Z" },
    { id:23, title:"Write unit tests for auth module",             description:"Increase test coverage for login, logout, and token refresh flows.",                                     status:"open",   labels:["help wanted"],                priority:"medium", author:"test_terry",     assignee:"",              createdAt:"2024-02-05T10:00:00Z", updatedAt:"2024-02-05T10:00:00Z" },
    { id:24, title:"Image lazy loading not working",               description:"Images below the fold are loading immediately, causing slow initial page load.",                         status:"closed", labels:["bug","enhancement"],          priority:"medium", author:"img_ivan",       assignee:"perf_paula",    createdAt:"2024-02-06T09:00:00Z", updatedAt:"2024-02-10T14:00:00Z" },
    { id:25, title:"Add multi-language support",                   description:"Implement i18n support for at least English, Spanish, French, and German.",                              status:"open",   labels:["enhancement"],                priority:"medium", author:"i18n_iris",      assignee:"lang_leo",      createdAt:"2024-02-07T11:00:00Z", updatedAt:"2024-02-07T11:00:00Z" },
    { id:26, title:"Tooltip component rendering issue",            description:"Tooltips render outside the viewport on elements near the edge of the screen.",                          status:"closed", labels:["bug"],                        priority:"low",    author:"tip_tomas",      assignee:"ui_uma",        createdAt:"2024-02-08T08:00:00Z", updatedAt:"2024-02-12T09:00:00Z" },
    { id:27, title:"Add rate limiting to public API",              description:"Prevent abuse by adding rate limiting middleware to all public endpoints.",                              status:"open",   labels:["enhancement"],                priority:"high",   author:"api_adam",       assignee:"sec_sara",      createdAt:"2024-02-09T13:00:00Z", updatedAt:"2024-02-09T13:00:00Z" },
    { id:28, title:"Fix date formatting inconsistency",            description:"Dates are displayed in mixed formats across different pages.",                                            status:"closed", labels:["bug"],                        priority:"low",    author:"date_diana",     assignee:"fmt_felix",     createdAt:"2024-02-10T10:00:00Z", updatedAt:"2024-02-14T09:00:00Z" },
    { id:29, title:"Improve onboarding flow",                      description:"New users need a guided setup wizard to configure their workspace on first login.",                      status:"open",   labels:["enhancement","help wanted"],  priority:"medium", author:"onb_olivia",     assignee:"ux_ursula",     createdAt:"2024-02-11T09:30:00Z", updatedAt:"2024-02-11T09:30:00Z" },
    { id:30, title:"Memory leak in WebSocket handler",             description:"Long-running WebSocket connections cause increasing memory usage and eventual crash.",                   status:"open",   labels:["bug"],                        priority:"high",   author:"ws_walter",      assignee:"mem_megan",     createdAt:"2024-02-12T14:00:00Z", updatedAt:"2024-02-12T14:00:00Z" },
    { id:31, title:"Add activity logs for admin",                  description:"Admins should be able to view all user actions in an audit log dashboard.",                              status:"open",   labels:["enhancement"],                priority:"medium", author:"log_larry",      assignee:"admin_anna",    createdAt:"2024-02-13T11:00:00Z", updatedAt:"2024-02-13T11:00:00Z" },
    { id:32, title:"Broken chart on analytics page",               description:"The weekly trend chart fails to render when the date range exceeds 90 days.",                           status:"closed", labels:["bug"],                        priority:"medium", author:"chart_charles",  assignee:"viz_victor",    createdAt:"2024-02-14T09:00:00Z", updatedAt:"2024-02-18T15:00:00Z" },
    { id:33, title:"Add bulk operations support v2",               description:"Extend bulk operations to include export, label assignment, and assignee changes.",                      status:"open",   labels:["enhancement"],                priority:"low",    author:"bulk_barry",     assignee:"",              createdAt:"2024-02-15T10:00:00Z", updatedAt:"2024-02-15T10:00:00Z" },
    { id:34, title:"OAuth login with GitHub",                      description:"Allow users to sign in using their GitHub account via OAuth 2.0.",                                       status:"open",   labels:["enhancement"],                priority:"medium", author:"oauth_oscar",    assignee:"auth_alice",    createdAt:"2024-02-16T13:00:00Z", updatedAt:"2024-02-16T13:00:00Z" },
    { id:35, title:"Fix broken sort on table columns",             description:"Sorting by certain columns does not work correctly.",                                                    status:"closed", labels:["bug"],                        priority:"medium", author:"sort_sophia",    assignee:"tbl_thomas",    createdAt:"2024-02-17T09:00:00Z", updatedAt:"2024-02-21T10:00:00Z" },
    { id:36, title:"Add Slack notification integration",           description:"Send alerts and summaries to designated Slack channels via webhooks.",                                   status:"open",   labels:["enhancement"],                priority:"low",    author:"slack_steve",    assignee:"",              createdAt:"2024-02-18T11:00:00Z", updatedAt:"2024-02-18T11:00:00Z" },
    { id:37, title:"Profile avatar upload not saving",             description:"Uploaded profile pictures appear to save but revert to the default avatar on page refresh.",            status:"open",   labels:["bug"],                        priority:"high",   author:"av_amy",         assignee:"storage_simon", createdAt:"2024-02-19T14:00:00Z", updatedAt:"2024-02-19T14:00:00Z" },
    { id:38, title:"Implement data backup and restore",            description:"Allow admins to schedule automated backups and restore from a previous snapshot.",                      status:"open",   labels:["enhancement"],                priority:"high",   author:"bkp_brad",       assignee:"devops_donna",  createdAt:"2024-02-20T09:00:00Z", updatedAt:"2024-02-20T09:00:00Z" },
    { id:39, title:"Fix CORS issue with embedded widgets",         description:"Embedded dashboard widgets fail to load resources due to CORS policy violations.",                      status:"closed", labels:["bug"],                        priority:"high",   author:"cors_carla",     assignee:"api_adam",      createdAt:"2024-02-21T10:30:00Z", updatedAt:"2024-02-25T12:00:00Z" },
    { id:40, title:"Add drag-and-drop kanban board",               description:"Build a kanban-style view for issues with drag-and-drop status management.",                            status:"open",   labels:["enhancement","help wanted"],  priority:"medium", author:"kanban_kim",     assignee:"",              createdAt:"2024-02-22T13:00:00Z", updatedAt:"2024-02-22T13:00:00Z" },
    { id:41, title:"Resolve timezone mismatch in scheduling",      description:"Scheduled tasks run at the wrong time for users in non-UTC timezones.",                                 status:"open",   labels:["bug"],                        priority:"high",   author:"tz_travis",      assignee:"sched_scott",   createdAt:"2024-02-23T09:00:00Z", updatedAt:"2024-02-23T09:00:00Z" },
    { id:42, title:"Create mobile app version",                    description:"Build a React Native mobile application for iOS and Android.",                                           status:"open",   labels:["enhancement"],                priority:"medium", author:"mob_mona",       assignee:"rn_rita",       createdAt:"2024-02-24T11:00:00Z", updatedAt:"2024-02-24T11:00:00Z" },
    { id:43, title:"Deprecate old v1 API endpoints",               description:"Remove legacy v1 endpoints and migrate consumers to the v2 API.",                                       status:"closed", labels:["enhancement"],                priority:"medium", author:"dep_derek",      assignee:"api_adam",      createdAt:"2024-02-25T14:00:00Z", updatedAt:"2024-03-01T10:00:00Z" },
    { id:44, title:"Add custom report builder",                    description:"Let users build custom reports by selecting metrics and chart types via a visual editor.",              status:"open",   labels:["enhancement"],                priority:"low",    author:"rpt_rachel",     assignee:"",              createdAt:"2024-02-26T09:00:00Z", updatedAt:"2024-02-26T09:00:00Z" },
    { id:45, title:"Fix accessibility issues in modals",           description:"Modal dialogs lack proper ARIA roles, focus trapping, and keyboard navigation support.",                status:"open",   labels:["bug","enhancement"],          priority:"medium", author:"a11y_anna",      assignee:"ux_ursula",     createdAt:"2024-02-27T11:00:00Z", updatedAt:"2024-02-27T11:00:00Z" },
    { id:46, title:"Implement content delivery network",           description:"Configure CDN for static assets to improve global load times.",                                          status:"closed", labels:["enhancement"],                priority:"high",   author:"cdn_craig",      assignee:"devops_donna",  createdAt:"2024-02-28T13:00:00Z", updatedAt:"2024-03-04T09:00:00Z" },
    { id:47, title:"Fix print stylesheet",                         description:"The print view is missing key content and has broken layout when pages are printed.",                   status:"open",   labels:["bug"],                        priority:"low",    author:"prt_paula",      assignee:"",              createdAt:"2024-02-29T10:00:00Z", updatedAt:"2024-02-29T10:00:00Z" },
    { id:48, title:"Add SSO support for enterprise clients",       description:"Support SAML 2.0 and OpenID Connect for single sign-on in enterprise environments.",                    status:"open",   labels:["enhancement"],                priority:"high",   author:"sso_sarah",      assignee:"auth_alice",    createdAt:"2024-03-01T09:00:00Z", updatedAt:"2024-03-01T09:00:00Z" },
    { id:49, title:"Audit and fix SQL injection vulnerabilities",  description:"Security scan found potential SQL injection vectors in user input fields.",                             status:"open",   labels:["bug"],                        priority:"high",   author:"sec_sara",       assignee:"sql_stan",      createdAt:"2024-03-02T13:00:00Z", updatedAt:"2024-03-02T13:00:00Z" },
    { id:50, title:"Upgrade all dependencies to latest versions",  description:"Run npm audit and upgrade all outdated packages to fix known security vulnerabilities.",                status:"closed", labels:["enhancement"],                priority:"medium", author:"dep_diana",      assignee:"devops_donna",  createdAt:"2024-03-03T10:00:00Z", updatedAt:"2024-03-07T14:00:00Z" }
  ];

  var activeTab = 'all';
  var searchQ   = '';

  function fmt(d) {
    var dt = new Date(d);
    return (dt.getMonth()+1)+'/'+dt.getDate()+'/'+dt.getFullYear();
  }

  function labelClass(l) {
    return { bug:'lbl-bug', enhancement:'lbl-enhancement', 'help wanted':'lbl-help-wanted', documentation:'lbl-documentation' }[l.toLowerCase()] || 'lbl-default';
  }

  function buildLabels(arr) {
    return arr.map(function(l){ return '<span class="label-tag '+labelClass(l)+'">'+l+'</span>'; }).join('');
  }

  function priClass(p) { return p==='high' ? 'pri-high' : p==='medium' ? 'pri-medium' : 'pri-low'; }

  function getFiltered() {
    var list = ALL_ISSUES;
    if (activeTab==='open')   list = list.filter(function(i){ return i.status==='open'; });
    if (activeTab==='closed') list = list.filter(function(i){ return i.status==='closed'; });
    if (searchQ.trim()) {
      var q = searchQ.toLowerCase();
      list = list.filter(function(i){
        return i.title.toLowerCase().indexOf(q)!==-1 || i.description.toLowerCase().indexOf(q)!==-1;
      });
    }
    return list;
  }

  function render() {
    var issues = getFiltered();
    var grid   = document.getElementById('grid');
    var empty  = document.getElementById('empty');
    document.getElementById('count').textContent = issues.length;
    if (!issues.length) { grid.style.display='none'; empty.style.display='block'; return; }
    empty.style.display='none'; grid.style.display='grid';

    grid.innerHTML = issues.map(function(i){
      return '<div class="card '+i.status+'" onclick="openModal('+i.id+')">'+
        '<div class="card-body">'+
          '<div class="card-top">'+
            cardBadge(i.status)+   /* ← image only, no text */
            '<span class="badge-pri '+priClass(i.priority)+'">'+i.priority+'</span>'+
          '</div>'+
          '<div class="card-title">'+i.title+'</div>'+
          '<div class="card-desc">'+i.description+'</div>'+
          '<div class="card-labels">'+buildLabels(i.labels)+'</div>'+
        '</div>'+
        '<div class="card-foot">'+
          '<span>by <span class="card-author">'+i.author+'</span></span>'+
          '<span>'+fmt(i.createdAt)+'</span>'+
        '</div>'+
      '</div>';
    }).join('');
  }

  window.setTab = function(btn, tab) {
    activeTab = tab;
    document.querySelectorAll('.tab').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    render();
  };

  window.onSearch = function() {
    searchQ = document.getElementById('search-input').value;
    render();
  };

  window.openModal = function(id) {
    var i = ALL_ISSUES.find(function(x){ return x.id===id; });
    if (!i) return;
    document.getElementById('m-status').outerHTML =
      '<span id="m-status">' + modalBadge(i.status) + '</span>';
    document.getElementById('m-author-date').textContent = 'Saved by '+i.author+' • '+fmt(i.createdAt);
    document.getElementById('m-title').textContent       = i.title;
    document.getElementById('m-desc').textContent        = i.description;
    document.getElementById('m-assignee').textContent    = i.assignee || 'Unassigned';
    document.getElementById('m-labels').innerHTML        = buildLabels(i.labels);
    document.getElementById('m-priority').innerHTML      = '<span class="modal-pri-badge '+priClass(i.priority)+'">'+i.priority+'</span>';
    document.getElementById('overlay').classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function() {
    document.getElementById('overlay').classList.remove('show');
    document.body.style.overflow = '';
  };

  window.overlayClick = function(e) {
    if (e.target === document.getElementById('overlay')) window.closeModal();
  };

  document.addEventListener('keydown', function(e){ if (e.key==='Escape') window.closeModal(); });

  window.addEventListener('DOMContentLoaded', function() {
    setTimeout(function(){
      document.getElementById('spinner').style.display = 'none';
      render();
    }, 600);
  });
}