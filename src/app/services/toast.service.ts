import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const DEFAULT_LIFETIME = 5000;
interface Toast {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts: Toast[] = [];

  private _toasts$ = new BehaviorSubject<string[]>([]);

  private publishToasts() {
    this._toasts$.next(this.toasts.map(t => t.message));
  }

  private deleteToast(toast: Toast): void {
    const idx = this.toasts.indexOf(toast);
    if (idx > -1) {
      this.toasts.splice(idx, 1);
    }
    this.publishToasts();
  }

  get toasts$(): Observable<string[]> {
    return this._toasts$.asObservable();
  }

  showToast(message: string, lifetime: number = DEFAULT_LIFETIME): void {
     const newToast = {message: message};
     this.toasts.push(newToast);
     setTimeout(() => this.deleteToast(newToast), lifetime);
     this.publishToasts();
  }

}
