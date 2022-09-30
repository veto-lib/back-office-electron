const { app, BrowserWindow, session } = require("electron");
const path = require("path");
const url = require("url");

// my application redirect uri
const redirectUri = 'https://login.microsoftonline.com/common/oauth2/nativeclient';

// Prepare to filter only the callbacks for my redirectUri
const filter = {
  urls: [redirectUri + '*']
};

let win;
function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });
  // load the dist folder from Angular
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "/dist/index.html"),
      protocol: "file:",
      slashes: true
    })
  );
  // The following is optional and will open the DevTools:
  // win.webContents.openDevTools()
  win.on("closed", () => {
    win = null;
  });

  // intercept all the requests for that includes my redirect uri
  session.defaultSession.webRequest.onBeforeRequest(filter, (details, callback) => {
    const hash = details.url.split('#')[1];
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, "/dist/index.html"),
        protocol: "file:",
        slashes: true,
        hash
      })
    );
    callback({
      cancel: false
    });
  });
}
app.on("ready", createWindow);
// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});



