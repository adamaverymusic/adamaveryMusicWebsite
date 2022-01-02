const audioPlaylist = document.querySelector('.playlist');
const audioParent = document.querySelector('.master-audio-cont');
const audioPlayer = document.querySelector('.audio-player');
const audioProgressCont = document.querySelector('.audio-progress-cont');
const audioProgress = document.querySelector('.audio-progress');
const mainPlayBtn = document.querySelector('.main-play');
const skip = document.querySelector('#skip');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const audio = document.querySelector('#audio');
const title = document.querySelector('.songTitle');
const writers = document.querySelector('.songWriters');
const volProgressCont = document.querySelector('.volume-progress-cont');
const volProgress = document.querySelector('.volume-progress');
var activePlayBtn;

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
    new Song("The Languishing (Clip)", "theLanguishing_short.mp3", "Adam Avery, Other Person, Other Person, Other Person")

    // Full Songs
    // EX: new Song("Name", "Writers", "song.mp3"),
];

// Song Count (keep track)
let songIndex = 2;

// Fixing IMG heights in the home section
window.onresize = updateAlbumImages();

function updateAlbumImages() {
    var albums = document.querySelectorAll('.img-row-cont');

    for (i = 0; i < albums.length; i++) {
        albums[i].style.height = getComputedStyle(albums[i]).width;
        console.log("FIXED");
    }
}

// Load song info on the DOM first
loadSong(songs[songIndex]);

// Music Functions
function playBtnPress(playBtn, newSongIndex) {
    const isPlaying = audioParent.classList.contains('playing');

    if (isPlaying) {
        // If music is already playing, and we select the same song
        // then we can pause the music
        if (songIndex == newSongIndex) {
            pauseSong(playBtn);
        }
        // If it's a different song, then we play that one instead
        // and reset the rest
        else {
            playSong(playBtn, newSongIndex);
        }
    }
    else {
        playSong(playBtn, newSongIndex);
    }

    playButtonFilter(playBtn);
}

function loadSong(song) {
    title.innerText = song.songTitle;
    writers.innerText = song.songWriters;
    audio.src = "../audio/" + song.songFile + ".mp3";

    activeSong = song;
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

function playSong(playBtn, newSongIndex) {


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

// This only saves buttons that are NOT the mainPlayBtn as the activePlayBtn
function playButtonFilter (pressedBtn) {
    if (pressedBtn == mainPlayBtn) {
        // Main play button was pressed so we do nothing
        console.log("MAIN PLAY BUTTON WAS PRESSED, DO NOTHING");
    }
    else {
        activePlayBtn = pressedBtn;
    }
}