const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 644,
    height: 400,
    resizable:false,
    transparent:true,
    opacity:1.0,
    icon: __dirname+'/icon1.png',
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')
 win.setMenu(null);
}
app.on('ready',createWindow);