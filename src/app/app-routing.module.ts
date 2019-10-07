import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlarmsComponent } from './alarms/alarms.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlarmDetailComponent } from './alarm-detail/alarm-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },  // Default Route
  { path: 'dashboard', component: DashboardComponent },
  { path: 'alarms', component: AlarmsComponent },
  { path: 'detail/:id', component: AlarmDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
