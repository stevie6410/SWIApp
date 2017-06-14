import { ToastModule, ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';

export class CustomOptions extends ToastOptions {
  toastLife = 1500;
  animate = 'flyRight';
  dismiss = 'auto';
  showCloseButton = false;
  maxShown = 1;
  newestOnTop = false;
  enableHTML = true;
  positionClass = 'toast-bottom-center';
}