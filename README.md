# Hotpoint UK static project

**Status: local build complete for the revised scope; ready for manual upload.** Normal pages retain their verified Analytics, Replay, Web Experiment and Guides & Surveys integrations. The separate treatment preview is intentionally visual-only, as Khaled requested: no SDKs, events, tracking, identities, recorder, cookies or browser storage. Its interactive basket/delivery choices exist only in page memory and reset on refresh. No deployment has been performed; actual hosted checks remain pending publication.

Location: `/Users/khaledismail/Desktop/Beko Demo/GPT Files/Codex Files/`. This later requested destination replaces the separate Desktop destination in the pasted brief. All upload code and local assets are together here; audit/test tooling stays in the parent `_checks/` folder and must not be uploaded.

## What is built

Plain HTML, CSS and vanilla JavaScript; no installation, build or backend. Every screen has a real directory and index.html. No hash, History API or query-string routing. Relative assets work at a repository subpath. `.nojekyll` and a branded `404.html` are included. Five categories, product detail routes, search, filters, saved items, gallery, reviews, recommendations, editable basket, per-appliance installation, postcode checks, delivery slots, simulated checkout and stable order confirmation are implemented. The word excluded by Khaled does not appear in visible page copy, page titles, navigation or presenter controls. Required repository identifiers and exact technical taxonomy remain unchanged.

Normal shopping data and session identifiers use browser localStorage. Raw alias input is normalized into the required readable session ID; use a fictitious alias. Raw postcode, address and payment information are never stored in the shopping state or event recorder. Address details remain in the checkout document only. No card entry, real payment or order placement exists.

`brand.md` records the measured palette, screenshot/CSSOM distinction, reference hierarchy, local fonts, and inferred screens. Product prices/specifications/ratings are explicit illustrative catalogue data. Tumble-dryer and fridge-freezer imagery was not supplied; those two entries explicitly show “Image unavailable”. No unrelated images were invented. Delivery is £0; catalogue prices include VAT. `tax_amount: 0` means no additional tax is charged; included VAT is not added again. Installation is £25 per freestanding appliance or £40 per integrated appliance, multiplied by quantity. WELCOME10 reduces appliance prices by 10%, excluding services.

## Local preview

A Python static server is required; opening file:// URLs is insufficient for source-list loading. The local server used for verification served the parent GPT Files folder at port 8000. The temporary subpath alias `beko-hotpoint-uk-demo` belongs to the parent QA workspace, not this upload folder.

- Storefront under repository-like base: `http://127.0.0.1:8000/beko-hotpoint-uk-demo/index.html`
- Independent early-delivery preview: `http://127.0.0.1:8000/beko-hotpoint-uk-demo/delivery-preview/index.html`
- Folder-name base also checked: `http://127.0.0.1:8000/Codex%20Files/index.html`

If serving the contents of Codex Files directly instead, start at the server root `/index.html` and `/delivery-preview/index.html`. All paths remain relative.

## Delivery-ready rehearsal

1. Open the storefront. In “Your shopping session”, use fictitious alias Alex and run number 1. Optionally enable the local interaction recorder.
2. Select “Check delivery before I shop” → Start shopping.
3. Enter SW1A 1AA → Check delivery → Confirm delivery preferences. This performs the actual behavioral checks; the label alone does not confirm readiness.
4. Select Washing Machines → open the Fabric Care Pro washer → Buy now.
5. Choose a delivery date in the basket → Continue to checkout. This path never opens the normal delivery gate.
6. Enter fictitious address details, choose the test payment, tick the simulation acknowledgment and place the order. Refresh confirmation: it must not send another Order Completed.

## Delivery-unprepared rehearsal

1. Open footer Session settings. Set run number 2 → Choose delivery later → Start shopping. An explicit switch starts a separate identity and clears the current cart/services; the stable suffix prevents persona merging.
2. Browse and add an appliance → Continue to checkout. The separate `/delivery/index.html` gate opens before checkout.
3. Refresh the gate, or open `/checkout/index.html` directly before arranging delivery: checkout remains protected.
4. Check the postcode, confirm per-appliance services, choose a date and select Confirm and continue. Only then does Checkout Started occur.
5. To record abandonment instead, choose “Leave without choosing delivery”. The basket is retained for backtracking. “Leave basket” on the basket screen records the separate basket abandonment action.

After completing the gate, its approval applies to the current valid basket/session. Basket mutations clear the slot and require reconfirmation. The unprepared basket button still goes through the separate delivery URL. There is no random path choice, login requirement or experiment assignment.

## Explore and edit

- Continue shopping from the basket; add a dishwasher through a recommendation or the Dishwashers category. The washer and its valid installation choice remain.
- Plus/minus change quantities; Remove removes an appliance and its dependent installation choice. Adding/removing/re-adding invalidates the basket slot. Other valid services and the checked area remain.
- Choose standard installation for each appliance independently. Mixed integrated/freestanding baskets disclose separate deliveries on the selected date.
- Change area invalidates delivery-dependent state. Postcodes beginning BT/GY/JE/IM are deliberately outside this local illustrative service area; other syntactically valid UK postcodes are serviceable. This is not a real postcode eligibility API.
- Search supports model/category/name and zero results; category, stock, installation type, colour, capacity, energy, maximum-price and sort controls change actual results. On mobile open Filter appliances first.
- Hearts save actual products; the header heart opens them. Reviews require opening the Reviews tab; gallery, specs, description and documents have real content/actions. Official documents links use supplied official product URLs.
- WELCOME10 is accepted; other entered codes generate a failed attempt. Unknown raw codes are not recorded verbatim.
- End shopping session in the footer explicitly records Session Ended. Page navigation itself does not end sessions. Live recorder evidence is distinguished from the earlier offline checks. SDK-owned records may remain “queued” when the SDK exposes no per-event callback; the private HTTP ledger separately proves their acknowledgments.

## Independent early-delivery preview

Open `/delivery-preview/index.html` directly, including in a fresh browser. No normal page links to it. It uses only an in-memory cart and service choices. It creates no identity and never reads or writes browser storage; normal shopping sessions remain untouched.

1. Optionally check your postcode, or select Choose delivery later and keep exploring.
2. Add washer and dishwasher; choose installation per appliance, change quantities or remove an item.
3. Check the postcode if deferred; choose a basket-specific date after the contents are known.
4. Confirm delivery preferences. This explicit action is the sole source of Guided Delivery Setup Completed. Basket changes invalidate only the slot/dependent appliance choices.

There is no feature-flag lookup, automatic experiment routing, assignment, exposure, analytics event or replay recording on this URL. It loads only local `assets/preview.js`, local CSS/fonts/images and uses in-memory shopping state. The normal matching flag `delivery-setup-opened-reduction`, its enrollment, metric, results and statistical analysis were not changed. Preview CSS remains page-local in `assets/preview.css`.

Khaled explicitly removed all telemetry from this standalone presentation page after clarifying that it is separate from experiment results. This replaces the earlier proposed memory-only SDK plan and removes its approval blocker. No separate preview SDK is included or needed.

## Sources and campaigns

Session settings → expand Campaign entry → choose one of all 32 source/category mappings (29 distinct sources), or Direct → Open campaign entry. The mapping is retained verbatim in `assets/source-mapping.json`. Paid search uses cpc, paid social uses paid_social. Other groups preserve their supplied medium labels. All tagged entry links use `utm_campaign=black_friday_preview_2026`.

Examples, under any actual hosting base:

- `index.html?utm_source=google&utm_medium=cpc&utm_campaign=black_friday_preview_2026`
- `index.html?utm_source=facebook&utm_medium=paid_social&utm_campaign=black_friday_preview_2026`
- `index.html?utm_source=open_ai&utm_medium=llm&utm_campaign=black_friday_preview_2026`

Organic/AI referrals need a genuine referring link to verify referrer-based classification; UTMs do not spoof document.referrer. The local channel property is an expected label, not proof of classifier 31873. Browser referrers are reduced to origin/hostname to exclude sensitive paths. No referrer is fabricated. Raw direct acquisition has absent UTM/referrer fields; a seven-day last eligible touch remains available separately and is frozen onto conversions. Initial attribution is retained. Internal navigation does not add UTMs or change acquisition. Browser events use current time, with no historical backfill.

## Recorder and diagnostics

Explicit opt-in: Session settings → “Record interactions locally for this session”. This is separate from telemetry permission. Recorder setup precedes page tracking; ordered records persist through normal navigation. It stores event names, sanitized properties/options, user/device/session IDs, timestamps and status. It never logs raw postcodes/addresses or a fallback preview identity to storage.

Browser developer console read-only helpers:

- `analytics.records()` — current buffer; offline records say `offline-only`, not delivered.
- `sdkCheck()` — selected project/region, actual observed script URLs, client readiness probes, configuration status, identity, queued/acknowledged counts and resource requests.
- `analytics.recorder(true)` / `analytics.recorder(false)` — local recorder opt-in/out for subsequent interactions.

A log is not ingestion evidence. SDK initialization, product integration, conversion payloads, successful upload responses and visible Replay must be independently verified after go.

## Live integration prerequisites and bounded approval

Target: project **911671**, organization **432322 / khaledismailtest**, **US**. Client write key: `1c867be258598bb9e3e42f64ae6b954d`. This key and all hosting files are publicly visible. No private API credential, dataset, upload tool or historical profile file is in this folder.

Read-only preflight on 18 November 2026 confirmed the project/org through the connected US tool. Project currencyLocale remains en-us with no targetCurrency; timezone was returned blank (the earlier UI capture showed UTC). The service reports 30-minute sessions. No project settings were changed. The key returned an effective SDK remote configuration with Medium, no selector overrides, capture_enabled true and sample_rate 1.0. The authenticated API Keys UI was independently rechecked during this build: project selector Beko Hotpoint UK Demo (911671), one Active client key, exact full value matching the supplied key. The General UI also confirmed UTC and United States ($).

Live source versions initialized and verified on normal pages: Browser SDK 2.42.4, Replay plugin 1.32.1, Web Experiment tag 0.29.2. One unified loader plus one engagement loader; no separate Experiment SDK. The loader embeds empty initialFlags, not a configured evaluation of the later selected experiment. Existing experiment targeting is never recreated by this site.

The approved normal rehearsal is complete: 115 Analytics/identify/product events acknowledged by HTTP 200, country set correctly in both metadata and properties for every event. Actual ingested timelines independently confirm two Order Completed events: HP-B6D14562 for £494.10 (one washer with WELCOME10), and HP-F09FB247 for £1,088.00 (washer + dishwasher + £40 installation). Both use quantity 1 at the order revenue level; basket quantities are 1 and 2 respectively. Confirmation refresh did not duplicate either order. Server-side reserved revenue fields match the third-argument SDK payloads; the app did not duplicate them into outgoing event properties.

Effective initialized SDK configuration reports autocapture false, defaultTracking false, fetchRemoteConfig true, serverZone US, and 30-minute sessions. Remote Replay default masking was Medium before initialization. A rehearsal-only network guard inspected/decompressed outgoing requests before transmission and rejected any raw synthetic form fixture; none was detected. The guard lives in parent QA tooling, not the hosting folder.

Actual Web Experiment client and all three requested globals were checked: Experiment object, webExperiment object with isRunning true and a real experiment client, WebExperiment object with initialize function. Its bootstrap configuration contains empty initialFlags and no active experiment. No exposures, variant lookups, assignments or experiment changes were fabricated. The normal loader and plugin registrations were not duplicated.

Guides & Surveys booted and its configured-experience API returned an empty list. No guide was delivered, created, published or targeted. Any actual guide/test creation is a later named write outside this batch.

The approved batch was capped at 300 total events, three identities, two orders and 20 minutes total recorded Replay. Two identities and two orders were used, totaling 115 acknowledged events. The preview has sent zero events and, under the revised scope, will never initialize telemetry. Do not repeat the two orders or re-upload history. Actual hosted checks follow manual publication within the remaining authorized scope/caps; resolve any changed scope before further writes.

Normal-page scripts are enabled permanently for intended hosting use; no runtime expiry or temporary identity allowlist was added. Actual user publication is still required before claiming deployed behavior. See APPROVAL.md and VERIFICATION.md for evidence and boundaries.

## Exact business event coverage

| Event | Real trigger |
|---|---|
| Storefront Viewed | Storefront load after session identity exists |
| Appliance Viewed | Actual product-detail load |
| Appliance Added to Basket | Buy now / preview add |
| Checkout Started | Protected checkout screen reached |
| Order Completed | Submit simulated purchase, once per stable order |
| Delivery Setup Opened | Normal delivery-gate screen reached |
| Appliance Category Browsed | Listing/category/filter interaction |
| Appliance Searched | Actual search/results action |
| Appliance Saved | Save real appliance |
| Recommended Appliance Clicked | Open recommended appliance |
| Campaign Offer Viewed | Display offer banner or offer listing |
| Promo Code Entered | Submit actual offer-code attempt |
| Appliance Review Read | Open Reviews tab |
| Basket Abandoned | Explicit basket/delivery leave action |
| Session Ended | Explicit session end, or best-effort inactivity boundary |
| Session Started | New explicit session / inactivity boundary |
| Delivery Preferences Confirmed | Confirm checked preferences / normal gate completion |
| Delivery Setup Deferred | Choose delivery later |
| Delivery Postcode Checked | Submit valid UK postcode check |
| Delivery Slot Selected | Select basket-dependent delivery date |
| Installation Option Selected | Toggle service for a named product |
| Guided Delivery Setup Completed | Preserved historical taxonomy name; intentionally not emitted by the visual-only preview under the revised scope |
| [Amplitude] Page Viewed | Once per real screen load after identity |

No checkout defect has been verified on Hotpoint's real website. Repeated setup is the agreed synthetic scenario. No synthetic history was uploaded, regenerated or backfilled. Existing historical manifest remains prepared_not_uploaded.

## Manual GitHub website publishing — only after integrated handoff is cleared

1. Sign in to GitHub in the browser as khaledismail-sandbox.
2. Click **+ → New repository**. Name it `beko-hotpoint-uk-demo`. Select the intended visibility and click Create repository.
3. Choose **uploading an existing file** (or Add file → Upload files).
4. In Finder open **Codex Files**, select its **contents**, and drag them into the upload area. Do not upload the enclosing Codex Files folder. Keep assets and screen subdirectories intact.
5. Include `.nojekyll`. If Finder hides it, use GitHub Add file → Create new file → enter `.nojekyll` → Commit changes.
6. Manually skip the parent `_reference/`, `_tools/`, `_checks/`, historical datasets, credentials and audit payloads. GitHub's website uploader does not apply .gitignore.
7. Commit the uploaded files to main.
8. Open **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main → Folder: /(root) → Save**.
9. Wait until GitHub shows the published URL. Supply/confirm that actual URL in this chat before the approved live checks.

Expected, unverified address: `https://khaledismail-sandbox.github.io/beko-hotpoint-uk-demo/`. Independent preview would be `https://khaledismail-sandbox.github.io/beko-hotpoint-uk-demo/delivery-preview/index.html`. No repository or deployment was created during this work.

## Verification

See `VERIFICATION.md` for the separate evidence/status categories. Offline verification does not establish working hosted integrations. There is no verified repository URL or live deployment. Two ingested conversions and real recordings are verified; no guide is configured/delivered. The preview is intentionally untracked and has passed the revised no-telemetry checks.
