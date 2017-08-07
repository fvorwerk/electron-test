var electron = require('electron') // http://electron.atom.io/docs/api
var path = require('path')         // https://nodejs.org/api/path.html
var url = require('url')           // https://nodejs.org/api/url.html
const fileDialog = require('file-dialog')

var window = null

// Wait until the app is ready
electron.app.once('ready', function () {
  // Create a new window
  window = new electron.BrowserWindow({

    // Set the initial width to 800px
    width: 800,
    // Set the initial height to 600px
    height: 600,
    // Set the default background color of the window to match the CSS
    // background color of the page, this prevents any white flickering
    backgroundColor: "#fff",
    // Don't show the window until it ready, this prevents any white flickering
    show: false,
    // Set icon
    icon:__dirname+'/img/open.png',
    fullscreenable: false,

  })

  // Load a URL in the window to the local index.html path
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }))

  // Show window when page is ready
  window.once('ready-to-show', function () {
    window.show()
  })
})

electron.app.on('browser-window-created',function(e,window) {
     window.setMenu(null);
 });
