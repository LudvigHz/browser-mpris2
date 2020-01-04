/**
 *
 * This file adds support for the Tidal web player
 *
 * by extending and overriding the classes {@link Page},
 * {@link Playback}, and {@link Player}.
 * we can define how we'll interact with tidal's site
 *
 */

class TidalPlayer extends Player {

    getTitle() {
        const elm = this.page.elements.title;
        return elm ? elm.textContent : super.getTitle();
    }

    getArtists() {
        const elm = this.page.elements.artist;
        return elm ? [elm.textContent] : super.getArtists();
    }

    getCover() {
        const elm = this.page.elements.cover;
        return elm ? elm.src : super.getCover();
    }

    isPlaying() {
        const elm = this.page.playback.controls.play;
        return elm ? elm.title === 'Pause' : super.isPlaying();
    }

    getLength() {
      const elm = this.page.elements.duration;
      return elm
        ? (elm.textContent.split(':')[0] * 60 + elm.textContent.split(':')[1]) * 1e3
        : super.getLength()
    }

    getPosition() {
      const currentTime = this.page.elements.currentTime;
      return currentTime
        ? (currentTime.textContent.split(':')[0] * 60 + currentTime.textContent.split(':')[1]) * 1e3
        : super.getLength();
    }

}

Player = TidalPlayer;

class TidalPlayback extends Playback {

    canGoNext() {
        return !!this.controls.next;
    }

    next() {
        const elm = this.controls.next;
        (elm && elm.click()) || super.next();
    }

    canGoPrevious() {
        return !!this.controls.prev;
    }

    previous() {
        (this.controls.prev && this.controls.prev.click()) || super.previous();
    }

    setShuffle(isShuffle) {
        if (this.controls.shuffle) {
            if ((!this.isShuffle() && isShuffle) || (this.isShuffle() && !isShuffle)){
                this.controls.shuffle.click();
            }
        }
    }

    isShuffle() {
      if (this.controls.shuffle) {
          const classes = Array.from(this.controls.shuffle.classList);
          return classes.some(c => c.startsWith("active"));
      } else {
        return super.isShuffle();
      }
    }

    getLoopStatus() {
        if (this.controls.repeat) {
            const classes = Array.from(this.controls.repeat.classList);
            if (classes.some(c => c.startsWith("once"))) {
                return LoopStatus.TRACK;
            } else if (classes.some(c => c.startsWith("all"))) {
                return LoopStatus.PLAYLIST;
            } else {
                return LoopStatus.NONE;
            }
        } else {
            return super.getLoopStatus();
        }
    }

    setLoopStatus(status) {
        if (this.controls.repeat)
            this.controls.repeat.click();
        else
            super.setLoopStatus(status);
    }

    setVolume(volume) {
        super.setVolume(volume);
        if (this.controls.volumeProgress) {
            this.controls.volumeProgress.value = volume * 100;
          this.control.volumeProgress.style = "--val:" + volume * 100 + "; --max:100; --min:0;"
        }
    }

    getVolume() {
        if (this.controls.volumeProgress) {
            return parseInt(this.controls.volumeProgress.value, 10) / 100
        }
        return super.getVolume()
    }

    setRate() {
        // disabled
    }

}

Playback = TidalPlayback;


window.addEventListener('mpris2-setup', function () {

  /*
   * Since tidal is loaded dynamically, we need to wait until the playback controls are added
   * to the DOM before we can get the elements.
   *
   * We create an observer to monitor the added nodes, and set the playback controls when the
   * player is loaded.
   *
   */
  const playerObserver = new MutationObserver((mutations) => {
    let loaded = false
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(n => {
        if (n.className.startsWith('footerPlayer')){
          loaded = true
        }
      })
    })

    if (loaded) {
        const BUTTONS_CONTAINER = 'div[class*="playbackControls"]';

        page.playback.controls = {
          shuffle: document.querySelector(BUTTONS_CONTAINER + ' button:nth-child(1)'),
          prev: document.querySelector(BUTTONS_CONTAINER + ' button:nth-child(2)'),
          play: document.querySelector(BUTTONS_CONTAINER + ' button:nth-child(3)'),
          next: document.querySelector(BUTTONS_CONTAINER + ' button:nth-child(4)'),
          repeat: document.querySelector(BUTTONS_CONTAINER + ' button:nth-child(5)'),
          volumeProgress: document.querySelector('div[class*="volumeSlider"] input')
        };


        page.elements = {
          title: document.querySelector('span[class*="mediaItemTitle"]'),
          artist: document.querySelector('div[class*="mediaArtists"]'),
          cover: document.querySelector('figure[class*="mediaImagery"] img'),
          duration: document.querySelector('time[class*="duration"]'),
          currentTime: document.querySelector('time[class*="currentTime"]')

        }


        const observer = new MutationObserver(() => {
          page.host.change();
        });

        Object.values(page.playback.controls).forEach(control => {
          observer.observe(control, {
            attributes: true,
            childList: true,
            subtree: true
          });
        });


        page.playback.controls.shuffle
          .addEventListener('click', () => page.host.change());
        page.playback.controls.repeat
          .addEventListener('click', () => page.host.change());
    }
  })


  playerObserver.observe(document, {
    childList: true,
    subtree: true
  })


});
