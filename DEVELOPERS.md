# Developers Read This

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