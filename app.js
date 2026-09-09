const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
const stars = [];
let w = 0, h = 0;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  stars.length = 0;
  const count = Math.min(220, Math.floor((w * h) / 9000));
  for (let i = 0; i < count; i++) {
    stars.push({ x: Math.random()*w, y: Math.random()*h, r: Math.random()*1.15+0.2, a: Math.random()*0.55+0.15, s: Math.random()*0.12+0.02, p: Math.random()*Math.PI*2 });
  }
}
function draw(t) {
  ctx.clearRect(0, 0, w, h);
  for (const star of stars) {
    const tw = 0.55 + Math.sin(t * 0.001 * star.s * 40 + star.p) * 0.45;
    ctx.beginPath();
    ctx.fillStyle = "rgba(236,228,214," + (star.a * tw) + ")";
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
    star.y -= star.s * 0.35;
    if (star.y < -2) star.y = h + 2;
  }
  requestAnimationFrame(draw);
}
resize();
window.addEventListener("resize", resize);
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) requestAnimationFrame(draw);
else stars.forEach((star) => { ctx.beginPath(); ctx.fillStyle = "rgba(236,228,214," + star.a + ")"; ctx.arc(star.x, star.y, star.r, 0, Math.PI*2); ctx.fill(); });
const walletBtn = document.getElementById("wallet-btn");
const wallet = document.getElementById("wallet-panel");
walletBtn.addEventListener("click", () => {
  const open = wallet.hasAttribute("hidden");
  wallet.toggleAttribute("hidden", !open);
  walletBtn.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const label = btn.dataset.label || btn.textContent;
    await navigator.clipboard.writeText(btn.dataset.copy);
    btn.textContent = "Copied";
    setTimeout(() => { btn.textContent = label; }, 900);
  });
});
