import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ElectronService } from '../../../services/electron.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  zoomFactor: number = 1;

  constructor(
    private electron: ElectronService,
    private toast: ToastsManager,
    private vcr: ViewContainerRef
  ) {
    this.toast.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  setZoom() {
    this.electron.setZoomLevel(this.zoomFactor);
  }

  toggleKioskMode() {
    this.electron.toggleKiosk();
  }

  get isKioskMode(): boolean {
    return this.electron.isKioskMode();
  }

  showSuccess() {
    this.toast.success('Awesome!', 'Success!');
  }

  showError() {
    this.toast.error('This is not good!', 'Oops!');
  }

  showWarning() {
    this.toast.warning('You are being warned.', 'Alert!');
  }

  showInfo() {
    this.toast.info('Just some information for you.');
  }

  showCustom() {
    this.toast.custom('<span style="color: red">Message in red.</span>', null, { enableHTML: true });
  }

}
