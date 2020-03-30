import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlarmDetailComponent } from './alarm-detail/alarm-detail.component';
import { MusicsComponent } from './musics/musics.component';
import { LightsComponent } from './lights/lights.component';
import { MusicDetailComponent } from './music-detail/music-detail.component';
import { LightDetailComponent } from './light-detail/light-detail.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },  // Default Route
  { path: 'dashboard', component: DashboardComponent },
  { path: 'alarm-detail/:id', component: AlarmDetailComponent },
  { path: 'music', component: MusicsComponent },
  { path: 'music-detail/:id', component: MusicDetailComponent },
  { path: 'light', component: LightsComponent },
  { path: 'light-detail/:id', component: LightDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
