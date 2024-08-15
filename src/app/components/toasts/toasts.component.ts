import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastsComponent {

  constructor(private toastService: ToastService) {}

  get toasts$(): Observable<string[]> {
    return this.toastService.toasts$;
  }
  
}
