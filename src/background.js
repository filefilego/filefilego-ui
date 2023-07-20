'use strict'

import { app, protocol, BrowserWindow, ipcMain, dialog, shell, Tray, Menu } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import { spawn } from 'child_process';
import path from 'path';
import fs from "fs";
import { Units } from "./unit.js"
import BigNumber from 'bignumber.js';
const contextMenu = require('electron-context-menu');

contextMenu({
	showSaveImageAs: false,
  
});

const cryptoLib = require("crypto");
const isDevelopment = process.env.NODE_ENV !== 'production'
app.commandLine.appendSwitch('disable-color-correct-rendering');
app.commandLine.appendSwitch('force-color-profile', 'srgb');

var ffgBinaryName = "filefilego"
if(process.platform === 'win32') {
  ffgBinaryName = "filefilego.exe"
}

let binaryPath = path.resolve(__dirname, "../", "bin", ffgBinaryName);
let args = ["address", "data_dir"]
let homeDir = ""

if(process.platform != 'win32') {
  try {
    fs.chmodSync(binaryPath, 0o755);
  } catch (err) {
    console.log(err)
  }
}


spawnSync(binaryPath, args).then(result => {
    let h = result.split("Default Data Directory::").filter((o) => o != "")
    homeDir = h[0];
    console.log(homeDir)
    if (homeDir != "") {
      fs.mkdirSync(homeDir + path.sep + "keystore", {
        recursive: true,
      });
    }
  })
  .catch(error => {
    console.error(error);
});
  
  

function fileExists(filePath) {
  try {
    fs.statSync(filePath);
    return true;
  } catch (error) {
    return false
  }
}

function readJSONFile(filename) {
  try {
    const fileContent = fs.readFileSync(filename);
    const jsonData = JSON.parse(fileContent);

    return jsonData;
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(`File not found: ${filename}`);
    }

    throw err;
  }
}

function saveJsonToFileSync(jsonObj, filename) {
  const jsonString = JSON.stringify(jsonObj, null, 2);
  fs.writeFileSync(filename, jsonString);
}

function removeDataIfExceeds2KB(str) {
  const bufferSize = Buffer.byteLength(str);
  if (bufferSize <= 2048) {
    return str;
  } else {
    const buffer = Buffer.from(str);
    const newBuffer = buffer.slice(bufferSize - 2048);
    return newBuffer.toString();
  }
}

var ffgoutput = "";

setInterval(() => {
  console.log(ffgoutput);
}, 1000);

var pidFFG = null;
function spawnBinaryFile(binaryPath, argsArray) {
  const process = spawn(binaryPath, argsArray, {
    // detached: true,
    // stdio: 'ignore'
  });

  process.stdout.on('data', (data) => {
    ffgoutput += data
    ffgoutput = removeDataIfExceeds2KB(ffgoutput)
  });

  process.stderr.on('data', (data) => {
    ffgoutput += data
    ffgoutput = removeDataIfExceeds2KB(ffgoutput)
  });

  process.on('close', (code) => {
    pidFFG = null
    console.log(`child process result ${ffgoutput}`);
    console.log(`child process exited with code ${code}`);
  });

  pidFFG = process.pid;

  // process.unref();

  return process;
}

function runBinary(binaryPath, args) {
  try {
    spawnBinaryFile(binaryPath, args);
  } catch (e) {
    console.log(e)
  }
}

function spawnSync(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args);

    let output = '';

    child.stdout.on('data', (data) => {
      output += data;
    });

    child.stderr.on('data', (data) => {
      output += data;
    });

    child.on('error', (err) => {
      reject(err);
    });

    child.on('close', (code) => {
      if (code !== 0) {
        const error = new Error(`Command failed with exit code ${code}: ${output}`);
        reject(error);
      } else {
        resolve(output);
      }
    });
  });
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
    height: 800,
    minHeight: 800,
    icon: path.join(__static, "icon.png"),
    webPreferences: {

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  win.maximize();

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

const additionalData = {}
const gotTheLock = app.requestSingleInstanceLock(additionalData)

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory, additionalData) => {
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })


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
let tray = null
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  tray = new Tray(path.join(__static, "icon.png"))
  // tray = new Tray('/path/to/my/icon')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open', click: () => { win.show() } },
    { label: 'Quit', click: () => { app.quit() } },
  ])
  tray.setToolTip('FileFileGo UI')
  tray.setContextMenu(contextMenu)
  tray.on('click', () => {
    win.show();
  })
  createWindow()
})

ipcMain.on("run-ffg", (evt, arg) => {
  let args = [];
  const binaryPath = path.resolve(__dirname, "../", "bin", ffgBinaryName);
  const geolitePath = path.resolve(__dirname, "../", "bin", "GeoLite2-Country.mmdb");
  try {
    const settings = readJSONFile(path.join(homeDir, "settings.json"))
    if (settings.node_type == "storage") {
      let feesBig = Units.convert(settings.storageFees, "FFG", "FFGOne")
      let feesBigVal = new BigNumber(feesBig, 10);
      
      args.push("--storage")
      args.push("--show_storage_capacity")
      args.push(`--storage_dir=${settings.storageFolder}`)
      args.push(`--storage_token=${settings.storageAccessToken}`)
      args.push(`--storage_fees_byte=${feesBigVal.toString(10)}`)

      if (settings.storagePublic) {
        args.push("--storage_public")
      }

    } else {
      args.push("--super_light_node")
    }

    args.push(`--geolite_db_path=${geolitePath}`)
    args.push(`--data_downloads_path=${settings.downloadsFolder}`)
    args.push(`--node_identity_passphrase=${arg.password}`)
    args.push('--rpc_services=*')
    args.push('--addr=0.0.0.0')
    args.push('--http')
    args.push('--http_port=9036')
    args.push('--http_addr=127.0.0.1')
    // args.push(`--bootstrap_nodes=/dns/validator.local/tcp/10209/p2p/16Uiu2HAmVXbhxA1tiA9PRZJWwSk5jdMfWXbfeGWaubVeT7MZu8ie`)
    args.push(`--bootstrap_nodes=/dns/discovery.filefilego.com/tcp/10209/p2p/16Uiu2HAmVXbhxA1tiA9PRZJWwSk5jdMfWXbfeGWaubVeT7MZu8ie`)
  } catch (e) {
    console.log(e)
    return
  }
  runBinary(binaryPath, args)
});

ipcMain.on("ffg-pid", async (evt, arg) => {
  evt.returnValue = pidFFG;
});

ipcMain.on("app-version", (evt, arg) => {
  evt.returnValue = app.getVersion();
});

ipcMain.on("get-datadir", async (evt, arg) => {
  evt.returnValue = homeDir + path.sep + "keystore";
});

ipcMain.on("close-me", (evt, arg) => {
  app.quit();
});

ipcMain.on("select-dir", async (evt, arg) => {
  if(process.platform === 'linux') {
    win.hide();
  }
  const res = await dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
    title: "Select Directory",
    properties: ['openDirectory']
  })
  if(process.platform === 'linux') {
    win.show();
  }
  evt.returnValue = res;
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

ipcMain.on("sha256", (evt, arg) => {
  evt.returnValue =
    "0x" +
    cryptoLib
      .createHash("sha256")
      .update(arg)
      .digest("hex");
});

ipcMain.on("minimize", (evt, arg) => {
  win.minimize();
  // evt.preventDefault()
  // win.hide();
});

ipcMain.on("ffg-output", (evt, arg) => {
  evt.returnValue = ffgoutput
});

ipcMain.on("node-key-exists", (evt, arg) => {
  evt.returnValue = fileExists(path.join(homeDir, "keystore", "node_identity.json"))
});

function findAddress(str) {
  if (str.includes("Address:")) {
    return true;
  } else {
    return false;
  }
}

function copyFileSync(sourcePath, destinationPath, destinationFileName) {
  let sourceFile = path.basename(sourcePath);
  if(destinationFileName != "") {
    sourceFile = destinationFileName;
  }
  const destinationFile = path.join(destinationPath, sourceFile);
  const destinationDir = path.dirname(destinationFile);

  try {
    // Create the destination directory if it doesn't exist
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir, { recursive: true });
    }

    fs.copyFileSync(sourcePath, destinationFile);
    return true;
  } catch (err) {
    return false;
  }
}

ipcMain.on("check-key", async (evt, arg) => {
  try {
    if (fileExists(arg.path)) {
      const binaryPath = path.resolve(__dirname, "../", "bin", ffgBinaryName);
      const args = ["address", "info", arg.path, arg.password]
      let res = ""
      try {
        res = await spawnSync(binaryPath, args)
        if(findAddress(res)) {
          let ok = copyFileSync(arg.path, path.join(homeDir, "keystore"), "node_identity.json")
          if(!ok) {
            evt.returnValue = { error: "failed to copy wallet key file to filefilego home directory" }
            return
          }
          evt.returnValue = { error: "" }
        }

      } catch (e) {
        if(e.message.includes("mismatch")) {
          evt.returnValue = { error: "wrong password" }
        } else {
          evt.returnValue = { error: e.message }
        }
      } 
      return
    }
  } catch (e) {
    evt.returnValue = { error: e.message }
  }
});

ipcMain.on("create-node-identity", async (evt, arg) => {
  try {
    if (!fileExists(path.join(homeDir, "keystore", "node_identity.json"))) {
      const binaryPath = path.resolve(__dirname, "../", "bin", ffgBinaryName);
      const args = ["address", "create_node_key", arg.password]
      await spawnSync(binaryPath, args)
      evt.returnValue = { error: "" }
      return
    }
    evt.returnValue = { error: "node identity key already exists" }
  } catch (e) {
    evt.returnValue = { error: e.message }
  }
});

ipcMain.on("save-storage-providers", (evt, arg) => {
  try {
    const settings = readJSONFile(path.join(homeDir, "settings.json"))
    if (settings.storage_providers == null) {
      settings.storage_providers = [];
    }

    settings.storage_providers = arg;

    saveJsonToFileSync(settings, path.join(homeDir, "settings.json"))

    evt.returnValue = { error: "" }

  } catch (e) {
    evt.returnValue = { error: e.message }
  }
});

ipcMain.on("save-downloads", (evt, arg) => {
  try {
    const settings = readJSONFile(path.join(homeDir, "settings.json"))
    if (settings.downloads == null) {
      settings.downloads = [];
    }

    settings.downloads = arg;

    saveJsonToFileSync(settings, path.join(homeDir, "settings.json"))

    evt.returnValue = { error: "" }

  } catch (e) {
    evt.returnValue = { error: e.message }
  }
});

ipcMain.on("save-settings", (evt, arg) => {
  try {
    saveJsonToFileSync(arg, path.join(homeDir, "settings.json"))
    evt.returnValue = { error: "" }
  } catch (e) {
    evt.returnValue = { error: e.message }
  }
});

ipcMain.on("get-settings", (evt, arg) => {
  try {
    const settings = readJSONFile(path.join(homeDir, "settings.json"))
    evt.returnValue = { error: "", settings: settings }
  } catch (e) {
    evt.returnValue = { error: e.message }
  }
});

function deleteFolder(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, { recursive: true, force: true });
      return true;
  } else {
    return false;
  }
}

ipcMain.on("open-folder", (evt, arg) => {
  shell.openPath(arg);
  evt.returnValue = true;
});


ipcMain.on("remove-folder", (evt, arg) => {
  evt.returnValue = deleteFolder(arg);
});

ipcMain.on("openUrl", (evt, arg) => {
  try {
    shell.openExternal(arg.url)
    evt.returnValue = { error: "" }
  } catch (e) {
    evt.returnValue = { error: e.message }
  }
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
