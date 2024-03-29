function AppModel(attrs) {
  this.val = "";
  this.attrs = {
    required: attrs.required || false,
    maxlength: attrs.maxlength || 8,
    minlength: attrs.minlength || 4
  };
  this.listeners = {
    valid: [],
    invalid: []
  };
}

AppModel.prototype.set = function(val) {
  if (this.val === val) return;
  this.val = val;
  this.validate();
};

AppModel.prototype.validate = function() {
  var val;
  this.errors = [];

  for (var key in this.attrs) {
    val = this.attrs[key];
    if (val && !this[key](val)) this.errors.push(key);
  }

  this.trigger(!this.errors.length ? "valid" : "invalid");
};

AppModel.prototype.on = function(event, func) {
  this.listeners[event].push(func);
};

AppModel.prototype.trigger = function(event) {
  $.each(this.listeners[event], function() {
    this();
  });
};

AppModel.prototype.required = function() {
  return this.val !== "";
};

AppModel.prototype.maxlength = function(num) {
  return num >= this.val.length;
};

AppModel.prototype.minlength = function(num) {
  return num <= this.val.length;
};

function AppView(el) {
  this.initialize(el);
  this.handleEvents();
}

AppView.prototype.initialize = function(el) {
  this.$el = $(el);

  var obj = this.$el.data();

  if (this.$el.prop("required")) {
    obj["required"] = true;
  }

  this.model = new AppModel(obj);
};

AppView.prototype.handleEvents = function() {
  var self = this;

  this.$el.on("keyup", function(e) {
    self.onKeyup(e);
  });
}
