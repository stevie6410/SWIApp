const { app, BrowserWindow, autoUpdater } = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 1200, height: 800 })

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools when in dev mode.
  // if(process.env.NODE_ENV=='development')
  //win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

function squirrelEvents() {
  var squirrelCommand = process.argv[1];
  switch (squirrelCommand) {
    case '--squirrel-install':
      console.log('--squirrel-install');
    case '--squirrel-updated':
      console.log('--squirrel-updated');

      // Optionally do things such as:
      //
      // - Install desktop and start menu shortcuts
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // Always quit when done
      app.quit();

      return true;
    case '--squirrel-uninstall':
      console.log('--squirrel-uninstall');
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Always quit when done
      app.quit();

      return true;
    case '--squirrel-obsolete':
      console.log('--squirrel-obsolete');
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated
      app.quit();
      return true;
  }

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {

  // autoUpdater.on('update-availabe', () => {
  //   console.log('update available')
  // })

  // autoUpdater.on('checking-for-update', () => {
  //   console.log('checking-for-update')
  // })

  // autoUpdater.on('update-not-available', () => {
  //   console.log('update-not-available')
  // })

  // autoUpdater.on('update-downloaded', (e, releaseNotes, releaseName, releaseDate, updateURL) => {
  //   console.log('update-downloaded');
  //   console.log('UPDATE-DOWNLOADED!!!!!!!');
  //   console.log(e);
  //   console.log(releaseNotes);
  //   console.log(releaseName);
  //   console.log(releaseDate);
  //   console.log(updateURL);
  // })

  // autoUpdater.on('error', function () {
  //   console.log(arguments);
  // })

  // autoUpdater.setFeedURL("http://sao.beav.com/pubs/swiapp/installer/");
  // autoUpdater.checkForUpdates();
  squirrelEvents();
  createWindow();
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

