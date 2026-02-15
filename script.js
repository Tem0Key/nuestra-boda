$(function () {
  // Materialize init
  $(".parallax").parallax();
  $(".button-collapse").sideNav();

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw5fpw6247X95XIrv0MhTlXR3Sqy-eqc0EyoxWZ1nIr8KA3FEJ1sbv3sIAyJ87_GAGr/exec"; // .../exec

$("#rsvp-form").on("submit", function (e) {
  e.preventDefault();

  const name = ($("#guest-name").val() || "").trim();
  const attendance = $('input[name="attendance"]:checked').val() || "";
  const plusOne = ($("#plus-one").val() || "").trim();

  // собираем напитки
  const drinks = [];
  $('input[name="drink"]:checked').each(function () {
    drinks.push($(this).val());
  });

  // если не сможет — можно отправлять только имя+attendance
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
    alert("Спасибо! Ответ отправлен 🤍");
    $("#rsvp-form")[0].reset();
    // чтобы снова показались/скрылись блоки по твоей логике
    if (typeof toggleRsvpExtras === "function") toggleRsvpExtras();
  })
  .catch(() => {
    alert("Не получилось отправить. Попробуйте ещё раз 🙏");
  });
});
    
    function toggleRsvpExtras() {
  const no = $("#att-no").is(":checked");
  $("#plusone-block, #drinks-block").toggleClass("is-hidden", no);

  // если скрыли — очистим значения
  if (no) {
    $("#plus-one").val("");
    $("#drinks-block input[type='checkbox']").prop("checked", false);
  }
}

// при загрузке и при смене выбора
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
