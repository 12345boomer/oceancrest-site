/*
  Painted coast: generates the pastel, brush-textured coastline art used across the site.
  No image files. Every scene is drawn from a seed, so the same course always gets the same painting.

  Usage: put an empty element on the page and the painter fills it on load (and whenever new
  ones appear, for example when the catalog re-renders):

    <div class="coast" data-coast="any-seed" data-palette="hero|technical|mindset|dusk"
         data-size="hero|wide|card|tall" data-scene="cove|headland|beach|open" data-glints></div>

  data-glints adds the animated "light in the water" layer on top of the painting.
  data-water makes the sea itself move: its brushwork is painted as seamless strips that drift
  at three speeds (slow at the horizon, faster up close), under the land and the sun's reflection.
  Every layer is rendered once to an image; only CSS transforms move.
*/
(function () {
  var PALETTES = {
    hero: {
      sky: ["#dcedf7", "#f4e6d8", "#e4e3f4", "#eaf4f8"], sun: "#fde9b8",
      far: ["#c4d0ec", "#b4c8e6", "#cdd6ee"],
      sea: ["#86c8da", "#62aacb", "#a7dbe2", "#4d90bb", "#c3e6e8", "#79bcd6"], deep: "#3b78a3", foam: "#f5fbf9",
      sand: ["#f4e1c0", "#ecd3aa"], land: ["#bcdcc8", "#a3cdb9", "#e7d0c4", "#cfe4c9"], accent: "#f3b39e"
    },
    technical: {
      sky: ["#d6ebf7", "#e6f3f8", "#c9def4", "#dfeef6"], sun: "#fdeec4",
      far: ["#b7cbe9", "#a9c4e4", "#c2d3ee"],
      sea: ["#7fc4d8", "#5fa9c9", "#9fd6e0", "#4a8fb8", "#b9e3e6", "#6db5d2"], deep: "#3c7fa8", foam: "#f2faf8",
      sand: ["#f2e3c6", "#ead6b0"], land: ["#b9d8c6", "#9ecab8", "#cfe4c9", "#a8d1c9"], accent: "#f4b8a2"
    },
    mindset: {
      sky: ["#fae1cf", "#f6e9de", "#e8d6ef", "#fbeadb"], sun: "#fde2a6",
      far: ["#d5c4e6", "#c7b9e0", "#e0cfe9"],
      sea: ["#9cc9e0", "#7fb3d6", "#b9dbe9", "#6c9cc8", "#cfe3ee", "#8fc0dc"], deep: "#5b87b5", foam: "#fbf6f0",
      sand: ["#f6dcb6", "#f0cfa3"], land: ["#e4c6d9", "#d9b8cf", "#f1d3c2", "#e9cfe0"], accent: "#f2a990"
    },
    dusk: {
      sky: ["#f3d3c9", "#e6d3ec", "#f9e4cf", "#efdbe6"], sun: "#fcd9a0",
      far: ["#bdb2db", "#c9b8de", "#b3acd6"],
      sea: ["#8ab5d8", "#6e98c6", "#a9c9e4", "#557fb3", "#c8d9ee", "#7aa7d0"], deep: "#4a6fa3", foam: "#fbf1ec",
      sand: ["#f3d4b4", "#eac39b"], land: ["#cdb6da", "#bfa6d1", "#e9c2c0", "#d8c0e0"], accent: "#f0a48f"
    }
  };
  var SIZES = { hero: [1600, 900], wide: [1600, 560], card: [520, 260], tall: [900, 1200] };
  var SCENES = ["cove", "headland", "beach", "open"];

  function seeded(str) {
    var h = 1779033703 ^ str.length;
    for (var i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
    var a = h >>> 0;
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function f(n) { return Math.round(n * 10) / 10; }

  // A smooth closed shape through points (quadratic curves through midpoints).
  function blob(pts) {
    var d = "M" + f((pts[0][0] + pts[1][0]) / 2) + " " + f((pts[0][1] + pts[1][1]) / 2);
    for (var i = 1; i <= pts.length; i++) {
      var p = pts[i % pts.length], q = pts[(i + 1) % pts.length];
      d += "Q" + f(p[0]) + " " + f(p[1]) + " " + f((p[0] + q[0]) / 2) + " " + f((p[1] + q[1]) / 2);
    }
    return d + "Z";
  }
  function stroke(x, y, len, amp, w, color, op) {
    return '<path d="M' + f(x) + " " + f(y) + "c" + f(len * 0.3) + " " + f(-amp) + " " + f(len * 0.7) + " " + f(amp) + " " + f(len) + ' 0" stroke="' + color +
      '" stroke-width="' + f(w) + '" stroke-linecap="round" fill="none" opacity="' + op.toFixed(2) + '"/>';
  }

  function paint(seed, paletteName, sizeName, sceneName, water) {
    var P = PALETTES[paletteName] || PALETTES.hero;
    var S = SIZES[sizeName] || SIZES.card;
    var W = S[0], H = S[1], k = Math.sqrt((W * H) / (1600 * 900));
    var r = seeded(seed + "|" + paletteName + "|" + sizeName);
    function pick(a) { return a[Math.floor(r() * a.length)]; }
    function between(a, b) { return a + r() * (b - a); }
    var scene = SCENES.indexOf(sceneName) >= 0 ? sceneName : pick(SCENES);
    var id = "p" + Math.floor(r() * 1e9).toString(36);
    var nseed = Math.floor(r() * 999);

    var hy = H * (sizeName === "hero" ? between(0.56, 0.62) : sizeName === "tall" ? between(0.46, 0.52) : between(0.36, 0.58));
    var sx = W * between(0.18, 0.82), sr = Math.min(W, H) * between(0.045, 0.09), sy = hy - H * between(0.08, 0.26);
    var out = [], sea = [], refl = [], front = [], glints = [];

    // Sky: a pale wash, then loose horizontal brushwork.
    out.push('<rect width="' + W + '" height="' + H + '" fill="' + P.sky[0] + '"/>');
    for (var i = 0; i < 34; i++) {
      var y = between(-H * 0.03, hy * 0.97);
      out.push(stroke(between(-W * 0.3, W * 0.8), y, between(W * 0.12, W * 0.6), between(6, 26) * k, between(H * 0.012, H * 0.05), pick(P.sky.slice(1).concat([P.sun])), between(0.35, 0.85)));
    }
    // Sun with a soft halo.
    out.push('<circle cx="' + f(sx) + '" cy="' + f(sy) + '" r="' + f(sr * 2.4) + '" fill="' + P.sun + '" opacity=".35"/>');
    out.push('<circle cx="' + f(sx) + '" cy="' + f(sy) + '" r="' + f(sr) + '" fill="' + P.sun + '"/>');
    // A few gulls.
    if (r() < 0.7) for (var b = 0; b < 3; b++) {
      var bx = between(W * 0.1, W * 0.9), by = between(H * 0.06, hy * 0.6), bs = between(6, 12) * k;
      out.push('<path d="M' + f(bx - bs) + " " + f(by) + "q" + f(bs / 2) + " " + f(-bs / 2) + " " + f(bs) + " 0q" + f(bs / 2) + " " + f(-bs / 2) + " " + f(bs) + ' 0" stroke="' + P.deep + '" stroke-width="' + f(1.6 * k + 0.6) + '" fill="none" stroke-linecap="round" opacity=".55"/>');
    }
    // Distant islands along the horizon.
    var nIsl = 1 + Math.floor(r() * 3);
    for (var j = 0; j < nIsl; j++) {
      var ix = between(-W * 0.1, W * 0.9), iw = between(W * 0.12, W * 0.35), ih = between(H * 0.025, H * 0.07);
      out.push('<path d="' + blob([[ix, hy + 2], [ix + iw * 0.25, hy - ih * 0.7], [ix + iw * 0.55, hy - ih], [ix + iw * 0.85, hy - ih * 0.5], [ix + iw, hy + 2], [ix + iw * 0.5, hy + 6]]) + '" fill="' + pick(P.far) + '"/>');
    }
    // Sea: base, then many brush strokes, denser and finer toward the horizon.
    out.push('<rect y="' + f(hy) + '" width="' + W + '" height="' + f(H - hy) + '" fill="' + P.sea[0] + '"/>');
    var nSea = Math.round(110 * k + 30);
    for (var s = 0; s < nSea; s++) {
      var t = Math.pow(r(), 1.3), yy = hy + 3 + (H - hy) * t;
      sea.push(stroke(between(-W * 0.1, W), yy, between(W * 0.04, W * 0.22) * (0.5 + t), between(1, 5) * k * (0.5 + t), between(1.5, 7) * k * (0.4 + t * 1.4) + 0.8, pick(P.sea.slice(1)), between(0.5, 0.92)));
    }
    // Light in the water: a broken column of reflections under the sun.
    var nRef = Math.round(26 * k + 10);
    for (var q = 0; q < nRef; q++) {
      var tt = q / nRef, ry = hy + 4 + (H * 0.97 - hy) * Math.pow(tt, 1.15);
      var spread = sr * (0.5 + 3 * tt), rx = sx + between(-spread, spread) * 0.8, rl = between(sr * 0.25, sr * 0.9) * (0.6 + tt);
      refl.push(stroke(rx - rl / 2, ry, rl, 1.5 * k, between(1.6, 4.5) * k * (0.6 + tt) + 0.6, r() < 0.5 ? P.sun : "#ffffff", between(0.55, 0.95)));
      if (r() < 0.75) glints.push([rx + between(-rl, rl) * 0.4, ry, rl * between(0.3, 0.7), between(1.4, 3.4) * k * (0.6 + tt) + 0.6]);
    }
    // Scattered sparkles across the rest of the water.
    for (var g = 0; g < Math.round(16 * k + 6); g++) {
      var gt = r(), gy = hy + 6 + (H - hy) * gt * 0.92;
      glints.push([between(0, W), gy, between(6, 22) * k * (0.5 + gt), between(1.2, 2.6) * k + 0.5]);
    }

    // Land, by scene.
    function shore(side, top, reach, low) {
      // side: -1 left, 1 right. Sand drawn first, slightly larger, so a beach edge shows.
      var x0 = side < 0 ? -40 : W + 40, x1 = side < 0 ? W * reach : W * (1 - reach);
      var pts = [[x0, hy - H * top], [x0 + (x1 - x0) * 0.45, hy - H * top * 0.55], [x1, hy + (H - hy) * 0.35], [x0 + (x1 - x0) * 0.8, H * low], [x0 + (x1 - x0) * 0.6, H + 40], [x0, H + 40]];
      var sand = pts.map(function (p) { return [p[0] + (x1 - x0) * 0.06, p[1] + H * 0.02]; });
      sand[0] = [x0, hy - H * top * 0.6]; sand[sand.length - 1] = [x0, H + 40];
      front.push('<path d="' + blob(sand) + '" fill="' + pick(P.sand) + '"/>');
      front.push('<path d="' + blob(pts) + '" fill="' + P.land[0] + '"/>');
      for (var m = 0; m < Math.round(40 * k + 12); m++) {
        var u = r(), v = r();
        var gx = x0 + (x1 - x0) * u * 0.75, gy = hy - H * top * (1 - u) * 0.5 + (H - hy) * (0.15 + v * 0.85);
        front.push(stroke(gx, gy, between(8, 40) * k, between(2, 6) * k, between(2, 6) * k, pick(P.land.slice(1)), between(0.5, 0.9)));
      }
      // Foam where the sea meets the sand.
      for (var fm = 0; fm < 8; fm++) {
        var ft = fm / 8, fx = x1 + (x0 - x1) * 0.12 * ft * (side < 0 ? -1 : 1) + (x1 - x0) * 0.05, fy = hy + (H - hy) * (0.3 + ft * 0.6);
        front.push(stroke(fx - 30 * k, fy, between(40, 110) * k, 3 * k, between(2, 4) * k, P.foam, 0.8));
      }
    }
    if (scene === "cove") { shore(-1, between(0.04, 0.12), between(0.2, 0.34), 0.86); shore(1, between(0.02, 0.08), between(0.14, 0.26), 0.92); }
    if (scene === "headland") shore(r() < 0.5 ? -1 : 1, between(0.16, 0.28), between(0.28, 0.42), 0.84);
    if (scene === "beach" || scene === "open") {
      var by0 = H * (scene === "beach" ? between(0.8, 0.86) : between(0.9, 0.95)), pts = [[-40, by0]];
      for (var bx2 = 1; bx2 <= 6; bx2++) pts.push([W * bx2 / 6, by0 + between(-H * 0.035, H * 0.03)]);
      pts.push([W + 40, H + 40], [-40, H + 40]);
      front.push('<path d="' + blob(pts) + '" fill="' + pick(P.sand) + '"/>');
      for (var fl = 0; fl < 10; fl++) front.push(stroke(between(-20, W), by0 - between(2, 10) * k, between(60, 220) * k, 3 * k, between(2.5, 5) * k, P.foam, 0.85));
      if (scene === "beach") {
        var dx = r() < 0.5 ? -1 : 1, dPts = dx < 0 ? [[-40, H * 0.66], [W * 0.18, H * 0.74], [W * 0.3, H + 40], [-40, H + 40]] : [[W + 40, H * 0.68], [W * 0.8, H * 0.75], [W * 0.68, H + 40], [W + 40, H + 40]];
        front.push('<path d="' + blob(dPts) + '" fill="' + P.land[0] + '"/>');
        for (var gr = 0; gr < Math.round(30 * k + 10); gr++) {
          var gx2 = dx < 0 ? between(0, W * 0.24) : between(W * 0.76, W), gy2 = between(H * 0.74, H);
          front.push('<path d="M' + f(gx2) + " " + f(gy2) + "q" + f(between(-6, 6) * k) + " " + f(-between(14, 34) * k) + " " + f(between(-10, 10) * k) + " " + f(-between(24, 50) * k) + '" stroke="' + pick(P.land.slice(1)) + '" stroke-width="' + f(between(1.5, 3.5) * k) + '" fill="none" stroke-linecap="round"/>');
        }
      }
    }
    // Sometimes a small sailboat.
    if (r() < 0.55) {
      var bx3 = between(W * 0.15, W * 0.85), by3 = hy + (H - hy) * between(0.08, 0.3), bsz = between(14, 24) * k + 4;
      front.push('<path d="M' + f(bx3 - bsz * 0.7) + " " + f(by3) + "h" + f(bsz * 1.4) + "l" + f(-bsz * 0.25) + " " + f(bsz * 0.28) + "h" + f(-bsz * 0.9) + 'z" fill="' + P.deep + '"/>' +
        '<path d="M' + f(bx3) + " " + f(by3 - 2) + "v" + f(-bsz * 1.3) + "l" + f(bsz * 0.7) + " " + f(bsz * 1.2) + 'z" fill="#ffffff"/>' +
        '<path d="M' + f(bx3 - 2) + " " + f(by3 - 3) + "v" + f(-bsz) + "l" + f(-bsz * 0.45) + " " + f(bsz * 0.95) + 'z" fill="' + P.accent + '"/>');
    }

    // Brush texture: roughen every edge, then fleck the paint with light and shadow.
    // A tile filter uses stitched noise over exactly W x H so a strip repeats without a seam.
    function brush(fid, ns, tile) {
      var region = tile ? 'filterUnits="userSpaceOnUse" x="0" y="0" width="' + W + '" height="' + H + '"' : 'x="-5%" y="-5%" width="110%" height="110%"';
      var st = tile ? ' stitchTiles="stitch"' : "";
      return '<filter id="' + fid + '" ' + region + ' color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.011 0.045" numOctaves="3" seed="' + ns + '"' + st + ' result="n"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="n" scale="' + f(Math.max(4, 18 * k) * (tile ? 0.5 : 1)) + '" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency="' + (0.42 / Math.max(k, 0.55)).toFixed(2) + '" numOctaves="2" seed="' + (ns + 7) + '"' + st + ' result="g"/>' +
        '<feColorMatrix in="g" type="matrix" values="0 0 0 0 1 0 0 0 0 0.98 0 0 0 0 0.94 4.2 0 0 0 -2.45" result="hi"/>' +
        '<feComposite in="hi" in2="d" operator="in" result="hi2"/>' +
        '<feColorMatrix in="g" type="matrix" values="0 0 0 0 0.12 0 0 0 0 0.25 0 0 0 0 0.38 0 0 3.6 0 -2.55" result="lo"/>' +
        '<feComposite in="lo" in2="d" operator="in" result="lo2"/>' +
        '<feMerge><feMergeNode in="d"/><feMergeNode in="lo2"/><feMergeNode in="hi2"/></feMerge></filter>';
    }
    function svgOf(parts, fid, ns, tile) {
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + " " + H + '" width="' + W + '" height="' + H + '" preserveAspectRatio="xMidYMid slice">' +
        "<defs>" + brush(fid, ns, tile) + '</defs><g filter="url(#' + fid + ')">' + parts.join("") + "</g></svg>";
    }
    var svg = svgOf(water ? out : out.concat(sea, refl, front), id, nseed);
    var res = { svg: svg, glints: glints, W: W, H: H };
    if (water) {
      // Moving sea: three bands of brushwork, each drawn wrapped around x so it tiles horizontally.
      var wr = seeded(seed + "|water"), BANDS = [[0, 0.3, 0.5], [0.22, 0.62, 0.36], [0.55, 1, 0.3]];
      function wb(a, b) { return a + wr() * (b - a); }
      res.waves = BANDS.map(function (band, bi) {
        var parts = [], n = Math.round((110 * k + 30) * band[2] * 1.15);
        for (var w = 0; w < n; w++) {
          var t = band[0] + (band[1] - band[0]) * Math.pow(wr(), 1.2), yy = hy + 3 + (H - hy) * t;
          var len = wb(W * 0.04, W * 0.22) * (0.5 + t), x = wb(0, W), crest = wr() < 0.12;
          var mk = stroke(0, yy, len, wb(1, 5) * k * (0.5 + t), wb(1.5, 7) * k * (0.4 + t * 1.4) * (crest ? 0.45 : 1) + 0.8,
            crest ? P.foam : P.sea[1 + Math.floor(wr() * (P.sea.length - 1))], crest ? wb(0.35, 0.6) : wb(0.5, 0.92));
          [x - W, x, x + W].forEach(function (ox) { parts.push(mk.replace('d="M0 ', 'd="M' + f(ox) + " ")); });
        }
        return svgOf(parts, id + "w" + bi, nseed + 11 * (bi + 1), true);
      });
      res.refl = svgOf(refl, id + "r", nseed + 3);
      res.front = svgOf(front, id + "f", nseed);
      res.hy = hy;
    }
    return res;
  }

  var cache = {};
  function dataUrl(svg) { return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg); }
  function art(seed, palette, size, scene, water) {
    var key = [seed, palette, size, scene, water ? "w" : ""].join("|");
    if (!cache[key]) {
      var p = paint(seed, palette, size, scene, water);
      p.url = dataUrl(p.svg);
      if (water) {
        p.waveUrls = p.waves.map(dataUrl);
        p.reflUrl = dataUrl(p.refl);
        p.frontUrl = dataUrl(p.front);
      }
      cache[key] = p;
    }
    return cache[key];
  }

  function glintLayer(p, seed) {
    var r = seeded(seed + "glints");
    var marks = p.glints.map(function (g) {
      var dur = (2.4 + r() * 3.2).toFixed(2), delay = (-r() * 6).toFixed(2);
      return '<rect class="gl" x="' + f(g[0] - g[2] / 2) + '" y="' + f(g[1] - g[3] / 2) + '" width="' + f(g[2]) + '" height="' + f(g[3]) + '" rx="' + f(g[3] / 2) +
        '" style="animation-duration:' + dur + "s;animation-delay:" + delay + 's"/>';
    }).join("");
    return '<svg class="coast-glints" viewBox="0 0 ' + p.W + " " + p.H + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + marks + "</svg>";
  }

  // The water box matches the painting's object-fit: cover crop, so the moving strips line up with it.
  function waterLayer(p) {
    var bands = p.waveUrls.map(function (u, i) {
      return '<div class="wv wv' + (i + 1) + '"><div class="wv-strip" style="background-image:url(&quot;' + u + '&quot;)"></div></div>';
    }).join("");
    return '<div class="coast-water">' + bands + '<img class="wv-refl" alt="" src="' + p.reflUrl + '"><img class="wv-front" alt="" src="' + p.frontUrl + '"></div>';
  }
  function fitWater(layer, p) {
    var img = layer.querySelector(".coast-img"), box = layer.querySelector(".coast-water");
    function pos(v, free) { return /%$/.test(v) ? parseFloat(v) / 100 * free : parseFloat(v) || free / 2; }
    function fit() {
      var cw = layer.clientWidth, ch = layer.clientHeight;
      if (!cw || !ch) return;
      var sc = Math.max(cw / p.W, ch / p.H), w = p.W * sc, h = p.H * sc;
      var op = getComputedStyle(img).objectPosition.split(" ");
      box.style.width = w + "px"; box.style.height = h + "px";
      box.style.left = pos(op[0] || "50%", cw - w) + "px"; box.style.top = pos(op[1] || "50%", ch - h) + "px";
    }
    fit();
    if (window.ResizeObserver) new ResizeObserver(fit).observe(layer); else window.addEventListener("resize", fit);
  }

  function mount(el) {
    if (el.getAttribute("data-coast-done")) return;
    el.setAttribute("data-coast-done", "1");
    var seed = el.getAttribute("data-coast") || "oceancrest";
    var water = el.hasAttribute("data-water");
    var p = art(seed, el.getAttribute("data-palette") || "hero", el.getAttribute("data-size") || "card", el.getAttribute("data-scene") || "", water);
    var layer = document.createElement("div");
    layer.className = "coast-layer";
    layer.setAttribute("aria-hidden", "true");
    layer.innerHTML = '<img class="coast-img" alt="" src="' + p.url + '">' + (water ? waterLayer(p) : "") +
      (el.hasAttribute("data-glints") ? glintLayer(p, seed) + '<div class="coast-glow"></div>' : "");
    el.insertBefore(layer, el.firstChild);
    if (water) fitWater(layer, p);
    if (el.hasAttribute("data-glints")) {
      el.addEventListener("pointermove", function (e) {
        var b = el.getBoundingClientRect();
        el.style.setProperty("--mx", ((e.clientX - b.left) / b.width * 100).toFixed(1) + "%");
        el.style.setProperty("--my", ((e.clientY - b.top) / b.height * 100).toFixed(1) + "%");
        el.classList.add("lit");
      });
      el.addEventListener("pointerleave", function () { el.classList.remove("lit"); });
    }
  }
  function mountAll(root) { (root || document).querySelectorAll("[data-coast]:not([data-coast-done])").forEach(mount); }

  window.Coast = { paint: paint, art: art, mount: mount, mountAll: mountAll, palettes: PALETTES };

  document.addEventListener("DOMContentLoaded", function () {
    mountAll();
    new MutationObserver(function () { mountAll(); }).observe(document.body, { childList: true, subtree: true });
  });
})();
