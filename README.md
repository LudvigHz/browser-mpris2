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
Go to the [latest release](https://github.com/Lt-Mayonesa/browser-mpris2/releases/latest) and download the `.deb` artifact.

Install the `.deb` file. ie:
```bash
dpkg -i browser-mpris2-v[latest-version]-native.deb
```
This will make `browser-mpris2` from the command line available.

### for Chrome
Then, go to `Tools > Extensions` (or [chrome://extensions](chrome://extensions)) and enable `Developer mode`.

Download the `.crx` artifact from the [latest release](https://github.com/Lt-Mayonesa/browser-mpris2/releases/latest) and drop it on the Extensions page (if "Drop to install" doesn't show up try reloading the page).


### for Firefox

Download the `.xpi` artifact from the [latest release](https://github.com/Lt-Mayonesa/browser-mpris2/releases/latest) and drop it on Firefox.

[Try it](https://www.youtube.com/watch?v=QuoKNZjr8_U) (if the player is not detected try restarting your browser).


## Powers
If on Cinnamon, GNOME, or similar you should be able to take advantage of your new powers immediately. Otherwise, you can use something like [playerctl](https://github.com/acrisci/playerctl), perhaps bind it to a key or `XF86AudioPlay` and the like if your keyboard has them.

## Similar Projects
 - [plasma-browser-integration](https://github.com/KDE/plasma-browser-integration)
 - [shwsh/web-mpris2](https://github.com/shwsh/web-mpris2) A port of [otommod's](https://github.com/otommod/browser-mpris2) extension to Tampermonkey/Greasemonkey (and WebSockets).

## ROADMAP
 - Cinnamon's "Launch Player" functionality.
 - Settings: Global & Per Provider
 - Tests per provider
 - Providers:
    - Amazon Music
    - Google Music
