function AppModel(attrs) {
  this.val = "";
  this.attrs = {
    required: attrs.required || false,
    maxlength: attrs.maxlength || 8,
    minLength: attrs.minLength || 4
  };
  this.listenrs = {
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

function AppView() {
  this.initialize.apply(this, arguments);
  this.handleEvents();
}

AppView.prototype.initialize = function(el) {
  this.$el = $(el);
  this.$list = this.$el.next().children();

  var obj = this.$el.data();

  if (this.$el.prop("required")) {
    obj["required"] = ture;
  }
}
