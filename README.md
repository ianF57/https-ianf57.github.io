# Ian Faasen · portfolio

A personal portfolio site built as a Cult of the Lamb-styled illuminated manuscript.
Six projects are dealt as tarot cards; each says what it actually is on the front and
what was genuinely hard about it on the back. Two of the machine learning projects can
be driven by hand in the Trials chapter, including on files you bring yourself.

## Running it

There is no build step, no dependency install, and no server requirement.

```
open index.html
```

Double-clicking the file works. Everything (illustrations, icons, texture, sound,
model output) is inline or in `assets/`, so it runs from `file://` with no network
access. The scripts are plain `var`-style scripts on purpose: ES modules do not load
over `file://`, so a bundle-free page has to avoid them.

To serve it instead:

```
python -m http.server 8000     # then visit http://localhost:8000
```

## Files

| Path | What it is |
| --- | --- |
| `index.html` | The whole site. Content, structure, and the inline SVG sprite (17 symbols). |
| `assets/css/style.css` | Design tokens, per-chapter theming, layout, motion, print styles. |
| `assets/js/main.js` | 16 self-contained interactive modules, in numbered sections. |
| `assets/js/demo-data.js` | Recorded output from the two ML pipelines, as one plain script. |
| `assets/img/plates/` | Six synthetic number-plate renders used by Trial I. |
| `assets/Ian_Faasen_CV.pdf` | The C.V. linked from the nav, the hero, and the contact chapter. |
| `.nojekyll` | Tells GitHub Pages to serve these files as they are, with no Jekyll pass. |
| `.gitignore` | OS clutter, editor state, archives, and any second copy of the C.V. |

`assets/Ian_Faasen_CV.pdf` is the one copy of the C.V. and the one the site links to.
Keep it replaced, not added to: a second copy in the repository root would be served
publicly and would drift out of step with the page, which describes the same experience
in its own words. `.gitignore` blocks a stray copy by name.

## Hosting

Deployed as a GitHub Pages site with no build step: the branch is the artifact. Pages
serves `index.html` from the repository root, and `.nojekyll` keeps Jekyll out of the
way.

**Every path in the site is relative.** That is deliberate, and it is what lets the same
files work from `file://`, from a root domain, and from a project subpath without a
single edit. Do not introduce a leading-slash path such as `/assets/css/style.css`: it
works at a root domain and breaks under a subpath, which is the failure that only shows
up after deploying.

Two repository names, two different URLs:

- A repository named exactly `<user>.github.io` is served at `https://<user>.github.io/`.
- Any other name is served at `https://<user>.github.io/<repository>/`.

## The Trials

Chapter V shows two shipped machine learning pipelines rather than describing them.
The corpus numbers come from `demo-data.js`, which was produced by running the
projects' own code against their own sample corpora before the page was built. The
rules, though, are ported and live: the VIN validation rules out of the notebook, the
error-rate scoring functions out of `data_store.py`, the hallucination rule out of
`hallucination_ops.py`, the image quality gate out of `vin_quality.py`, and the trim
thresholds out of `config.py`.

Each trial also carries a **bring your own file** panel, and neither of them is a
mock-up:

- **Trial I** reads a photograph through the same pipeline a plate photo goes
  through: luminance, the canonical 1024-px rescale (an exact port of
  `cv2.resize`'s `INTER_AREA` and `INTER_CUBIC`), Brenner focus, brightness mean and
  standard deviation, Otsu stroke contrast, and Laplacian variance, then the crop
  gate's own thresholds. Verified against the project's functions over ten frames,
  worst relative error 1.5e-5, every flag verdict identical.
- **Trial II** decodes a recording with the browser's decoder, resamples to mono at
  the project's 16 kHz, gates it frame by frame, applies the trim rule (silences of
  2 s or more cut to a 300 ms gap), draws the real waveform with the cuts marked, and
  scores any transcript you paste against any reference you paste, using the
  project's own tokeniser and edit distance. Verified against the project's functions
  over 28 cases, including Unicode, CJK and astral characters.

Silero VAD and Whisper are model weights, not browser APIs, so the recording panel
uses an energy gate in place of the first and asks you to paste the output of the
second. It says so on the panel, in those words, rather than borrowing the names.

The two trials do not claim the same kind of evidence, and the page says so:

- **Trial I, the Sigil** (`VIN_VLM`). Real OCR inference and real validation over six
  synthetic rendered plates, run at build time. The trained segmentation model is
  private, so the plate box comes from Otsu thresholding instead, and the page says
  that where it happens. The deskew stage is skipped for the same reason, so the
  skewed plate is read as it lies. Every plate carries a `SYN` prefix so it cannot
  collide with a real vehicle.
- **Trial II, the Confession** (`Retention_admin_automate`). The corpus is the
  project's own published sample: eight invented calls in the exact record schema the
  pipeline emits. Every word and every id in it is fabricated. The error rates are
  not: they are computed by `data_store.py`'s own `compute_wer` and `compute_cer`
  over that corpus. The planted hallucination tail is part of the sample, not a
  discovery, and the page calls it "the planted artefact" rather than presenting it
  as a finding.

A portfolio that blurs computed numbers and invented corpora together is not worth
reading, so the chapter keeps them apart in the copy as well as in the data.

## The design

**Palette.** Parchment bone (`#EFE7D3`) and near-black ink (`#1A1614`) carry the page.
Vermilion (`#D0402C`) is the Red Crown: it marks the thing you should act on and
nothing else. Gold (`#E3A93C`) is trim. Ritual purple and moss appear only as
doctrine tints, where they encode which of the four disciplines a skill belongs to.

**Type.** Grenze Gotisch (blackletter) for display, Alegreya Sans for reading,
Space Mono for numbers, labels, and metadata. The blackletter-versus-monospace
clash is the point: it is the difference between scripture and telemetry, which is
what the site is about.

**Structure.** The page is six chapters (Record, Deck, Doctrines, Faithful, Trials,
Rite) that read as a progression rather than a list of sections. Chapter numerals are
structural, not decorative. Tarot numerals are different again: a card's numeral is
the *weight* of the work, not the order it was built in.

**Motion.** Chapters swap foreground and background as you descend (`.ch--ink` /
`.ch--bone`), so the page alternates light and dark the way a printed book alternates
plate and text. A crown in the hero tracks your cursor.

## Interactivity

- **The deck**: turn any card by clicking it or its turn button. Unread cards are
  counted; shuffle re-deals with a staggered animation; draw-at-random flips a card
  and moves focus to it.
- **Ritual sound**: off by default. The toggle in the nav unlocks a Web Audio layer
  (knock, turn, chime, hop). Nothing plays until you ask for it.
- **The faithful**: followers walk the footer. Hover or focus one to make it hop.
- **Doctrine tablets**: hover a tablet to light its disciples; the tongue bars fill
  as they scroll into view.
- **The six plates**: pick a plate and read it. The seven stages of the pipeline
  cascade in, each with the value it actually returned; the quality gate says
  "blurry" on plates that still read, which is the point of a gate.
- **The VIN forge**: type or paste anything and watch the notebook's own rules run on
  it. Cleaning, the 17-character window, the banned-letter repair with its
  substitutions itemised, and the manufacturer lookup on the first three characters.
  It refuses to guess past four banned letters.
- **The recordings**: pick a call to redraw the conversation map, the segment ledger,
  and the scores. Hovering a ledger row lifts the matching bar. Each call says whether
  it carries a hand-checked reference, and the ones that do not are left unscored
  rather than given an invented rate.
- **Bring your own plate**: drop a photograph on the frame and the quality gate runs on
  it, measured at 1024 px on the long side exactly as the project measures a crop. The
  seven stages are listed with the two that cannot run here marked as such rather than
  omitted. A non-image is refused with a reason.
- **Bring your own recording**: drop a WAV, MP3, M4A, OGG or FLAC and the panel reads
  its header for the true source rate, decodes it, resamples to mono at 16 kHz, gates
  it, applies the trim rule, and draws the waveform it found with the cuttable silences
  banded in vermilion. Paste a transcript and a reference and it scores word and
  character error rates with the project's own functions, then walks the hallucination
  rule condition by condition. Both optional values are honoured as optional: leave a
  logprob or a compression ratio blank and the rule skips that condition, exactly as
  the project does when a record has no value for it.
- **A revelation**: there is one. Click the crown five times in quick succession, or
  type `PRAISE` anywhere on the page.

## Accessibility

Built to a floor, not as a feature:

- Skip link; every control is a real `<button>` or `<a>`.
- The face of a card that is turned away is marked `inert`, so Tab never lands on a
  control nobody can see. (Falls back to `aria-hidden` + `tabindex="-1"` where
  `inert` is unsupported.)
- Focus is always visible (`:focus-visible`), and never moved somewhere invisible.
- The plate rail and the call list are `aria-pressed` button groups with a labelled
  heading, so which one is selected is announced rather than only coloured. The step
  cascade and the verdict are `aria-live`, so a read is spoken as it lands.
- Both bring-your-own panels are `aria-live`, so a measurement is spoken when it lands.
  The file inputs are real inputs, visually hidden and focusable, with the dashed frame
  as their `<label>`: the whole frame is clickable, and Tab reaches it either way. The
  waveform is `role="img"` with a `<title>` naming the file, the duration and how many
  silences were marked, and every number it draws is also a fact above it.
- The conversation map is drawn with `role="img"` and a `<title>` naming the call, and
  every bar it draws is also a row in the ledger underneath: the map is a convenience,
  never the only copy of the data.
- `prefers-reduced-motion: reduce` disables the ambient loops, embers, and reveals,
  and shows the whole step cascade at once instead of staggering it.
- `prefers-contrast: more` raises line and text contrast.
- A `<noscript>` block lays both card faces flat, and both trials state their findings
  in prose, so nothing is lost with JS off.
- Print styles unfold the deck and drop the chrome. The trials print as plain evidence:
  every panel is reset to black on white, so the page is readable on paper whether or
  not the printer is set to render background graphics.

## Browser support

Modern evergreen browsers. Uses `inert`, CSS custom properties, `IntersectionObserver`,
Web Animations, `backface-visibility`, and `:focus-visible`, all with sane fallbacks
except the 3D flip, which degrades to a cross-fade.
