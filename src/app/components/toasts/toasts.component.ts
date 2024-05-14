import { Component } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
})
export class ToastsComponent {

  constructor(private toastService: ToastService) {}

  getToasts(): string[] {
    return this.toastService.getToasts();
  }
}
