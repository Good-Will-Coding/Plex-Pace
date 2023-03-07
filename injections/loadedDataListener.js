(() => {
  const PREVIOUS_SPEED_RATE = 'plex-pace-last-speed-rate';
  const video = document.getElementsByTagName('video')[0];
  if (!video) {
    return;
  }

  // TODO: A new listener is added every time this code is called. So there can be duplicated listeners
  // The 'loadeddata' event is fired when the frame at the current playback position of the media has finished loading; often the first frame.
  video.addEventListener('loadeddata', async () => {
    const previousSpeed = await browser.storage.local.get(PREVIOUS_SPEED_RATE);

    if (previousSpeed[PREVIOUS_SPEED_RATE]) {
      video.playbackRate = previousSpeed[PREVIOUS_SPEED_RATE];
      console.log('Updated playback speed');
    }
  });
})();
