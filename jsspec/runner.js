load("env.js");
load("jsspec/config.js");
load("jsspec/JSSpec.js");
load("jsspec/console_logger.js");

JSSpec.Spec.prototype.originalExtractOutSpecialEntries = JSSpec.Spec.prototype.extractOutSpecialEntries;
JSSpec.Spec.prototype.extractOutSpecialEntries = function(entries) {
  this.originalExtractOutSpecialEntries(entries);
  delete entries['isLeftClick'];
  delete entries['isMiddleClick'];
  delete entries['isRightClick'];
  delete entries['element'];
  delete entries['findElement'];
  delete entries['pointer'];
  delete entries['pointerX'];
  delete entries['pointerY'];
  delete entries['stop'];
}

for(var i=0; i < arguments.length; i++) {
  load(arguments[i]);
 }

JSSpec.runner = new JSSpec.Runner(JSSpec.specs,
                                  new JSSpec.ConsoleLogger({}));
JSSpec.runner.run();

