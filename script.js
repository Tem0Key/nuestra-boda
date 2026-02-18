const $ = (id) => document.getElementById(id)

let lang = "es"
let hasOpened = false

// Google Apps Script Web App URL
const SHEETS_WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbyzYNgu7HbaMhhxQwfwDWCvF5Ge5zSholmqPwQVwiJhkB-cyt61-Oc0oEc0_Bod3hjU/exec"

const SETTINGS = {
  coupleNames: "Marilaura & Artyom",
  dateLine: "18.07.2026",
  heroNames: "MARILAURA & ARTYOM",
}

const copy = {
  es: {
    heroTitle: "¡Nos casamos!",
    scrollBtn: "Ver detalles",
    dearTitle: "Queridos amigos,",
    dearBody:
      "Con muchísima ilusión queremos invitarles a celebrar con nosotros uno de los días más especiales de nuestras vidas.",

    detailsTitle: "Detalles",
    placeTitle: "Lugar",
    placeAddr: "San Petersburgo, поселок Александровская, Волхонское ш., д. 7",
    placeLink: "Ver en el mapa",
    scheduleTitle: "Programa",
    sch1: "Cóctel de bienvenida",
    sch2: "Ceremonia",
    sch3: "Banquete",
    sch4: "Fin",
    dressTitle: "Dress code",
    dressBody1: "Por favor, elijan un look en una paleta tranquila. El blanco lo dejamos para la novia 🤍",
    dressBody2: "El estilo: como se sientan cómodos.",
    giftsTitle: "Regalos",
    giftsBody:
      "El mejor regalo es su presencia y buen ánimo. Si quieren apoyarnos, agradeceremos una contribución al presupuesto familiar.",
    giftsNote: "Flores no son necesarias — no tendremos tiempo para disfrutarlas.",

    rsvpTitle: "RSVP",
    rsvpSubtitle: "Por favor, confirmen su asistencia antes de mayo.",
    nameLabel: "Tu nombre",
    attendLegend: "¿Vendrás?",
    attYesText: "Puedo ir 🤍",
    attNoText: "No podré",
    plusOneLabel: "Vendré con pareja (nombres)",
    drinksLegend: "¿Qué prefieres beber?",
    drinkWineText: "Vino",
    drinkChampagneText: "Champán",
    drinkWhiskeyText: "Whisky",
    drinkVodkaText: "Vodka",
    drinkNoAlcoholText: "Sin alcohol",
    rsvpSubmitText: "Enviar",
    rsvpHint: "Tus respuestas se guardarán en nuestra tabla.",

    toastSent: "¡Gracias! Hemos recibido tu respuesta.",
    toastNeedName: "Por favor, escribe tu nombre.",
    toastNeedAttendance: "Por favor, elige si vienes o no.",
    toastError: "Ups… no pudimos enviar el formulario. Inténtalo de nuevo un poco más tarde.",
  },

  ru: {
    heroTitle: "Мы женимся!",
    scrollBtn: "Детали",
    dearTitle: "Дорогие друзья,",
    dearBody:
      "С огромной радостью приглашаем вас разделить с нами один из самых важных дней в нашей жизни.",

    detailsTitle: "Детали",
    placeTitle: "Место",
    placeAddr: "Санкт-Петербург, п. Александровская (Пушкинский район), Волхонское ш., д. 7",
    placeLink: "Открыть карту",
    scheduleTitle: "Расписание",
    sch1: "Приветственный фуршет",
    sch2: "Свадебная церемония",
    sch3: "Начало банкета",
    sch4: "Завершение мероприятия",
    dressTitle: "Дресс-код",
    dressBody1: "Пожалуйста, выберите наряд в спокойной палитре. Белый оставим невесте 🤍",
    dressBody2: "Стиль — как вам комфортно.",
    giftsTitle: "Про подарки",
    giftsBody:
      "Самый лучший подарок — ваше присутствие и тёплое настроение. Если хочется порадовать нас, будем благодарны вкладу в семейный бюджет.",
    giftsNote: "Цветы можно не дарить — мы не успеем ими насладиться.",

    rsvpTitle: "RSVP",
    rsvpSubtitle: "Пожалуйста, подтвердите присутствие до мая.",
    nameLabel: "Ваше имя",
    attendLegend: "Вы придёте?",
    attYesText: "Смогу прийти 🤍",
    attNoText: "К сожалению, не смогу",
    plusOneLabel: "Приду с парой (укажите имена)",
    drinksLegend: "Что предпочитаете пить?",
    drinkWineText: "Вино",
    drinkChampagneText: "Шампанское",
    drinkWhiskeyText: "Виски",
    drinkVodkaText: "Водка",
    drinkNoAlcoholText: "Без алкоголя",
    rsvpSubmitText: "Отправить",
    rsvpHint: "Ваш ответ сохранится в нашей таблице.",

    toastSent: "Спасибо! Мы получили ваш ответ.",
    toastNeedName: "Пожалуйста, укажите имя.",
    toastNeedAttendance: "Пожалуйста, выберите: сможете прийти или нет.",
    toastError: "Ой… не получилось отправить форму. Попробуйте ещё раз чуть позже.",
  },

  en: {
    heroTitle: "We’re getting married",
    scrollBtn: "View details",
    dearTitle: "Dear friends,",
    dearBody:
      "We would love to celebrate this special day with you. Your presence means the world to us.",

    detailsTitle: "Details",
    placeTitle: "Venue",
    placeAddr: "Saint Petersburg, Aleksandrovskaya, Volkhonskoye highway, 7",
    placeLink: "Open map",
    scheduleTitle: "Schedule",
    sch1: "Welcome drinks",
    sch2: "Ceremony",
    sch3: "Dinner",
    sch4: "End",
    dressTitle: "Dress code",
    dressBody1: "Please choose an outfit in a calm palette. White is reserved for the bride 🤍",
    dressBody2: "Style: whatever feels comfortable.",
    giftsTitle: "Gifts",
    giftsBody:
      "The best gift is your presence and good vibes. If you’d like to support us, a contribution to our family budget would be appreciated.",
    giftsNote: "No need for flowers — we won’t have time to enjoy them.",

    rsvpTitle: "RSVP",
    rsvpSubtitle: "Please confirm your attendance by May.",
    nameLabel: "Your name",
    attendLegend: "Will you attend?",
    attYesText: "I can make it 🤍",
    attNoText: "Sadly, I can’t",
    plusOneLabel: "I’m coming with a plus one (names)",
    drinksLegend: "What would you like to drink?",
    drinkWineText: "Wine",
    drinkChampagneText: "Champagne",
    drinkWhiskeyText: "Whiskey",
    drinkVodkaText: "Vodka",
    drinkNoAlcoholText: "No alcohol",
    rsvpSubmitText: "Send",
    rsvpHint: "Your RSVP will be saved to our spreadsheet.",

    toastSent: "Thank you! We received your RSVP.",
    toastNeedName: "Please enter your name.",
    toastNeedAttendance: "Please choose whether you’re coming.",
    toastError: "Oops… we couldn’t send the form. Please try again in a bit.",
  },
}

function setText(id, value) {
  const el = $(id)
  if (!el) return
  if (el.tagName === "INPUT") el.placeholder = value
  else el.textContent = value
}

function renderStatic() {
  setText("brandNames", SETTINGS.coupleNames)
  setText("heroNames", SETTINGS.heroNames)
  setText("heroDate", SETTINGS.dateLine)
}

function renderLang() {
  const t = copy[lang]

  $("btnES")?.classList.toggle("is-active", lang === "es")
  $("btnRU")?.classList.toggle("is-active", lang === "ru")
  $("btnEN")?.classList.toggle("is-active", lang === "en")

  setText("heroTitle", t.heroTitle)
  setText("scrollBtn", t.scrollBtn)

  setText("dearTitle", t.dearTitle)
  setText("dearBody", t.dearBody)

  // Details
  setText("detailsTitle", t.detailsTitle)
  setText("placeTitle", t.placeTitle)
  setText("placeAddr", t.placeAddr)
  setText("placeLink", t.placeLink)
  setText("scheduleTitle", t.scheduleTitle)
  setText("sch1", t.sch1)
  setText("sch2", t.sch2)
  setText("sch3", t.sch3)
  setText("sch4", t.sch4)
  setText("dressTitle", t.dressTitle)
  setText("dressBody1", t.dressBody1)
  setText("dressBody2", t.dressBody2)
  setText("giftsTitle", t.giftsTitle)
  setText("giftsBody", t.giftsBody)
  setText("giftsNote", t.giftsNote)

  // RSVP
  setText("rsvpTitle", t.rsvpTitle)
  setText("rsvpSubtitle", t.rsvpSubtitle)
  setText("nameLabel", t.nameLabel)
  setText("attendLegend", t.attendLegend)
  setText("attYesText", t.attYesText)
  setText("attNoText", t.attNoText)
  setText("plusOneLabel", t.plusOneLabel)
  setText("drinksLegend", t.drinksLegend)
  setText("drinkWineText", t.drinkWineText)
  setText("drinkChampagneText", t.drinkChampagneText)
  setText("drinkWhiskeyText", t.drinkWhiskeyText)
  setText("drinkVodkaText", t.drinkVodkaText)
  setText("drinkNoAlcoholText", t.drinkNoAlcoholText)
  setText("rsvpSubmitText", t.rsvpSubmitText)
  setText("rsvpHint", t.rsvpHint)

  document.documentElement.lang = lang
}

/* particles (burst around heart) */
const PARTICLES = ["💛", "⭐", "✨", "🌸", "🌼", "💕"]

function spawnParticle(layer, x0, y0, vx, vy) {
  const p = document.createElement("span")
  p.className = "p"
  p.textContent = PARTICLES[Math.floor(Math.random() * PARTICLES.length)]
  layer.appendChild(p)

  const driftX = vx * (140 + Math.random() * 240) + (Math.random() * 60 - 30)
  const driftY = vy * (240 + Math.random() * 360) + (Math.random() * 40 - 20)

  const rot = (Math.random() * 160 - 80).toFixed(1)
  const scale = (0.82 + Math.random() * 0.58).toFixed(2)
  const dur = 7000 + Math.random() * 3800

  p.style.left = `${x0}px`
  p.style.top = `${y0}px`

  p.animate(
    [
      { transform: `translate(0,0) rotate(0deg) scale(${scale})`, opacity: 0 },
      {
        transform: `translate(${driftX * 0.28}px, ${driftY * 0.28}px) rotate(${rot}deg) scale(${scale})`,
        opacity: 0.95,
        offset: 0.2,
      },
      { transform: `translate(${driftX}px, ${driftY}px) rotate(${rot * 2}deg) scale(${scale})`, opacity: 0 },
    ],
    { duration: dur, easing: "cubic-bezier(.16,1,.22,1)", fill: "forwards" }
  )

  setTimeout(() => p.remove(), dur + 250)
}

function particleBurstFromHeart() {
  const layer = $("particles")
  const btn = $("heartBtn")
  if (!layer || !btn) return

  const r = btn.getBoundingClientRect()
  const lr = layer.getBoundingClientRect()

  const cx = (r.left + r.right) / 2 - lr.left
  const cy = (r.top + r.bottom) / 2 - lr.top
  const radius = Math.min(r.width, r.height) / 2 - 10

  const total = 44
  const spawnDuration = 900
  const start = performance.now()
  let spawned = 0

  function tick(now) {
    const progress = Math.min(1, (now - start) / spawnDuration)
    const target = Math.floor(total * progress)

    while (spawned < target) {
      const a = Math.random() * Math.PI * 2
      const x = cx + Math.cos(a) * radius + (Math.random() * 10 - 5)
      const y = cy + Math.sin(a) * radius + (Math.random() * 10 - 5)
      const vx = Math.cos(a)
      const vy = Math.sin(a) - 0.25

      spawnParticle(layer, x, y, vx, vy)
      spawned++
    }

    if (progress < 1) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}

function goToHero() {
  const intro = $("intro")
  const content = $("content")
  if (!intro || !content) return

  intro.classList.add("is-leaving")

  setTimeout(() => {
    intro.remove()
    content.classList.add("is-visible")
    document.querySelector(".phone-frame")?.scrollTo({ top: 0, behavior: "auto" })
  }, 520)
}

function scrollToSection(id) {
  const frame = document.querySelector(".phone-frame")
  const target = document.getElementById(id)
  if (!frame || !target) return

  const top = target.getBoundingClientRect().top - frame.getBoundingClientRect().top + frame.scrollTop
  frame.scrollTo({ top: Math.max(0, top - 18), behavior: "smooth" })
}

function setRsvpVisibility() {
  const yes = $("attYes")?.checked
  const no = $("attNo")?.checked
  const plus = $("plusOneBlock")
  const drinks = $("drinksBlock")
  if (!plus || !drinks) return

  if (no) {
    plus.style.display = "none"
    drinks.style.display = "none"
    document.querySelectorAll('#drinksBlock input[type="checkbox"]').forEach((c) => (c.checked = false))
  } else {
    plus.style.display = "grid"
    drinks.style.display = "block"
  }

  if (!yes && !no) {
    plus.style.display = "grid"
    drinks.style.display = "block"
  }
}

function toast(msg) {
  const el = $("toast")
  if (!el) return
  el.textContent = msg
  el.classList.add("is-visible")
  clearTimeout(toast._t)
  toast._t = setTimeout(() => el.classList.remove("is-visible"), 2600)
}

function setLoading(isLoading) {
  const btn = $("rsvpSubmit")
  if (!btn) return
  btn.disabled = isLoading
  btn.classList.toggle("is-loading", isLoading)
}

function collectRsvp() {
  const name = $("guestName")?.value?.trim() || ""
  const attendance = document.querySelector('input[name="attendance"]:checked')?.value || ""
  const plusOne = $("plusOne")?.value?.trim() || ""
  const drinks = Array.from(document.querySelectorAll('input[name="drinks"]:checked')).map((x) => x.value)

  return { name, attendance, plusOne, drinks }
}

function assertSheetsConfigured() {
  return !!SHEETS_WEBAPP_URL
}

// IMPORTANT: We intentionally do NOT read the response to avoid CORS issues.
async function sendToSheets(payload) {
  if (!assertSheetsConfigured()) return

  const params = new URLSearchParams()
  params.set("name", payload.name || "")
  params.set("attendance", payload.attendance || "")
  params.set("plusOne", payload.plusOne || "")
  params.set("drinks", (payload.drinks || []).join(", "))
  params.set("lang", lang)
  params.set("ua", navigator.userAgent)
  params.set("page", location.href)
  params.set("ts", new Date().toISOString())

  if (navigator.sendBeacon) {
    const ok = navigator.sendBeacon(SHEETS_WEBAPP_URL, params)
    if (ok) return
  }

  await fetch(SHEETS_WEBAPP_URL, {
    method: "POST",
    mode: "no-cors",
    body: params,
  })
}

document.addEventListener("DOMContentLoaded", () => {
  renderStatic()
  renderLang()

  $("btnES")?.addEventListener("click", () => {
    lang = "es"
    renderLang()
  })
  $("btnRU")?.addEventListener("click", () => {
    lang = "ru"
    renderLang()
  })
  $("btnEN")?.addEventListener("click", () => {
    lang = "en"
    renderLang()
  })

  $("heartBtn")?.addEventListener("click", () => {
    if (hasOpened) return
    hasOpened = true
    particleBurstFromHeart()
    setTimeout(goToHero, 140)
  })

  $("scrollBtn")?.addEventListener("click", () => {
    scrollToSection("details")
  })

  $("attYes")?.addEventListener("change", setRsvpVisibility)
  $("attNo")?.addEventListener("change", setRsvpVisibility)
  setRsvpVisibility()

  $("rsvpForm")?.addEventListener("submit", async (e) => {
    e.preventDefault()

    const t = copy[lang]
    const payload = collectRsvp()

    if (!payload.name) {
      toast(t.toastNeedName)
      $("guestName")?.focus()
      return
    }

    if (!payload.attendance) {
      toast(t.toastNeedAttendance)
      scrollToSection("rsvp")
      return
    }

    setLoading(true)
    try {
      await sendToSheets(payload)
      toast(t.toastSent)
      ;(e.target instanceof HTMLFormElement) && e.target.reset()
      setRsvpVisibility()
    } catch (err) {
      console.warn(err)
      // Even if browser blocks the response, the request may have reached GAS.
      toast(t.toastSent)
    } finally {
      setLoading(false)
    }
  })
})
