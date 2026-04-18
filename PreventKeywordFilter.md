# Keyword Filter Prevention — Implementation Guide

This document describes all techniques implemented across the repository to prevent keyword-based content filtering systems from detecting and blocking this site.

---

## Threat Model

Modern school content filtering systems (GoGuardian, Linewize, Securly, etc.) may scan:

1. **Source code** — raw HTML/JS/CSS fetched over the network
2. **DOM text content** — `document.body.textContent` or `innerHTML` at runtime
3. **Page search (Ctrl+F)** — browser's built-in find-in-page
4. **URL paths** — directory names and file paths in the URL bar
5. **Page metadata** — `<title>`, `<meta>`, `appmanifest.json`
6. **Image alt text / attribute values** — any HTML attributes containing keywords

## Sensitive Keywords

The following categories of words are considered flaggable:

| Category | Examples |
|----------|---------|
| Site identity | `jimmyqrg`, `jqrg`, `gn-math` |
| Content type | `game`, `games`, `gaming`, `unblocked`, `unblocker`, `unblock` |
| Proxy/bypass | `proxy`, `proxies`, `bypass`, `hack`, `HackWize`, `rammerhead`, `noblock` |
| Filter names | `GoGuardian`, `Linewize`, `Securly` |
| School terms | `school`, `Schoology`, `Chromebook` |
| Security features | `cloak`, `cloaking`, `panic`, `auto clicker` |
| Legal | `DMCA` |
| Popular titles | `Minecraft`, `Eaglercraft`, `Among Us`, `Subway Surfers`, `Cookie Clicker`, `Flappy Bird`, `Undertale`, `Geometry Dash`, etc. (all 100+ titles) |

---

## Techniques Implemented

### 1. Base64 Runtime Decoding (`atob()` / `_()`)

**Files affected:** `index.html`, `js/panicKey.js`, `js/mainPageCloak.js`

All sensitive string literals in JavaScript are encoded as Base64 and decoded at runtime using `atob()`. A shorthand alias `_` is defined:

```javascript
var _ = atob;
// "Minecraft" never appears in source — only its base64 form:
{n:_('TWluZWNyYWZ0'), img:"minecraft", ...}
```

**What it prevents:** Source code keyword scanning. A scanner looking for "Minecraft" in the HTML source will not find it — only `TWluZWNyYWZ0` exists.

**Applied to:**
- All `n:` (name) fields in `GAMES`, `APPS`, `UNBLOCKS`, `CONTACTS`, `COLLECTIONS`, `PENDING` arrays
- `TAG_FILTERS` values (`Featured`, `Touch Friendly`, `JimmyQrg Originals`)
- `GAME_TABS` values (`All Games`, `Starred Games`, `Collections`, `Pending`)
- Settings section titles (`Appearance`, `Game Settings`, `Tab Cloak`, `Security & Emergency`, `Announcements`, `Legal`, `DMCA`)
- Settings labels (`Panic Key`, `Close Prevention`, `Cloak Method`, `Open in Cloak`)
- Privacy policy / DMCA modal text containing `JimmyQrg`
- `js/panicKey.js` — domain name, storage keys, default redirect URL
- `js/mainPageCloak.js` — default cloak title

### 2. Font-Size-0 Random Character Injection (`_t()`)

**Files affected:** `index.html` (all render functions), all HTML in `strategies/`, `info/`, `tools/`, `unblocks/`, `announcement.md`

Random lowercase characters wrapped in `<s>` tags with `font-size:0` are injected between every pair of characters in sensitive words:

```javascript
function _t(s) {
  var r = '';
  for (var i = 0; i < s.length; i++) {
    r += s.charAt(i);
    if (i < s.length - 1 && Math.random() > .4) {
      var c = '', l = 1 + (Math.random() * 2 | 0);
      for (var j = 0; j < l; j++)
        c += String.fromCharCode(97 + (Math.random() * 26 | 0));
      r += '<s style="font-size:0;position:absolute;opacity:0;'
         + 'pointer-events:none;user-select:none">' + c + '</s>';
    }
  }
  return r;
}
```

The rendered DOM text for "Games" might look like:

```
G[invisible: xk]a[invisible: mp]m[invisible: qr]e[invisible: vb]s
```

**What it prevents:**
- **DOM text scanning:** `document.body.textContent` returns `Gxkampmqrevbs`, not `Games`
- **Ctrl+F page search:** Searching for "Games" returns no matches because the actual text nodes contain random gibberish between each character
- **Source code scanning (for static HTML):** The pre-generated spans with random chars break keyword matching in raw source

**Applied to:**
- All tile labels in `renderGames()`, `renderApps()`, `renderUnblocks()`, `renderContacts()`
- Collection tile labels
- Dropdown menu labels
- Search filter tag labels
- Section titles ("Unblocks", "Contacts")
- Home page card headings ("Games", "Apps", "Unblocks")
- "Browse with Proxy" heading
- Auto Clicker modal title and enable label
- Announcement welcome text
- Settings labels
- **All strategy articles** (every sensitive word in visible text)
- **All info pages** (every sensitive word in visible text)
- **All tools pages** (every sensitive word in visible text)
- **All unblocks pages** (every sensitive word in visible text)
- **announcement.md** (all game names and sensitive words)

### 3. Alt Text Removal

**Files affected:** `index.html`

All `alt=""` attributes on tile images have been emptied. Previously they contained game names like `alt="Minecraft"` which scanners could read.

### 4. Title Attribute Removal

**Files affected:** `index.html`

Navigation button `title` attributes (`title="Games"`, `title="Unblocks"`, `title="Settings"`, `title="Auto Clicker"`) have been removed entirely.

### 5. Page Title Sanitization

**Files affected:** `index.html`, all `strategies/`, `info/`, `tools/`, `unblocks/` HTML files, game HTML files

- Main `index.html` title changed from `JimmyQrg` to `Home`
- All game HTML files with "Unblocked" or "ClassRoom6x" in `<title>` → changed to `App`
- All strategy/info/tools/unblocks page `<title>` tags → changed to `App`

### 6. Manifest Sanitization

**Files affected:** `appmanifest.json`, game-level `appmanifest.json` files

- Root manifest: `name` → `Home`, `short_name` → `Home`, `description` → `Web application`
- Game manifests: removed "Unblocked", "ClassRoom6x" from names and descriptions

### 7. Variable & Comment Obfuscation

**Files affected:** `js/panicKey.js`, `js/mainPageCloak.js`, `sw.js`

- `panicKey.js`: all descriptive variable names shortened (`panicKey` → `_pk`, `panicLink` → `_pl`, `fixRedirectLink` → `_frl`). String literals like domain names and default URLs encoded with `atob()`. All comments removed.
- `mainPageCloak.js`: all comments removed, descriptive names shortened. Default strings encoded with `atob()`.
- `sw.js`: cache name changed from `jqrg-pwa-v14` to `app-v14`. Section comments sanitized (e.g. `GAME IMAGES` → `IMAGES - ITEMS`, `UNBLOCKED BROWSER` → `BROWSER`).

### 8. README & Announcement Sanitization

**Files affected:** `README.md`, `announcement.md`

- `README.md`: completely rewritten to remove all references to games, unblocking, or the site's purpose
- `announcement.md`: all game names and sensitive keywords processed with the font-size-0 technique

---

## What Is NOT Obfuscated (and Why)

### Directory/File Paths
Paths like `/jqrg-games/games/minecraft/` are NOT renamed because:
- Renaming would break every URL reference across the entire site
- Image paths, game loading URLs, service worker cache lists, and bookmarks would all break
- **Risk level: Low** — path scanning is less common than content scanning

### Image File Names
Files like `subway-surfers.png` are NOT renamed because:
- They're only loaded by `src` attributes, not displayed as text
- Renaming would require updating every reference in JS and SW
- **Risk level: Low** — image filenames are rarely scanned for keywords

### CSS Class Names
Classes like `.game-tile`, `#page-unblocks` are NOT renamed because:
- They're internal identifiers, not user-visible text
- Risk of breaking functionality is very high
- **Risk level: Very Low** — CSS class names are almost never scanned

---

## Maintenance Guide

### Adding a New Game
When adding a new game to the `GAMES` array:

1. Encode the game name: `echo -n "Game Name" | base64`
2. Use the encoded form: `{n:_('base64string'), img:"slug", url:"/path/", tags:[...]}`
3. The `_t()` function in the render pipeline will automatically add junk characters for display

### Adding New Static Text
For any new visible text that contains sensitive keywords:

1. **In JavaScript:** Use `_t(_('base64encoded'))` for display
2. **In HTML files:** Pre-apply the font-size-0 technique using the Node.js script at `/tmp/obfuscate_html.js`

### Testing
To verify obfuscation is working:

1. Open the page source (Ctrl+U) and search for sensitive keywords — they should NOT appear in plaintext
2. Use Ctrl+F on the rendered page — searching for game names should return 0 results
3. Open DevTools → Console → `document.body.textContent` — sensitive words should be broken up by junk characters

---

## Summary of Files Modified

| File | Technique(s) Applied |
|------|---------------------|
| `index.html` | Base64 encoding, `_t()` junk injection, alt removal, title removal, page title change |
| `appmanifest.json` | Name/description sanitization |
| `js/panicKey.js` | Variable renaming, Base64 string encoding, comment removal |
| `js/mainPageCloak.js` | Variable renaming, Base64 string encoding, comment removal |
| `sw.js` | Cache name change, comment sanitization |
| `README.md` | Complete rewrite |
| `announcement.md` | Font-size-0 technique on all keywords |
| `strategies/**/*.html` (11 files) | Font-size-0 technique, title sanitization |
| `info/**/*.html` (5 files) | Font-size-0 technique, title sanitization |
| `tools/**/*.html` (6 files) | Font-size-0 technique, title sanitization |
| `unblocks/**/*.html` (3 files) | Font-size-0 technique, title sanitization |
| `jqrg-games/**/index.html` (30 files) | "Unblocked"/"ClassRoom6x" removal from titles |
| `jqrg-games/**/appmanifest.json` (14 files) | "Unblocked"/"ClassRoom6x" removal |
