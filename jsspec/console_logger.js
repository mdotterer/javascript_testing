
JSSpec.ConsoleLogger = function(options) {
  this.finishedExamples = 0;
  this.startedAt = null;
  this.options = options;
  this.failures = [];
};

JSSpec.ConsoleLogger.prototype.onRunnerStart = function() {
  this.startedAt = new Date();
  this.failures = [];
};

JSSpec.ConsoleLogger.prototype.onRunnerEnd = function() {
  print("\033[37m")
    for(var i = 0; i < this.failures.length; i++) {
    print((i + 1) + ") " + this.failures[i].name +
          " FAILED: " + this.failures[i].message);
  }
  print(JSSpec.runner.totalExamples + " examples, " +
        JSSpec.runner.getTotalFailures() + " failures, " +
        JSSpec.runner.getTotalErrors() + " errors");
  this.runTime = (new Date().getTime() - this.startedAt.getTime()) / 1000;
  print("In " + this.runTime + " seconds");
  if(this.options.raiseOnFail && JSSpec.runner.hasException()) {
    throw "JSSpec failures"
  }
};

JSSpec.ConsoleLogger.prototype.onSpecStart = function(spec) {
  this.currentSpec = spec;
};

JSSpec.ConsoleLogger.prototype.onSpecEnd = function(spec) {

};


JSSpec.ConsoleLogger.prototype.onExampleStart = function(example) {
};

JSSpec.ConsoleLogger.prototype.onExampleEnd = function(example) {
  java.lang.System.out.print(example.exception ? "\033[31mF" : "\033[32m.");
  if(example.exception) {
    this.failures[this.failures.length] = {
    name: this.currentSpec.context + ' ' +example.name,
    message: this.clean(example.exception.message),
    location: example.exception.fileName + ':' + example.exception.lineNumber};
  }
};

JSSpec.ConsoleLogger.prototype.clean = function(message) {
  return message.replace(/<\/?[^>]+>/g, '');
}

