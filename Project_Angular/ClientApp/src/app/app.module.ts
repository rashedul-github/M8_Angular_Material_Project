import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatNavComponent } from './components/mat-nav/mat-nav.component';
import { LayoutModule } from '@angular/cdk/layout';

import { MatIncludeModule } from './common/mat-include/mat-include.module';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { VehicleViewComponent } from './components/vehicles/vehicle-view/vehicle-view.component';
import { VehicleAddComponent } from './components/vehicles/vehicle-add/vehicle-add.component';
import { VehicleEditComponent } from './components/vehicles/vehicle-edit/vehicle-edit.component';
import { ServiceViewComponent } from './components/service-records/service-view/service-view.component';
import { ServiceAddComponent } from './components/service-records/service-add/service-add.component';
import { ServiceEditComponent } from './components/service-records/service-edit/service-edit.component';
import { VehicleService } from './Services/vehicle.service';
import { HttpClientModule } from '@angular/common/http';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { ReactiveFormsModule } from '@angular/forms';
import { RecordService } from './Services/record.service';
import { NotifyService } from './Services/notify.service';
import { DeleteDialogComponent } from './components/common/delete-dialog/delete-dialog.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MatNavComponent,
    HomeComponent,
    NotFoundComponent,
    VehicleViewComponent,
    VehicleAddComponent,
    VehicleEditComponent,
    ServiceViewComponent,
    ServiceAddComponent,
    ServiceEditComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    LayoutModule,
    MatIncludeModule,
    HttpClientModule,
    NgMaterialMultilevelMenuModule,
    ReactiveFormsModule
  ],
  entryComponents: [DeleteDialogComponent],
  providers: [VehicleService, RecordService, NotifyService, DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
