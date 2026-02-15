$(function () {
  // Materialize init
  $(".parallax").parallax();
  $(".button-collapse").sideNav();

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw5fpw6247X95XIrv0MhTlXR3Sqy-eqc0EyoxWZ1nIr8KA3FEJ1sbv3sIAyJ87_GAGr/exec"; // .../exec

  // Alerts i18n (по lang страницы)
  const pageLang = (document.documentElement.getAttribute("lang") || "ru").toLowerCase();
  const ALERTS = {
    ru: {
      ok: "Спасибо! Ответ отправлен 🤍",
      fail: "Не получилось отправить. Попробуйте ещё раз 🙏"
    },
    es: {
      ok: "¡Gracias! Tu respuesta ha sido enviada 🤍",
      fail: "No se pudo enviar. Por favor, inténtalo de nuevo 🙏"
    }
  };
  const MSG = ALERTS[pageLang] || ALERTS.ru;

    let isSubmitting = false;

  $("#rsvp-form").on("submit", function (e) {
    e.preventDefault();
    if (isSubmitting) return;

    const $form = $(this);
    const $btn = $form.find('button[type="submit"]');
    const originalBtnHtml = $btn.html();

    // UI: мгновенная реакция
    isSubmitting = true;
    $btn.addClass("is-loading").prop("disabled", true);
    $btn.html(`<span class="btn-spinner"></span>${pageLang === "es" ? "Enviando..." : "Отправляем..."}`);

    // (не обязательно) можно показать ненавязчивое сообщение вместо alert
    if (window.M && typeof M.toast === "function") {
      M.toast({ html: pageLang === "es" ? "Enviando..." : "Отправляем...", displayLength: 2000 });
    }

    const name = ($("#guest-name").val() || "").trim();
    const attendance = $('input[name="attendance"]:checked').val() || "";
    const plusOne = ($("#plus-one").val() || "").trim();

    const drinks = [];
    $('input[name="drink"]:checked').each(function () {
      drinks.push($(this).val());
    });

    const payload = new URLSearchParams();
    payload.append("name", name);
    payload.append("attendance", attendance);
    payload.append("plusOne", plusOne);
    drinks.forEach(d => payload.append("drink", d));

    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: payload
    })
      .then(() => {
        // успех
        if (window.M && typeof M.toast === "function") {
          M.toast({ html: MSG.ok, displayLength: 3500 });
        } else {
          alert(MSG.ok);
        }

        $form[0].reset();
        if (typeof toggleRsvpExtras === "function") toggleRsvpExtras();
      })
      .catch(() => {
        // ошибка
        if (window.M && typeof M.toast === "function") {
          M.toast({ html: MSG.fail, displayLength: 4000 });
        } else {
          alert(MSG.fail);
        }
      })
      .finally(() => {
        // вернуть кнопку
        isSubmitting = false;
        $btn.removeClass("is-loading").prop("disabled", false);
        $btn.html(originalBtnHtml);
      });
  });


  function toggleRsvpExtras() {
    const no = $("#att-no").is(":checked");
    $("#plusone-block, #drinks-block").toggleClass("is-hidden", no);

    if (no) {
      $("#plus-one").val("");
      $("#drinks-block input[type='checkbox']").prop("checked", false);
    }
  }

  toggleRsvpExtras();
  $(document).on("change", "input[name='attendance']", toggleRsvpExtras);

  // NAV: transparent -> glass on scroll
  const $nav = $("nav");
  const SCROLL_Y = 20;

  function updateNav() {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    $nav.toggleClass("is-scrolled", y > SCROLL_Y);
  }

  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });

  // Smooth scroll for same-page anchors
  $(document).on("click", 'a[href*="#"]', function (event) {
    const href = $(this).attr("href");
    if (!href || href === "#" || href === "#0") return;

    const samePath =
      location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "");
    const sameHost = location.hostname === this.hostname;
    if (!samePath || !sameHost) return;

    const hash = this.hash;
    if (!hash) return;

    let $target = $(hash);
    if (!$target.length) {
      const name = hash.slice(1);
      $target = $("[name='" + name + "']");
    }
    if (!$target.length) return;

    event.preventDefault();

    // close mobile nav if open
    $(".button-collapse").sideNav("hide");

    $("html, body")
      .stop(true)
      .animate({ scrollTop: $target.offset().top }, 650);
  });
});
