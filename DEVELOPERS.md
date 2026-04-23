# Developers Read This

## Cloud Saves & Sign-in (`js/jqrg-cloud.js` + `js/jqrg-auth-ui.js`)

All same-origin pages on `jimmyqrg.github.io` are auth-gated and sync game progress to the chat backend (`jchat.fly.dev`). Each HTML file pulls in two scripts via the shared inject marker:

```html
<!-- JQRG_CLOUD_INJECT_BEGIN -->
<script src="/js/jqrg-cloud.js" defer></script>
<script src="/js/jqrg-auth-ui.js" defer></script>
<!-- JQRG_CLOUD_INJECT_END -->
```

### How it works
- `jqrg-cloud.js` hijacks `localStorage` and syncs every write to the server, debounced. It also snapshots IndexedDB for Unity WebGL / Construct games (`snapshotIdb` / `restoreIdb` / `autoSyncIdb`), auto-detecting those engines.
- On first login, any existing local data is bulk-uploaded to the server, then the merged set is pulled back — last-writer-wins per key. Accounts that have no server data keep their local progress (nothing is lost).
- `jqrg-auth-ui.js` adds the account button to the top bar and drives the sign-in / sign-up / account modal.
- The account modal now exposes:
  - **Sync now** – flushes pending writes and pulls the latest server data.
  - **Export data** – downloads a JSON snapshot of every save (localStorage + idb).
  - **Import data** – uploads a previously exported (or equivalent) JSON file.
  - **Delete all data** – confirm dialog that requires typing `DELETE` before wiping both server saves and local storage (the account itself is kept).
  - **Sign out** – revokes the current token.
- Pages `/403.html`, `/404.html`, `/404-safe.html`, `/404-building.html` are skipped by the gate. Anything else blocks the user with a non-dismissible modal until they sign in or sign up.

### Key JS APIs

```js
// Browser globals (after jqrg-cloud.js loads)
JqrgCloud.isLoggedIn() / getUser()
JqrgCloud.login(username, password) / JqrgCloud.register({ username, email, password, display_name })
JqrgCloud.logout()
JqrgCloud.forceSync()                  // flush pending writes + pull latest
JqrgCloud.exportAll()                  // -> { format, items: [...] }
JqrgCloud.importAll(data)              // data = { items: [...] } or plain {key:value}
JqrgCloud.deleteAll()                  // wipes server saves + synced local keys
JqrgCloud.snapshotIdb() / restoreIdb() // manual IndexedDB sync for Unity etc.
JqrgCloud.skipKey('prefix_') / skipKeys(['a_','b_']) // opt keys out of sync
```

### Server-side

The backend lives in the separate repo `chat/` (deployed at `https://jchat.fly.dev`). It exposes the user/saves APIs used by the client:

- `POST /api/auth/register` / `POST /api/auth/login` – returns a bearer token when called from an off-origin client.
- `GET /api/auth/me` – current session user.
- `GET /api/saves?origin=jimmyqrg[&kind=…][&since=…]` – list saves.
- `PUT /api/saves` / `POST /api/saves/bulk` – single or bulk upsert.
- `DELETE /api/saves?origin=jimmyqrg[&kind=…][&key=…|all=1]` – delete a key or wipe an origin.
- `GET /api/saves/stats?origin=jimmyqrg` – key / byte counts.
- `POST /api/auth/sso` / `GET /api/auth/sso?sso=TOKEN` – exchange a token for a cookie session (used when opening chat from the main site).

CORS, cookies and CSP `frame-ancestors` are configured for `jimmyqrg.github.io` and the local dev origins. Account data, tokens and saves are all stored on the same SQLite DB as chat, so existing accounts are preserved.

### Local development

```bash
# In the chat/ repo:
DATA_DIR=/tmp/jchat-smoke PORT=5831 ALLOW_IFRAME=true COOKIE_INSECURE=true \
  NODE_ENV=development node server/index.js

# In this repo (serves the static site):
python3 -m http.server 5830
```

Point the client at the local server by adding this to an HTML page when testing:

```html
<meta name="jqrg-cloud-server" content="http://127.0.0.1:5831">
```

### Adding the scripts to new HTML pages

The helper `js/inject-cloud.mjs` walks the repo and injects both script tags into any HTML that doesn't have the marker yet. Run `node js/inject-cloud.mjs` after adding a new page. If the payload between the markers needs to change across every file, update it in `inject-cloud.mjs` and run `node js/update-inject.mjs` to rewrite every existing injection.

### Opting a key out of sync

Some keys (e.g. giant ephemeral caches) shouldn't sync. Add them at runtime via `JqrgCloud.skipKey('my_cache_')`, or contribute a permanent entry to the `SKIP_PREFIXES` array in `js/jqrg-cloud.js`.

## Unreadable Code

If there are code that doesn't appear readable to you, that's normal. I have a thing that prevent keyword filter, which messes the texts up.

For more information, please read `PreventKeywordFilter.md`

## Games

Game files are located in folder `jqrg-games/games/`

Game images are located in folder `game-images/games/` or `game-images/collections/`

> To add a game, you can look at the layout of the games in `jqrg-games/index.html`.
> 
> You need both game file and game image to add a game.
> 
> _ALT_ value is __required__ to display the text on a game image.

## /page/ & /loader/?content

The source code for these are in `github.com/jimmyqrg/loader/` and `github.com/jimmyqrg/page`.

### How to use /loader/

Example:
> `https://jimmyqrg.github.io/loader/?content=https://www.example.com` [go](https://jimmyqrg.github.io/loader/?content=https://www.example.com)

How it is used in `jqrg/games/`
```html
<spam class="image game-item"><img class="image" data-j="" data-featured="" data-touchscreen="" alt="Name of the Game" src="/game-images/games/game-name.png" onclick="openGame('https://jimmyqrg.github.io/jqrg-games/games/game-name/')"></spam>
```
Break down:
```html
<spam class="image game-item"> <!-- We had to use spam because some css and js features are not available on images -->
  <img class="image" <!-- always use class="image" -->
    data-j="" <!-- if it is JimmyQrg Original game, true or false -->
    data-featured="" if it is Featured Game, true or false -->
    data-touchscreen="" if it is Touchscreen Game, true or false -->
    alt="" <-- The name of the game it displays -->
    src="/game-images/games/game-name.png" <-- The image file of the game -->
    onclick=
      "openGame(
        'https://jimmyqrg.github.io/jqrg-games/games/game-name/' <-- URL of the game -->
      )"
  >
</spam>
```
For the URL of the game, if possible, keep it inside the repo so it is controllable and independent.

## Javascript code

They are located in folder `js/`

including:

> 1. `authority.js` ban unauthorized people from entering testing areas
> 2. `blacklist.js` ban pausd.org
> 3. `cursor.js` displays and animates the cursor in pages, the cursor assets are in folder `cursor/`
> 4. `mainPageCloak.js` changes the title and the favicon of the page to Home | Schoology
> 5. `openGame.js` is the script that opens the game when a game is clicked
> 6. `panicKey.js` if you press RIGHT SHIFT, it redirects to pausd.schoology.com, allows customization (customization is in `/index.html`)
> 7. `preventOpen.js` link this script if somehow a page is wrongly `window.open`ing.
> 8. `style.js` it's the script that supports `css/main.css`, without it, a lot of the styles won't work.

### authority.js

Use it by linking the script: `<script src="/js/authority.js">`.

### blacklist.js

Use it by linking the script: `<script src="/js/authority.js">`, doesn't really work that well.

### cursor.js

Use it by linking the script: `<script src="/js/cursor.js">`.

### mainPageCloak.js

Use it by linking the script: `<script src="/js/authority.js">`.

### openGame.js

Link the script: `<script src="/js/openGame.js">`.

Use: `openGame('https://www.example.com')`

Example usage:

```
<button onclick="openGame('https://www.example.com')">
  CLICK ME
</button>
```

### panicKey.js

Use it by linking the script: `<script src="/js/panicKey.js">`

### preventOpen.js

Use it by linking the script: `<script src="/js/preventOpen.js">`

### style.js

Use it by linking the script: `<script src="/js/style.js">`

REQUIREMENT: `<link rel="stylesheet" href="/css/main.css">`

## Current Work

The current thing we are working on is to make each game independent on theirselves, which means, every game should not iframe my other repos or anybody else's repos or link files from anywhere else if possible.

If a file from anywhere else is linked, at the time that link is invalid, the file will be invalid, then the game will crash because it is missing the file, it is very risky.

### Porting files in

Find code like these in index.html:

```html
<iframe src="url">
```

or these:

```html
<base href="url">
```

And press Ctrl+Shift+I or Cmd+Opt+I to enable dev mode, click on `sources` tab, and add all the files used into this repo inside the game folder.

## Restrictions

The page is currently deployed on branch `gh-pages` and please only write commits on main `branch`, I will pull the commits from `gh-pages` after verified.
