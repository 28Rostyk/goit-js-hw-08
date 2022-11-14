import Player from '@vimeo/player';
const throttle = require('lodash.throttle');
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', throttle(setWatchingTime, 1000));

function setWatchingTime(e) {
  localStorage.setItem('videoplayer-current-time', e.seconds);
}

const getContentOfLocalStorage =
  localStorage.getItem('videoplayer-current-time') || 0;

player.setCurrentTime(getContentOfLocalStorage);
