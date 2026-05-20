// Experience Center — Video helpers (lazy YouTube + MP4 UI overlay)

(function () {
  'use strict';

  // Use the exact video from the requirement (3faSiEX0jSg)
  var YT_EMBED_SRC_BASE = 'https://www.youtube.com/embed/3faSiEX0jSg?';

  function buildYouTubeEmbedSrc() {
    // Ensures privacy-friendly embed params.
    // - enablejsapi=0 (no heavy API)
    // - rel=0 (reduce related videos)
    // - modestbranding=1
    return (
      YT_EMBED_SRC_BASE +
      'autoplay=0&controls=1&rel=0&modestbranding=1&playsinline=1&origin=' +
      encodeURIComponent(window.location.origin || '')
    );
  }

  function ensureYouTubeIframe(cardRoot) {
    if (!cardRoot) return;
    if (cardRoot.dataset.youtubeLoaded === 'true') return;

    var lazyEl = document.getElementById('experience-youtube-lazy');
    if (!lazyEl) return;

    // If IntersectionObserver triggered, lazyEl is already in view.
    var iframe = document.createElement('iframe');
    iframe.title = 'MDS Bxnx Virtual Tour (YouTube)';
    iframe.loading = 'lazy';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');

    // Extract embed src.
    iframe.src = buildYouTubeEmbedSrc();

    // Replace the lazy container content.
    lazyEl.replaceWith(iframe);

    // Mark loaded
    cardRoot.dataset.youtubeLoaded = 'true';
  }

  function initOverlays() {
    // MP4 overlay: click focuses native controls.
    var mp4Overlay = document.querySelector('[data-mp4-overlay]');
    var mp4 = document.getElementById('experience-mp4');

    if (mp4Overlay && mp4) {
      var playFn = function () {
        try {
          mp4.focus();
          if (mp4.paused) {
            // Attempt playback; may be blocked until user gesture (we are within gesture).
            mp4.play().catch(function () {
              // Keep silent; fallback UI already exists.
            });
          }
        } catch (e) {
          // No-op
        }
      };

      mp4Overlay.addEventListener('click', playFn);
      mp4Overlay.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          playFn();
        }
      });
    }

    // YouTube overlay: loads iframe when clicked (and ensures focus/keyboard).
    var ytOverlay = document.querySelector('[data-youtube-overlay]');
    var experienceSection = document.getElementById('experience-center');
    if (ytOverlay && experienceSection) {
      var ytPlayFn = function () {
        // Lazy-load iframe on interaction.
        ensureYouTubeIframe(experienceSection);

        // After injecting, focus iframe for accessibility.
        // Note: iframe is focusable in some browsers; still OK.
        var iframe = experienceSection.querySelector('iframe');
        if (iframe) iframe.focus();
      };

      ytOverlay.addEventListener('click', function () {
        ytPlayFn();
      });
      ytOverlay.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          ytPlayFn();
        }
      });
    }
  }

  // Exposed init used by script.js
  window.initExperienceCenter = function () {
    var section = document.getElementById('experience-center');
    if (!section) return;

    // MP4 metadata is already set via preload="metadata".

    // YouTube lazy: use IntersectionObserver for perf.
    var youtubeCardRoot = section.querySelector('[data-video-provider="youtube"]');

    if (youtubeCardRoot) {
      if ('IntersectionObserver' in window) {
        var obs = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                ensureYouTubeIframe(section);
                obs.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
        );

        obs.observe(youtubeCardRoot);
      } else {
        // Fallback: load when user scrolls near.
        ensureYouTubeIframe(section);
      }
    }

    initOverlays();
  };
})();

