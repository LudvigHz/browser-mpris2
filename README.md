# browser-mpris2
[![Build Status](https://travis-ci.org/Lt-Mayonesa/browser-mpris2.svg?branch=master)](https://travis-ci.org/Lt-Mayonesa/browser-mpris2)

Implements the MPRIS2 interface for Chrome and Firefox.

Currently, all sites should be supported with reduced capabilities (play, pause, stop, volume, seek, cover art).

And the following sites are supported with almost all of the capabilities MPRIS2 allows:
* [YouTube](https://lt-mayonesa.github.io/browser-mpris2/manual/youtube.html)
* [YouTube Music](https://lt-mayonesa.github.io/browser-mpris2/manual/youtube-music.html)
* [SoundCloud](https://lt-mayonesa.github.io/browser-mpris2/manual/soundcloud.html)
* [Netflix](https://lt-mayonesa.github.io/browser-mpris2/manual/netflix.html)

Pull requests are welcome.

### How it looks (linux mint)
![players screenshot](https://raw.githubusercontent.com/Lt-Mayonesa/browser-mpris2/master/screenshot.png)

## Installation
Go to the [latest release](https://github.com/Lt-Mayonesa/browser-mpris2/releases/latest) and download both `.crx` and `.deb` artifacts.

Install the `.deb` file. This will make `browser-mpris2` from the command line available.

### for Chrome
Then, in Chrome, go to `Tools > Extensions` (or [chrome://extensions](chrome://extensions)) and enable `Developer mode`.

Grab the `.crx` file you downloaded and drop it on the Extensions page (if "Drop to install" doesn't show up try reloading the page).

Once the extension loaded copy the extension ID (it should be: `mcakdldkgmlakhcpdmecedogacbagdba`).

Next, open a terminal and run `browser-mpris2 --init-chrome [EXTENSION_ID]`. ie:
```bash
browser-mpris2 --init-chrome mcakdldkgmlakhcpdmecedogacbagdba
```
Profit

### for Firefox
> **Signed .xpi coming soon**.
> You'll need to repeat this steps every time you start firefox until .xpi

Download `.zip` file from [latest release](https://github.com/Lt-Mayonesa/browser-mpris2/releases/latest) and extract.

Open Firefox and go to [about:debugging#addons](about:debugging#addons).

Click on "Load temporary Add-on" button and select the `manifest.json` from the `extension/` dir of the extracted file.

Next, open a terminal and run `browser-mpris2 --init-firefox [EXTENSION_ID]`. ie:
```bash
browser-mpris2 --init-firefox 0974c166a46e1eeabfa31321730f621ab0362f05@temporary-addon
```

Reload the extension and profit.

## Powers
If on GNOME or similar you should be able to take advantage of your new powers immediately.  Otherwise, you can use something like [playerctl](https://github.com/acrisci/playerctl), perhaps bind it to a key or `XF86AudioPlay` and the like if your keyboard has them.

## Similar Projects
* [plasma-browser-integration](https://github.com/KDE/plasma-browser-integration)
  Nothing to envy them now
* [shwsh/web-mpris2](https://github.com/shwsh/web-mpris2)
  A port of this extension to Tampermonkey/Greasemonkey (and WebSockets).

## TODO
 - Tests per provider
 - Compile `branch: feature/closure-compile` make travis-ci compile the js to dist/
 - Providers:
    - Amazon Music
