var CountDownTimer = function(elem,datetime,duration,funct) {

var timer = elem,
  duration = duration*60,
  clock = datetime,
  interval;

// initialize
reset();
start()

function start() {
if (!interval) {
  interval = setInterval(update, 1000);
}
}

function reset() {
clock = datetime;
var timeObj = parse(delta())
render(timeObj.minutes, timeObj.seconds);
}

function update() {
  change = delta();
  if (change <= 0) {
    clearInterval(interval)
    console.log('countdown done');
    if (funct) {funct()}
  }
clock += change
var timeObj = parse(change)
render(timeObj.minutes, timeObj.seconds);
}

function render(minutes, seconds) {
  if (minutes < 0) {
    minutes = 0
    seconds = 0
  }
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  timer.textContent = isNaN(seconds) ? "" : minutes + ':' + seconds;
}

function parse(seconds){
  return { 'minutes': (seconds / 60) | 0, 'seconds': (seconds % 60) | 0 };
}

function delta() {
  var d = duration - (((Date.now() - datetime) / 1000) | 0);
return d;
}

// public API
this.start  = start;
this.reset  = reset;
};
