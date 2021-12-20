playBtn = document.querySelector('#play-button');

const audioPlayer = document.querySelector('.audio-player');
const audioProgressCont = document.querySelector('.audio-progress-cont');
const audioProgress = document.querySelector('.audio-progress');
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

// Update the song's details
function loadSong(song) {
    title.innerText = song.songTitle;
    writers.innerText = song.songWriters;
    audio.src = "../audio/" + song.songFile + ".mp3";
}