/*
  Sea: the sound and touch layer.
  - Soft UI sounds, synthesised with Web Audio (no audio files): a water drop on press,
    a rising pentatonic note on filter chips, a chime when something is finished,
    a small wash when switching tabs, and an optional ambient sea.
  - Ripples where you press, and a burst of light when something is finished.
  - A sound control fixed bottom right. Choices are remembered per browser.

  Hooks for page markup:
    data-sound="chime|wash|none"   override the default press sound
    data-sparkle                    also throw a burst of light on click
*/
(function () {
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function load(k, d) { try { var v = localStorage.getItem(k); return v == null ? d : v; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var prefs = { fx: load("oc-sound", "on") === "on", sea: load("oc-sea", "off") === "on" };
  var ctx, master, seaNodes;

  function audio() {
    if (!ctx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain(); master.gain.value = 0.7;
      var comp = ctx.createDynamicsCompressor();
      master.connect(comp); comp.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function tone(freq, start, dur, gain, type, glideTo) {
    var a = audio(); if (!a) return;
    var o = a.createOscillator(), g = a.createGain(), t = a.currentTime + start;
    o.type = type || "sine";
    o.frequency.setValueAtTime(freq, t);
    if (glideTo) o.frequency.exponentialRampToValueAtTime(glideTo, t + Math.min(dur, 0.12));
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(master);
    o.start(t); o.stop(t + dur + 0.05);
  }

  var noiseBuf;
  function noise() {
    var a = audio(); if (!a) return null;
    if (!noiseBuf) {
      noiseBuf = a.createBuffer(1, a.sampleRate * 4, a.sampleRate);
      var d = noiseBuf.getChannelData(0), last = 0;
      for (var i = 0; i < d.length; i++) { var w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
    }
    var s = a.createBufferSource(); s.buffer = noiseBuf; return s;
  }

  var PENTA = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.51];
  var S = {
    drop: function () {
      var f0 = 480 + Math.random() * 120;
      tone(f0 * 2, 0, 0.22, 0.09, "sine", f0 * 0.85);
      tone(f0 * 3.01, 0.01, 0.12, 0.018, "sine", f0 * 1.6);
    },
    note: function (i) {
      var f0 = PENTA[i % PENTA.length];
      tone(f0, 0, 0.5, 0.06, "sine");
      tone(f0 * 2, 0, 0.25, 0.012, "triangle");
    },
    blip: function () { tone(1400, 0, 0.06, 0.016, "sine", 1100); },
    chime: function () {
      [0, 2, 4, 5].forEach(function (n, i) { tone(PENTA[n], i * 0.075, 1.4, 0.055, "sine"); tone(PENTA[n] * 2, i * 0.075, 0.6, 0.01, "triangle"); });
    },
    wash: function () {
      var a = audio(), s = noise(); if (!s) return;
      var bp = a.createBiquadFilter(), g = a.createGain(), t = a.currentTime;
      bp.type = "bandpass"; bp.Q.value = 0.7;
      bp.frequency.setValueAtTime(300, t); bp.frequency.exponentialRampToValueAtTime(1500, t + 0.35); bp.frequency.exponentialRampToValueAtTime(400, t + 0.9);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.12, t + 0.3); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.95);
      s.connect(bp); bp.connect(g); g.connect(master); s.start(t, Math.random() * 2); s.stop(t + 1);
    }
  };
  function play(name, arg) { if (prefs.fx && S[name]) S[name](arg); }
  window.SeaSound = { play: function (n, a) { play(n, a); } };

  // Ambient sea: brown noise through a low-pass, with slow swells like waves on a beach.
  function seaOn() {
    var a = audio(), s = noise(); if (!s || seaNodes) return;
    s.loop = true;
    var lp = a.createBiquadFilter(), g = a.createGain(), lfo = a.createOscillator(), depth = a.createGain(), lfo2 = a.createOscillator(), depth2 = a.createGain();
    lp.type = "lowpass"; lp.frequency.value = 700;
    g.gain.value = 0.0001; g.gain.setTargetAtTime(0.11, a.currentTime, 1.2);
    lfo.frequency.value = 0.11; depth.gain.value = 0.07; lfo.connect(depth); depth.connect(g.gain);
    lfo2.frequency.value = 0.07; depth2.gain.value = 260; lfo2.connect(depth2); depth2.connect(lp.frequency);
    s.connect(lp); lp.connect(g); g.connect(master);
    s.start(); lfo.start(); lfo2.start();
    seaNodes = { s: s, g: g, lfo: lfo, lfo2: lfo2 };
  }
  function seaOff() {
    if (!seaNodes || !ctx) return;
    var n = seaNodes; seaNodes = null;
    n.g.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.4);
    setTimeout(function () { try { n.s.stop(); n.lfo.stop(); n.lfo2.stop(); } catch (e) {} }, 1600);
  }

  // ---- Ripples and light ----
  var RIPPLE = ".btn, .cc, a.card, .chip, .chips button, .switch button, .seg button, .tabs button, .site-nav > a, .site-nav .dd > button, .dd-panel a, .final .alt a, .opt, .soundbar button";
  function ripple(el, x, y) {
    if (reduce) return;
    var b = el.getBoundingClientRect(), size = Math.max(b.width, b.height) * 2.2;
    var s = document.createElement("span");
    s.className = "ripple";
    s.style.width = s.style.height = size + "px";
    s.style.left = (x - b.left - size / 2) + "px";
    s.style.top = (y - b.top - size / 2) + "px";
    el.appendChild(s);
    setTimeout(function () { s.remove(); }, 700);
  }
  function sparkle(el) {
    if (reduce) return;
    var b = el.getBoundingClientRect(), cx = b.left + b.width / 2, cy = b.top + b.height / 2;
    var colors = ["#fde9b8", "#a7dbe2", "#ffffff", "#7fc4d8", "#f4b8a2"];
    for (var i = 0; i < 16; i++) {
      var p = document.createElement("i"), ang = Math.random() * Math.PI * 2, dist = 40 + Math.random() * 70;
      p.className = "spark";
      p.style.left = cx + "px"; p.style.top = cy + "px";
      p.style.background = colors[i % colors.length];
      p.style.setProperty("--dx", Math.cos(ang) * dist + "px");
      p.style.setProperty("--dy", Math.sin(ang) * dist - 20 + "px");
      p.style.animationDelay = (Math.random() * 0.08).toFixed(2) + "s";
      document.body.appendChild(p);
      setTimeout(function (n) { n.remove(); }.bind(null, p), 1100);
    }
  }
  window.SeaLight = { sparkle: sparkle };

  function soundFor(el) {
    var explicit = el.closest("[data-sound]");
    if (explicit) return explicit.getAttribute("data-sound");
    if (el.closest(".chips button, .finder .chip, .chip")) return "note";
    if (el.closest(".tabs button, .seg button, .switch button")) return "wash";
    if (el.closest(".opt")) return "note";
    return "drop";
  }
  function pressed(target, x, y, keyboard) {
    var el = target.closest(RIPPLE + ", a, button, summary");
    if (!el || el.closest(".soundbar")) return;
    var kind = soundFor(el);
    if (kind === "note") {
      var group = el.parentNode ? Array.prototype.indexOf.call(el.parentNode.children, el) : 0;
      play("note", group);
    } else if (kind === "chime") {
      play("chime");
    } else if (kind !== "none" && kind !== "chime") {
      play(kind);
    }
    if (el.matches(RIPPLE)) {
      if (keyboard) { var b = el.getBoundingClientRect(); x = b.left + b.width / 2; y = b.top + b.height / 2; }
      ripple(el, x, y);
    }
  }
  document.addEventListener("pointerdown", function (e) { if (e.button === 0) pressed(e.target, e.clientX, e.clientY, false); });
  document.addEventListener("click", function (e) {
    if (e.detail === 0) pressed(e.target, 0, 0, true);
    var sp = e.target.closest("[data-sparkle]");
    if (sp) sparkle(sp);
  });
  var lastBlip = 0;
  document.addEventListener("pointerover", function (e) {
    if (e.pointerType !== "mouse" || !ctx) return;
    var card = e.target.closest(".cc");
    if (!card || card.contains(e.relatedTarget)) return;
    var now = Date.now(); if (now - lastBlip < 90) return; lastBlip = now;
    play("blip");
  });

  // ---- Sound control ----
  var ICON_FX_ON = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6"/><path d="M18 6.5a7.5 7.5 0 0 1 0 11"/></svg>';
  var ICON_FX_OFF = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/></svg>';
  var ICON_SEA = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M2.5 9c2.4-2 4.6-2 7 0s4.6 2 7 0 3.6-1.6 5 0"/><path d="M2.5 14c2.4-2 4.6-2 7 0s4.6 2 7 0 3.6-1.6 5 0"/><path d="M2.5 19c2.4-2 4.6-2 7 0s4.6 2 7 0 3.6-1.6 5 0"/></svg>';

  function bar() {
    var wrap = document.createElement("div");
    wrap.className = "soundbar";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", "Sound");
    wrap.innerHTML =
      '<button type="button" data-k="fx"></button>' +
      '<button type="button" data-k="sea"></button>';
    function paintBtns() {
      var fx = wrap.querySelector('[data-k="fx"]'), sea = wrap.querySelector('[data-k="sea"]');
      fx.innerHTML = (prefs.fx ? ICON_FX_ON : ICON_FX_OFF) + "<span>" + (prefs.fx ? "Sounds on" : "Sounds off") + "</span>";
      fx.setAttribute("aria-pressed", prefs.fx); fx.title = "Interface sounds";
      sea.innerHTML = ICON_SEA + "<span>Sea</span>";
      sea.setAttribute("aria-pressed", prefs.sea); sea.title = prefs.sea ? "Turn off the sound of the sea" : "Play the sound of the sea";
    }
    wrap.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      var k = b.getAttribute("data-k");
      prefs[k] = !prefs[k];
      save(k === "fx" ? "oc-sound" : "oc-sea", prefs[k] ? "on" : "off");
      if (k === "fx" && prefs.fx) { audio(); S.drop(); }
      if (k === "sea") { if (prefs.sea) seaOn(); else seaOff(); }
      paintBtns();
    });
    paintBtns();
    document.body.appendChild(wrap);
  }

  // Browsers only allow audio after a gesture: resume the sea on the first one.
  function firstGesture() {
    document.removeEventListener("pointerdown", firstGesture, true);
    document.removeEventListener("keydown", firstGesture, true);
    if (prefs.fx || prefs.sea) audio();
    if (prefs.sea) seaOn();
  }
  document.addEventListener("pointerdown", firstGesture, true);
  document.addEventListener("keydown", firstGesture, true);

  document.addEventListener("DOMContentLoaded", bar);
})();
