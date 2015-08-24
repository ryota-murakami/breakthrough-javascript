function Observer() {
  this.listeners = [];
}

Observer.prototype.on = function(func) {
  this.listeners.push(func);
};

Observer.prototype.off = function(func) {
  var len = this.listeners.length;

  for (var i = 0; i < len; i++) {
    var listener = this.listeners[i];
    if (listener === func) {
      this.listeners.splice(i, 1);
    }
  }
};

Observer.prototype.trigger = function(event) {
  var len = this.listeners.length;

  for (var i = 0; i < len; i++) {
    var listener = this.listeners[i];
    listener();
  }
};

var observer = new Observer();
var greet = function () {
  console.log("Good morning");
};
var mongo = function () {
  console.log("Mongo");
}
observer.on(greet);
observer.on(mongo);
observer.trigger();
