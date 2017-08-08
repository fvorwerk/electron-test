const electron = require('electron')
const {app, BrowserWindow} = electron


const path = require('path')
const url = require('url')


app.on('ready', () => {
    let window = new BrowserWindow({
    width: 700,
    height: 700,
    backgroundColor: "#fff",
    show: true,
    icon:__dirname+'/img/open.png',
    fullscreenable: false,
    resizable: true,
    })


    window.loadURL(url.format({
    pathname: path.join(__dirname, '/mainWindow/index.html'),
    protocol: 'file:',
    slashes: true
}))

})

exports.openWindow = (filename) => {
    
    let window = new BrowserWindow({
    width: 400,
    height: 500,
    backgroundColor: "#fff",
    show: true,
    icon:__dirname+'/img/open.png',
    fullscreenable: false,
    resizable: true,
    })


    window.loadURL(url.format({
    pathname: path.join(__dirname+ '/' + filename + '/index.html'),
    protocol: 'file:',
    slashes: true
    }))

}