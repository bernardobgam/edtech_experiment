var Stopwatch = function(elem, options) {

var timer       = createTimer(),
  offset,
  clock,
  interval;

// default options
options = options || {};
options.delay = options.delay || 100;

// append elements
elem.appendChild(timer);

// initialize
reset();

// private functions
function createTimer() {
time = document.createElement("span");
return time
}

function start() {
if (!interval) {
  offset   = Date.now();
  interval = setInterval(update, options.delay);
}
}

function stop() {
if (interval) {
  clearInterval(interval);
  interval = null;
}
}

function reset() {
clock = 0;
render();
}

function get_time() {
return timer.innerHTML
}

function update() {
clock += delta();
render();
}

function render() {
timer.innerHTML = (clock/1000).toFixed(1);
}

function delta() {
var now = Date.now(),
    d   = now - offset;

offset = now;
return d;
}

// public API
this.start  = start;
this.stop   = stop;
this.reset  = reset;
this.get_time = get_time;
};
