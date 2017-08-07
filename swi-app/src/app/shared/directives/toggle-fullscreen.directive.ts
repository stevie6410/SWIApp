import { Directive, HostListener } from '@angular/core';
const screenfull = require('screenfull');

@Directive({
  selector: '[toggleFullscreen]'
})
export class ToggleFullscreenDirective {

  constructor() { }

  @HostListener('click') onClick(){
    if (screenfull.enabled){
      screenfull.toggle();
    }
  }

}
