import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/modules/app/app.module';
import { environment } from './environments/environment';

import { configureAutoUpdate } from './update';

//import 3rd party libs so webpack will bundle them
import '../node_modules/jquery/dist/jquery.min.js';
import '../node_modules/tether/dist/js/tether.min.js';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/web-animations-js/web-animations.min.js';
import '../node_modules/cropperjs/dist/cropper.min.js';

configureAutoUpdate();

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
