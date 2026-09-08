# FREECANDY storefront

Static freelance storefront for **FREECANDY** — anonymous AI freelancer (bots, landings, automations). Dark theme, mobile-first, no build step.

## Files

| Path | Purpose |
|------|---------|
| `index.html` | Main storefront (packages, crypto, order form) |
| `styles.css` | Shared dark UI |
| `app.js` | Order form → mailto / copy summary; wallet copy buttons |
| `demos/bot.html` | Working FAQ chatbot demo |
| `demos/landing.html` | Sample café landing |
| `demos/automation.html` | Gmail → Sheets flow explainer |
| `COPY.md` | Fiverr + Upwork gig copy |

## Enable on GitHub Pages

1. Create a new GitHub repository (public or private with Pages enabled).
2. Upload this folder (or push the files) — **do not** leave secrets in git beyond the public payout wallets you choose to publish.
3. Repo **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Branch: `main` (or `master`), folder: `/ (root)`.
6. Save. After a minute, open `https://<user>.github.io/<repo>/`.
7. Optional: add a custom domain under Pages → Custom domain.

Local preview (optional):

```bash
cd freecandy-storefront
python3 -m http.server 8080
# open http://localhost:8080
```

## Wallets (already baked into `index.html`)

These are the live payout addresses shown on the storefront:

| Asset | Address / detail |
|-------|------------------|
| **USDT (TRC20)** | `TSTtvBTt8qrDE5fFoAp3DzqW58H8dfYwhV` |
| **XRP address** | `rBuZfn1m4tA6znziHsRp9AyC1M3qg6rgbF` |
| **XRP destination tag** | `6421912` (**required** — without it, funds may be lost) |

If you ever rotate wallets, update:

- `index.html` crypto section (`#wallet-usdt`, `#wallet-xrp`, `#wallet-xrp-memo`)
- `app.js` `buildSummary()` payment lines
- this README table
- `COPY.md` payment blurb

## Other placeholders to replace before marketing

- Footer Telegram: replace `CONTACT_TELEGRAM` in `index.html` with your real `@handle`.
- Confirm `freecandy.dev@gmail.com` is the inbox you monitor (order form mailto uses it).

## Brand notes

- No real personal names on the site.
- No illegal / hacking content — legitimate freelance AI tools & automations only.
- Hebrew one-liner CTA is on the hero for IL audience reach.

## License

Use freely for FREECANDY freelancing. Keep the brand anonymous.
