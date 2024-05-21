import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() disabled: boolean | undefined;

  @Input() styleType: 'add' | 'delete' | 'edit' | 'transparent' | 'common' | undefined;

  @Input() checked: boolean | undefined;

  @Input() type: 'button' | 'submit' | 'reset' | undefined;

  @Output() clicked = new EventEmitter();

  onClick(): void{
    this.clicked.emit();
  }

}
