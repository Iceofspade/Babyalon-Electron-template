const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let win;

createWindow = () =>{
    win = new BrowserWindow({ 
        width:800,
        height:600,
        icon:__dirname+"/img/dice.png"
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname,"../index.html"),
        slashes:true
    }));
    // open DevTools
    win.webContents.openDevTools();
    win.on('close', () =>{
        win = null;
    });

}
//Run create Window function
app.on('ready',createWindow);

//Quit when all windows are closed
app.on('windos-all-closed',() =>{
    if(process.platform !=='darwin'){
app.quit()
    }
});