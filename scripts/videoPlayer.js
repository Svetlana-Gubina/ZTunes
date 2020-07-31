export const addZero = n => n < 10 ? '0' + n : n;

const videoPlayerInit = () => {
  const videoPlayer = document.querySelector('.video-player');
  const play = document.querySelector('.video-button__play');
  const stop = document.querySelector('.video-button__stop');
  const progress = document.querySelector('.video-progress');
  const timePassed = document.querySelector('.video-time__passed');
  const timeTotal = document.querySelector('.video-time__total');

  const toggleIcon = () => {
    if(videoPlayer.paused) {
      play.classList.remove('fa-pause');
      play.classList.add('fa-play');
    } else {
      play.classList.add('fa-pause');
      play.classList.remove('fa-play');
    }
  };

  const togglePlay = () => {
    if(videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
  };

  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  };

  videoPlayer.addEventListener('click', togglePlay);
  play.addEventListener('click', togglePlay);

  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('pause', toggleIcon);

  stop.addEventListener('click', stopPlay);

  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    progress.value = (currentTime / duration) * 100;

    let minutePassed = Math.floor(currentTime / 60);
    let secondsPassed = Math.floor(currentTime % 60);

    let minutesTotal = Math.floor(duration / 60);
    let secondsTotal = Math.floor(duration % 60);

    timePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
    timeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
  });

  progress.addEventListener('change', () => {
    const duration = videoPlayer.duration;
    const value = progress.value;

    videoPlayer.currentTime = (value * duration) / 100;
  });

  videoPlayerInit.stop = () => {
    if(!videoPlayer.paused) {
      stopPlay();
    }
  };
};

export default videoPlayerInit;
