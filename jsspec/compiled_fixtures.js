//Used to load HTML fixtures in compiled specs

loadedFixtures = {};

function fixture(name) {
  document.getElementById('test-context').innerHTML = loadedFixtures[name];
}

function loadFixture(name, html) {
  loadedFixtures[name] = html;
}
