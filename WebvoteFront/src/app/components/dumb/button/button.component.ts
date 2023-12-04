import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() name: string = '';
  @Output() clicked = new EventEmitter<null>();

  public onButtonClicked(): void {
    this.clicked.emit();
  }
}
