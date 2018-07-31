// Get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const fullscreen = player.querySelector('.fullscreen');
const currentTime = player.querySelector('.player__time--current');
const timeTotal = player.querySelector('.player__time--total');

// Anything that has data-skit attr
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


// Build our functions
function togglePlay() {
  if (video.paused) video.play();
  else video.pause();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  console.log(this.dataset.skip); // Get the value of data-skip attr
  video.totalTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = (`${percent}%`);

  // Set the total time
  function minutes(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration - minutes * 60);

    function addZero(n) {
      return (n < 10 ? '0' : '') + n;
    }
    return `${minutes}:${addZero(seconds)}`;
  }
  console.log(minutes(video.duration));
  timeTotal.textContent = minutes(video.duration);
  currentTime.textContent = minutes(video.currentTime);
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Hook up the event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

fullscreen.addEventListener('click', () => video.webkitEnterFullScreen());
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(slider => slider.addEventListener('change', handleRangeUpdate));
// Update when sliding w/ the mouse down
ranges.forEach(slider => slider.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => { mousedown = true; });
progress.addEventListener('mouseup', () => { mousedown = false; });
