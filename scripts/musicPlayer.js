import {addZero} from './videoPlayer.js';

const musicPlayerInit = () => {
  const audio = document.querySelector('.audio');
  const audioImg = document.querySelector('.audio-img');
  const audioHeader = document.querySelector('.audio-header');
  const audioPlayer = document.querySelector('.audio-player');
  const audionNvigation = document.querySelector('.audio-navigation');
  const audioBtnPlay = document.querySelector('.audio-button__play');
  const audioProgress = document.querySelector('.audio-progress');
  const audioProgressTiming = document.querySelector('.audio-progress__timing');
  const audioTimePassed = document.querySelector('.audio-time__passed');
  const audioTimeTotal = document.querySelector('.audio-time__total');

  const playList = ['hello', 'flow', 'speed'];

  let trackIndex = 0;

  const getPrevTrack = () => {
    return trackIndex !== 0 ? trackIndex-- : trackIndex = playList.length - 1;
  };

  const getNextTrack = () => {
    return trackIndex === playList.length - 1 ? trackIndex = 0 : trackIndex++;
  };

  const loadTrack = () => {
    const isPlayed = audioPlayer.paused;
    const track = playList[trackIndex];

    audioHeader.textContent = track.toUpperCase();
    audioImg.src = `./audio/${track}.jpg`;
    audioPlayer.src = `./audio/${track}.mp3`;

    if(isPlayed) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
  };

  audionNvigation.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('audio-button__play')) {
      audio.classList.toggle('play');
      audioBtnPlay.classList.toggle('fa-play');
      audioBtnPlay.classList.toggle('fa-pause');

      const track = playList[trackIndex];
      audioHeader.textContent = track.toUpperCase();

      audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
    }

    if(evt.target.classList.contains('audio-button__prev')) {
      getPrevTrack();
      loadTrack();
    }

    if(evt.target.classList.contains('audio-button__next')) {
      getNextTrack();
      loadTrack();
    }
  });

  audioPlayer.addEventListener('ended', () => {
    getNextTrack();
    loadTrack();
    audioPlayer.play();
  });

  audioPlayer.addEventListener('timeupdate', () => {
    const duration = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;
    const progress = (currentTime / duration) * 100;

    const minutesPassed = Math.floor(currentTime / 60 || '0');
    const secondsPassed = Math.floor(currentTime % 60 || '0');

    const minutesTotal = Math.floor(duration / 60 || '0');
    const secondsTotal = Math.floor(duration % 60 || '0');

    audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
    audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;

    audioProgressTiming.style.width = progress + '%';
  });

  audioProgress.addEventListener('click', (evt) => {
    const x = evt.offsetX;
    const progressWidth = audioProgress.clientWidth;
    const progress = (x / progressWidth) * audioPlayer.duration;
    audioPlayer.currentTime = progress;
  });

  musicPlayerInit.stop = () =>  {
    if(!audioPlayer.paused) {
      audioPlayer.pause();
      audio.classList.remove('play');
      audioBtnPlay.classList.remove('fa-play');
      audioBtnPlay.classList.add('fa-pause');
    }
  };

};

export default musicPlayerInit;
