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

// --- Invite group from URL: ?g=... ---
const INVITE = (() => {
  const p = new URLSearchParams(location.search)
  const groupId = (p.get("g") || "").trim()
  return { groupId }
})()

// --- Groups config (easy to extend) ---
const GROUPS = {
  "r1": {
    dearTitle: { es: "Queridas mamá, abuela y Nyusik", ru: "Дорогие Мама, бабушка и Аничка", en: "Dear Mom, Grandma and Nyusik" },
    dearBody: {
      es: "Ustedes son la base de nuestra familia, su corazón y sus raíces. Gracias por el amor, el cuidado y la fortaleza que nos han dado y siguen dando. Para nosotros es infinitamente importante que estén a nuestro lado en este día. Sin ustedes, esta celebración simplemente no sería la misma.",
      ru: "Вы — основа нашей семьи, её сердце и её корни. Спасибо вам за любовь, заботу и силу, которые вы дарили и продолжаете дарить. Нам бесконечно важно, что в этот день вы будете рядом с нами. Без вас этот праздник просто не был бы таким, каким мы его чувствуем.",
      en: "You are the foundation of our family — its heart and its roots. Thank you for the love, care, and strength you have given and continue to give. It means the world to us that you will be by our side on this day. Without you, this celebration simply would not feel the same.",
    },
    guestNames: { es: "Mamá, abuela y Nyusik", ru: "Мама, Бабушка, Аня", en: "Mom, Grandma and Nyusik" },
  },
  "r2": {
    dearTitle: { es: "Queridos papá, Tanya y Demid", ru: "Дорогие Папа, Таня и Демид", en: "Dear Dad, Tanya and Demid" },
    dearBody: {
      es: "Gracias por su apoyo, atención y calidez. Para nosotros es muy valioso que estén con nosotros en este día tan importante. Seremos muy felices de compartir nuestra alegría con ustedes y crear juntos un recuerdo familiar más lleno de luz.",
      ru: "Спасибо вам за поддержку, внимание и тёплое отношение. Нам очень ценно, что вы будете рядом в этот важный для нас день. Мы будем счастливы разделить с вами нашу радость и создать вместе ещё одно светлое семейное воспоминание.",
      en: "Thank you for your support, care, and warmth. It means so much to us that you will be by our side on this important day. We will be truly happy to share our joy with you and create another bright family memory together.",
    },
    guestNames: { es: "Papá, Tanya y Demid", ru: "Папа, Таня, Демид", en: "Dad, Tanya and Demid" },
  },
  // ... (tu lista completa sigue igual)
  "r26": {
    dearTitle: { es: "Дядя Женя и тётя Катя", ru: "Дядя Женя и тётя Катя", en: "Дядя Женя и тётя Катя" },
    dearBody: {
      es: "Gracias por su apoyo constante y por recibir a Laura en la familia con tanto cariño y calidez desde el primer momento. Para nosotros significa muchísimo sentir ese abrazo sincero y saber que siempre contamos con ustedes. No podemos imaginar este día sin su presencia y su corazón abierto",
      ru: "Спасибо вам за вашу постоянную поддержку и за то, что вы приняли Лауру в семью с таким теплом и искренностью с самого первого момента. Для нас бесценно чувствовать это родное отношение и знать, что вы всегда рядом. Мы очень счастливы разделить этот день вместе с вами 🤍",
      en: "Thank you for your constant support and for welcoming Laura into the family with such warmth and sincerity from the very beginning. It means so much to us to feel that genuine embrace and to know we can always count on you. We are truly happy to share this day with you 🤍",
    },
    guestNames: { es: "Дядя Женя, тётя Катя", ru: "Дядя Женя, тётя Катя", en: "Дядя Женя, тётя Катя" },
  },
}

// --- Copy ---
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
    placeDescription: "",
    placeLink: "Ver en el mapa",
    scheduleTitle: "Programa",
    sch1: "Cóctel",
    sch1Note: "",
    sch2: "Registro",
    sch2Note: "",
    sch3: "Inicio del banquete",
    sch3Note: "",
    sch4: "Fin de la cena",
    sch4Note:
      "Esperamos que esta noche sea inolvidable, no olviden organizar su transfer de vuelta a casa con anticipación",
    dressTitle: "Dress code",
    dressBody1: "Chic Garden",
    dressBody2: "El dress code es totalmente opcional — lo más importante es que se sientan cómodos🤍",
    giftsTitle: "Regalos",
    giftsBody:
      "Lo más importante para nosotros es su presencia y buena energía. Si desean hacernos un regalo, estaremos agradecidos por una contribución a nuestro presupuesto familiar.",
    giftsNote: "",
    rsvpTitle: "Confirmación de asitencia",
    rsvpSubtitle: "Por favor, confirmen su asistencia antes de mayo.",
    nameLabel: "Tu nombre",
    attendLegend: "¿Vendrás?",
    attYesText: "Puedo ir 🤍",
    attMayBeText: "Puede ser",
    attNoText: "No podré",
    plusOneLabel: "Tengo alergia",
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
    toastNeedAttendance: "Por favor, confirma tu asistencia.",
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
    placeAddr:
      "Санкт-Петербург, п. Александровская (Пушкинский район), Волхонское ш., д. 7",
    placeDescription: "",
    placeLink: "Открыть карту",
    scheduleTitle: "Расписание",
    sch1: "Приветсвенный фуршет",
    sch1Note: "",
    sch2: "Выездная регистрация",
    sch2Note: "",
    sch3: "Начало банкета",
    sch3Note: "",
    sch4: "Завершение ужина",
    sch4Note: "надеемся, праздник запомнится вам",
    dressTitle: "Дресс-код",
    dressBody1: "Chic Garden",
    dressBody2: "Chic Garden",
    giftsTitle: "Про подарки",
    giftsBody:
      "Дресс-код необязателен — для нас важнее ваше присутствие и улыбки 🤍",
    giftsNote:
      "Вместо букетов подарите нам свои улыбки и тёплые объятия. В этот день мы выбираем заботу о природе",
    rsvpTitle:"Подтверждение участия",
    rsvpSubtitle: "Пожалуйста, подтвердите присутствие до 1 мая.",
    nameLabel: "Ваше имя",
    attendLegend: "Вы придёте?",
    attYesText: "Смогу прийти 🤍",
    attMayBeText: "Пока не уверен",
    attNoText: "К сожалению, не смогу",
    plusOneLabel: "Комментарий (аллергия и тп)",
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
    toastNeedAttendance: "Пожалуйста, подтвердите своё участие",
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
    placeDescription: "",
    placeLink: "Open map",
    scheduleTitle: "Schedule",
    sch1: "Welcome cocktail",
    sch1Note: "",
    sch2: "Registration",
    sch2Note: "",
    sch3: "Banquet starts",
    sch3Note: "",
    sch4: "Dinner ends",
    sch4Note: "we hope this night stays with you",
    dressTitle: "Dress code",
    dressBody1: "Chic Garden",
    dressBody2: "The dress code is optional, your presence means more than anything 🤍",
    giftsTitle: "Gifts",
    giftsBody:
      "Your presence is the greatest gift for us. If you’d like to give something, we would truly appreciate a contribution to our family budget.",
    giftsNote: "",
    rsvpTitle: "Attendance confirmation",
    rsvpSubtitle: "Please confirm your attendance by May 1st.",
    nameLabel: "Your name",
    attendLegend: "Will you attend?",
    attYesText: "I can make it 🤍",
    attMayBeText: "Maybe...",
    attNoText: "Sadly, I can’t",
    plusOneLabel: "I have a alergies...",
    drinksLegend: "What would you like to drink?",
    drinkWineText: "Wine",
    drinkChampagneText: "Champagne",
    drinkWhiskeyText: "Whiskey",
    drinkVodkaText: "Vodka",
    drinkNoAlcoholText: "No alcohol",
    rsvpSubmitText: "Send",
    rsvpHint: "Your confirmation will be saved to our spreadsheet.",
    toastSent: "Thank you! We received your RSVP.",
    toastNeedName: "Please enter your name.",
    toastNeedAttendance: "Please confirm your attendance",
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
  setText("heroNames", SETTINGS.heroNames)
  setText("heroDate", SETTINGS.dateLine)
}

function formatScheduleTimes() {
  // (safe even if no elements match)
  document.querySelectorAll("#schedule .t-time").forEach((el) => {
    if (el.querySelector(".sep")) return
    const txt = el.textContent.trim()
    const m = txt.match(/^(\d{1,2})[:.](\d{2})$/)
    if (!m) return
    el.innerHTML = `
      <span class="hh">${m[1]}</span>
      <span class="sep">:</span>
      <span class="mm">${m[2]}</span>
    `
  })
}

function renderLang() {
  const t = copy[lang]

  $("btnES")?.classList.toggle("is-active", lang === "es")
  $("btnRU")?.classList.toggle("is-active", lang === "ru")
  $("btnEN")?.classList.toggle("is-active", lang === "en")

  setText("heroTitle", t.heroTitle)

  // Dear (override per group)
  const group = GROUPS[INVITE.groupId]
  const gTitle = group?.dearTitle?.[lang]
  const gBody = group?.dearBody?.[lang]
  setText("dearTitle", gTitle && gTitle.trim() ? gTitle : t.dearTitle)
  setText("dearBody", gBody && gBody.trim() ? gBody : t.dearBody)

  // Details
  setText("placeTitle", t.placeTitle)
  setText("placeAddr", t.placeAddr)
  setText("placeDescription", t.placeDescription)
  // NOTE: your #placeLink is an <a>, textContent would replace "Abrir →".
  // If you want the button label localized, add a span with id="placeLinkLabel" inside <a>.
  setText("scheduleTitle", t.scheduleTitle)
  setText("sch1", t.sch1)
  setText("sch2", t.sch2)
  setText("sch3", t.sch3)
  setText("sch4", t.sch4)
  setText("sch4Note", t.sch4Note)

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
  setText("attMayBeText", t.attMayBeText)
  setText("attNoText", t.attNoText)
  setText("plusOneLabel", t.plusOneLabel)
  setText("drinksLegend", t.drinksLegend)
  setText("drinkWineText", t.drinkWineText)
  setText("drinkChampagneText", t.drinkChampagneText)
  setText("drinkWhiskeyText", t.drinkWhiskeyText)
  setText("drinkVodkaText", t.drinkVodkaText)
  setText("drinkNoAlcoholText", t.drinkNoAlcoholText)
  setText("rsvpSubmitText", t.rsvpSubmitText)

  document.documentElement.lang = lang
  formatScheduleTimes()
}

function autofillGuestNameFromGroup() {
  const input = $("guestName")
  if (!input) return
  if ((input.value || "").trim()) return

  const group = GROUPS[INVITE.groupId]
  const v = group?.guestNames?.[lang] || group?.guestNames?.ru || group?.guestNames
  if (v && String(v).trim()) input.value = String(v)
}

/* particles (burst around heart) */
const PARTICLES = ["🤍", "🌸", "🩷", "💫", "🤍", "🌸", "🩷", "💫"]

function spawnParticle(layer, x0, y0, vx, vy) {
  const p = document.createElement("span")
  p.className = "p"
  p.textContent = PARTICLES[Math.floor(Math.random() * PARTICLES.length)]
  layer.appendChild(p)

  const driftX = vx * (60 + Math.random() * 120) + (Math.random() * 30 - 15)
  const driftY = vy * (100 + Math.random() * 160) + (Math.random() * 20 - 10)

  const rot = (Math.random() * 160 - 80).toFixed(1)
  const scale = (0.82 + Math.random() * 0.58).toFixed(2)
  const dur = 9500 + Math.random() * 4500

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
    { duration: dur, easing: "cubic-bezier(.22,.61,.36,1)", fill: "forwards" }
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

  setTimeout(() => {
    intro.remove()
    content.classList.add("is-visible")

    // reveal hero text
    requestAnimationFrame(() => {
      document.querySelector(".hero")?.classList.add("is-revealed")
    })

    document.querySelector(".phone-frame")?.scrollTo({ top: 0, behavior: "auto" })

    // show scroll button ONLY after opening
    document.getElementById("scrollNextWrap")?.classList.add("is-visible")
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
  const maybe = $("attMaybe")?.checked
  const no = $("attNo")?.checked
  const plus = $("plusOneBlock")
  const drinks = $("drinksBlock")
  if (!plus || !drinks) return

  if (no) {
    plus.style.display = "none"
    drinks.style.display = "none"
    document.querySelectorAll('#drinksBlock input[type="checkbox"]').forEach((c) => (c.checked = false))
  } else if (yes || maybe) {
    plus.style.display = "grid"
    drinks.style.display = "block"
  } else {
    plus.style.display = "none"
    drinks.style.display = "none"
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
  params.set("group", INVITE.groupId || "")
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

/* ============================= */
/* Scroll button overlay to frame */
/* ============================= */
function pinScrollButtonToFrame() {
  const frame = document.querySelector(".phone-frame")
  const wrap = document.getElementById("scrollNextWrap")
  if (!frame || !wrap) return

  const r = frame.getBoundingClientRect()
  wrap.style.left = `${r.left}px`
  wrap.style.top = `${r.top}px`
  wrap.style.width = `${r.width}px`
  wrap.style.height = `${r.height}px`
}

/* ============================= */
/* Cancelable smooth scrolling    */
/* ============================= */
let cancelScrollAnim = null

function smoothScrollFrameTo(frame, targetTop, duration = null) {
  // cancel previous animation
  cancelScrollAnim?.()

  const startTop = frame.scrollTop
  const maxTop = frame.scrollHeight - frame.clientHeight
  const endTop = Math.max(0, Math.min(maxTop, targetTop))

  const dist = Math.abs(endTop - startTop)
  if (dist < 2) return

  const dur =
    duration ??
    Math.max(520, Math.min(1250, Math.round(dist * 0.8))) // clamp 520..1250ms

  let raf = 0
  let cancelled = false
  const start = performance.now()

  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

  // Disable snap during animation
  const prevSnap = frame.style.scrollSnapType
  frame.style.scrollSnapType = "none"

  const restoreSnapLater = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        frame.style.scrollSnapType = prevSnap || ""
      })
    })
  }

  const cancel = () => {
    if (cancelled) return
    cancelled = true
    if (raf) cancelAnimationFrame(raf)
    raf = 0
    restoreSnapLater()
  }

  cancelScrollAnim = cancel

  const tick = (now) => {
    if (cancelled) return
    const t = Math.min(1, (now - start) / dur)
    const eased = easeInOutCubic(t)
    frame.scrollTop = startTop + (endTop - startTop) * eased

    if (t < 1) {
      raf = requestAnimationFrame(tick)
      return
    }

    frame.scrollTop = endTop
    restoreSnapLater()
  }

  raf = requestAnimationFrame(tick)
}

function scrollToAlign(id, align = "bottom", padding = 18) {
  const frame = document.querySelector(".phone-frame")
  const el = document.getElementById(id)
  if (!frame || !el) return

  const frameRect = frame.getBoundingClientRect()
  const elRect = el.getBoundingClientRect()

  let targetTop

  if (align === "top") {
    const topInFrame = elRect.top - frameRect.top + frame.scrollTop
    targetTop = topInFrame - frame.clientHeight + padding
  } else {
    const bottomInFrame = elRect.bottom - frameRect.top + frame.scrollTop
    targetTop = bottomInFrame - frame.clientHeight + padding
  }

  const maxTop = frame.scrollHeight - frame.clientHeight
  targetTop = Math.max(0, Math.min(maxTop, targetTop))

  smoothScrollFrameTo(frame, targetTop)
}

/* ============================= */
/* Step scroll sequence           */
/* ============================= */
let scrollStep = 0
const SCROLL_SEQUENCE = [
  { id: "schedule", align: "top" },
  { id: "dress", align: "top" },
  { id: "gifts", align: "bottom" },
  { id: "rsvp", align: "bottom" },
]

/* ============================= */
/* Reveal (ONE observer, correct root) */
/* ============================= */
function initReveal() {
  const frame = document.querySelector(".phone-frame")
  const targets = document.querySelectorAll("#content .section, #content .hero")
  if (!frame || !targets.length) return

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-inview")
          if (e.target.classList.contains("hero")) e.target.classList.add("is-revealed")
          io.unobserve(e.target)
        }
      })
    },
    { root: frame, threshold: 0.18 }
  )

  targets.forEach((el) => io.observe(el))
}

document.addEventListener("DOMContentLoaded", () => {
  renderStatic()
  renderLang()
  autofillGuestNameFromGroup()
  formatScheduleTimes()

  const frame = document.querySelector(".phone-frame")

  // Cancel smooth scroll when user scrolls manually
  const cancelOnUser = () => cancelScrollAnim?.()
  frame?.addEventListener("wheel", cancelOnUser, { passive: true })
  frame?.addEventListener("touchstart", cancelOnUser, { passive: true })
  frame?.addEventListener("touchmove", cancelOnUser, { passive: true })

  // pin overlay to the phone frame
  pinScrollButtonToFrame()
  window.addEventListener("resize", pinScrollButtonToFrame, { passive: true })
  window.addEventListener("scroll", pinScrollButtonToFrame, { passive: true })

  // Step scroll button
  $("scrollNext")?.addEventListener("click", () => {
    const step = SCROLL_SEQUENCE[scrollStep]
    if (!step) return

    scrollToAlign(step.id, step.align, 18)
    scrollStep = (scrollStep + 1) % SCROLL_SEQUENCE.length
  })

  // Language buttons
  $("btnES")?.addEventListener("click", () => {
    lang = "es"
    renderLang()
    autofillGuestNameFromGroup()
  })
  $("btnRU")?.addEventListener("click", () => {
    lang = "ru"
    renderLang()
    autofillGuestNameFromGroup()
  })
  $("btnEN")?.addEventListener("click", () => {
    lang = "en"
    renderLang()
    autofillGuestNameFromGroup()
  })

  // Intro open — ONLY heart button (prevents double triggers)
  $("heartBtn")?.addEventListener("click", (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (hasOpened) return
    hasOpened = true

    particleBurstFromHeart()

    setTimeout(() => {
      $("intro")?.classList.add("is-leaving")
    }, 1600)

    setTimeout(() => {
      goToHero()
      // init reveal AFTER content becomes visible
      setTimeout(initReveal, 20)
    }, 2100)
  })

  // RSVP behavior
  $("attYes")?.addEventListener("change", setRsvpVisibility)
  $("attMaybe")?.addEventListener("change", setRsvpVisibility)
  $("attNo")?.addEventListener("change", setRsvpVisibility)
  setRsvpVisibility()

  // Submit
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
      toast(t.toastSent)
    } finally {
      setLoading(false)
    }
  })
})
