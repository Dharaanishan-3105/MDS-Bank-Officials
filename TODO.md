# TODO - priority fixes (bank website)

- [x] Step 1: Homepage cleanup in `index.html` (keep only: Hero, Product categories, Promotions, Compare teaser, Digital banking CTA, Latest advisories, Quick links, Footer)
- [x] Step 2: Ensure comparison teaser on homepage does not include mixed compare UI (remove any embedded compare builder from homepage)

- [ ] Step 3: Search fix verification (form has `name="q"`; JS navigates to `search.html?q=${encodeURIComponent(searchTerm)}`)
- [ ] Step 4: `security.html` YouTube iframe update to `https://www.youtube.com/embed/oJx9DpXtmAE?enablejsapi=1` and make responsive
- [ ] Step 5: GTM-friendly attributes only on important buttons (no `dataLayer.push`)
- [ ] Step 6: Final checks checklist
  - [ ] No console errors
  - [ ] No broken links
  - [ ] Mobile responsive
  - [ ] Search works
  - [ ] Comparison works
  - [ ] GTM preserved
  - [ ] No analytics code added

