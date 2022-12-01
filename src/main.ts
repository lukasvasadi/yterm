import { app, BrowserWindow, ipcMain } from "electron"
import { SerialPort } from "serialport"
import * as path from "path"

let port: SerialPort

function createWindow() {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  })

  mainWindow.loadFile(path.join(__dirname, "../index.html"))

  mainWindow.webContents.openDevTools({ mode: "detach" })
  return mainWindow
}

app.whenReady().then(() => {
  let win = createWindow()

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  ipcMain.handle("get-ports", async (e) => {
    let ports = await SerialPort.list()
    return ports
  })

  ipcMain.handle("set-port", (e, ser) => {
    port = new SerialPort({
      path: ser.path,
      baudRate: ser.baudrate,
    })

    port.on("data", (data) => win.webContents.send("data", data))
  })

  ipcMain.handle("send-data", (e, data) => {
    console.log(data)
    port.write(data)
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})
