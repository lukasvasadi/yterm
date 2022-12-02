import { ipcRenderer, contextBridge } from "electron"

contextBridge.exposeInMainWorld("api", {
  getPorts: () => ipcRenderer.invoke("get-ports"),
  setPort: (port: object) => ipcRenderer.invoke("set-port", port),
  writeData: (data: string) => ipcRenderer.invoke("send-data", data),
  getData: (callback: any) => ipcRenderer.on("data", callback),
  closePort: () => ipcRenderer.send("close-port"),
})

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector)
    if (element) {
      element.innerText = text
    }
  }

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(
      `${type}-version`,
      process.versions[type as keyof NodeJS.ProcessVersions]
    )
  }
})
