import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardListComponent } from './card-list/card-list.component';
import { CardComponent } from './card/card.component';
import { ButtonComponent } from './button/button.component';

import { MaterialModule } from './material.module';

@NgModule({
  declarations: [CardListComponent, ButtonComponent, CardComponent],
  imports: [CommonModule, MaterialModule],
  exports: [CardListComponent, ButtonComponent],
})
export class DumbModule {}
