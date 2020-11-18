import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { VehicleViewComponent } from './components/vehicles/vehicle-view/vehicle-view.component';
import { ServiceViewComponent } from './components/service-records/service-view/service-view.component';
import { ServiceAddComponent } from './components/service-records/service-add/service-add.component';
import { ServiceEditComponent } from './components/service-records/service-edit/service-edit.component';
import { VehicleAddComponent } from './components/vehicles/vehicle-add/vehicle-add.component';
import { VehicleEditComponent } from './components/vehicles/vehicle-edit/vehicle-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'vehicle', component: VehicleViewComponent },
  { path: 'vehicle-add', component: VehicleAddComponent },
  { path: 'vehicle-edit/:id', component: VehicleEditComponent },
  { path: 'service', component: ServiceViewComponent },
  { path: 'service-add', component: ServiceAddComponent },
  { path: 'service-edit/:id', component: ServiceEditComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
