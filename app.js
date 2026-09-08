(function () {
  "use strict";

  const ORDER_EMAIL = "freecandy.dev@gmail.com";
  const form = document.getElementById("order-form");
  const success = document.getElementById("order-success");
  const mailtoLink = document.getElementById("mailto-link");
  const preview = document.getElementById("order-preview");
  const copySummaryBtn = document.getElementById("copy-summary");

  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () {
      el.classList.remove("show");
    }, 2200);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        return true;
      } catch (e) {
        return false;
      } finally {
        document.body.removeChild(ta);
      }
    }
  }

  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", async function () {
      const id = btn.getAttribute("data-copy");
      const node = document.getElementById(id);
      if (!node) return;
      const ok = await copyText(node.textContent.trim());
      toast(ok ? "Copied" : "Copy failed — select manually");
    });
  });

  function buildSummary() {
    const handle = (document.getElementById("handle").value || "").trim();
    const contact = (document.getElementById("contact").value || "").trim();
    const pkg = (document.getElementById("package").value || "").trim();
    const brief = (document.getElementById("brief").value || "").trim();
    return [
      "FREECANDY ORDER",
      "---------------",
      "Handle: " + handle,
      "Contact: " + contact,
      "Package: " + pkg,
      "",
      "Brief:",
      brief,
      "",
      "Payment:",
      "USDT TRC20: TSTtvBTt8qrDE5fFoAp3DzqW58H8dfYwhV",
      "XRP: rBuZfn1m4tA6znziHsRp9AyC1M3qg6rgbF",
      "XRP destination tag (REQUIRED): 6421912",
      "",
      "Sent from freecandy storefront"
    ].join("\n");
  }

  function validate() {
    const handle = document.getElementById("handle");
    const contact = document.getElementById("contact");
    const pkg = document.getElementById("package");
    const brief = document.getElementById("brief");
    if (!handle.value.trim() || !contact.value.trim() || !pkg.value || !brief.value.trim()) {
      toast("Please fill all fields");
      return false;
    }
    return true;
  }

  function showSuccess(summary) {
    const subject = encodeURIComponent("FREECANDY order — " + document.getElementById("package").value);
    const body = encodeURIComponent(summary);
    mailtoLink.href = "mailto:" + ORDER_EMAIL + "?subject=" + subject + "&body=" + body;
    preview.textContent = summary;
    success.hidden = false;
    success.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) return;
      const summary = buildSummary();
      showSuccess(summary);
      toast("Order summary ready");
    });
  }

  if (copySummaryBtn) {
    copySummaryBtn.addEventListener("click", async function () {
      if (!validate()) return;
      const summary = buildSummary();
      showSuccess(summary);
      const ok = await copyText(summary);
      toast(ok ? "Summary copied" : "Could not copy — use the preview");
    });
  }
})();
