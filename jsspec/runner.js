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
};

loadedFixtures = {};

function fixture(name) {
  var html;
  if(!loadedFixtures[name]) {
    var filename = "fixtures/"+name+".html";
    var file = new java.io.BufferedReader(new java.io.FileReader(filename));
    html = "";
    var line;
    while ((line = file.readLine()) != null) {
      html += line + "\n";
    }
    loadedFixtures[name] = html;
  } else {
    html = loadedFixtures[name];
  }

  document.getElementById('test-context').innerHTML = html;
}

for(var i=0; i < arguments.length; i++) {
  load(arguments[i]);
 }

JSSpec.runner = new JSSpec.Runner(JSSpec.specs,
                                  new JSSpec.ConsoleLogger({}));
JSSpec.runner.run();

