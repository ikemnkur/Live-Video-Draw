const video = document.getElementById('sample-video');
const startSlider = document.getElementById('startSlider');
const endSlider = document.getElementById('endSlider');
const startValue = document.getElementById('startValue');
const endValue = document.getElementById('endValue');
const playPauseBtn = document.getElementById('playPauseBtn');

video.addEventListener('loadedmetadata', () => {
    // Set the max values of sliders to the video duration
    startSlider.max = Math.floor(video.duration);
    endSlider.max = Math.floor(video.duration);
    endSlider.value = Math.floor(video.duration);

    // Update labels
    startValue.textContent = startSlider.value;
    endValue.textContent = endSlider.value;

    // Update the end label with the video duration
    document.getElementById('endLabel').textContent = `End time: ${Math.floor(video.duration)}`;
});

// video.addEventListener('ended', () => {
//     video.play();
// });

video.addEventListener('timeupdate', () => {
    if (video.currentTime >= endSlider.value) {
        video.currentTime = startSlider.value;
    }
});

startSlider.addEventListener('input', () => {
    startValue.textContent = startSlider.value;

    if (video.currentTime < startSlider.value) {
        video.currentTime = startSlider.value;
    }
});

endSlider.addEventListener('input', () => {
    endValue.textContent = endSlider.value;

    if (video.currentTime > endSlider.value) {
        video.currentTime = startSlider.value;
    }
});

playPauseBtn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPauseBtn.textContent = "Pause";
    } else {
        video.pause();
        playPauseBtn.textContent = "Play";
    }
});
