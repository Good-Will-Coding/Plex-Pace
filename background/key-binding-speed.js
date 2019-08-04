import { speedDecrement, speedIncrement } from '../popup/select_speed'

browser.commands.onCommand.addListener(command => {
    if (command === "toggle-feature") {
        speedDecrement();
        console.log("toggling the feature!");
    }
  });