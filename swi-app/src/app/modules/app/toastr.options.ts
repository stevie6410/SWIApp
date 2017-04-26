import { ToastModule, ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';

export class CustomOptions extends ToastOptions {
  toastLife = 2000;
  animate = 'flyRight';
  dismiss = 'auto';
  showCloseButton = true;
  maxShown = 3;
  newestOnTop = true;
  enableHTML = true;
  positionClass = 'toast-bottom-right';
}