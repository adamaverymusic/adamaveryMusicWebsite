const audioPlaylist = document.querySelector('.playlist');
const audioParent = document.querySelector('.master-audio-cont');
const audioPlayer = document.querySelector('.audio-player');
const audioProgressCont = document.querySelector('.audio-progress-cont');
const audioProgress = document.querySelector('.audio-progress');
const mainPlayBtn = document.querySelector('.controller').querySelector('#play-button');
const skip = document.querySelector('#skip');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const audio = document.querySelector('#audio');
const title = document.querySelector('.songTitle');
const writers = document.querySelector('.songWriters');
const volProgressCont = document.querySelector('.volume-progress-cont');
const volProgress = document.querySelector('.volume-progress');

class Song {

    constructor(songTitle, songFile, songWriters) {
        this.songTitle = songTitle;
        this.songWriters = songWriters;
        this.songFile = songFile;
    }
};

// Songs

const songs = [
    // Short Versions
    new Song("Coming Home (Clip)", "comingHome_short.mp3", "Adam Avery, Other Person, Other Person, Other Person"),
    new Song("Doing That (Clip)", "doingThat_short.mp3", "Adam Avery, Other Person, Other Person, Other Person"),
    new Song("Tell Me (Clip)", "tellMe_short.mp3", "Adam Avery, Other Person, Other Person, Other Person"),
    new Song("Don't Worry (Clip)", "dontWorry_short.mp3", "Adam Avery, Other Person, Other Person, Other Person"),
    new Song("The Languishing (Clip)", "theLanguishing_short.mp3", "Adam Avery, Other Person, Other Person, Other Person"),

    // Full Songs
    // EX: new Song("Name", "Writers", "song.mp3"),
];


// Song Count (keep track)
let songIndex = 3;

// Load song info on the DOM first
loadSong(songs[songIndex]);

// Music Functions
function playBtnPress(playBtn) {
    const isPlaying = audioParent.classList.contains('playing');

    if (isPlaying) {
        pauseSong(playBtn);
    }
    else {
        playSong(playBtn);
    }
}

function loadSong(song) {
    title.innerText = song.songTitle;
    writers.innerText = song.songWriters;
    audio.src = "../audio/" + song.songFile + ".mp3";
}

// Clear all play buttons when a play button is pressed
function resetAllPlayBtns() {
    var playBtns = document.querySelectorAll('#play-button');

    for (i = 0; i < playBtns.length; i++) {
        playBtns[i].classList.remove('playing');
        playBtns[i].querySelector('i.fas').classList.remove('fa-pause');
        playBtns[i].querySelector('i.fas').classList.add('fa-play');
    }
}

function playSong(playBtn) {
    // Update audio-player and the clicked button
    audioPlaylist.classList.add('playing');
    audioParent.classList.add('playing');
    mainPlayBtn.classList.add('playing');
    playBtn.parentElement.classList.add('playing');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
}

function pauseSong(playBtn) {
    resetAllPlayBtns();

    // Update audio-player button and the clicked button
    audioPlaylist.classList.remove('playing');
    audioParent.classList.remove('playing');
    mainPlayBtn.classList.remove('playing');
    playBtn.parentElement.classList.remove('playing');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
}