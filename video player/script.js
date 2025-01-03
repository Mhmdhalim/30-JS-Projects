// const video = document.querySelector('.viewer')
// const play = document.querySelector('.toggle')
// const player__slider = document.querySelector('.player__slider')
// const back10 = document.querySelector('.player__button_back');
// const forward10 = document.querySelector('.player__button');


// function play_video(){
//     video.paused ? video.play() : video.pause()
// }

// video.addEventListener('click', play_video)
// play.addEventListener('click', play_video)

// player__slider.addEventListener("input", function() {
//     video.volume = player__slider.value;
//     });

// back10.addEventListener('click', () => {
//     console.log(video.duration ,video.currentTime)
//     video.currentTime = Math.max(0, video.currentTime - 10);
// });

// forward10.addEventListener('click', () => {
//     video.currentTime = Math.min(video.duration, video.currentTime + 25);
// });

/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build out functions */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}

function skip() {
 video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);