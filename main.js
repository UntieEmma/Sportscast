const image = document.getElementById('cover'),
    title = document.getElementById('channel-title'),
    artist = document.getElementById('channel-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const channel = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'The Charmer\'s Call',
        cover: 'assets/1.jpg',
        artist: 'Hanu Dixit',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'You Will Never See Me Coming',
        cover: 'assets/2.jpg',
        artist: 'NEFFEX',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'Intellect',
        cover: 'assets/3.jpg',
        artist: 'Yung Logos',
    }
];

let channelIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pausechannel();
    } else {
        playchannel();
    }
}

function playchannel() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    channel.play();
}

function pausechannel() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    channel.pause();
}

function loadchannel(song) {
    channel.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

// Function to toggle the active class on other channels
function toggleActiveClass() {
    const audioPlayers = document.querySelectorAll('.audio-player');
    audioPlayers.forEach((player, index) => {
        player.classList.remove('active'); // Remove active class from all players
        if (index === channelIndex) {
            player.classList.add('active'); // Add active class to the current player
        }
    });
}

// Function to handle click on other channels
function handleChannelClick(index) {
    channelIndex = index;
    loadchannel(songs[channelIndex]);
    toggleActiveClass();
    playchannel();
}

// Add event listeners to other channel elements
const otherChannels = document.querySelectorAll('.audio-player');
otherChannels.forEach((channel, index) => {
    channel.addEventListener('click', () => handleChannelClick(index));
});

// Event listeners for player controls
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changechannel(-1));
nextBtn.addEventListener('click', () => changechannel(1));
channel.addEventListener('ended', () => changechannel(1));

// Function to change channel
function changechannel(direction) {
    const previousChannelIndex = channelIndex;
    channelIndex = (channelIndex + direction + songs.length) % songs.length;
    loadchannel(songs[channelIndex]);
    playchannel();
    toggleActiveClass();

    // Update active state of other channels
    if (previousChannelIndex !== channelIndex) {
        const otherChannels = document.querySelectorAll('.audio-player');
        otherChannels.forEach((channel, index) => {
            if (index === channelIndex) {
                
                channel.classList.add('active');
            } else {
                channel.classList.remove('active');
            }
        });
    }
}

// Initial load of the first song
loadchannel(songs[channelIndex]);
