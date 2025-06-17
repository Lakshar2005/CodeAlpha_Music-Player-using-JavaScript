const songs = [
  { title: "Song One", artist: "Artist A", src: "songs/song1.mp3" },
  { title: "Song Two", artist: "Artist B", src: "songs/song2.mp3" },
  { title: "Song Three", artist: "Artist C", src: "songs/song3.mp3" },
];

let currentIndex = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const title = document.getElementById("song-title");
const artist = document.getElementById("song-artist");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeControl = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  title.textContent = song.title;
  artist.textContent = song.artist;
  updatePlaylistHighlight();
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "❚❚";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶";
}

function togglePlay() {
  isPlaying ? pauseSong() : playSong();
}

function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  playSong();
}

function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  playSong();
}

function updateProgress() {
  if (audio.duration) {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
}

function setProgress(e) {
  const percent = e.target.value;
  audio.currentTime = (percent / 100) * audio.duration;
}

function setVolume(e) {
  audio.volume = e.target.value;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" + s : s}`;
}

function createPlaylist() {
  playlistEl.innerHTML = "";
  songs.forEach((song, index) => {
    const item = document.createElement("div");
    item.classList.add("playlist-item");
    item.textContent = `${song.title} - ${song.artist}`;
    item.addEventListener("click", () => {
      currentIndex = index;
      loadSong(currentIndex);
      playSong();
    });
    playlistEl.appendChild(item);
  });
}

function updatePlaylistHighlight() {
  const items = document.querySelectorAll(".playlist-item");
  items.forEach((item, index) => {
    item.classList.toggle("playing", index === currentIndex);
  });
}

// Event Listeners
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
audio.addEventListener("timeupdate", updateProgress);
progressBar.addEventListener("input", setProgress);
volumeControl.addEventListener("input", setVolume);
audio.addEventListener("ended", nextSong); // autoplay next

// Init
createPlaylist();
loadSong(currentIndex);
