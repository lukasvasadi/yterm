# yterm

A basic serial terminal for hardware debugging. Application automatically finds available comports and pushes notifications for the connection status.

![](./assets/yterm-win.png)

## Installation

Requires the Node package manager (`npm`). To add `npm` to your development environment, follow the instructions at [lukasvasaid.github.io](https://lukasvasadi.github.io/posts/environment.html).

Clone this repository:

```zsh
git clone git@github.com:lukasvasadi/yterm.git
```

Navigate inside project directory and install dependencies:

```zsh
npm i
```

Start application:

```zsh
npm start
```

## Resources

- [Inter-Process Communication](https://www.electronjs.org/docs/latest/tutorial/ipc#pattern-3-main-to-renderer)
- [Context Isolation](https://www.electronjs.org/docs/latest/tutorial/context-isolation#usage-with-typescript)
- [contextBridge](https://www.electronjs.org/docs/latest/api/context-bridge)
- [SerialPort docs](https://serialport.io/docs/)
