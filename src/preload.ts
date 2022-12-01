import { ipcRenderer, contextBridge } from "electron"

contextBridge.exposeInMainWorld("api", {
  getPorts: () => ipcRenderer.invoke("get-ports"),
  setPort: (port: any) => ipcRenderer.invoke("set-port", port),
  getData: () => ipcRenderer.on("data", (data) => console.log(data)),
  sendData: (data: string) => ipcRenderer.invoke("send-data", data),
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
