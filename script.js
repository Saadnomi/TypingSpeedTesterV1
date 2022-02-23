//Declare Constants (DOM objects)
const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");


var timer = [0, 0, 0, 0]; //minutes, seconds, hundreths of seconds, thousandths of seconds
var interval;
var timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function zeroLeader(time){
  if(time <= 9){
    time = "0" + time;
  }
  return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {

  let timeDisplay = zeroLeader(timer[0]) + ":" + zeroLeader(timer[1]) + ":" + zeroLeader(timer[2]);
  theTimer.innerHTML = timeDisplay;
  timer[3]++;

  timer[0] = Math.floor((timer[3]/100)/60);
  timer[1] = Math.floor((timer[3]/100)-(timer[0]*60));
  timer[2] = Math.floor(timer[3]-(timer[1]*100)-(timer[0]*60) - (timer[0]*6000))

}

// Match the text entered with the provided text on the page:
function spellCheck(){
  let textEntered = testArea.value;
  let textCheck = originText.substring(0, textEntered.length)
  if (textEntered == originText) {
    console.log("all good");
    testWrapper.style.borderColor = "green";
    clearInterval(interval);


  }
  else if(textEntered == textCheck){
    testWrapper.style.borderColor = "blue"

  }
  else{
    console.log("Made a mistake")
    testWrapper.style.borderColor = "red";
  }
  console.log(textEntered);
}

// Start the timer:
function start(){
  let textEnteredLength = testArea.value.length;
  if(textEnteredLength === 0 && timerRunning == false){
    timerRunning = true;
    interval = setInterval(runTimer, 10);
  }
  console.log(textEnteredLength);

}

// Reset everything:
function reset(){
  console.log("Reset has been pressed");
  location.reload(); //reload entire page to reset everything
  // theTimer = 0;
  // testArea = null;

}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
