/*
  Course cards, shared by the home, education, courses, course and diagnostic pages.
  courseCard(course, { small: true }) returns the HTML for one card; data comes from courses.js.
*/
(function () {
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  window.esc = esc;
  window.courseCard = function (c) {
    var cat = window.categoryById(c.category), track = window.TRACKS[c.track];
    var pills = "";
    if (c.prereq) pills += '<span class="tag t">Start here</span>';
    if (c.type === "template") pills += '<span class="tag line">Template</span>';
    if (c.draft) pills += '<span class="tag line">Working title</span>';
    return '<a class="cc ' + c.track + '" href="course.html?id=' + esc(c.id) + '">' +
      '<div class="cc-art coast" data-coast="' + esc(c.id) + '" data-palette="' + c.track + '" data-size="card">' +
        '<span class="tag cat-' + esc(c.category) + '">' + esc(cat ? cat.name : "") + "</span></div>" +
      '<div class="cc-body">' +
        '<div class="cc-top"><span class="ref">' + esc(track.name) + "</span>" + pills + "</div>" +
        "<h3>" + esc(c.title) + "</h3>" +
        "<p>" + esc(c.blurb) + "</p>" +
        '<div class="cc-meta"><span>' + esc(c.level) + "</span><span>" + (c.type === "template" ? "Download" : "[X] lessons · [X] hrs") + "</span></div>" +
      "</div></a>";
  };
})();
