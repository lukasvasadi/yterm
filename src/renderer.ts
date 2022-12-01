console.log("Hello from renderer process")

// @ts-expect-error
api.getPorts().then((ports: any) => {
  var select: any = document.getElementById("ports")
  console.log(ports)
  for (var key in ports) {
    console.log(ports[key])
    if (ports[key].manufacturer) {
      var option = document.createElement("option")
      option.text = ports[key].path + " | " + ports[key].manufacturer
      select.add(option)
    }
  }
})

document.getElementById("connect").onclick = () => {
  // @ts-expect-error
  var path = document.getElementById("ports").value
  path = path.substring(0, path.indexOf(" "))
  // @ts-expect-error
  var baudrate = document.getElementById("baudrate").value
  console.log({ path: path, baudrate: parseInt(baudrate) })
  // @ts-expect-error
  api.setPort({ path: path, baudrate: parseInt(baudrate) })
}

document.getElementById("send").onclick = () => {
  // @ts-expect-error
  var message = document.getElementById("data").value
  // @ts-expect-error
  api.sendData(message)
}
