# SafeQora audit and recovery — 2026-10-30

## Baseline
- Repository: https://github.com/yveszamor21/yveszamor21.github.io
- App: `safeqora-seller-assistant/`
- Existing URL: https://yveszamor21.github.io/safeqora-seller-assistant/
- Baseline commit: `09c8621eb8176e293b25d429715498e2635257a1`
- Source backup branch: `backup/safeqora-2026-10-30`
- Repair branch: `repair/safeqora-reliability-2026-10-30`

This is a static HTML/JavaScript GitHub Pages application, with no backend, seller authentication, marketplace APIs or original test suite. The separate ChatGPT-hosted SafeQora Seller Site and portfolio files were not modified. The existing design, logo upload, research links, photo/manual scanner and product storage keys remain.

A complete Git bundle was created and verified, restored into another checkout, checked with `git fsck --full`, and the app file compared byte-for-byte. The remote backup branch preserves the original source. This does NOT back up products held on the user's phone.

## Findings and repairs
- Walmart inbound shipping was omitted from profit; negative costs silently became zero.
- Missing quantity/discount allocation, referral minimums, break-even, and buying thresholds.
- Fulfillment choices could mismatch the selected marketplace.
- Loading old records left unrelated fields from the last product; saves/imports appended duplicates.
- Corrupt storage could be overwritten; failed writes and concurrent tabs were unsafe.
- CSV omitted metadata and did not protect spreadsheet formula text.
- Scanner placement, duplicate callbacks and startup/stop cancellation needed repair.
- Review found stale BUY/verification after identity, eligibility or threshold changes; repaired and retested.

Files: `index.html` retains and extends the existing UI; `core.js` supplies validated calculations/barcodes/CSV/URLs; `reliability.js` supplies safe saves, imports, verification and scanner lifecycle; `tests/` contains regressions; `package.json` and lockfile provide dev-only tests. No production build required.

## Calculation assumptions
Purchase price/tax are per unit BEFORE discounts. Discount, transport and purchase extras are batch totals allocated over quantity. One purchased unit must equal one listing unit; manually convert multi-packs first.

Acquisition/unit = price + tax + (transport + extras − discount)/quantity.
Referral = max(sale price × category rate, minimum referral fee).
Profit = sale price − acquisition − referral − all entered selling expenses.
ROI uses acquisition cost; margin uses sale price; zero denominators show N/A.
Total investment means acquisition cost × quantity, excluding contingent selling fees shown separately.
Break-even rounds UP to cents and assumes unchanged fixed fees, minimum and percentage; recheck tiered fees at that price.
Potential total profit assumes every unit sells at those costs/prices.

FBA, FBM, WFS and Walmart seller fulfillment support individually calculated session comparison snapshots. Fees are manual estimates, not automatically retrieved. Defaults are unverified examples. Sale price should include buyer-paid shipping/gift wrap, excluding sales tax. BUY requires manually verified match, fees, eligibility and thresholds; negative profit or confirmed restriction produces AVOID; otherwise REVIEW. No demand or sales guarantee is implied.

## Data recovery
No storage migration or product deletion occurs on load. Existing `safeqora_products` and `safeqora_logo` keys remain. Before using changes, export the existing CSV from the same device/browser; never clear site data.

1. Export full recovery JSON regularly: exact product data, logo and settings are included. CSV prefixes formula-like text with an apostrophe for spreadsheet safety; JSON is the lossless archive.
2. Every product mutation verifies a previous-data recovery copy first. Backup/quota failures block saving. Concurrent-tab changes block stale writes.
3. **Recover missing products from previous save** merges deleted/missing records before another save replaces that snapshot. Current records are kept.
4. JSON/CSV restore merges nonduplicate products and resets verification. Legacy blank quantity becomes 1. It does not roll back edits to already-present records: use the archived values to edit that record explicitly.
5. Product restore does not overwrite logo/settings. Re-upload the logo and set thresholds explicitly. Replaced logo/settings have their own `_recovery` keys.
6. Corrupt product JSON blocks writes and offers raw export. Retain that export for targeted repair; do not reset storage.
7. Source rollback: revert the repair commit or restore only this app directory from the backup branch. Do not reset the unrelated portfolio repository. Source rollback cannot restore phone data.

No seller credentials are collected; no product records are logged or uploaded. Camera decoding retains the pinned existing html5-qrcode 2.3.8 CDN dependency and native fallback; offline/CDN availability is not guaranteed.

## Validation
Run `npm ci && npm test` in this directory (Node 24, jsdom 26.1.0). Observed final suite: 35 passing tests. Original Walmart/negative-cost regressions failed first. Coverage includes arithmetic, UPC-A/UPC-E/EAN-8/EAN-13 checksums, CSV, URL safety, DOM initialization, legacy edits, duplicate import, corrupt/concurrent storage, recovery, and simulated scanner duplicate/start-stop behavior. Code review corrections were retested; syntax and whitespace checks passed.

Baseline production URL returned HTTP 200. Cloud browser could not reach local preview (connection refused). No visual/mobile-layout test, physical camera test, real photo decode or real-product marketplace end-to-end test is claimed. Barcode fixtures are checksum vectors, not verified marketplace identities. No seller API/authentication test occurred. Deployment status is reported separately in the task response.

## Secure integration proposal — not provisioned
Keep GitHub Pages. After provider/cost approval, add a small serverless HTTPS backend and database (for example a Worker-style service); verify current free-tier limits before choosing hosting. Require owner authentication, exact-origin CORS, CSRF/OAuth state, rate limits, server secret storage, encrypted persisted tokens, log redaction and revocation. Start read-only. Listing/inventory/account changes must show a preview and require explicit approval. Never store credentials in frontend, browser storage or public GitHub. No paid service or backend was enabled.

Amazon needs authorized SP-API access and roles for catalog, pricing, fees, restrictions, listings, inventory and orders. Public apps use Login with Amazon OAuth; private apps can use documented self-authorization. Walmart needs approved access and the applicable official OAuth flow for catalog, feeds/listings, inventory, orders and WFS. Do not use deprecated delegated keys for new provider integrations.

Licensed third-party data may be needed for barcode enrichment without seller accounts, price history, competition or demand estimates. Keep source/time/confidence; it cannot establish seller eligibility or exact match from names alone.

References checked 2026-10-30:
- https://sell.amazon.com/pricing
- https://sell.amazon.com/pricing/estimate
- https://marketplace.walmart.com/pricing/
- https://marketplace.walmart.com/walmart-fulfillment-services-pricing/
- https://developer-docs.amazon.com/sp-api/docs/onboarding-overview
- https://developer-docs.amazon.com/sp-api/docs/get-product-fee-estimates-asin
- https://developer-docs.amazon.com/sp-api/lang-en_EN/docs/manage-product-listings-guide
- https://developer.walmart.com/us-marketplace/reference/getsearchresult
- https://developer.walmart.com/us-marketplace/docs/authentication-authorization
- https://developer.walmart.com/global-marketplace/docs/oauth-authorization

## Exact user steps and outstanding scope
1. Export phone/browser products before testing.
2. Test two actual packaged products: rear/front camera where supported, stop, photo and manual barcode.
3. Independently verify brand/model/size/color/pack/condition and current price on both marketplaces.
4. Enter purchase totals and each fulfillment method's official fee estimates; verify seller eligibility in the seller account.
5. Save/reopen/edit/export/restore a disposable record and confirm existing records remain.
6. Select and approve a backend provider if connected seller accounts are wanted.

Persistent scan-by-scan history, automated four-way fees, live inventory/orders/listing status, automatic exact matching and prices remain unimplemented. Saved products serve as local research records. This repair must not be described as a fully finalized application before physical-device and real-product acceptance tests pass.
