import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { DumbModule } from '../dumb/dumb.module';
import { CardListComponent } from '../dumb/card-list/card-list.component';
import { LandingComponent } from './landing/landing.component';
import { LobbiesComponent } from './lobbies/lobbies.component';

@NgModule({
  declarations: [LandingComponent, LobbiesComponent],
  imports: [CommonModule, PagesRoutingModule, DumbModule],
})
export class PagesModule {}
