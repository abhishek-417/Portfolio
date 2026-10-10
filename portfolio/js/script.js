/* ==========================================================
   Portfolio behaviour. Content comes from js/data.js.
   ========================================================== */
(function () {
  "use strict";

  var P = window.PROFILE;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  /* ---------- Toast ---------- */
  var toastEl = $("#toast");
  var toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2600);
  }

  /* ---------- Theme toggle ---------- */
  var root = document.documentElement;
  var themeBtn = $("#themeToggle");
  function applyTheme(t) {
    root.dataset.theme = t;
    themeBtn.innerHTML = t === "dark" ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    themeBtn.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
    try { localStorage.setItem("theme", t); } catch (e) {}
  }
  applyTheme(root.dataset.theme === "light" ? "light" : "dark");
  themeBtn.addEventListener("click", function () {
    applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });

  /* ---------- Fill links from data ---------- */
  $$("[data-social]").forEach(function (a) { a.href = P.socials[a.dataset.social] || "#"; });
  $$("[data-email]").forEach(function (a) { a.href = "mailto:" + P.email; });
  $$("[data-email-text]").forEach(function (n) { n.textContent = P.email; });
  var mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(P.location);
  $("#locationCard").href = mapsUrl;
  $("#locationLink").href = mapsUrl;
  $("#year").textContent = new Date().getFullYear();

  // Profile photo: put your own picture at images/avatar.jpg to replace the placeholder
  var avatar = $("#avatar");
  var probe = new Image();
  probe.onload = function () { avatar.src = "images/avatar.jpg"; };
  probe.src = "images/avatar.jpg";

  // Footer social icons
  var footerIcons = [
    ["github", "fa-brands fa-github", "GitHub"],
    ["linkedin", "fa-brands fa-linkedin-in", "LinkedIn"],
    ["instagram", "fa-brands fa-instagram", "Instagram"],
    ["facebook", "fa-brands fa-facebook-f", "Facebook"]
  ];
  $("#footerSocials").innerHTML = footerIcons.map(function (i) {
    return '<a href="' + esc(P.socials[i[0]]) + '" target="_blank" rel="noopener" aria-label="' + i[2] + '"><i class="' + i[1] + '"></i></a>';
  }).join("");

  /* ---------- Navigation ---------- */
  var nav = $("#nav");
  var menuBtn = $("#menuToggle");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuBtn.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  }
  menuBtn.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
  $$(".nav-link").forEach(function (l) { l.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  // Highlight the link of the section currently on screen
  var links = $$(".nav-link");
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (l) {
          l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main > section").forEach(function (s) { spy.observe(s); });
  }

  // Any element with data-go="sectionId" scrolls to that section
  document.addEventListener("click", function (e) {
    var go = e.target.closest("[data-go]");
    if (!go) return;
    var target = document.getElementById(go.dataset.go);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Back to top
  var toTop = $("#toTop");
  window.addEventListener("scroll", function () {
    toTop.classList.toggle("show", window.scrollY > 600);
  }, { passive: true });
  toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  /* ---------- Dialog helpers ---------- */
  var modal = $("#modal");
  var modalBody = $("#modalBody");
  function openModal(html) {
    modalBody.innerHTML = html;
    modal.showModal();
  }
  $("#modalClose").addEventListener("click", function () { modal.close(); });
  modal.addEventListener("click", function (e) { if (e.target === modal) modal.close(); });

  /* ---------- Projects ---------- */
  var projectGrid = $("#projectGrid");
  var projectFilters = $("#projectFilters");
  var categories = ["All"].concat(P.projects.reduce(function (acc, p) {
    if (acc.indexOf(p.category) === -1) acc.push(p.category);
    return acc;
  }, []));

  function renderProjects(cat) {
    var list = P.projects.filter(function (p) { return cat === "All" || p.category === cat; });
    projectGrid.innerHTML = list.map(function (p) {
      var live = p.live
        ? '<a class="btn btn-primary btn-small" href="' + esc(p.live) + '"' + (p.live.charAt(0) === "#" ? "" : ' target="_blank" rel="noopener"') + '><i class="fa-solid fa-arrow-up-right-from-square"></i> Live demo</a>'
        : "";
      var code = p.github
        ? '<a class="btn btn-ghost btn-small" href="' + esc(p.github) + '" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Code</a>'
        : "";
      return '<article class="card">' +
        '<span class="meta">' + esc(p.category) + "</span>" +
        "<h3>" + esc(p.title) + "</h3>" +
        "<p>" + esc(p.desc) + "</p>" +
        '<div class="tags">' + p.tags.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") + "</div>" +
        '<div class="card-actions">' + live + code + "</div></article>";
    }).join("");
  }

  projectFilters.innerHTML = categories.map(function (c, i) {
    return '<button class="filter-btn" type="button" data-cat="' + esc(c) + '" aria-pressed="' + (i === 0) + '">' + esc(c) + "</button>";
  }).join("");
  projectFilters.addEventListener("click", function (e) {
    var b = e.target.closest(".filter-btn");
    if (!b) return;
    $$(".filter-btn", projectFilters).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
    renderProjects(b.dataset.cat);
  });
  renderProjects("All");

  /* ---------- Gallery + lightbox ---------- */
  function placeholder(label, i) {
    var hue = (215 + i * 28) % 360;
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="hsl(' + hue + ',65%,45%)"/>' +
      '<stop offset="1" stop-color="hsl(' + ((hue + 40) % 360) + ',60%,22%)"/></linearGradient></defs>' +
      '<rect width="800" height="600" fill="url(#g)"/>' +
      '<text x="400" y="310" text-anchor="middle" font-family="sans-serif" font-size="40" font-weight="700" fill="rgba(255,255,255,.9)">' + esc(label) + "</text></svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  var photos = P.gallery.map(function (g, i) {
    return { caption: g.caption, src: g.src || placeholder(g.caption, i) };
  });

  $("#galleryGrid").innerHTML = photos.map(function (p, i) {
    return '<button class="gallery-item" type="button" data-i="' + i + '" aria-label="Open photo: ' + esc(p.caption) + '">' +
      '<img src="' + p.src + '" alt="' + esc(p.caption) + '" loading="lazy"><span>' + esc(p.caption) + "</span></button>";
  }).join("");

  var lb = $("#lightbox");
  var lbIndex = 0;
  function showPhoto(i) {
    lbIndex = (i + photos.length) % photos.length;
    $("#lbImg").src = photos[lbIndex].src;
    $("#lbImg").alt = photos[lbIndex].caption;
    $("#lbCaption").textContent = photos[lbIndex].caption + "  (" + (lbIndex + 1) + " of " + photos.length + ")";
  }
  $("#galleryGrid").addEventListener("click", function (e) {
    var b = e.target.closest(".gallery-item");
    if (!b) return;
    showPhoto(Number(b.dataset.i));
    lb.showModal();
  });
  $("#lbPrev").addEventListener("click", function () { showPhoto(lbIndex - 1); });
  $("#lbNext").addEventListener("click", function () { showPhoto(lbIndex + 1); });
  $("#lbClose").addEventListener("click", function () { lb.close(); });
  lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
  lb.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") showPhoto(lbIndex - 1);
    if (e.key === "ArrowRight") showPhoto(lbIndex + 1);
  });

  /* ---------- Skills ---------- */
  var skillTabs = $("#skillTabs");
  var skillList = $("#skillList");
  var groups = Object.keys(P.skills);

  function renderSkills(group) {
    skillList.innerHTML = P.skills[group].map(function (s) {
      return '<div class="skill-row"><div class="skill-row-head"><span>' + esc(s.name) + "</span><span>" + s.level + "%</span></div>" +
        '<div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + s.level + '" aria-label="' + esc(s.name) + '"><i data-w="' + s.level + '"></i></div></div>';
    }).join("");
    // Next frame so the width transition runs
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        $$("[data-w]", skillList).forEach(function (b) { b.style.width = b.dataset.w + "%"; });
      });
    });
  }
  skillTabs.innerHTML = groups.map(function (g, i) {
    return '<button class="filter-btn" type="button" role="tab" data-group="' + esc(g) + '" aria-selected="' + (i === 0) + '">' + esc(g) + "</button>";
  }).join("");
  skillTabs.addEventListener("click", function (e) {
    var b = e.target.closest(".filter-btn");
    if (!b) return;
    $$(".filter-btn", skillTabs).forEach(function (x) { x.setAttribute("aria-selected", String(x === b)); });
    renderSkills(b.dataset.group);
  });
  renderSkills(groups[0]);

  /* ---------- Certificates ---------- */
  $("#certGrid").innerHTML = P.certificates.map(function (c, i) {
    return '<article class="card cert"><div class="cert-icon"><i class="fa-solid fa-award"></i></div>' +
      '<div class="cert-body"><h3>' + esc(c.title) + '</h3><span class="meta">' + esc(c.issuer) + " &middot; " + esc(c.year) + "</span>" +
      "<p>" + esc(c.desc) + "</p>" +
      '<div class="card-actions">' +
      '<button class="btn btn-primary btn-small" type="button" data-cert="' + i + '">View details</button>' +
      '<a class="btn btn-ghost btn-small" href="' + esc(c.link) + '" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> Verify</a>' +
      "</div></div></article>";
  }).join("");

  $("#certGrid").addEventListener("click", function (e) {
    var b = e.target.closest("[data-cert]");
    if (!b) return;
    var c = P.certificates[Number(b.dataset.cert)];
    openModal(
      '<h2 id="modalTitle">' + esc(c.title) + "</h2>" +
      '<p class="meta">Issued by ' + esc(c.issuer) + " in " + esc(c.year) + " &middot; Credential ID " + esc(c.id) + "</p>" +
      '<div class="prose-body"><p>' + esc(c.desc) + "</p></div>" +
      '<div class="card-actions"><a class="btn btn-primary" href="' + esc(c.link) + '" target="_blank" rel="noopener">Verify credential</a></div>'
    );
  });

  /* ---------- Blog ---------- */
  $("#blogGrid").innerHTML = P.blog.map(function (b, i) {
    return '<article class="card"><span class="meta">' + esc(b.date) + " &middot; " + esc(b.read) + "</span>" +
      "<h3>" + esc(b.title) + "</h3><p>" + esc(b.excerpt) + "</p>" +
      '<div class="card-actions"><button class="btn btn-ghost btn-small" type="button" data-post="' + i + '">Read article</button></div></article>';
  }).join("");

  $("#blogGrid").addEventListener("click", function (e) {
    var b = e.target.closest("[data-post]");
    if (!b) return;
    var post = P.blog[Number(b.dataset.post)];
    openModal(
      '<h2 id="modalTitle">' + esc(post.title) + "</h2>" +
      '<p class="meta">' + esc(post.date) + " &middot; " + esc(post.read) + "</p>" +
      '<div class="prose-body">' + post.body.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div>"
    );
  });

  /* ---------- Resume ---------- */
  function timeline(items) {
    return '<ul class="timeline">' + items.map(function (it) {
      return "<li><h4>" + esc(it.title) + '</h4><p class="meta">' + esc(it.place) + " &middot; " + esc(it.period) + "</p><p>" + esc(it.desc) + "</p></li>";
    }).join("") + "</ul>";
  }
  var R = P.resume;
  $("#resumeGrid").innerHTML =
    "<div>" +
      '<div class="resume-block"><h3>Education</h3>' + timeline(R.education) + "</div>" +
      '<div class="resume-block"><h3>Experience</h3>' + timeline(R.experience) + "</div>" +
    "</div>" +
    "<div>" +
      '<div class="resume-block"><h3>Achievements</h3><ul class="plain-list">' +
        R.achievements.map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("") + "</ul></div>" +
      '<div class="resume-block"><h3>Core skills</h3><div class="tags">' +
        ["Python", "JavaScript", "HTML", "CSS", "OpenCV", "TensorFlow", "Git", "Problem solving"].map(function (t) {
          return '<span class="tag">' + t + "</span>";
        }).join("") + "</div></div>" +
    "</div>";

  // "Download" uses the browser's print dialog, which can save the resume section as a PDF
  $$('[data-action="download-resume"]').forEach(function (b) {
    b.addEventListener("click", function () {
      var section = document.getElementById("resume");
      section.scrollIntoView();
      toast("Choose 'Save as PDF' in the print window");
      setTimeout(function () { window.print(); }, 500);
    });
  });

  /* ---------- About ---------- */
  $("#aboutText").innerHTML = P.about.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
  $("#aboutFacts").innerHTML = P.facts.map(function (f) {
    return "<div><dt>" + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd></div>";
  }).join("");

  /* ---------- Contact ---------- */
  $("#copyEmail").addEventListener("click", function () {
    var done = function () { toast("Email address copied"); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(P.email).then(done, function () { toast("Could not copy. Select the address instead."); });
    } else {
      toast("Copy is not supported here. Select the address instead.");
    }
  });

  var form = $("#contactForm");
  function setError(id, msg) {
    var input = document.getElementById(id);
    input.closest(".field").classList.toggle("invalid", !!msg);
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    $('[data-error-for="' + id + '"]').textContent = msg;
  }
  function validate() {
    var name = $("#cName").value.trim();
    var email = $("#cEmail").value.trim();
    var msg = $("#cMsg").value.trim();
    var ok = true;
    setError("cName", name ? "" : "Enter your name."); if (!name) ok = false;
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setError("cEmail", emailOk ? "" : "Enter a valid email address, like name@example.com."); if (!emailOk) ok = false;
    setError("cMsg", msg.length >= 10 ? "" : "Write at least 10 characters so I know how to help."); if (msg.length < 10) ok = false;
    return ok;
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) { toast("Fix the highlighted fields"); return; }
    var subject = "Portfolio message from " + $("#cName").value.trim();
    var body = $("#cMsg").value.trim() + "\n\nFrom: " + $("#cName").value.trim() + " (" + $("#cEmail").value.trim() + ")";
    window.location.href = "mailto:" + P.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    toast("Opening your email app");
  });
  form.addEventListener("reset", function () {
    ["cName", "cEmail", "cMsg"].forEach(function (id) { setError(id, ""); });
  });
})();
