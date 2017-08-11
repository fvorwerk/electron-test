var app = require('electron').remote;
var dialog = app.dialog;
var fs = require('fs');
const remote = require('electron').remote
const main = remote.require('./main.js')



document.getElementById('openFile').onclick = () => {
  dialog.showOpenDialog((fileNames) => {
    if (fileNames === undefined) {
      alert('Keine Datei ausgewählt');
    } else {
      readFile(fileNames[0]);
    }
  });
};

function readFile(filepath) {
  fs.readFile(filepath, 'utf-8', (err, data) => {
    if (err) {
      alert('Fehlerhafte Datei');
      return;
    }

    

    var textArea = document.getElementById('output');

    textArea.value = data;
  });

}

var openSettings = document.getElementById('openSettings')
openSettings.addEventListener('click', () => {
    main.openWindow('settingsWindow')

}, false)

var openPin = document.getElementById('openPin')
openPin.addEventListener('click', () => {
    main.openWindow('numpadWindow')

}, false)