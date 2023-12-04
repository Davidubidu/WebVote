import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICardData } from '../../../model/cardList.interface';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
})
export class CardListComponent {
  @Input() data: ICardData[] = [];
  @Output() clicked = new EventEmitter<string>();

  public cardClicked(id: string | undefined) {
    if (id) {
      this.clicked.emit(id);
    }
  }
}
