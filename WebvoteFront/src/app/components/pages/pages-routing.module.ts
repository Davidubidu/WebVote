import { NgModule } from '@angular/core';
import { LandingComponent } from './landing/landing.component';
import { RouterModule } from '@angular/router';
import { LobbiesComponent } from './lobbies/lobbies.component';

const routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'session', component: LobbiesComponent },
  { path: '**', component: LandingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
