const clock = document.getElementById("clock");
const tick = () => { clock.textContent = new Date().toLocaleTimeString("en-GB", { hour12: false }); };
tick();
setInterval(tick, 1000);

const walletBtn = document.getElementById("wallet-btn");
const wallet = document.getElementById("wallet-panel");
walletBtn.addEventListener("click", () => {
  const open = wallet.hasAttribute("hidden");
  wallet.toggleAttribute("hidden", !open);
  walletBtn.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    await navigator.clipboard.writeText(btn.dataset.copy);
    const old = btn.textContent;
    btn.textContent = "copied";
    setTimeout(() => { btn.textContent = old; }, 800);
  });
});

document.getElementById("order-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const body = encodeURIComponent([
    "FREECANDY order",
    "handle: " + document.getElementById("handle").value.trim(),
    "contact: " + document.getElementById("contact").value.trim(),
    "job: " + document.getElementById("package").value,
    "brief: " + document.getElementById("brief").value.trim()
  ].join("\n"));
  window.location.href = "mailto:freecandy.dev@gmail.com?subject=" + encodeURIComponent("FREECANDY order") + "&body=" + body;
  const note = document.getElementById("order-note");
  note.hidden = false;
  note.textContent = "Email draft opened. Use the wallet for USDT or XRP.";
});
