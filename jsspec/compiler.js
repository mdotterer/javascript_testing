//Compiles a headless JSSpec file (or a set of files) into an html file that
// can be used to check for crossbrowser compatibility.

importPackage(java.io);

function eachLineInFile(filename, block) {
  var file = new BufferedReader(new FileReader(filename));
  var line;
  while ((line = file.readLine()) != null) {
    block(line);
  }
}

function dumpFile(filename) {
  var result = "";
  eachLineInFile(filename, function(line) {
    result += line + "\n"
      });
  return result;
}

function jsIncludeTag(filename) {
  return '<script type="text/javascript" src="../'+filename+'"></script>';
}

var scriptLines = '<link rel="stylesheet" type="text/css" href="../jsspec/JSSpec.css" />';
eachLineInFile("jsspec/config.js", function(line) {
    match = /^\s*load\(["'](.*)['"]\);\s*$/.exec(line);
    if(match) {
      scriptLines += "\n" + jsIncludeTag(match[1]);
    }
  });
scriptLines += "\n" + jsIncludeTag("jsspec/jsspec.js");
scriptLines += "\n" + '<script type="text/javascript">// <![CDATA[\n';
for(var i = 0; i < arguments.length; i++) {
  scriptLines += dumpFile(arguments[i]);
 }
scriptLines += '// ]]></script>';

var compiledDir = new File("compiled");
if(compiledDir.exists()) {
  print("\texists   \tcompiled/");
 } else {
  compiledDir.mkdir();
  print("\tcreated  \tcompiled/");
 }

var outputFileName = "compiled/" + (arguments.length > 1 ? 'suite.html' : arguments[0].replace(".js", ".html"));

var existed = new File(outputFileName).exists();

var outFile = new BufferedWriter(new FileWriter(outputFileName));

eachLineInFile("index.html", function(line) {
    outFile.write(line.replace("</head>", scriptLines + "</head>"));
  });

outFile.close();

if(existed) {
  print("\toverwrote\t" + outputFileName);
 } else {
  print("\tcreated  \t" + outputFileName);
 }
