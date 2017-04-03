import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Standard Work Instructions!!';
  packageJson: any;

  constructor() {
    //Print app info to the console
    this.packageJson = require('../../../../package.json');
    console.info("Name: ", this.packageJson.name);
    console.info("Description: ", this.packageJson.description);
    console.info("Author: ", this.packageJson.author);
    console.info("Version: ", this.packageJson.version);
  }

  ngOnInit() {
  }

}
