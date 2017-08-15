import { ToastModule, ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';

export class ToastCustomOptions extends ToastOptions {
  toastLife = 2000;
  animate = 'flyRight';
  dismiss = 'auto';
  showCloseButton = false;
  maxShown = 5;
  newestOnTop = false;
  enableHTML = true;
  positionClass = 'toast-bottom-full-width';
}
