'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import { spawn } from 'child_process';
import path from 'path';

const isDevelopment = process.env.NODE_ENV !== 'production'

function spawnBinaryFile(binaryPath, argsArray) {
  const process = spawn(binaryPath, argsArray);

  process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  process.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

  return process;
}

function runBinary() {
  try {
    const binaryPath = path.resolve(__dirname, "../", "bin", "filefilego");
    const args = ["--debug", "--super_light_node", "--node_identity_passphrase=admin", '--rpc_services=data_transfer,transaction,address,filefilego', "--addr=0.0.0.0", "--http", "--http_addr=0.0.0.0", '--data_downloads_path=/home/ffg/Downloads/','--bootstrap_nodes=/ip4/18.159.124.250/tcp/10209/p2p/16Uiu2HAmVXbhxA1tiA9PRZJWwSk5jdMfWXbfeGWaubVeT7MZu8ie']
    spawnBinaryFile(binaryPath, args);
    // execFile(binaryPath, args, (error, stdout, stderr) => {
    //   if (error) {
    //     console.error(error);
    //     return;
    //   }
    //   console.log(stderr);
    //   console.log(stdout);
    // });
  } catch (e) {
    console.log(e)
  }
}

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

let win;

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    frame: false,
    minWidth: 1024,
    width: 1024,
    height: 600,
    minHeight: 600,
    // icon: path.join(__static, "icon.png"),
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

ipcMain.on("run-ffg", (evt, arg) => {
  runBinary()
});

ipcMain.on("close-me", (evt, arg) => {
  app.quit();
});

let isMax = false;
ipcMain.on("maximize", (evt, arg) => {
  if (isMax) {
    win.unmaximize();
    isMax = false;
  } else {
    isMax = true;
    win.maximize();
  }
});

ipcMain.on("minimize", (evt, arg) => {
  win.minimize();
});


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
