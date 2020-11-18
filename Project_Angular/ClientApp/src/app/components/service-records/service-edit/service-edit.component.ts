import { Component, OnInit } from '@angular/core';
import { ServiceRecord } from 'src/app/models/service-record';
import { Vehicle } from 'src/app/models/vehicle';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RecordService } from 'src/app/Services/record.service';
import { NotifyService } from 'src/app/Services/notify.service';
import { throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.css']
})
export class ServiceEditComponent implements OnInit {

  servie: ServiceRecord = new ServiceRecord();
  vehicle: Vehicle[] = [];
  serviceForm: FormGroup = new FormGroup({
    ServiceBy: new FormControl('', Validators.required),
    ServiceCharge: new FormControl('', Validators.required),
    ConditionDescr: new FormControl(''),
    IsDelivered: new FormControl(''),
    VehicleId: new FormControl('', Validators.required),
  })
  constructor(
    private recordService: RecordService,
    private notifyService: NotifyService,
    private activatedRoute: ActivatedRoute
  ) { }
  get f() {
    return this.serviceForm.controls;
  }
  onSubmit() {
    if (this.serviceForm.invalid) return;
    Object.assign(this.servie, this.serviceForm.value);
    this.recordService.updateService(this.servie)
      .subscribe(x => {
        this.notifyService.message("Data updated.", 'DISMISS');
        this.serviceForm.reset({});
        this.serviceForm.markAsUntouched();
        this.serviceForm.markAsPristine();
      }, err => {
        //console.log(err);
        this.notifyService.message("Could not insert data.", 'DISMISS');
      })
  }
  initForm() {
    this.serviceForm.setValue({
      ServiceBy: this.servie.ServiceBy,
      ServiceCharge: this.servie.ServiceCharge,
      ConditionDescr: this.servie.ConditionDescr,
      IsDelivered: this.servie.IsDelivered,
      VehicleId: this.servie.VehicleId
    })
  }
 

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params.id;
    this.recordService.getVehicles()
      .subscribe(x => {
        this.vehicle = x;
      }, err => {
        return throwError(err);
      });
    this.recordService.getServiceById(id)
      .subscribe(x => {
        this.servie = x;
        this.initForm();
      }, err => {
        return throwError(err);
      })
  }

}
