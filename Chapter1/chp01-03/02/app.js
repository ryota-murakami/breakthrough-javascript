function Observer() {
  this.listeners = {};
}

Observer.prototype.on = function(event, func) {
  if (! this.listeners[event]) {
      this.listeners[event] = [];
  }
  this.listeners[event].push(func);
};

Observer.prototype.off = function(event, func) {
  var ref = this.listeners[event],
      len = ref.length;

  for (var i = 0; i < len; i++) {
    var listener = ref[i];
    if (listener === func) {
      ref.splice(i, 1);
    }
  }
};

Observer.prototype.trigger = function(event) {
  var ref = this.listeners[event],
      len = ref.length;

  for (var i = 0; i < len; i++) {
    var listener = ref[i];
    if (typeof listener === "function") listener();
  }
};

var observer = new Observer();
var greet = function () {
  console.log("Good morning");
};
var frisk = function () {
  console.log("frisk");
}
observer.on("morning", greet);
observer.on("morning", frisk);
observer.trigger("morning");

var sayEvening = function () {
  console.log("Good evening");
};
var sayFrisk = function () {
  console.log("Good frisk");
}
observer.on("evening", sayEvening);
observer.on("evening", sayFrisk);
observer.trigger("evening");
