(function () {
  "use strict";

  // Header shrink on scroll
  var header = document.getElementById("siteHeader");
  var onScroll = function () {
    if (window.scrollY > 16) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile Navigation Drawer
  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("siteNav");
  var navBackdrop = document.getElementById("navBackdrop");

  var openMenu = function () {
    siteNav.classList.add("is-open");
    navToggle.classList.add("is-active");
    navToggle.setAttribute("aria-expanded", "true");
    navBackdrop.classList.add("is-active");
    document.body.style.overflow = "hidden";
  };

  var closeMenu = function () {
    siteNav.classList.remove("is-open");
    navToggle.classList.remove("is-active");
    navToggle.setAttribute("aria-expanded", "false");
    navBackdrop.classList.remove("is-active");
    document.body.style.overflow = "";
  };

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      if (siteNav.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (navBackdrop) {
      navBackdrop.addEventListener("click", closeMenu);
    }

    // Close when clicking nav links
    var navLinks = siteNav.querySelectorAll("a");
    navLinks.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Close on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && siteNav.classList.contains("is-open")) {
        closeMenu();
      }
    });
  }

  // Scroll Reveal Animation
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealTargets = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );
    revealTargets.forEach(function (el) {
      io.observe(el);
    });
  }

  // FAQ Accordion with Accessibility
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    var answer = item.querySelector(".faq-a");

    var setHeight = function () {
      var isOpen = item.classList.contains("is-open");
      answer.style.maxHeight = isOpen ? answer.scrollHeight + "px" : "0px";
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    };

    setHeight();

    btn.addEventListener("click", function () {
      var willOpen = !item.classList.contains("is-open");

      // Close other items
      faqItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove("is-open");
          other.querySelector(".faq-a").style.maxHeight = "0px";
          other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        }
      });

      if (willOpen) {
        item.classList.add("is-open");
      } else {
        item.classList.remove("is-open");
      }
      setHeight();
    });

    window.addEventListener("resize", function () {
      if (item.classList.contains("is-open")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // Ticker de serviços: clona o conjunto de itens até cobrir 2x a largura da tela,
  // para o loop nunca ficar em branco em telas largas.
  var ticker = document.getElementById("localityTicker");
  var tickerTrack = document.getElementById("tickerTrack");
  if (ticker && tickerTrack) {
    var baseItemsHTML = tickerTrack.innerHTML;
    var baseSetWidth = 0;

    var buildTicker = function () {
      tickerTrack.classList.remove("is-ready");
      tickerTrack.style.animation = "none";
      tickerTrack.innerHTML = baseItemsHTML;
      baseSetWidth = tickerTrack.getBoundingClientRect().width;
      if (!baseSetWidth) return;

      var target = ticker.getBoundingClientRect().width * 2 + baseSetWidth;
      var html = baseItemsHTML;
      var copies = 1;
      while (copies * baseSetWidth < target && copies < 30) {
        html += baseItemsHTML;
        copies++;
      }
      tickerTrack.innerHTML = html;

      var pxPerSecond = 55;
      var duration = baseSetWidth / pxPerSecond;
      tickerTrack.style.setProperty("--ticker-distance", "-" + baseSetWidth + "px");
      tickerTrack.style.setProperty("--ticker-duration", duration + "s");
      // Força reflow antes de reativar a animação, senão o navegador não reinicia do zero.
      void tickerTrack.offsetWidth;
      tickerTrack.style.animation = "";
      if (!reduceMotion) tickerTrack.classList.add("is-ready");
    };

    buildTicker();
    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildTicker, 200);
    });
  }

  // Tilt 3D nos cards de serviço + botão magnético (referência: phenomenonstudio.com)
  if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll(".service-card").forEach(function (card) {
      var raf = null;
      card.addEventListener("mousemove", function (e) {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          var r = card.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width - 0.5;
          var y = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform =
            "translateY(-6px) rotateX(" + (y * -8).toFixed(2) + "deg) rotateY(" + (x * 10).toFixed(2) + "deg)";
        });
      });
      card.addEventListener("mouseleave", function () {
        if (raf) cancelAnimationFrame(raf);
        card.style.transform = "";
      });
    });

    document.querySelectorAll(".btn-primary, .nav-cta").forEach(function (btn) {
      var raf2 = null;
      btn.addEventListener("mousemove", function (e) {
        if (raf2) cancelAnimationFrame(raf2);
        raf2 = requestAnimationFrame(function () {
          var r = btn.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width - 0.5;
          var y = (e.clientY - r.top) / r.height - 0.5;
          btn.style.transform = "translate(" + (x * 10).toFixed(1) + "px, " + (y * 8).toFixed(1) + "px)";
        });
      });
      btn.addEventListener("mouseleave", function () {
        if (raf2) cancelAnimationFrame(raf2);
        btn.style.transform = "";
      });
    });
  }
})();
