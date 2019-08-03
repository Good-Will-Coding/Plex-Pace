(function () {
    const selectSpeed = e => {
        const speed = e.target.id;
        changeSpeed(speed);
    };

    const changeSpeed = chosenRate => {
        const executeSpeedChange = `document.getElementsByTagName('video')[0].playbackRate = ${chosenRate}`;

        // Execute script to change plex video speed
        const executing = browser.tabs.executeScript({
            code: executeSpeedChange
        });

        const onExecuted = result => {
            console.log(`Video playback speed is now ${chosenRate}`);
            changeSelectedSpeedBg(chosenRate);
        };

        const onError = error => {
            console.log(`Error: ${error}`);
        };

        executing.then(onExecuted, onError);
    };

    const changeSelectedSpeedBg = id => {
        const chosenSpeedID = document.getElementById(`${id}`);

        // Update selected background when new speed chosen
        btnBgReset();
        chosenSpeedID.style.background = "black";
    };

    const btnBgReset = () => {
        const btnBg = document.querySelectorAll(".button");
        btnBg.forEach(btn => {
            if ((btn.style.background = "black")) {
                btn.style.background = "rgb(65, 65, 65)";
            }
        });
    };

    // Initialize speed change on click
    const getSpeed = document.getElementById("popup-content");

    const setSpeedOnChange = () => {
        getSpeed.addEventListener("click", selectSpeed);
    };

    setSpeedOnChange();
})();

/* TODO

KEY SHORTCUTS
CUSTOM SPEED

*/
