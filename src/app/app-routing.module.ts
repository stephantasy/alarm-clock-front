import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlarmDetailComponent } from './alarm-detail/alarm-detail.component';
import { MusicsComponent } from './musics/musics.component';
import { LightsComponent } from './lights/lights.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },  // Default Route
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: AlarmDetailComponent },
  { path: 'music', component: MusicsComponent },
  { path: 'light', component: LightsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
