(function() {
  let currentVideoSpeed;
  const customSpeedDisplay = document.getElementById("current-custom-speed");
  const getSpeed = document.getElementById("main-speed-section");
  const getCustomSpeedLeft = document.getElementById("btn-left");
  const getCustomSpeedRight = document.getElementById("btn-right");

  const selectSpeed = e => {
    const speed = e.target.id;
    executeSpeedChanges(speed);
    // changeSpeed(speed);
  };

  const changeSelectedSpeedBg = id => {
    const chosenSpeedID = document.getElementById(`${id}`);

    // Update selected background when new speed chosen
    btnBgReset();
    if (chosenSpeedID) {
      chosenSpeedID.style.background = "black";
    }
  };

  const btnBgReset = () => {
    const btnBg = document.querySelectorAll(".button");
    btnBg.forEach(btn => {
      if ((btn.style.background = "black")) {
        btn.style.background = "rgb(65, 65, 65)";
      }
    });
  };

  // KEY BINDINGS

  const doc_keyUp = e => {
    if (e.ctrlKey && e.keyCode == 37) {
      speedDecrement();
    } else if (e.ctrlKey && e.keyCode == 39) {
      console.log("yup");
      speedIncrement();
    }
  };

  const speedDecrement = () => {
    currentVideoSpeed = +(currentVideoSpeed - 0.10).toFixed(2);
    executeSpeedChanges(currentVideoSpeed);
  };
  const speedIncrement = () => {
    currentVideoSpeed = +(currentVideoSpeed + 0.10).toFixed(2);

    executeSpeedChanges(currentVideoSpeed);
  };

  // Execute speed changes via click handler or keybindings

  const executeSpeedChanges = speedRate => {
    //   console.log('rounded', +(speedRate).toFixed(2))
    const executeSpeedChange = `document.getElementsByTagName('video')[0].playbackRate = ${speedRate}`;

    // Execute script to change plex video speed
    const executing = browser.tabs.executeScript({
      code: executeSpeedChange
    });

    const onExecuted = result => {
      console.log(`Video playback speed is now ${speedRate}`);
      currentVideoSpeed = speedRate;
      customSpeedDisplay.innerHTML = currentVideoSpeed;

      changeSelectedSpeedBg(speedRate);
    };

    const onError = error => {
      console.log(`Error: ${error}`);
    };

    executing.then(onExecuted, onError);
  };

  // register the key-up handler
  document.addEventListener("keyup", doc_keyUp, false);

  // Retrieve current video speed from Plex
  const receiveSpeed = resultsArray => {
    currentVideoSpeed = resultsArray[0];
    customSpeedDisplay.innerHTML = currentVideoSpeed;
  };

  const retrieveCurrentVideoSpeed = browser.tabs.executeScript(
    {
      code: "document.getElementsByTagName('video')[0].playbackRate"
    },
    receiveSpeed
  );

  const setSpeedOnChange = () => {
    getSpeed.addEventListener("click", selectSpeed);
    getCustomSpeedLeft.addEventListener("click", speedDecrement);
    getCustomSpeedRight.addEventListener("click", speedIncrement);
  };

  setSpeedOnChange();
})();

/* TODO

KEY SHORTCUTS
CUSTOM SPEED

*/
