(function() {
  const changeSpeed = chosenRate => {
    const executeSpeedChange = `document.getElementsByTagName('video')[0].playbackRate = ${chosenRate}`;

    const executing = browser.tabs.executeScript({
      code: executeSpeedChange
    });

    const onExecuted = result => {
      console.log(`We executed in all subframes`);
      changeSelectedSpeedBg(chosenRate);
    };

    const onError = error => {
      console.log(`Error: ${error}`);
    };

    executing.then(onExecuted, onError);
  };

  const selectSpeed = e => {
    let speed = e.target.id;
    switch (speed) {
      case ".25":
        changeSpeed(speed);
        break;
      case ".5":
        changeSpeed(speed);
        break;
      case ".75":
        changeSpeed(speed);
        break;
      case "1":
        changeSpeed(speed);
        break;
      case "1.25":
        changeSpeed(speed);
        break;
      case "1.5":
        changeSpeed(speed);
        break;
      case "1.75":
        changeSpeed(speed);
        break;
      case "2":
        changeSpeed(speed);
        break;
      default:
        return false;
    }
  };

  const changeSelectedSpeedBg = id => {
    const chosenSpeedID = document.getElementById(`${id}`);
    chosenSpeedID.style.background = "black";
  };

  const getSpeed = document.getElementById("popup-content");
  const setSpeedOnChange = () => {
    getSpeed.addEventListener("click", selectSpeed);
  };

  setSpeedOnChange();
})();

/* TODO

KEY SHORTCUTS
SELECTED SPEED BACKGROUND - PERSISTANT - FIX MULTIPLE BG CHANGING
CUSTOM SPEED

*/
