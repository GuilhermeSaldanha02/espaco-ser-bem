(function () {
  "use strict";

  // Entrada do hero (uma vez, no load).
  // Importante: NÃO usar requestAnimationFrame aqui — rAF fica pausado em abas
  // em segundo plano, e se o site abrir numa aba de fundo a entrada nunca dispara
  // e o hero fica com opacity:0 pra sempre. setTimeout roda independente de foco.
  var heroEl = document.getElementById("hero");
  if (heroEl) {
    setTimeout(function () {
      heroEl.classList.add("is-loaded");
    }, 60);
  }

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
      var pos = { x: 0, y: 0 };
      var pressed = false;

      var render = function () {
        var scale = pressed ? 0.94 : 1;
        btn.style.transform = "translate(" + pos.x.toFixed(1) + "px, " + pos.y.toFixed(1) + "px) scale(" + scale + ")";
      };

      btn.addEventListener("mousemove", function (e) {
        if (raf2) cancelAnimationFrame(raf2);
        raf2 = requestAnimationFrame(function () {
          var r = btn.getBoundingClientRect();
          pos.x = ((e.clientX - r.left) / r.width - 0.5) * 10;
          pos.y = ((e.clientY - r.top) / r.height - 0.5) * 8;
          render();
        });
      });
      btn.addEventListener("mouseleave", function () {
        if (raf2) cancelAnimationFrame(raf2);
        pos.x = 0;
        pos.y = 0;
        pressed = false;
        render();
      });
      btn.addEventListener("mousedown", function () {
        pressed = true;
        render();
      });
      btn.addEventListener("mouseup", function () {
        pressed = false;
        render();
      });
    });
  }

  // Parallax leve no hero (blob e marca), enquanto o hero está visível
  if (!reduceMotion) {
    var heroSection = document.getElementById("hero");
    var heroBlob = document.getElementById("heroBlob");
    var heroMark = document.getElementById("heroMark");
    // Os chips (heroChip1/2) já têm seu próprio balanço via CSS (@keyframes float) —
    // animação de CSS sempre vence transform inline, então não disputamos a propriedade com eles aqui.
    if (heroSection && heroBlob) {
      var parallaxTicking = false;
      var updateParallax = function () {
        parallaxTicking = false;
        var r = heroSection.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        var p = -r.top * 0.12;
        heroBlob.style.transform = "translateY(" + (p * 0.6).toFixed(1) + "px)";
        if (heroMark) heroMark.style.transform = "translateY(" + (p * 0.9).toFixed(1) + "px)";
      };
      window.addEventListener(
        "scroll",
        function () {
          if (!parallaxTicking) {
            parallaxTicking = true;
            requestAnimationFrame(updateParallax);
          }
        },
        { passive: true }
      );
    }
  }

  // Cursor customizado sobre cards de serviço e itens do ticker (desktop com mouse fino)
  if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    var cursorEl = document.createElement("div");
    cursorEl.className = "custom-cursor";
    document.body.appendChild(cursorEl);

    var cx = 0, cy = 0, tx = 0, ty = 0;
    document.addEventListener("mousemove", function (e) {
      tx = e.clientX;
      ty = e.clientY;
      cursorEl.classList.add("is-active");
    });
    document.addEventListener("mouseleave", function () {
      cursorEl.classList.remove("is-active");
    });

    var loop = function () {
      cx += (tx - cx) * 0.2;
      cy += (ty - cy) * 0.2;
      cursorEl.style.left = cx + "px";
      cursorEl.style.top = cy + "px";
      requestAnimationFrame(loop);
    };
    loop();

    document.querySelectorAll(".service-card, .locality-ticker .item").forEach(function (el) {
      el.addEventListener("mouseenter", function () { cursorEl.classList.add("is-hovering"); });
      el.addEventListener("mouseleave", function () { cursorEl.classList.remove("is-hovering"); });
    });
  }

  // Nota: um scroll com inércia via JS (window.scrollTo a cada frame) foi tentado e removido.
  // Motivo: o CSS já tem `scroll-behavior: smooth` no html — chamar scrollTo() repetidamente
  // (uma vez por frame) faz cada chamada tentar animar suavemente por cima da anterior,
  // e o scroll trava/nunca converge. Não vale o risco de travar a rolagem pro usuário real.
  // O scroll suave em âncoras (clique no menu, "Conheça os serviços") já vem de graça
  // do `scroll-behavior: smooth`, sem esse problema — é chamado uma vez, não em loop.
})();
