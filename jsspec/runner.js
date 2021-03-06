load("rhino/env.js");
load("rhino/env_monkey_patches.js");
load("config.js");
load("jsspec/JSSpec.js");
load("jsspec/console_logger.js");

if(Prototype) {
  //Prototype mucks up the Array#map that comes with rhino so we need to fix the
  //  places that use it.
  DOMNodeList.prototype.each = Array.prototype.each;
  DOMNodeList.prototype._each = Array.prototype._each;
 }

JSSpec.util.isDomNode = function(object) {
  return object.isDomNode;
}

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

