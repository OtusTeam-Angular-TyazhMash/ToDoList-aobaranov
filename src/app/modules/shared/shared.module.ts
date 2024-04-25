import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { TooltipDirective } from './directives/tooltip.directive';



@NgModule({
  declarations: [
    ButtonComponent,
    LoadingSpinnerComponent,
    TooltipComponent,
    TooltipDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ButtonComponent,
    LoadingSpinnerComponent,
    TooltipComponent,
    TooltipDirective,
  ],
})
export class SharedModule { }
