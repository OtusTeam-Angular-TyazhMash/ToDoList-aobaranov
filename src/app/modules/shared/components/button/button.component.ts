import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() title: string | undefined;

  @Input() disabled: boolean | undefined;

  @Input() type: 'add' | 'delete' | undefined;

  @Output() clicked = new EventEmitter();

  onClick(): void{
    this.clicked.emit();
  }

}
