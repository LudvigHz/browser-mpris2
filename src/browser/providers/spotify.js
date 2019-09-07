class SpotifyPlayer extends Player {

    getTitle() {
        const elm = document.querySelector('.now-playing-bar .track-info__name');
        return elm ? elm.textContent : super.getTitle();
    }

    getArtists() {
        const elm = document.querySelector('.now-playing-bar .track-info__artists');
        return elm ? [elm.textContent] : super.getArtists();
    }

    getCover() {
        const elm = document.querySelector('.now-playing-bar .cover-art-image');
        return elm ?
            elm.style.backgroundImage
                .replace('url("', '')
                .replace('")', '') :
            super.getCover();
    }

    isPlaying() {
        const elm = this.page.playback.controls.play;
        return elm ? elm.title === 'Pause' : super.isPlaying();
    }

}

Player = SpotifyPlayer;

class SpotifyPlayback extends Playback {

    canGoNext() {
        const elm = this.controls.next;
        return elm ? !elm.classList.contains('control-button--disabled') : super.canGoNext();
    }

    next() {
        const elm = this.controls.next;
        (elm && elm.click()) || super.next();
    }

    canGoPrevious() {
        const elm = this.controls.prev;
        return elm ? !elm.classList.contains('control-button--disabled') : super.canGoPrevious();
    }

    previous() {
        (this.controls.prev && this.controls.prev.click()) || super.previous();
    }

    setShuffle(isShuffle) {
        this.controls.shuffle && this.controls.shuffle.click();
    }

    isShuffle() {
        return this.controls.shuffle ?
            this.controls.shuffle.classList.contains('control-button--active') :
            super.isShuffle();
    }

    getLoopStatus() {
        if (this.controls.repeat) {
            const classes = this.controls.repeat.classList;
            if (classes.contains('spoticon-repeatonce-16'))
                return LoopStatus.TRACK;
            else if (classes.contains('control-button--active'))
                return LoopStatus.PLAYLIST;
            else
                return LoopStatus.NONE;
        } else
            return super.getLoopStatus();
    }

    setLoopStatus(status) {
        if (this.controls.repeat)
            this.controls.repeat.click();
        else
            super.setLoopStatus(status);
    }

    setVolume(volume) {
        if (this.controls.volumeProgress) {
            this.controls.volumeProgress.style.transform = `translateX(${volume * 100 - 100}%)`;
        }
        super.setVolume(volume);
    }

}

Playback = SpotifyPlayback;

window.addEventListener('mpris2-setup', function () {
    const BUTTONS_CONTAINER = '.now-playing-bar .player-controls__buttons';

    page.playback.controls = {
        shuffle: document.querySelector(BUTTONS_CONTAINER + ' button:nth-child(1)'),
        repeat: document.querySelector(BUTTONS_CONTAINER + ' button:nth-child(5)'),
        play: document.querySelector(BUTTONS_CONTAINER + ' button:nth-child(3)'),
        next: document.querySelector(BUTTONS_CONTAINER + ' button:nth-child(4)'),
        prev: document.querySelector(BUTTONS_CONTAINER + ' button:nth-child(2)'),

        // volumeHandle: document.querySelector('.volume__sliderHandle'),
        volumeProgress: document.querySelector('.volume-bar .progress-bar__fg')
    };

    const observer = new MutationObserver(() => {
        page.host.change();
    });

    Object.values(page.playback.controls).forEach(control => {
        observer.observe(control, {
            attributes: true,
            attributeFilter: ['class']
        });
    });
});
