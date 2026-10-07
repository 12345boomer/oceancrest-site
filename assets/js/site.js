/*
  Shared site chrome and small interactions.
  - Header and footer are written here once, so every page stays in sync.
    Each page marks itself with <body data-page="home|transformation|education|courses|diagnostic|book|about|resources">.
  - Dropdown, mobile menu, scrolled header, reveal-on-scroll, animated counters, logo marquee pause.
  Links to documents that live on the current site (guide, papers, case) point at oceancrest.ai.
*/
(function () {
  var LIVE = "https://oceancrest.ai";
  var READINESS = "https://ocv-ai-assessment.netlify.app/";
  window.OC_LINKS = { live: LIVE, readiness: READINESS };

  var ARROW = '<span class="arr" aria-hidden="true">&rarr;</span>';
  var EXT = '<span aria-hidden="true">&nearr;</span>';
  var CHEV = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 4.5l3 3 3-3"/></svg>';

  function header(page) {
    var eduPages = ["education", "courses", "diagnostic"];
    var h = document.createElement("header");
    h.className = "site-head";
    h.innerHTML =
      '<a class="skip" href="#main">Skip to content</a>' +
      '<div class="wrap">' +
        '<a class="logo" href="index.html" aria-label="OceanCrest AI home"><img src="assets/img/logos/oceancrest-ai-lockup-rgb-navy.svg" alt="OceanCrest AI" width="216" height="25"></a>' +
        '<nav class="site-nav" aria-label="Main">' +
          '<a href="transformation.html"' + (page === "transformation" ? ' class="cur"' : "") + '>Transformation</a>' +
          '<div class="dd' + (eduPages.indexOf(page) >= 0 ? " cur" : "") + '"><button type="button" aria-expanded="false" aria-haspopup="true">Education ' + CHEV + '</button>' +
            '<div class="dd-panel">' +
              '<a href="education.html"><b>The learning solution</b><span>How we teach a whole company</span></a>' +
              '<a href="courses.html"><b>Courses</b><span>Every course, in two tracks</span></a>' +
              '<a href="diagnostic.html"><b>The AI diagnostic</b><span>Find out what you know, in about five minutes</span></a>' +
              '<a href="education.html#platform"><b>The platform</b><span>What leadership sees</span></a>' +
              '<a href="education.html#workshops"><b>Workshops</b><span>Leaders first, then the whole company</span></a>' +
              '<a href="education.html#membership"><b>Membership</b><span>Every course, for everyone on the team</span></a>' +
            '</div></div>' +
          '<a href="resources.html"' + (page === "resources" ? ' class="cur"' : "") + '>Resources</a>' +
          '<a href="about.html"' + (page === "about" ? ' class="cur"' : "") + '>About</a>' +
        '</nav>' +
        '<div class="head-actions">' +
          '<a class="btn ghost sm" href="diagnostic.html">Take the diagnostic</a>' +
          '<a class="btn primary sm" href="book.html">Book now</a>' +
          '<button type="button" class="menu-btn" aria-expanded="false" aria-controls="mobile-nav" aria-label="Menu"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M2 5h14M2 9h14M2 13h14"/></svg></button>' +
        '</div>' +
      '</div>' +
      '<nav class="mobile-nav" id="mobile-nav" aria-label="Main">' +
        '<a href="transformation.html">Transformation</a>' +
        '<a href="education.html">Education</a>' +
        '<a class="sub" href="courses.html">Courses</a>' +
        '<a class="sub" href="diagnostic.html">The AI diagnostic</a>' +
        '<a class="sub" href="education.html#platform">The platform</a>' +
        '<a class="sub" href="education.html#workshops">Workshops</a>' +
        '<a class="sub" href="education.html#membership">Membership</a>' +
        '<a href="resources.html">Resources</a>' +
        '<a href="about.html">About</a>' +
        '<div class="btns"><a class="btn primary" href="book.html">Book now</a><a class="btn" href="diagnostic.html">Take the diagnostic</a></div>' +
      '</nav>';
    document.body.insertBefore(h, document.body.firstChild);

    var dd = h.querySelector(".dd"), ddBtn = dd.querySelector("button");
    function setDD(open) { dd.classList.toggle("open", open); ddBtn.setAttribute("aria-expanded", open); }
    ddBtn.addEventListener("click", function (e) { e.stopPropagation(); setDD(!dd.classList.contains("open")); });
    dd.addEventListener("mouseenter", function () { if (matchMedia("(hover:hover)").matches) setDD(true); });
    dd.addEventListener("mouseleave", function () { if (matchMedia("(hover:hover)").matches) setDD(false); });
    document.addEventListener("click", function (e) { if (!dd.contains(e.target)) setDD(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { setDD(false); ddBtn.focus(); } });

    var mb = h.querySelector(".menu-btn"), mn = h.querySelector(".mobile-nav");
    mb.addEventListener("click", function () { var o = !mn.classList.contains("open"); mn.classList.toggle("open", o); mb.setAttribute("aria-expanded", o); });

    function onScroll() { h.classList.toggle("scrolled", window.scrollY > 8); }
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  function footer() {
    var f = document.createElement("footer");
    f.className = "site-foot";
    f.innerHTML =
      '<div class="foot-art coast" data-coast="footer-shore" data-palette="hero" data-size="wide" data-scene="beach" aria-hidden="true"></div>' +
      '<div class="wrap">' +
        '<div class="cols">' +
          '<div class="brand"><img src="assets/img/logos/oceancrest-ai-lockup-rgb-navy.svg" alt="OceanCrest AI" width="216" height="25"><p>Half transformation partner, half AI educator. The consulting division of OceanCrest Ventures.</p></div>' +
          '<div><h4>Transformation</h4><ul>' +
            '<li><a href="transformation.html">The partnership</a></li>' +
            '<li><a href="transformation.html#phases">Assess, build, amplify</a></li>' +
            '<li><a href="transformation.html#options">Ways to start</a></li>' +
            '<li><a href="' + READINESS + '" target="_blank" rel="noopener">Readiness assessment ' + EXT + '</a></li>' +
            '<li><a href="' + LIVE + '/case-001/" target="_blank" rel="noopener">The demonstration case ' + EXT + '</a></li>' +
          '</ul></div>' +
          '<div><h4>Education</h4><ul>' +
            '<li><a href="education.html">The learning solution</a></li>' +
            '<li><a href="courses.html">Courses</a></li>' +
            '<li><a href="diagnostic.html">The AI diagnostic</a></li>' +
            '<li><a href="education.html#platform">The platform</a></li>' +
            '<li><a href="education.html#workshops">Workshops</a></li>' +
            '<li><a href="education.html#membership">Membership</a></li>' +
          '</ul></div>' +
          '<div><h4>Company</h4><ul>' +
            '<li><a href="about.html">About</a></li>' +
            '<li><a href="about.html#advisory">Advisory board</a></li>' +
            '<li><a href="resources.html">Resources</a></li>' +
            '<li><a href="book.html">Book now</a></li>' +
            '<li><a href="https://oceancrestventures.com" target="_blank" rel="noopener">OceanCrest Ventures ' + EXT + '</a></li>' +
          '</ul></div>' +
        '</div>' +
        '<div class="fine"><span>&copy; 2026 OceanCrest Ventures. All rights reserved. Engagements are contracted through Ocean Crest Consulting LLC.</span><span>Team and advisor photographs are of the people named. All other art is painted by code and depicts no real place.</span></div>' +
      '</div>';
    document.body.appendChild(f);
  }

  // Reveal on scroll, and count numbers up when they first appear: <b data-count="80" data-suffix="%+">
  function reveal() {
    var els = document.querySelectorAll(".reveal, [data-count], .bar[data-to]");
    if (!("IntersectionObserver" in window)) { els.forEach(show); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function show(el) {
    el.classList.add("in");
    if (el.hasAttribute("data-count")) {
      var to = parseFloat(el.getAttribute("data-count")), pre = el.getAttribute("data-prefix") || "", suf = el.getAttribute("data-suffix") || "";
      var dec = (String(to).split(".")[1] || "").length;
      if (reduce) { el.textContent = pre + to.toFixed(dec) + suf; return; }
      var t0 = performance.now(), dur = 1400;
      (function tick(t) {
        var p = Math.min(1, (t - t0) / dur), v = to * (1 - Math.pow(1 - p, 3));
        el.textContent = pre + v.toFixed(dec) + suf;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    }
    if (el.matches(".bar[data-to]")) { var i = el.querySelector("i"); if (i) i.style.width = el.getAttribute("data-to") + "%"; }
  }

  // Marquee pause button: <div class="marquee"> ... <button class="marquee-toggle">
  function marquees() {
    document.querySelectorAll(".marquee").forEach(function (m) {
      var b = m.querySelector(".marquee-toggle") || (m.parentNode && m.parentNode.querySelector(".marquee-toggle"));
      if (!b) return;
      b.addEventListener("click", function () {
        var p = m.classList.toggle("paused");
        b.textContent = p ? "Play" : "Pause";
        b.setAttribute("aria-pressed", p);
      });
    });
  }

  // Segmented switch: <div class="switch" data-switch="name"><button data-val="a">...  and panels [data-panel="name:a"]
  function switches() {
    document.querySelectorAll("[data-switch]").forEach(function (sw) {
      var name = sw.getAttribute("data-switch");
      sw.addEventListener("click", function (e) {
        var b = e.target.closest("button[data-val]"); if (!b) return;
        var v = b.getAttribute("data-val");
        sw.querySelectorAll("button[data-val]").forEach(function (x) { x.setAttribute("aria-selected", x === b); });
        sw.setAttribute("data-on", v);
        document.querySelectorAll('[data-panel^="' + name + ':"]').forEach(function (p) {
          var on = p.getAttribute("data-panel") === name + ":" + v;
          p.hidden = !on;
          if (on) p.querySelectorAll(".reveal").forEach(function (r) { r.classList.add("in"); });
        });
      });
    });
  }


  // Hero word rotator, ported from the live site: the highlighted word runs through the parts of a
  // business we transform, then settles on the word in the markup. Wide screens only, once.
  function rotator() {
    var rot = document.querySelector(".rotator"), slot = rot && rot.querySelector(".rotator-slot");
    if (!rot || !slot || reduce || !matchMedia("(min-width: 760px)").matches) return;
    var finalWord = slot.textContent;
    var CANDIDATES = (rot.getAttribute("data-words") || "back office,forecasting,reporting,service desk,pipeline,scheduling,paperwork,quoting").split(",");
    var probe = document.createElement("span");
    probe.setAttribute("aria-hidden", "true");
    probe.style.cssText = "position:absolute;left:-9999px;top:0;visibility:hidden;white-space:nowrap;";
    rot.appendChild(probe);
    // Keep only words that fit the first line without rewrapping (as on the live site).
    var h = rot.closest("h1, h2") || rot.parentNode;
    probe.textContent = "Your ,";
    var avail = h.clientWidth - probe.getBoundingClientRect().width - 8;
    var widths = [], words = CANDIDATES.filter(function (w) {
      probe.textContent = w;
      var wd = probe.getBoundingClientRect().width;
      if (wd <= avail) { widths.push(wd); return true; }
      return false;
    });
    if (words.length < 3) { probe.remove(); return; }
    probe.textContent = finalWord; words.push(finalWord); widths.push(probe.getBoundingClientRect().width);
    var i = 0;
    function delay(n) { return Math.max(90, Math.round(620 * Math.pow(0.82, n))); }
    function swap() {
      if (document.hidden) { document.addEventListener("visibilitychange", swap, { once: true }); return; }
      slot.textContent = words[i]; rot.style.width = widths[i] + "px";
      var d = delay(i);
      if (d > 180 && slot.animate) slot.animate([{ opacity: 0, transform: "translateY(0.25em)" }, { opacity: 1, transform: "none" }], { duration: Math.min(160, d - 20), easing: "cubic-bezier(0.23,1,0.32,1)" });
      if (window.SeaSound && d > 200) window.SeaSound.play("blip");
      i++;
      if (i < words.length) setTimeout(swap, d); else setTimeout(finish, 900);
    }
    function finish() {
      rot.classList.add("is-done"); rot.classList.remove("is-live");
      setTimeout(function () { rot.classList.remove("is-done"); rot.style.width = ""; probe.remove(); }, 380);
    }
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(function () {
      setTimeout(function () { rot.classList.add("is-live"); rot.style.width = widths[widths.length - 1] + "px"; setTimeout(swap, 60); }, 1500);
    });
  }

  // Course line: each .course-rule draws down as its section scrolls through the viewport.
  function courseLanes() {
    var rules = [].slice.call(document.querySelectorAll(".course-rule"));
    if (!rules.length) return;
    if (reduce) return;
    var ticking = false;
    function update() {
      ticking = false;
      var vh = innerHeight;
      rules.forEach(function (r) {
        var host = r.parentElement.parentElement.getBoundingClientRect();
        var start = vh * 0.75, end = vh * 0.55;
        var p = (start - host.top) / Math.max(1, host.height - (start - end));
        r.style.setProperty("--drawn", Math.max(0, Math.min(1, p)).toFixed(3));
      });
    }
    addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener("resize", update);
    update();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var page = document.body.getAttribute("data-page") || "";
    header(page);
    footer();
    reveal();
    marquees();
    switches();
    rotator();
    courseLanes();
  });
})();
