const PREVIOUS_SPEED_RATE = 'plex-pace-last-speed-rate';
const video = document.getElementsByTagName('video')[0];

video.addEventListener('loadeddata', async () => {
  const previousSpeed = await browser.storage.local.get(PREVIOUS_SPEED_RATE);

  if (previousSpeed[PREVIOUS_SPEED_RATE]) {
    video.playbackRate = previousSpeed[PREVIOUS_SPEED_RATE];
    console.log('Updated playback speed');
  }
});
