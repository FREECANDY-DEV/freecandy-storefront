const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const n = Math.min(320, Math.floor(canvas.width * canvas.height / 7000));
  stars = Array.from({length:n}, () => {
    const bright = Math.random() < 0.08;
    return {
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: bright ? Math.random()*1.3+0.8 : Math.random()*0.7+0.25,
      a: bright ? Math.random()*0.45+0.5 : Math.random()*0.45+0.15,
      p: Math.random()*Math.PI*2,
      s: Math.random()*0.6+0.15,
      cross: bright && Math.random()<0.35,
      c: Math.random()<0.2 ? "210,220,255" : "255,250,242"
    };
  });
}
function draw(t) {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for (const star of stars) {
    const tw = 0.65 + Math.sin(t*0.001*star.s + star.p)*0.35;
    ctx.fillStyle = "rgba("+star.c+","+(star.a*tw)+")";
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI*2);
    ctx.fill();
    if (star.cross) {
      ctx.strokeStyle = "rgba("+star.c+","+(star.a*tw*0.55)+")";
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(star.x-star.r*3.2, star.y);
      ctx.lineTo(star.x+star.r*3.2, star.y);
      ctx.moveTo(star.x, star.y-star.r*3.2);
      ctx.lineTo(star.x, star.y+star.r*3.2);
      ctx.stroke();
    }
  }
  requestAnimationFrame(draw);
}
resize();
window.addEventListener("resize", resize);
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) requestAnimationFrame(draw);
else draw(0);

const panels = [...document.querySelectorAll(".menu")];
function closeAll() {
  panels.forEach((p) => p.hidden = true);
  document.querySelectorAll(".ghost").forEach((g) => g.setAttribute("aria-expanded", "false"));
}
document.querySelectorAll(".ghost").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const panel = document.getElementById(btn.dataset.panel);
    const open = panel.hidden;
    closeAll();
    panel.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
  });
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".menu") && !e.target.closest(".ghost")) closeAll();
});
document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.stopPropagation();
    const label = btn.dataset.label;
    await navigator.clipboard.writeText(btn.dataset.copy);
    btn.textContent = "Copied";
    setTimeout(() => { btn.textContent = label; }, 800);
  });
});
