var portStatus: boolean = false

function getPorts() {
  api.getPorts().then((ports: any) => {
    const select: HTMLSelectElement = document.getElementById(
      "ports"
    ) as HTMLSelectElement
    for (var key in ports) {
      if (ports[key].manufacturer) {
        var option: HTMLOptionElement = document.createElement("option")
        option.text = ports[key].path + " | " + ports[key].manufacturer
        select.add(option)
      }
    }
  })
}

function updateTextarea(data: string) {
  const textarea = document.getElementById("output") as HTMLTextAreaElement
  textarea.value += data
}

function automaticScroll() {
  // Enable default textarea scroll
  const textarea: HTMLTextAreaElement = document.getElementById(
    "output"
  ) as HTMLTextAreaElement
  setInterval(() => (textarea.scrollTop = textarea.scrollHeight), 1000)
}

api.getData((_event: object, data: string) => {
  updateTextarea(">> " + data)
})

document.getElementById("connect").onclick = () => {
  var path: string = (document.getElementById("ports") as HTMLSelectElement)
    .value
  path = path.substring(0, path.indexOf(" "))
  var baudrate: number = parseInt(
    (document.getElementById("baudrate") as HTMLInputElement).value
  )
  api.setPort({ path: path, baudrate: baudrate }).then((connected: boolean) => {
    portStatus = connected
    if (connected) {
      const portStatusNotification = new Notification("Device connected!")
      setTimeout(() => portStatusNotification.close(), 3000)
    } else {
      const portStatus = new Notification("Unable to connect device...", {
        body: "Check that comport is not open in another application.",
      })
      setTimeout(() => portStatus.close(), 3000)
    }
  })
}

document.getElementById("send").onclick = () => {
  if (portStatus) {
    const input: HTMLInputElement = document.getElementById(
      "message"
    ) as HTMLInputElement
    var data: string = input.value
    if (data) {
      api.writeData(data)
      updateTextarea("<< " + data + "\r")
      input.value = ""
    }
  }
}

document
  .getElementById("message")
  .addEventListener("keypress", (event: KeyboardEvent) => {
    if (event.key == "Enter") {
      event.preventDefault()
      document.getElementById("send").click()
    }
  })

document.getElementById("refresh").onclick = () => {
  const textarea: HTMLTextAreaElement = document.getElementById(
    "output"
  ) as HTMLTextAreaElement
  textarea.value = ""
  api.closePort()
  const portStatusNotification = new Notification("Port closed")
  setTimeout(() => portStatusNotification.close(), 3000)
  const select: HTMLSelectElement = document.getElementById(
    "ports"
  ) as HTMLSelectElement
  for (let i = select.options.length - 1; i > 0; i--) select.remove(i)
  getPorts()
}

getPorts() // Search for ports on startup
automaticScroll()
