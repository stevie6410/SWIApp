import { remote, app } from 'electron';

export function update() {
    let autoUpdater = remote.autoUpdater;
    autoUpdater.quitAndInstall();
}

export function configureAutoUpdate() {

    let updateUrl = "http://sao.beav.com/pubs/swiapp/installer/";
    let packageJson = require('./package.json');
    let autoUpdater = remote.autoUpdater;
    var squirrelCommand = remote.process.argv[1];

    //#######################################################

    switch (squirrelCommand) {
        case '--squirrel-install':
            console.log('--squirrel-install');
        case '--squirrel-updated':
            console.log('--squirrel-updated');

            // Optionally do things such as:
            //
            // - Install desktop and start menu shortcuts
            // - Add your .exe to the PATH
            // - Write to the registry for things like file associations and
            //   explorer context menus

            // Always quit when done
            app.quit();

            return true;
        case '--squirrel-uninstall':
            console.log('--squirrel-uninstall');
            // Undo anything you did in the --squirrel-install and
            // --squirrel-updated handlers

            // Always quit when done
            app.quit();

            return true;
        case '--squirrel-obsolete':
            console.log('--squirrel-obsolete');
            // This is called on the outgoing version of your app before
            // we update to the new version - it's the opposite of
            // --squirrel-updated
            app.quit();
            return true;
    }

    //#######################################################

    autoUpdater.on('update-availabe', () => {
        console.log('update available')
    })

    autoUpdater.on('checking-for-update', () => {
        console.log('checking-for-update')
    })

    autoUpdater.on('update-not-available', () => {
        console.log('update-not-available')
    })

    autoUpdater.on('update-downloaded', (e, releaseNotes, releaseName, releaseDate, updateURL) => {
        console.log('update-downloaded');
        console.log('UPDATE-DOWNLOADED!!!!!!!');
        console.log(e);
        console.log(releaseNotes);
        console.log(releaseName);
        console.log(releaseDate);
        console.log(updateURL);

        const buttons = ['Restart and update', 'Not now'];
        const cancelId = buttons.indexOf('Not now');

        remote.dialog.showMessageBox({
            message: 'A new version is available!',
            noLink: true,
            buttons,
            cancelId,
        }, (choice) => {
            if (choice !== cancelId) {
                autoUpdater.quitAndInstall();
            }
        });
    })

    autoUpdater.on('error', function () {
        console.log(arguments);
    })

    autoUpdater.setFeedURL(updateUrl);

    try {
        console.log('process.argv: ', process.argv);
        console.log('remote.process.argv', remote.process.argv);

        if (squirrelCommand == '--squirrel-install') {
            console.log('--squirrel-install has been detected, skipping the update process');
        } else {
            console.log('Waiting for 5 seconds');
            setTimeout(() => {
                console.log('Start checking for updates');
                autoUpdater.checkForUpdates();
            }, 5000)
        }
    } catch (error) {
        console.error("check for updates failed", error);
    }

}

