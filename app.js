const clock = document.getElementById("clock");
const tick = () => {
  const d = new Date();
  clock.textContent = d.toLocaleTimeString("en-GB", { hour12: false });
};
tick();
setInterval(tick, 1000);

document.querySelectorAll("[data-copy]").forEach((btn) => {
  btnClick(btn, async () => {
    await navigator.clipboard.writeText(btn.dataset.copy);
    const old = btn.textContent;
    btn.textContent = "copied";
    btn.classList.add("copied");
    setTimeout(() => { btn.textContent = old; btn.classList.remove("copied"); }, 900);
  });
});

function summary() {
  return [
    "FREECANDY order",
    "handle: " + document.getElementById("handle").value.trim(),
    "contact: " + document.getElementById("contact").value.trim(),
    "job: " + document.getElementById("package").value,
    "brief: " + document.getElementById("brief").value.trim()
  ].join("\n");
}

function btnClick(el, fn) { el.addEventListener("click", (e) => { e.preventDefault(); fn(); }); }

document.getElementById("copy-summary").addEventListener("click", async () => {
  const form = document.getElementById("order-form");
  if (!form.reportValidity()) return;
  await navigator.clipboard.writeText(summary());
  const note = document.getElementById("order-note");
  note.hidden = false;
  note.textContent = "Copied. Paste it to FREECANDY.";
});

document.getElementById("order-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const body = encodeURIComponent(summary());
  const subject = encodeURIComponent("FREECANDY order");
  window.location.href = "mailto:freecandy.dev@gmail.com?subject=" + subject + "&body=" + body;
  const note = document.getElementById("order-note");
  note.hidden = false;
  note.textContent = "Email draft opened. USDT preferred. XRP needs memo 6421912.";
});

function fit() {
  const screen = document.getElementById("screen");
  screen.style.transform = "";
  screen.style.width = "";
  const extra = screen.scrollHeight - window.innerHeight;
  if (extra > 2) {
    const scale = Math.max(0.72, window.innerHeight / screen.scrollHeight);
    screen.style.transform = "scale(" + scale.toFixed(3) + ")";
    screen.style.transformOrigin = "top center";
    screen.style.width = (100 / scale).toFixed(2) + "%";
  }
}
window.addEventListener("resize", fit);
window.addEventListener("load", fit);
