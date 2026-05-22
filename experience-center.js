// Experience Center video helpers.
// Videos are rendered directly in HTML so native YouTube and MP4 controls remain clickable.

(function () {
  'use strict';

  window.initExperienceCenter = function () {
    var section = document.getElementById('experience-center');
    if (!section) return;

    var mp4 = document.getElementById('experience-mp4');
    var fallback = section.querySelector('[data-video-provider="mp4"] .experience-video-fallback');

    if (!mp4 || !fallback) return;

    mp4.addEventListener('error', function () {
      fallback.hidden = false;
    });

    mp4.addEventListener('loadeddata', function () {
      fallback.hidden = true;
    });
  };
})();
