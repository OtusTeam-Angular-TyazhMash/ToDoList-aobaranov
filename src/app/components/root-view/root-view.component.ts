import { Component, Inject, LOCALE_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root-view',
  templateUrl: './root-view.component.html',
  styleUrls: ['./root-view.component.scss'],
})
export class RootViewComponent {

  public readonly localesList = environment.localesUrls;
  public readonly appLocale = $localize.locale;

  constructor (
    public router: Router
  ){}

  public onChangeLocale(event: Event) {
    if ((event.target as HTMLInputElement).value) {
      window.location.href = (event.target as HTMLInputElement).value;
    }
  }
}
