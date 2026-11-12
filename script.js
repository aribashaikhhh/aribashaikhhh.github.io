// ===== YOUR LINKS: edit these =====
const LINKS = {
  github:   "https://github.com/aribashaikhhh",
  linkedin: "https://www.linkedin.com/in/ariba-shaikh",
  resume:   "resume.pdf", // put a resume.pdf in the repo (without your phone number)
  conjure:  "https://github.com/aribashaikhhh/Conjure",
  logicpro: "https://github.com/aribashaikhhh/logic-pro-mcp",
};

// Fill every <a data-link="..."> with the matching link and open it in a new tab
document.querySelectorAll("[data-link]").forEach((a) => {
  a.href = LINKS[a.dataset.link];
  a.target = "_blank";
  a.rel = "noopener";
});

// ===== Window manager =====
const desktop = document.getElementById("desktop");
const tasks = document.getElementById("tasks");
const isPhone = () => window.matchMedia("(max-width: 700px)").matches;
let zTop = 10;   // highest z-index so far (the focused window gets zTop + 1)
let cascade = 0; // offsets each new window a bit so they don't stack exactly

document.querySelectorAll(".window").forEach(buildWindow);

// Adds the title bar (icon, title, buttons) to a window
function buildWindow(win) {
  const bar = document.createElement("div");
  bar.className = "titlebar";
  bar.innerHTML = `
    <svg class="ti"><use href="#${win.dataset.icon}"/></svg>
    <span class="title">${win.dataset.title}</span>
    <div class="controls">
      <button class="ctl" data-act="min" aria-label="Minimize"><span class="g-min"></span></button>
      <button class="ctl" data-act="max" aria-label="Maximize"><span class="g-max"></span></button>
      <button class="ctl" data-act="close" aria-label="Close">
        <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5" stroke="#fff" stroke-width="2"/></svg>
      </button>
    </div>`;
  win.prepend(bar);
  win.setAttribute("role", "dialog");
  win.setAttribute("aria-label", win.dataset.title);
  if (win.dataset.w) win.style.width = win.dataset.w + "px";

  bar.querySelectorAll(".ctl").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const act = btn.dataset.act;
      if (act === "min") minimize(win);
      else if (act === "max") toggleMax(win);
      else closeWin(win);
    })
  );
  bar.addEventListener("dblclick", (e) => {
    if (!e.target.closest(".ctl") && !isPhone()) toggleMax(win);
  });
  win.addEventListener("pointerdown", () => focusWin(win));
  makeDraggable(win, bar);
}

function openWin(id) {
  const win = document.getElementById("win-" + id);
  if (!win) return;
  if (win.hidden) {
    win.hidden = false;
    if (!win.dataset.placed) placeWin(win);
    addTask(win);
  }
  win.classList.remove("minimized");
  focusWin(win);
}

// Picks a starting position near the middle of the screen
function placeWin(win) {
  win.dataset.placed = "1";
  if (isPhone()) return;
  const dw = desktop.clientWidth, dh = desktop.clientHeight;
  const w = win.offsetWidth, h = win.offsetHeight;
  const step = (cascade++ % 6) * 28;
  const x = (dw - w) / 2 + step - 60;
  const y = (dh - h) / 3 + step - 30;
  win.style.left = clamp(x, 100, dw - w - 8) + "px";
  win.style.top = clamp(y, 10, dh - h - 10) + "px";
}

function focusWin(win) {
  document.querySelectorAll(".window").forEach((w) => w.classList.toggle("active", w === win));
  win.style.zIndex = ++zTop;
  tasks.querySelectorAll(".task").forEach((t) => t.classList.toggle("active", t.dataset.win === win.id));
}

function minimize(win) {
  win.classList.add("minimized");
  win.classList.remove("active");
  tasks.querySelector(`[data-win="${win.id}"]`)?.classList.remove("active");
}

function toggleMax(win) {
  win.classList.toggle("max");
}

function closeWin(win) {
  win.hidden = true;
  win.classList.remove("max", "active", "minimized");
  tasks.querySelector(`[data-win="${win.id}"]`)?.remove();
}

// Taskbar button for an open window
function addTask(win) {
  const t = document.createElement("button");
  t.className = "task";
  t.dataset.win = win.id;
  t.innerHTML = `<svg><use href="#${win.dataset.icon}"/></svg><span>${win.dataset.title}</span>`;
  t.addEventListener("click", () => {
    if (win.classList.contains("minimized")) openWin(win.id.replace("win-", ""));
    else if (win.classList.contains("active")) minimize(win);
    else focusWin(win);
  });
  tasks.append(t);
}

// Drag a window by its title bar (mouse, pen, or touch)
function makeDraggable(win, bar) {
  let dragging = false, startX, startY, origX, origY;

  bar.addEventListener("pointerdown", (e) => {
    if (e.button !== 0 || e.target.closest(".ctl") || isPhone() || win.classList.contains("max")) return;
    dragging = true;
    startX = e.clientX; startY = e.clientY;
    origX = win.offsetLeft; origY = win.offsetTop;
    bar.setPointerCapture(e.pointerId);
  });

  bar.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const x = origX + e.clientX - startX;
    const y = origY + e.clientY - startY;
    // keep at least part of the title bar on screen
    win.style.left = clamp(x, 80 - win.offsetWidth, desktop.clientWidth - 80) + "px";
    win.style.top = clamp(y, 0, desktop.clientHeight - 24) + "px";
  });

  const stop = () => (dragging = false);
  bar.addEventListener("pointerup", stop);
  bar.addEventListener("pointercancel", stop);
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(v, max));
}

// ===== Start menu =====
const startBtn = document.getElementById("start-btn");
const startMenu = document.getElementById("start-menu");

function setStart(open) {
  startMenu.hidden = !open;
  startBtn.setAttribute("aria-expanded", open);
}
startBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  setStart(startMenu.hidden);
});
document.addEventListener("click", (e) => {
  if (!startMenu.hidden && !startMenu.contains(e.target)) setStart(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setStart(false);
});

// Anything with data-open="x" (desktop icons, Start menu, buttons) opens window x
document.addEventListener("click", (e) => {
  const opener = e.target.closest("[data-open]");
  if (!opener) return;
  openWin(opener.dataset.open);
  setStart(false);
});
// Resume links inside the Start menu should also close it
startMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setStart(false)));

// ===== Copy email =====
document.getElementById("copy-email").addEventListener("click", async (e) => {
  const btn = e.currentTarget;
  try {
    await navigator.clipboard.writeText(document.getElementById("email-text").textContent);
    btn.textContent = "Copied!";
  } catch {
    btn.textContent = "Select it";
  }
  setTimeout(() => (btn.textContent = "Copy"), 1500);
});

// ===== Clock =====
const clock = document.getElementById("clock");
function tick() {
  clock.textContent = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}
tick();
setInterval(tick, 15000);

// Open the Welcome window when the page loads
openWin("welcome");
