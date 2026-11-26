const THEMES = [
  { id: "sky", name: "ကောင်းကင်ပြာ", color: "#1585b2", soft: "#dff7ff" },
  { id: "coral", name: "ပန်းရောင်နွေး", color: "#df725f", soft: "#fff1e8" },
  { id: "plum", name: "ညနေခင်းခရမ်း", color: "#7c3d62", soft: "#f5eaf2" },
  { id: "sage", name: "ပန်းဥယျာဉ်", color: "#78947b", soft: "#edf4ed" },
  { id: "rose", name: "နှင်းဆီ", color: "#d94f7a", soft: "#ffe7ef" },
  { id: "lavender", name: "လာဗင်ဒါ", color: "#8b6bc1", soft: "#f0e9ff" },
  { id: "mint", name: "မင့်စိမ်း", color: "#3f9b83", soft: "#e4f6ee" },
  { id: "amber", name: "ပယင်းဝါ", color: "#c47b1b", soft: "#fff2d8" },
  { id: "ocean", name: "ပင်လယ်ပြာ", color: "#246f91", soft: "#e3f4fa" },
  { id: "berry", name: "ဘယ်ရီ", color: "#a83b68", soft: "#fde9f1" },
  { id: "lemon", name: "သံပုရာဝါ", color: "#858326", soft: "#f7f7dc" },
  { id: "tangerine", name: "လိမ္မော်", color: "#d35f2b", soft: "#fff0e5" },
  { id: "periwinkle", name: "ခရမ်းပြာ", color: "#667cc5", soft: "#e9edff" },
  { id: "peach", name: "မက်မွန်", color: "#d98772", soft: "#fff0e7" },
];

const BUTTON_ACTIONS = [
  ["next", "နောက်တစ်ဆင့်သို့သွားမယ်"],
  ["go_to_step", "ရွေးထားတဲ့ Flow card ကိုသွားမယ်"],
  ["open_envelope", "စာအိတ်ဖွင့်မယ်"],
  ["open_postcard", "Postcard ကိုတိုက်ရိုက်ဖွင့်မယ်"],
  ["run_away", "လှည့်ပြေးမယ်"],
  ["stay", "ဒီနေရာမှာပဲနေမယ်"],
];

const DEFAULT_FLOW = [
  { id: "intro", kind: "intro", label: "အစစာမျက်နှာ", eyebrow: "A LITTLE QUESTION FOR YOU", title: "မင်းကို\nတစ်ခုမေးချင်တယ်", body: "စာလေးမဖွင့်ခင်\nအရင်ဆုံး ဒီမေးခွန်းလေးကို ဖြေပေးနော်", emoji: "💌 ✨ 🥺" },
  { id: "tease", kind: "tease", label: "ရင်ခုန်စရာ", eyebrow: "WAIT, THERE IS MORE", title: "မဖွင့်ခင်\nရင်ခုန်နေပြီလား?", body: "ဒီစာထဲမှာ မင်းအတွက်\nစကားလေးတွေ၊ အမှတ်တရလေးတွေ ရှိတယ်", emoji: "👀 💌 ✨" },
  { id: "question", kind: "question", label: "မေးခွန်း", eyebrow: "BE HONEST, OKAY?", title: "ငါ့ကို\nချစ်လား?", body: "မင်းရဲ့အဖြေကို\nရင်ခုန်ပြီး စောင့်နေတယ်...", emoji: "🥺 💗" },
  { id: "yes", kind: "yes", label: "အဖြေမှန်ပြီ", eyebrow: "I KNEW IT!", title: "သိပါတယ်...\nမင်းကချစ်တယ်", body: "အဖြေမှန်လို့ ဆုလေးရမယ်။\nဒါပေမယ့် နောက်တစ်ခုကြည့်ဦး", emoji: "🥰 💞 🌷" },
  { id: "memory", kind: "memory", label: "အမှတ်တရ", eyebrow: "ONE LITTLE MEMORY", title: "မင်းနဲ့ဆို\nနေ့တိုင်းက အမှတ်တရ", body: "အခုတော့ မင်းအတွက် ပြင်ထားတဲ့\npostcard လေးကို ဖွင့်ကြည့်လိုက်ပါ", emoji: "📸 🌷 💙 ✨" },
];

const INITIAL_CARD = {
  to: "My Love",
  from: "မင်းရဲ့သူ",
  message: "မင်းနဲ့အတူ ဖြတ်သန်းလာတဲ့နေ့တိုင်းက ကိုယ့်အတွက် အမှတ်တရပါ။ ဒီနေ့လည်း ချစ်နေတုန်းပဲနော်။",
  occasion: "နှစ်ပတ်လည်နေ့",
  theme: "sky",
  envelopeButtonLabel: "စာလေးဖွင့်ကြည့်ပါ",
  photo: "",
  flow: structuredClone(DEFAULT_FLOW),
};

const TEMPLATES = {
  anniversary: { occasion: "နှစ်ပတ်လည်နေ့", message: "မင်းနဲ့အတူ ဖြတ်သန်းလာတဲ့နေ့တိုင်းက ကိုယ့်အတွက် အမှတ်တရပါ။ ဒီနေ့လည်း ချစ်နေတုန်းပဲနော်။" },
  birthday: { occasion: "မွေးနေ့", message: "မွေးနေ့မင်္ဂလာပါ ချစ်ရသူရေ။ မင်းရဲ့နှစ်သစ်မှာ လိုချင်သမျှ အားလုံးပြည့်ပါစေ။" },
  love: { occasion: "ချစ်ခြင်းစာ", message: "စကားလုံးတွေနဲ့မလောက်အောင် ချစ်တယ်။ မင်းရှိနေပေးတာကိုပဲ ကျေးဇူးတင်နေတယ်။" },
};

const state = {
  authenticated: false,
  authConfigured: false,
  card: structuredClone(INITIAL_CARD),
  id: "",
  name: "",
  saved: [],
  shareUrl: "",
  mode: "editor",
  viewCard: null,
  viewId: "",
  screen: 0,
  noTry: 0,
};

const app = document.getElementById("app");
const toastNode = document.getElementById("toast");
let toastTimer = 0;

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}
function nl2br(value) { return escapeHTML(value).replace(/\n/g, "<br>"); }
function themeFor(card) { return THEMES.find((theme) => theme.id === card?.theme) || THEMES[0]; }
function safeMedia(value) {
  if (typeof value !== "string") return "";
  if (/^data:image\/(?:jpeg|png|gif|webp);base64,/i.test(value)) return value;
  if (/^https?:\/\//i.test(value) || value.startsWith("/api.php?action=media&")) return value;
  return "";
}
function toast(message, isError = false) {
  toastNode.textContent = message;
  toastNode.classList.toggle("error", isError);
  toastNode.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toastNode.classList.remove("show"), 2800);
}
async function api(action, { method = "GET", body } = {}) {
  const [actionName, query = ""] = action.split("&", 2);
  const querySuffix = query ? `&${query}` : "";
  const response = await fetch(`/api.php?action=${encodeURIComponent(actionName)}${querySuffix}`, {
    method,
    credentials: "same-origin",
    headers: body === undefined ? {} : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  let result;
  try { result = await response.json(); }
  catch { throw new Error(`Server returned HTTP ${response.status}.`); }
  if (!response.ok) throw new Error(result.error || `Request failed (${response.status}).`);
  return result;
}
function defaultButtonsForStep(step) {
  if (step.kind === "question") return [
    { id: `${step.id}-yes`, label: "ချစ်တယ်", action: "next" },
    { id: `${step.id}-no`, label: "မချစ်ဘူး", action: "run_away" },
  ];
  const label = step.kind === "memory" ? "စာအိတ်လေးဖွင့်မယ်" : step.kind === "yes" ? "ကြည့်မယ်" : "နောက်တစ်ဆင့်";
  return [{ id: `${step.id}-continue`, label, action: "next" }];
}
function buttonsForStep(step) {
  return Array.isArray(step.buttons) && step.buttons.length ? step.buttons : defaultButtonsForStep(step);
}
function postCardMarkup(card) {
  const theme = themeFor(card);
  const photo = safeMedia(card.photo);
  return `<article id="live-postcard" class="postcard" style="--theme:${theme.color};--soft:${theme.soft};background:${theme.soft}">
    <div class="card-topline"><span>EPOSTCARD</span><span>${escapeHTML(card.occasion || "အမှတ်တရ")}</span></div>
    <div class="card-flower">✿</div>
    <div class="card-scene">${photo ? `<img class="card-photo" src="${escapeHTML(photo)}" alt="postcard memory">` : `<div class="card-photo-placeholder"><span>♡</span><small>your memory</small></div>`}<div class="bouquet" aria-hidden="true"><i>✿</i><i>✿</i><i>✿</i><i>✿</i><b>✦</b><em>⌁</em></div></div>
    <div class="card-copy"><p class="card-to">To, <strong>${escapeHTML(card.to || "ချစ်ရသူ")}</strong></p><p class="card-message">${escapeHTML(card.message || "မင်းအတွက် စာလေးတစ်စောင်...")}</p><p class="card-from">အချစ်များစွာဖြင့်<br><strong>${escapeHTML(card.from || "မင်းရဲ့သူ")}</strong></p></div>
    <div class="card-envelope" style="border-color:${theme.color}"><span>♥</span></div><div class="card-qr" aria-label="share mark">${"<i></i>".repeat(36)}</div><div class="card-stamp" style="background:${theme.color}">♥</div><div class="card-footer">made with a little love · 2026</div>
  </article>`;
}
function renderSavedList() {
  if (!state.saved.length) return `<div class="empty-state">သိမ်းထားတဲ့ postcard မရှိသေးပါ။</div>`;
  return `<div class="saved-list"><div class="saved-title">သိမ်းထားတဲ့ postcard များ <span>${state.saved.length}</span></div>${state.saved.map((item) => {
    const theme = themeFor(item);
    return `<div class="saved-item ${item.id === state.id ? "active" : ""}"><button class="saved-open" data-action="load" data-id="${escapeHTML(item.id)}"><i class="saved-swatch" style="background:${theme.color}"></i><span><strong>${escapeHTML(item.name)}</strong><small>${escapeHTML(item.to)} · ${escapeHTML(item.occasion)}</small></span></button><button class="saved-delete" data-action="delete" data-id="${escapeHTML(item.id)}" aria-label="ဖျက်ရန်">×</button></div>`;
  }).join("")}</div>`;
}
function renderFlowEditor(step, index) {
  const buttons = buttonsForStep(step);
  return `<article class="flow-edit">
    <div class="flow-edit-head"><span class="flow-index">${String(index + 1).padStart(2, "0")}</span><input class="flow-label-input" value="${escapeHTML(step.label)}" aria-label="Flow card အမည်" data-step="${index}" data-stepfield="label"><div class="flow-order"><button data-action="move-flow" data-step="${index}" data-dir="-1" ${index === 0 ? "disabled" : ""} aria-label="အပေါ်ရွှေ့">↑</button><button data-action="move-flow" data-step="${index}" data-dir="1" ${index === state.card.flow.length - 1 ? "disabled" : ""} aria-label="အောက်ရွှေ့">↓</button><button data-action="remove-flow" data-step="${index}" ${state.card.flow.length <= 1 ? "disabled" : ""} aria-label="ဖယ်ရန်">×</button></div></div>
    <div class="flow-mini"><label>Emoji<input value="${escapeHTML(step.emoji)}" data-step="${index}" data-stepfield="emoji"></label></div>
    <div class="button-config"><div class="button-config-head"><strong>ခလုတ်များ · ${buttons.length}/8</strong><span>အနည်းဆုံး ၁ ခု</span></div>
      ${buttons.map((button, buttonIndex) => `<div class="button-row"><div class="button-row-head"><strong>ခလုတ် ${buttonIndex + 1}</strong><button class="small-button danger-button" data-action="remove-button" data-step="${index}" data-button="${buttonIndex}" ${buttons.length <= 1 ? "disabled" : ""}>ဖယ်ရန်</button></div>
        <label>ခလုတ်စာသား<input value="${escapeHTML(button.label)}" maxlength="100" data-step="${index}" data-button="${buttonIndex}" data-buttonfield="label"></label>
        <label>လုပ်ဆောင်ချက်<select data-step="${index}" data-button="${buttonIndex}" data-buttonfield="action">${BUTTON_ACTIONS.map(([value, label]) => `<option value="${value}" ${button.action === value ? "selected" : ""}>${escapeHTML(label)}</option>`).join("")}</select></label>
        ${button.action === "go_to_step" ? `<label>သွားမည့် Flow card<select data-step="${index}" data-button="${buttonIndex}" data-buttonfield="targetStepId">${state.card.flow.map((target) => `<option value="${escapeHTML(target.id)}" ${(button.targetStepId || step.id) === target.id ? "selected" : ""}>${escapeHTML(target.label || target.title.replace(/\n/g, " "))}</option>`).join("")}</select></label>` : ""}</div>`).join("")}
      <button class="add-button-link" data-action="add-button" data-step="${index}" ${buttons.length >= 8 ? "disabled" : ""}>＋ ခလုတ်ထပ်ထည့်</button>
    </div>
    <label>စာခေါင်းစဉ်<textarea rows="2" data-step="${index}" data-stepfield="title">${escapeHTML(step.title)}</textarea></label>
    <label>အောက်ကစာ<textarea rows="2" data-step="${index}" data-stepfield="body">${escapeHTML(step.body)}</textarea></label>
    <div class="flow-media"><label class="upload-control">＋ <span>${step.image ? "ပုံပြောင်းရန်" : "Flow card ပုံထည့်ရန်"}<small>JPG / PNG / GIF · အများဆုံး 8 MB</small></span><input type="file" accept="image/jpeg,image/png,image/webp,image/gif" data-file="image" data-step="${index}"></label><label class="upload-control">＋ <span>${step.gif ? "GIF ပြောင်းရန်" : "GIF ထည့်ရန်"}<small>GIF · အများဆုံး 8 MB</small></span><input type="file" accept="image/gif,.gif" data-file="gif" data-step="${index}"></label></div>
    <label>GIF URL (optional)<input value="${step.gif && !step.gif.startsWith("data:") && !step.gif.startsWith("/api.php") ? escapeHTML(step.gif) : ""}" placeholder="https://.../love.gif" data-step="${index}" data-stepfield="gif"></label>
    ${(step.image || step.gif) ? `<div class="media-preview">${safeMedia(step.image) ? `<img src="${escapeHTML(safeMedia(step.image))}" alt="Flow ပုံ preview">` : ""}${safeMedia(step.gif) ? `<img src="${escapeHTML(safeMedia(step.gif))}" alt="Flow GIF preview">` : ""}</div>` : ""}
  </article>`;
}
function renderEditor() {
  const card = state.card;
  const theme = themeFor(card);
  app.innerHTML = `<main class="shell" style="--theme:${theme.color};--soft:${theme.soft}">
    <header class="topbar"><a class="brand" href="/"><span class="brand-seal">♥</span><span>EPOSTCARD</span></a><div class="topbar-note">✦ မင်းအတွက် စာတစ်စောင်</div><div class="topbar-actions"><button data-action="new">＋ အသစ်လုပ်မယ်</button><button data-action="logout">ထွက်ရန်</button></div></header>
    <section class="editor-grid"><div class="controls-panel">
      <div class="hero-copy"><div class="eyebrow">CREATE A LITTLE KEEPSAKE</div><h1>မင်းရဲ့စာလေးကို<br><em>လှလှလေးပို့မယ်။</em></h1><p>စာသား၊ flow နဲ့ အရောင်ကို စိတ်ကြိုက်ပြင်ပြီး postcard လေးတစ်ခုဖန်တီးပါ။</p></div>
      <section class="manager-card"><div class="manager-head"><div><span class="share-label">POSTCARD MANAGER</span><strong>${state.id ? "ပြင်နေသော postcard" : "Postcard အသစ်"}</strong></div><button class="secondary-button" data-action="new">＋ အသစ်</button></div><div class="save-row"><input id="save-name" value="${escapeHTML(state.name)}" placeholder="Postcard အမည် — ဥပမာ My Love"><button class="primary-button" data-action="save">သိမ်းမယ်</button></div>${renderSavedList()}</section>
      <section class="form-card"><div class="section-label"><span>01</span> စာအချက်အလက်</div><div class="form-stack"><div class="field-grid"><label class="field">လက်ခံမည့်သူ<input data-field="to" value="${escapeHTML(card.to)}" placeholder="ဥပမာ - မေမေ"></label><label class="field">ပေးပို့သူ<input data-field="from" value="${escapeHTML(card.from)}" placeholder="ဥပမာ - ကိုကို"></label></div><label class="field">အခါသမယ<select data-field="occasion">${["နှစ်ပတ်လည်နေ့", "မွေးနေ့", "ချစ်ခြင်းစာ", "ကျေးဇူးတင်ပါတယ်", "အခြား"].map((item) => `<option ${card.occasion === item ? "selected" : ""}>${item}</option>`).join("")}</select></label><label class="field">Postcard အချစ်စာ<textarea rows="4" maxlength="220" data-field="message" placeholder="မင်းပြောချင်တဲ့စကားလေး...">${escapeHTML(card.message)}</textarea><span class="field-hint">${String(card.message || "").length}/220</span></label><label class="field">စာအိတ်ဖွင့်ခလုတ်စာသား<input data-field="envelopeButtonLabel" maxlength="100" value="${escapeHTML(card.envelopeButtonLabel || "စာလေးဖွင့်ကြည့်ပါ")}"></label></div>
      <div class="section-label" style="margin-top:22px"><span>02</span> အသင့်သုံးစာပုံစံ</div><div class="template-row"><button class="template-chip" data-action="template" data-template="anniversary">Anniversary</button><button class="template-chip" data-action="template" data-template="birthday">Birthday</button><button class="template-chip" data-action="template" data-template="love">Just because</button></div>
      <div class="section-label" style="margin-top:22px"><span>03</span> အရောင်နဲ့ဓာတ်ပုံ</div><div class="theme-row">${THEMES.map((item) => `<button class="theme-dot ${card.theme === item.id ? "selected" : ""}" title="${escapeHTML(item.name)}" aria-label="${escapeHTML(item.name)}" style="background:${item.color}" data-action="theme" data-theme="${item.id}"></button>`).join("")}</div><label class="upload-control" style="margin-top:14px">＋ <span>${card.photo ? "ဓာတ်ပုံပြောင်းရန်" : "Postcard ဓာတ်ပုံထည့်ရန်"}<small>JPG / PNG / GIF / WebP · အများဆုံး 8 MB</small></span><input type="file" accept="image/jpeg,image/png,image/webp,image/gif" data-file="photo"></label>${safeMedia(card.photo) ? `<div class="media-preview"><img src="${escapeHTML(safeMedia(card.photo))}" alt="Postcard ပုံ preview"></div>` : ""}</section>
      <div class="flow-section-head"><div class="section-label"><span>04</span> Flow ထဲကစာနဲ့ပုံပြင်မယ်</div><small>${card.flow.length} cards</small></div><div class="flow-list">${card.flow.map(renderFlowEditor).join("")}</div><button class="add-flow-link" data-action="add-flow">＋ Flow card အသစ်ထည့်မယ်</button>
    </div>
    <aside class="preview-column"><section class="preview-card"><div class="preview-caption"><span>LIVE PREVIEW</span><span class="live-dot">● live</span></div><div class="postcard-wrap"><span class="petal petal-a">✦</span><span class="petal petal-b">✿</span>${postCardMarkup(card)}</div></section><section class="share-card"><span class="share-label">READY TO SEND?</span><strong>ပြင်ထားတဲ့ postcard ကို ပို့လိုက်ပါ</strong><div class="share-actions"><button class="secondary-button" data-action="copy">Link copy</button><button class="primary-button" data-action="share">Share</button></div><div class="share-link"><input id="share-link-input" readonly value="${escapeHTML(state.shareUrl)}" placeholder="Save နှိပ်ပြီးမှ share link ရပါမယ်။"><button data-action="copy">Copy</button></div></section></aside></section>
    <footer class="footer-note">made for the people we love <span>♥</span></footer></main>`;
}
function syncLivePreview() {
  const theme = themeFor(state.card);
  const shell = document.querySelector(".shell");
  if (shell) { shell.style.setProperty("--theme", theme.color); shell.style.setProperty("--soft", theme.soft); }
  const current = document.getElementById("live-postcard");
  if (current) current.outerHTML = postCardMarkup(state.card);
  const field = document.getElementById("share-link-input");
  if (field) field.value = state.shareUrl;
  const count = document.querySelector('[data-field="message"]')?.parentElement?.querySelector(".field-hint");
  if (count) count.textContent = `${String(state.card.message || "").length}/220`;
}
function renderLogin(message = "") {
  state.mode = "editor";
  app.innerHTML = `<main class="login-shell"><section class="login-card"><div class="login-brand"><span class="brand-seal">♥</span><a class="brand" href="/">EPOSTCARD</a></div><div class="eyebrow">PRIVATE EDITOR</div><h1>Editor ထဲဝင်ရန်</h1><p>Postcard ပြင်ဆင်ရန် စကားဝှက်ထည့်ပါ။ Share link ရသူတွေက postcard ကို စကားဝှက်မလိုဘဲ ကြည့်နိုင်ပါတယ်။</p>${state.authConfigured ? "" : `<p class="login-error">Hosting Variables ထဲ <strong>EDITOR_PASSWORD</strong> သတ်မှတ်ပြီးမှ ဝင်နိုင်ပါမယ်။</p>`}<form id="login-form"><label class="field">စကားဝှက်<input type="password" name="password" autocomplete="current-password" required ${state.authConfigured ? "" : "disabled"} placeholder="Editor password"></label><span class="login-error" id="login-error">${escapeHTML(message)}</span><button class="primary-button" type="submit" ${state.authConfigured ? "" : "disabled"}>ဝင်မယ်</button></form></section></main>`;
}
function viewCardMarkup(card) {
  const theme = themeFor(card);
  return `<main class="view-shell" style="--theme:${theme.color};--soft:${theme.soft}"><header class="view-header"><span class="view-spacer"></span><a class="brand" href="/"><span class="brand-seal">♥</span>EPOSTCARD</a><button class="icon-button" data-action="view-share" aria-label="share">↗</button></header><div id="view-stage"></div><div class="view-footer">ဒီစာလေးက မင်းအတွက်ပဲ <span>♥</span></div></main>`;
}
function renderStory() {
  const card = state.viewCard;
  const flow = Array.isArray(card.flow) && card.flow.length ? card.flow : DEFAULT_FLOW;
  const index = Number.isInteger(state.screen) ? Math.max(0, Math.min(state.screen, flow.length - 1)) : -1;
  const stage = document.getElementById("view-stage");
  if (!stage) return;
  if (state.screen === "envelope") {
    stage.innerHTML = `<section class="reveal-stage"><button class="envelope-button" data-action="open-envelope"><div class="envelope"><div class="envelope-flap"></div><div class="envelope-letter">♥</div><div class="envelope-front"></div></div><span>${escapeHTML(card.envelopeButtonLabel?.trim() || "စာလေးဖွင့်ကြည့်ပါ")}</span><small>tap to open</small></button></section>`;
    return;
  }
  if (state.screen === "open") {
    const photo = safeMedia(card.photo);
    stage.innerHTML = `<section class="reveal-stage"><article class="revealed-card" style="background:${themeFor(card).soft}"><div class="revealed-top"><span>${escapeHTML(card.occasion || "အမှတ်တရ")}</span><span>♥</span></div><div class="revealed-scene">${photo ? `<img class="revealed-photo" src="${escapeHTML(photo)}" alt="အမှတ်တရဓာတ်ပုံ">` : `<div class="revealed-photo-placeholder">♡<small>our memory</small></div>`}<div class="bouquet" aria-hidden="true"><i>✿</i><i>✿</i><i>✿</i><i>✿</i><b>✦</b><em>⌁</em></div></div><p class="revealed-to">To, <strong>${escapeHTML(card.to || "ချစ်ရသူ")}</strong></p><p class="revealed-message">${escapeHTML(card.message || "မင်းအတွက် စာလေးတစ်စောင်...")}</p><p class="revealed-from">အချစ်များစွာဖြင့်<br><strong>${escapeHTML(card.from || "မင်းရဲ့သူ")}</strong></p><div class="revealed-envelope" style="border-color:${themeFor(card).color}"><span>♥</span></div><div class="revealed-qr">${"<i></i>".repeat(36)}</div><div class="revealed-stamp" style="background:${themeFor(card).color}">♥</div></article></section>`;
    return;
  }
  const step = flow[index] || flow[0];
  const buttons = buttonsForStep(step);
  const noPositions = [[74, 0], [-72, 50], [65, 86], [-35, -64], [88, -48]];
  const position = noPositions[state.noTry % noPositions.length];
  const media = safeMedia(step.gif || step.image);
  stage.innerHTML = `<section class="love-stage stage-${escapeHTML(step.kind || "custom")}"><div class="story-sparkles" aria-hidden="true"><span>💖</span><span>✨</span><span>🌷</span><span>💌</span><span>🦋</span></div><article class="story-card"><div class="story-icon">${media ? `<img class="flow-hero-image" src="${escapeHTML(media)}" alt="${escapeHTML(step.label)}">` : `<span class="story-emoji">${escapeHTML(step.emoji || "💌 ✨")}</span>`}</div><h1>${escapeHTML(step.title || "").replace(/\n/g, "<br>")}</h1><p class="story-copy">${escapeHTML(step.body || "").replace(/\n/g, "<br>")}</p><div class="flow-button-list">${buttons.map((button, buttonIndex) => {
    const runaway = button.action === "run_away";
    const transform = runaway ? `style="transform:translate(${position[0]}px,${position[1]}px)"` : "";
    return `<button class="story-button ${runaway ? "no-button" : ""}" data-action="flow-button" data-button="${buttonIndex}" ${transform}>${escapeHTML(button.label || "ဆက်သွားရန်")} <span>${runaway ? "🥲" : "→"}</span></button>`;
  }).join("")}</div>${step.kind === "question" && buttons.some((button) => button.action === "run_away") ? `<p class="runaway-hint">မချစ်ဘူးကို နှိပ်ကြည့်လေ... 😏</p>` : ""}<div class="story-dots">${flow.map((_, dot) => `<i class="${dot === index ? "active" : ""}"></i>`).join("")}<i class="${state.screen === "envelope" ? "active" : ""}"></i></div></article></section>`;
}
function renderViewer() {
  if (!state.viewCard) {
    app.innerHTML = `<main class="center-screen"><span class="brand-seal">♥</span><h2>Postcard ကိုဖွင့်မရပါ</h2><p>Link ကို ပြန်စစ်ကြည့်ပါ။</p><a class="secondary-button" href="/">EPOSTCARD</a></main>`;
    return;
  }
  app.innerHTML = viewCardMarkup(state.viewCard);
  renderStory();
}
function clearShare() {
  if (state.shareUrl) {
    state.shareUrl = "";
    const field = document.getElementById("share-link-input");
    if (field) field.value = "";
  }
}
function getStep(index) { return state.card.flow[Number(index)]; }
function currentCardFile(file, dataUrl) {
  if (file.field === "photo") state.card.photo = dataUrl;
  else {
    const step = getStep(file.step);
    if (step) step[file.field] = dataUrl;
  }
  clearShare();
  renderEditor();
}
async function loadSaved() {
  const result = await api("list");
  state.saved = Array.isArray(result.postcards) ? result.postcards : [];
}
async function saveCard() {
  const nameInput = document.getElementById("save-name");
  state.name = (nameInput?.value || state.name || `${state.card.to || "မင်းအတွက်"} · ${state.card.occasion}`).trim();
  if (!state.name) state.name = "Postcard အသစ်";
  const result = await api("save", { method: "POST", body: { id: state.id || undefined, name: state.name, card: state.card } });
  state.id = result.id;
  state.name = result.name;
  state.card = result.card;
  state.saved = result.postcards || [];
  state.shareUrl = `${window.location.origin}${window.location.pathname}?view=${encodeURIComponent(state.id)}`;
  renderEditor();
  return state.shareUrl;
}
async function copyShare() {
  try {
    const url = await saveCard();
    await navigator.clipboard.writeText(url);
    toast("Share link ကို copy လုပ်ပြီးပါပြီ။");
  } catch (error) {
    const field = document.getElementById("share-link-input");
    if (field && state.shareUrl) { field.focus(); field.select(); }
    toast(error.message || "Link copy မရပါ။", true);
  }
}
async function shareCard() {
  try {
    const url = await saveCard();
    if (navigator.share) {
      await navigator.share({ title: "EPOSTCARD", text: `မင်းအတွက် ${state.card.occasion} စာလေး`, url });
    } else {
      await navigator.clipboard.writeText(url);
      toast("Share link ကို copy လုပ်ပြီးပါပြီ။");
    }
  } catch (error) {
    if (error.name === "AbortError") return;
    toast(error.message || "Share link မထုတ်နိုင်ပါ။", true);
  }
}
async function loadPostcard(id) {
  try {
    const result = await api(`load&id=${encodeURIComponent(id)}`);
    state.id = result.id;
    state.card = result.card;
    const item = state.saved.find((entry) => entry.id === result.id);
    state.name = item?.name || "";
    state.shareUrl = "";
    renderEditor();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) { toast(error.message || "Postcard ဖွင့်မရပါ။", true); }
}
async function deletePostcard(id) {
  const entry = state.saved.find((item) => item.id === id);
  if (!window.confirm(`“${entry?.name || "Postcard"}” ကိုဖျက်မှာ သေချာပါသလား။`)) return;
  try {
    await api("delete", { method: "POST", body: { id } });
    state.saved = state.saved.filter((item) => item.id !== id);
    if (state.id === id) { state.id = ""; state.name = ""; state.card = structuredClone(INITIAL_CARD); state.shareUrl = ""; }
    renderEditor();
    toast("Postcard ကိုဖျက်ပြီးပါပြီ။");
  } catch (error) { toast(error.message || "ဖျက်မရပါ။", true); }
}
function addFlow() {
  state.card.flow.push({ id: `custom-${crypto.randomUUID()}`, kind: "custom", label: "စာမျက်နှာအသစ်", eyebrow: "A LITTLE NOTE", title: "မင်းအတွက်\nစာလေးတစ်စောင်", body: "ဒီနေရာမှာ ကိုယ်ပြောချင်တဲ့\nစာသားလေးရေးပါ", emoji: "💌 ✨" });
  clearShare();
  renderEditor();
}
function moveFlow(index, direction) {
  const target = index + direction;
  if (target < 0 || target >= state.card.flow.length) return;
  [state.card.flow[index], state.card.flow[target]] = [state.card.flow[target], state.card.flow[index]];
  clearShare();
  renderEditor();
}
function removeFlow(index) {
  if (state.card.flow.length <= 1) return;
  const removedId = state.card.flow[index]?.id;
  state.card.flow.splice(index, 1);
  const fallbackId = state.card.flow[Math.min(index, state.card.flow.length - 1)].id;
  state.card.flow.forEach((step) => (step.buttons || []).forEach((button) => {
    if (button.action === "go_to_step" && button.targetStepId === removedId) button.targetStepId = fallbackId;
  }));
  clearShare();
  renderEditor();
}
function addButton(index) {
  const step = getStep(index);
  if (!step) return;
  const buttons = buttonsForStep(step);
  if (buttons.length >= 8) return;
  step.buttons = [...buttons, { id: crypto.randomUUID(), label: "နှိပ်ပါ", action: "next" }];
  clearShare();
  renderEditor();
}
function removeButton(index, buttonIndex) {
  const step = getStep(index);
  if (!step) return;
  const buttons = buttonsForStep(step);
  if (buttons.length <= 1) return;
  step.buttons = buttons.filter((_, itemIndex) => itemIndex !== Number(buttonIndex));
  clearShare();
  renderEditor();
}
function updateFromField(target) {
  const field = target.dataset.field;
  const stepIndex = target.dataset.step;
  if (field) {
    state.card[field] = target.value;
    clearShare();
    syncLivePreview();
    return;
  }
  if (stepIndex === undefined) return;
  const step = getStep(stepIndex);
  if (!step) return;
  if (target.dataset.stepfield) {
    step[target.dataset.stepfield] = target.value;
    clearShare();
    return;
  }
  if (target.dataset.buttonfield) {
    const buttons = buttonsForStep(step);
    const button = buttons[Number(target.dataset.button)];
    if (!button) return;
    const key = target.dataset.buttonfield;
    button[key] = target.value;
    if (key === "action" && target.value === "go_to_step" && !button.targetStepId) button.targetStepId = step.id;
    step.buttons = buttons;
    clearShare();
    if (key === "action") renderEditor();
  }
}
async function handleLogin(form) {
  const password = new FormData(form).get("password");
  const errorNode = document.getElementById("login-error");
  try {
    await api("login", { method: "POST", body: { password: String(password || "") } });
    state.authenticated = true;
    await loadSaved();
    renderEditor();
  } catch (error) {
    if (errorNode) errorNode.textContent = error.message;
    else renderLogin(error.message);
  }
}

app.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  try {
    if (action === "new") { state.card = structuredClone(INITIAL_CARD); state.id = ""; state.name = ""; state.shareUrl = ""; renderEditor(); }
    else if (action === "save") { await saveCard(); toast("Postcard ကို Volume ထဲသိမ်းပြီးပါပြီ။"); }
    else if (action === "copy") await copyShare();
    else if (action === "share") await shareCard();
    else if (action === "load") await loadPostcard(button.dataset.id);
    else if (action === "delete") await deletePostcard(button.dataset.id);
    else if (action === "logout") { await api("logout", { method: "POST", body: {} }); state.authenticated = false; renderLogin(); }
    else if (action === "theme") { state.card.theme = button.dataset.theme; clearShare(); renderEditor(); }
    else if (action === "template") { Object.assign(state.card, TEMPLATES[button.dataset.template] || {}); clearShare(); renderEditor(); }
    else if (action === "add-flow") addFlow();
    else if (action === "move-flow") moveFlow(Number(button.dataset.step), Number(button.dataset.dir));
    else if (action === "remove-flow") removeFlow(Number(button.dataset.step));
    else if (action === "add-button") addButton(Number(button.dataset.step));
    else if (action === "remove-button") removeButton(Number(button.dataset.step), Number(button.dataset.button));
    else if (action === "open-envelope") { state.screen = "open"; renderStory(); }
    else if (action === "flow-button") {
      const flow = Array.isArray(state.viewCard.flow) && state.viewCard.flow.length ? state.viewCard.flow : DEFAULT_FLOW;
      const step = flow[Number(state.screen)];
      const choice = buttonsForStep(step)[Number(button.dataset.button)];
      if (!choice) return;
      if (choice.action === "next") state.screen = Number(state.screen) + 1 < flow.length ? Number(state.screen) + 1 : "envelope";
      else if (choice.action === "go_to_step") { const target = flow.findIndex((item) => item.id === choice.targetStepId); state.screen = target >= 0 ? target : (Number(state.screen) + 1 < flow.length ? Number(state.screen) + 1 : "envelope"); }
      else if (choice.action === "open_envelope") state.screen = "envelope";
      else if (choice.action === "open_postcard") state.screen = "open";
      else if (choice.action === "run_away") state.noTry += 1;
      renderStory();
    }
    else if (action === "view-share") {
      const url = window.location.href;
      if (navigator.share) await navigator.share({ title: "EPOSTCARD", text: `မင်းအတွက် ${state.viewCard.occasion || "စာလေး"}`, url });
      else { await navigator.clipboard.writeText(url); toast("Share link ကို copy လုပ်ပြီးပါပြီ။"); }
    }
  } catch (error) {
    if (error.name !== "AbortError") toast(error.message || "လုပ်ဆောင်မှု မအောင်မြင်ပါ။", true);
  }
});

app.addEventListener("input", (event) => updateFromField(event.target));
app.addEventListener("change", (event) => {
  const target = event.target;
  updateFromField(target);
  if (target.id === "save-name") state.name = target.value;
  if (!target.matches("input[type=file]")) return;
  const file = target.files?.[0];
  if (!file) return;
  if (file.size > 8 * 1024 * 1024) { toast("ပုံတစ်ပုံစီ 8 MB ထက်မကျော်ရပါ။", true); target.value = ""; return; }
  if (!/^image\/(jpeg|png|gif|webp)$/.test(file.type)) { toast("JPG, PNG, GIF, WebP ဖိုင်သာ တင်နိုင်ပါတယ်။", true); target.value = ""; return; }
  const reader = new FileReader();
  const spec = { field: target.dataset.file, step: target.dataset.step };
  reader.onload = () => { currentCardFile(spec, String(reader.result)); toast("ပုံကို ထည့်ပြီးပါပြီ။"); };
  reader.onerror = () => toast("ပုံဖိုင်ကို ဖတ်မရပါ။", true);
  reader.readAsDataURL(file);
});
app.addEventListener("submit", (event) => {
  if (event.target.id !== "login-form") return;
  event.preventDefault();
  handleLogin(event.target);
});

async function boot() {
  const params = new URLSearchParams(window.location.search);
  const viewId = params.get("view");
  if (viewId) {
    state.mode = "view";
    state.viewId = viewId;
    try {
      const result = await api(`load&id=${encodeURIComponent(viewId)}`);
      state.viewCard = result.card;
      renderViewer();
    } catch {
      renderViewer();
    }
    return;
  }
  try {
    const auth = await api("auth");
    state.authConfigured = Boolean(auth.configured);
    state.authenticated = Boolean(auth.authenticated);
    if (state.authenticated) {
      await loadSaved();
      renderEditor();
    } else {
      renderLogin();
    }
  } catch (error) {
    renderLogin(error.message || "Server ကို ချိတ်ဆက်မရပါ။");
  }
}

boot();
