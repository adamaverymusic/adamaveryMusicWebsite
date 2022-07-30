const audioParent = document.querySelector('.master-audio-cont');
const audioPlayer = document.querySelector('.audio-player');
const audioProgressHitbox = document.querySelector('.audio-progress-hitbox');
const audioProgressCont = document.querySelector('.audio-progress-cont');
const audioProgress = document.querySelector('.audio-progress');
const mainPlayBtn = document.querySelector('.main-play');
const skip = document.querySelector('#skip');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const audio = document.querySelector('#audio');
const title = document.querySelector('.songTitle');
const writers = document.querySelector('.songWriters');
const volHitbox = document.querySelector('.volume-hitbox');
const volProgressCont = document.querySelector('.volume-progress-cont');
const volProgress = document.querySelector('.volume-progress');

var activePlayBtn = document.querySelectorAll('#play-button')[0];
var draggingPlayer;
var drggingVolume;

// Song Count (keep track)
let songIndex = 0;

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
    new Song("Tell Me (Clip)", 'tellMe_short', "Adam Avery, Claire Ulanoff"),
    new Song("The Languishing (Clip)", 'theLanguishing_short', "Adam Avery"),
    new Song("Doing That (Clip)", 'doingThat_short', "Adam Avery, Claire Ulanoff"),
    new Song("Dont Worry Bout Me (Clip)", 'dontWorryBoutMe_short', "Adam Avery, Christopher Hawthorn"),
    new Song("Coming Home (Clip)", 'comingHome_short', "Adam Avery, Jeremy Conn"),

    // Full Songs
    new Song("Tell Me", 'Tell Me', "Adam Avery, Claire Ulanoff"),
    new Song("The Languishing", 'The Languishing', "Adam Avery"),
    new Song("Doing That", 'Doing That', "Adam Avery, Claire Ulanoff"),
    new Song("Dont Worry Bout Me", 'Dont Worry Bout Me', "Adam Avery, Christopher Hawthorn"),
    new Song("Coming Home", 'Coming Home', "Adam Avery, Jeremy Conn"),
    new Song("If I Sang Hallelujah", 'If I Sang Hallelujah', "Adam Avery"),
    new Song("What If It's Love", 'What If Its Love', "Adam Avery, Christopher Hawthorn"),
    new Song("Fire Loves Wind", 'Fire Loves Wind', "Adam Avery, Nicolas Farmakalidas"),
    new Song("29 Angels", '29 Angels', "Adam Avery, Michael Lee Collins"),
    new Song("Chase", 'Chase', "Adam Avery, Amanda Delara, Tim Kellett, Dante Leon"),
    new Song("Diamonds & Dust", 'Diamonds & Dust', "Adam Avery, Christopher Hawthorn"),
    new Song("Halfway To You", 'Halfway To You', "Adam Avery, Claire Ulanoff"),
    new Song("Redefined", 'Redefined', "Adam Avery"),
    new Song("Cubicle", 'Cubicle', "Adam Avery"),
    new Song("Watermark", 'Watermark', "Adam Avery, The Dark Tenor, Nico Farmakalidas"),
    new Song("Spin", 'Spin', "Adam Avery, Claire Ulanoff, Jordan Otruba"),
    new Song("Dollars & Sense (End Of The Money)", 'Dollars & Sense (End Of The Money)', "Adam Avery, Christopher Hawthorn"),
    new Song("Just Got Real", 'Just Got Real', "Adam Avery, Janice Piftri"),
    new Song("Take You To My Heart", 'Take You To My Heart', "Adam Avery, Basti Becks, Anthony Goldsbrough"),
    new Song("Summertime", 'Summertime', "Adam Avery, Claire Ulanoff"),
    new Song("On The Corner Of Lonely & Lost", 'On The Corner Of Lonely & Lost', "Adam Avery, Christopher Hawthorn"),
    new Song("Because You Came", 'Because You Came', "Adam Avery, Christopher Hawthorn"),
    new Song("I Know How Love Sounds", 'I Know How Love Sounds', "Adam Avery, Donovan Tucker, Greg Lambert"),
    new Song("The Gift", 'The Gift', "Adam Avery, Donovan Tucker"),
];

loadSong(songs[songIndex]);

audio.addEventListener('ended', nextSong);

// AUDIO PROGRESS EVENT LISTENERS
audioProgressHitbox.addEventListener('click', setProgress);
audioProgressHitbox.addEventListener('dragstart', function () {
    draggingPlayer = true;
});
audioProgressHitbox.addEventListener('dragend', function () {
    draggingPlayer = false;
});


// VOLUME EVENT LISTENERS
volHitbox.addEventListener('click', setVolume);
volHitbox.addEventListener('dragstart', function () {
    draggingVolume = true;
});
volHitbox.addEventListener('dragend', function () {
    draggingVolume = false;
});

// Fixing IMG heights in the home section
window.onresize = updateAlbumImages();

function updateAlbumImages() {
    var albums = document.querySelectorAll('.img-row-cont');

    for (i = 0; i < albums.length; i++) {
        albums[i].style.height = getComputedStyle(albums[i]).width;
    }
}

// Music Functions
function playBtnPress(playBtn, newSongIndex) {
    const isPlaying = audioParent.classList.contains('playing');

    // If this is the play button we need to update the song index
    // to the last activePlayBtn song index
    if (playBtn == mainPlayBtn) {
        newSongIndex = songIndex;
    }

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
}

function loadSong(song) {
    if (title.innerText != song.songTitle) {
        audio.src = 'audio/' + song.songFile + '.mp3';
    }

    title.innerText = song.songTitle;
    writers.innerText = song.songWriters;

    activeSong = song;
}

// Clear all play buttons when a play button is pressed
function resetAllPlayBtns() {
    const playBtns = document.querySelectorAll('#play-button');

    for (i = 0; i < playBtns.length; i++) {
        playBtns[i].parentElement.classList.remove('playing');
        playBtns[i].querySelector('i.fas').classList.remove('fa-pause');
        playBtns[i].querySelector('i.fas').classList.add('fa-play');

        // If this is a track in the playlist, then add the playing class
        // to the parent cont to add styling to the text
        if (playBtns[i].parentElement.classList.contains('song')) {
            playBtns[i].parentElement.classList.remove('playing');
        }
    }
}

function playSong(playBtn, newSongIndex) {
    resetAllPlayBtns();

    // Update audio-player and the clicked button
    audioParent.classList.add('playing');

    // Don't update activePlayBtn or song index if user selected the mainPlayBtn
    if (playBtn != mainPlayBtn) {
        songIndex = newSongIndex;
        activePlayBtn = playBtn;
        // Only load a new song when a song is being played
        loadSong(songs[songIndex]);
    }

    mainPlayBtn.classList.add('playing');
    mainPlayBtn.querySelector('i.fas').classList.remove('fa-play');
    mainPlayBtn.querySelector('i.fas').classList.add('fa-pause');
    activePlayBtn.parentElement.classList.add('playing');

    // If this is a track in the playlist, then add the playing class
    // to the parent cont to add styling to the text
    if (playBtn.parentElement.classList.contains('song')) {
        playBtn.parentElement.classList.add('playing');
    }

    activePlayBtn.querySelector('i.fas').classList.remove('fa-play');
    activePlayBtn.querySelector('i.fas').classList.add('fa-pause');

    // Play the audio lastly
    audio.play();
}

function pauseSong(playBtn) {
    resetAllPlayBtns();

    // Update audio-player button and the clicked button
    audioParent.classList.remove('playing');

    // Don't update activePlayBtn if user selected the mainPlayBtn
    if (playBtn != mainPlayBtn) {
        activePlayBtn = playBtn;
    }

    mainPlayBtn.classList.remove('playing');
    mainPlayBtn.querySelector('i.fas').classList.remove('fa-pause');
    mainPlayBtn.querySelector('i.fas').classList.add('fa-play');
    activePlayBtn.parentElement.classList.remove('playing');
    activePlayBtn.querySelector('i.fas').classList.remove('fa-pause');
    activePlayBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}

function prevSong() {
    // Find all the play buttons for actual songs (some don't belong to any track)
    const buttonsInQue = document.querySelectorAll('.song-in-que');

    songIndex--;
    // Loop the que from last full song once zero is hit
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    // If a full version song is playing, don't allow skipping back into the
    // sample clips. Instead, keep looping within the playlist of full songs
    else if (songIndex + 1 > 4) {
        if (songIndex < 5) {
            songIndex = songs.length - 1;
        }
    }

    newSongIndex = songIndex;
    playSong(buttonsInQue[songIndex], songIndex);
}

function nextSong() {
    // Find all the play buttons for actual songs (some don't belong to any track)
    const buttonsInQue = document.querySelectorAll('.song-in-que');

    songIndex++;
    // When final song is skipped, restart the que with only full version songs
    if (songIndex > songs.length - 1) {
        songIndex = 5;
    }

    newSongIndex = songIndex;
    playSong(buttonsInQue[songIndex], songIndex);
}

function runTimeUpdate() {
    updateTime();

    setTimeout(function () {
        runTimeUpdate();
    }, 50)
}

function updateTime() {
    const duration = audio.duration;
    const currentTime = audio.currentTime;
    const progressPercent = (currentTime / duration) * 100;
    audioProgress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

function updateVolume() {
    const volPercent = (audio.volume / 1) * 100;
    volProgress.style.width = `${volPercent}%`;
}

function setVolume(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;

    newVol = clickX / width;
    if (newVol > 0 && newVol < 1) {
        audio.volume = newVol;
    }

    updateVolume();
}

runTimeUpdate();