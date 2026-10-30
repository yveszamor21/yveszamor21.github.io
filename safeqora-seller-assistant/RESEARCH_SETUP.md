# Marketplace research and comparison — activation

The existing GitHub app keeps its original URL and browser products. A separate owner-private service now supports Rainforest (Amazon) and BlueCart (Walmart). Research is started by an explicit button, uses a separate signed-in tab, and returns only normalized product data to the app. Saved products, acquisition cost and quantity are not sent to providers.

## What is implemented
- Marketplace selection and source-backed product/offer cards with image/link, total price when shipping is known, source retrieval/processing time and candidate match status.
- Partial, deduplicated identifiable seller counts, reported offer count separately, and available Amazon recent-sales text as a demand signal. Missing Walmart demand stays unavailable.
- Explicit exact-item confirmation before applying a provider price. Fee and eligibility confirmation remain separate. Mismatched identifiers or unknown shipping prevent applying the quote.
- Research history under `safeqora_research_history`, retained separately from existing products. Last ten entries are displayed; stored entries are not truncated. Export full recovery JSON includes the raw history. Product restore still merges products only; history is not overwritten automatically.
- Independent fee inputs for Amazon FBA/FBM and Walmart WFS/seller fulfillment, with quantity profit, acquisition investment, fees, ROI, margin and break-even. Fee fields start empty until entered or explicitly copied from the selected original method. “Other costs” includes prep, packaging, returns, closing and plan allocation.
- Identity/form changes clear comparison decisions, prior-product fee verification and stale research. Popup responses must match the source window, exact backend origin, random nonce, current barcode and request revision.

## Private service
https://safeqora-research-bridge.yveszamor21.chatgpt.site

This is owner-private and requires Sign in with ChatGPT. In the app choose Open private product lookup, then click Look up product and offers in that tab. If signing in separates the popup connection, close the private tab and reopen it from SafeQora once signed in.

## Activation required for live data
No provider keys are configured and live calls remain disabled. No trial account, paid subscription or marketplace seller account was created. Until activation the real service returns `not-connected`, not sample prices.

1. Create/evaluate provider accounts:
   - Amazon: https://trajectdata.com/discover-rainforest-api/
   - Walmart: https://trajectdata.com/discover-blue-cart-api/
2. Both advertise 100-request no-card trials. Verify current terms. A combined lookup can use one product request and one offers request per platform; 100 requests does not mean 100 full comparisons. Ongoing provider use may cost money.
3. Configure `RAINFOREST_API_KEY` and `BLUECART_API_KEY` as secrets on private service project `appgprj_6ae46af96f208191b1de6ae5936e320b` using native server secret settings/tools. Do not paste keys into the public app, GitHub source, URLs or browser storage.
4. After authorizing provider usage/cost limits, set server `RESEARCH_ENABLED=true` and redeploy the saved backend version. No keys are included in this repository.
5. Verify two real products against source listings, including pack, variation, condition, buyer shipping and location. Then check seller eligibility inside your own marketplace account before marking it confirmed.

Provider data are observations, not guaranteed future prices, sales or complete seller coverage. The implementation fetches one offers page per marketplace to keep credit use bounded. It does not infer unique sellers from offer totals, convert review count into demand, divide product sales evenly among sellers, or guess days until your inventory sells. Publishing, inventory/order synchronization and account-specific fee/eligibility APIs remain separate future seller integrations.

## Verification
Frontend: `npm ci && npm test` in this directory. Research fixtures in tests are synthetic and never deployed as live data. The private backend has its own tested source repository and `ACTIVATION.md`. API normalization/auth/disabled-state tests run without provider calls. Physical camera and successful live provider lookups cannot be claimed until actually tested. Original scanner, capture retention, recovery and saved-product tests remain part of the complete suite.
