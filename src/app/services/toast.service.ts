import { Injectable } from '@angular/core';

const DEFAULT_LIFETIME = 5000;
interface Toast {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts: Toast[] = [];

  private deleteToast(toast: Toast): void {
    const idx = this.toasts.indexOf(toast);
    if (idx > -1) {
      this.toasts.splice(idx, 1);
    }
  }

  showToast(message: string, lifetime: number = DEFAULT_LIFETIME): void {
    const newToast = {message: message};
    this.toasts.push(newToast);
    setTimeout(() => this.deleteToast(newToast), lifetime);
  }

  getToasts(): string[] {
    return this.toasts.map(toast => toast.message);
  }
}