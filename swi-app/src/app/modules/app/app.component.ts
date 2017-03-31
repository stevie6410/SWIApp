import { Component } from '@angular/core';
import { remote } from 'electron';
import { } from '../../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Electron Works!!';
  packageJson: any;
  autoUpdater: Electron.AutoUpdater;

  constructor() {
    this.packageJson = require('../../../package.json');
    console.info("Name: ", this.packageJson.name);
    console.info("Description: ", this.packageJson.description);
    console.info("Author: ", this.packageJson.author);
    console.info("Version: ", this.packageJson.version);

    this.autoUpdater = remote.autoUpdater;

    this.initAutoUpdater();
  }

  initAutoUpdater() {

    // this.autoUpdater.on('update-availabe', () => {
    //   console.log('update available')
    // })

    // this.autoUpdater.on('checking-for-update', () => {
    //   console.log('checking-for-update')
    // })

    // this.autoUpdater.on('update-not-available', () => {
    //   console.log('update-not-available')
    // })

    // this.autoUpdater.on('update-downloaded', (e, releaseNotes, releaseName, releaseDate, updateURL) => {
    //   console.log('update-downloaded');
    //   alert('UPDATE-DOWNLOADED!!!!!!!');
    //   console.log(e);
    //   console.log(releaseNotes);
    //   console.log(releaseName);
    //   console.log(releaseDate);
    //   console.log(updateURL);
    // })

    // this.autoUpdater.on('error', function(){
    //   alert(arguments);
    //   console.log(arguments);
    // })

    // let updateUrl = `http://sao.beav.com/pubs/swiapp/installer/`;
    // console.log(updateUrl);

    // this.autoUpdater.setFeedURL(updateUrl);
    // try {
    //   console.log('process.argv: ', process.argv);
    //   console.log('remote.process.argv', remote.process.argv);

    //   console.log('Waiting for 10 seconds');
    //   setTimeout(() => {
    //     console.log('Start checking for updates');
    //     this.autoUpdater.checkForUpdates();
    //   }, 3000)

    //   // if (process.argv[1] == '--squirrel-firstrun') {
    //   //   console.log('--squirrel-firstrun so waiting for 3 seconds');
    //   //   setTimeout(() => {
    //   //     this.autoUpdater.checkForUpdates();
    //   //   }, 3000)
    //   // } else {
    //   //   this.autoUpdater.checkForUpdates();
    //   // }

    //   //this.autoUpdater.checkForUpdates();
    // } catch (error) {
    //   console.error("check for updates failed", error);
    // }
  }
}
