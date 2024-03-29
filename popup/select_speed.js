const PREVIOUS_SPEED_RATE = 'plex-pace-last-speed-rate';

(async function () {
  let currentVideoSpeed;
  const customSpeedDisplay = document.getElementById('current-custom-speed');
  const getSpeed = document.getElementById('main-speed-section');
  const getCustomSpeedLeft = document.getElementById('btn-left');
  const getCustomSpeedRight = document.getElementById('btn-right');
  const customSectionBg = document.getElementById('custom-speed-content');
  const btnBg = document.querySelectorAll('.button');
  const customUl = document.getElementById('custom-ul');

  // SETTING SPEED
  const selectSpeed = (e) => {
    const speed = e.target.id;
    executeSpeedChanges(speed);
  };

  const speedDecrement = () => {
    currentVideoSpeed = (currentVideoSpeed - 0.1).toFixed(2);
    executeSpeedChanges(currentVideoSpeed);
  };
  const speedIncrement = () => {
    currentVideoSpeed = (parseFloat(currentVideoSpeed) + parseFloat(0.1)).toFixed(2);
    executeSpeedChanges(currentVideoSpeed);
  };

  const executeSpeedChanges = async (speedRate) => {
    try {
      // TODO when currently not in "playback mode" this errors as no <video> is found. Might be worth to extract another 'injections' file
      await browser.tabs.executeScript({
        code: `document.getElementsByTagName('video')[0].playbackRate = ${speedRate}`,
      });
      console.log(`Video playback speed is now ${speedRate}`);
      currentVideoSpeed = speedRate;
      customSpeedDisplay.textContent = currentVideoSpeed;
      changeSelectedSpeedBg(speedRate);
      setExtensionIconSpeed(speedRate);
      await browser.storage.local.set({
        'plex-pace-last-speed-rate': speedRate,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  // CONFIGURE BADGE ICON TO DISPLAY SPEED TEXT
  const setExtensionIconSpeed = (speed) => {
    browser.browserAction.setBadgeText({ text: `${speed}` });
  };

  // CONFIGURE SELECTED SPEED BACKGROUNDS
  const changeSelectedSpeedBg = (id) => {
    const chosenSpeedID = document.getElementById(`${id}`);

    // Update selected background when new speed chosen
    btnBgReset();
    if (chosenSpeedID) {
      chosenSpeedID.classList.add('btn-active');
    }
  };

  const btnBgReset = () => {
    btnBg.forEach((btn) => {
      if (btn.classList.contains('btn-active')) {
        btn.classList.remove('btn-active');
      }
    });
  };

  const setSpeedBgOnStart = () => {
    btnBg.forEach((btn) => {
      if (currentVideoSpeed == btn.id) {
        btn.classList.add('btn-active');
      }
    });

    if (currentVideoSpeed == customSpeedDisplay.innerHTML) {
      customSectionBg.style.background = 'rgb(26, 26, 26)';
      customUl.classList.add('custom-btn-active');
    }
  };

  // KEY BINDINGS

  const doc_keyUp = (e) => {
    if (e.ctrlKey && e.keyCode == 37) {
      speedDecrement();
    } else if (e.ctrlKey && e.keyCode == 39) {
      speedIncrement();
    }
  };

  // INITIALIZE EXTENSION

  // Retrieve current video speed from Plex
  const receiveSpeed = (resultsArray) => {
    currentVideoSpeed = resultsArray[0];
    if (currentVideoSpeed === 1) {
      customSpeedDisplay.textContent = '1.0';
    } else {
      customSpeedDisplay.textContent = currentVideoSpeed;
      setSpeedBgOnStart();
    }
  };

  await browser.tabs.executeScript(
    {
      code: "document.getElementsByTagName('video')[0].playbackRate",
    },
    receiveSpeed
  );

  await browser.tabs.executeScript({
    file: '../injections/loadedDataListener.js',
  });

  const setSpeedOnChange = () => {
    getSpeed.addEventListener('click', selectSpeed);
    getCustomSpeedLeft.addEventListener('click', speedDecrement);
    getCustomSpeedRight.addEventListener('click', speedIncrement);
    document.addEventListener('keyup', doc_keyUp, false); // TODO: This seems not to work when the popup is not shown
  };

  setSpeedOnChange();

  const previousSpeed = await browser.storage.local.get(PREVIOUS_SPEED_RATE);
  if (previousSpeed[PREVIOUS_SPEED_RATE]) {
    console.log(`Detected previous Plex playback speed ${previousSpeed[PREVIOUS_SPEED_RATE]}`);
    await executeSpeedChanges(previousSpeed[PREVIOUS_SPEED_RATE]);
  }
})();
