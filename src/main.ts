import { app, BrowserWindow, ipcMain } from "electron"
import { SerialPort } from "serialport"
import { ReadlineParser } from "@serialport/parser-readline"
import * as path from "path"

let port: SerialPort

function createWindow() {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  })

  mainWindow.loadFile(path.join(__dirname, "../index.html"))

  // mainWindow.webContents.openDevTools({ mode: "detach" })
  return mainWindow
}

app.whenReady().then(() => {
  let win = createWindow()

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  ipcMain.handle("get-ports", async (_event) => {
    let ports = await SerialPort.list()
    return ports
  })

  ipcMain.handle("set-port", async (_event, comport) => {
    try {
      port = new SerialPort({
        path: comport.path,
        baudRate: comport.baudrate,
      })

      const parser: NodeJS.WritableStream = port.pipe(
        new ReadlineParser({ delimiter: "\r\n", includeDelimiter: true })
      )
      parser.on("data", (data) => win.webContents.send("data", data))

      return true
    } catch {
      return false
    }
  })

  ipcMain.handle("send-data", async (_event, data) => port.write(data))

  ipcMain.on("close-port", () => {
    try {
      if (port.isOpen) port.close()
    } catch {}
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})
