var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: './out/bin/swi-win32-x64',
    outputDirectory: './out/installer',
    title: 'Standard Work Instructions',
    authors: "B/E Aerospace SAO Systems Department",
    description: "Standard Work Instruction App",
    noMsi: true,
    certificateFile: "certs/swi.pfx",
    certificatePassword: "Password2",
    remoteReleases: 'http://sao.beav.com/pubs/swiapp/installer/'
});

console.log('Building swi-win32-x64.exe into a windows installer');

resultPromise.then(() => console.log("It worked"), (e) => console.log(`No dice: ${e.message}`));
