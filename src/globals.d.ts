declare namespace api {
  function getPorts(): Promise<object>
  function setPort(port: object): Promise<boolean>
  function writeData(data: string): Promise<string>
  function getData(callback: any): Promise<string>
  function closePort(): void
}
