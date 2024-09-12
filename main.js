const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        title: "Alice's chess"
    })

    win.setMenuBarVisibility(false)
    win.loadFile('main.html')
    win.maximize()
    win.focus()
}

app.whenReady().then( () => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})
