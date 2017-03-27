var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: './build/bin/swi-win32-x64',
    outputDirectory: './build/pkg',
    authors: "B/E Aerospace SAO Systems Department",
    description: "Standard Work Instruction App",
    noMsi: false
});

console.log('Building swi-win32-x64.exe into a windows installer');

resultPromise.then(() => console.log("It worked"), (e) => console.log(`No dice: ${e.message}`));
