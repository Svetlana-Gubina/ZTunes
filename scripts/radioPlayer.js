const radioPlayerInit = () => {
  const radio = document.querySelector('.radio');
  const radioHeader = document.querySelector('.radio-header__big');
  const radioNavigation = document.querySelector('.radio-navigation');
  const radioCoverImg = document.querySelector('.radio-cover__img');
  const radioItems = document.querySelectorAll('.radio-item');
  const radioStop = document.querySelector('.radio-stop');

  const changeIconPlay = () => {
    if(audio.paused) {
      radio.classList.remove('play');
      radioStop.classList.add('fa-play');
      radioStop.classList.remove('fa-stop');
    } else {
      radio.classList.add('play');
      radioStop.classList.remove('fa-play');
      radioStop.classList.add('fa-stop');
    }
  };

  const toggleStop = () => {
    if(audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    changeIconPlay();
  };

  const selectItem = (elem) => {
    elem.classList.add('select');
    radioItems.forEach((item) => {
      item.classList.remove('select');
    });
  };

  const audio = new Audio();
  audio.type = 'audio/aac';

  radioStop.disabled = true;

  radioNavigation.addEventListener('change', (evt) => {
    const source = evt.target.dataset.radioStantion;
    const parent = evt.target.closest('.radio-item');
    selectItem(parent);

    const title = parent.querySelector('.radio-name').textContent;
    radioHeader.textContent = title;

    const img = parent.querySelector('.radio-img').src;
    radioCoverImg.src = img;

    radioStop.disabled = false;
    audio.src = source;
    audio.play();
    changeIconPlay();
  });

  radioStop.addEventListener('click', toggleStop);
};

export default radioPlayerInit;
