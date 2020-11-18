import { Component, OnInit } from '@angular/core';
import { ServiceRecord } from 'src/app/models/service-record';
import { Vehicle } from 'src/app/models/vehicle';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RecordService } from 'src/app/Services/record.service';
import { NotifyService } from 'src/app/Services/notify.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.css']
})
export class ServiceAddComponent implements OnInit {
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
    private notifyService: NotifyService
  ) { }
  get f() {
    return this.serviceForm.controls;
  }
  onSubmit() {
    if (this.serviceForm.invalid) return;
    Object.assign(this.servie, this.serviceForm.value);
    this.recordService.insertService(this.servie)
      .subscribe(x => {
        this.notifyService.message("Data inserted.", 'DISMISS');
        this.serviceForm.reset({});
        this.serviceForm.markAsUntouched();
        this.serviceForm.markAsPristine();
      }, err => {
        console.log(err);
        this.notifyService.message("Could not insert data.", 'DISMISS');
      })
  }

  ngOnInit(): void {
    this.recordService.getVehicles()
      .subscribe(x => {
        this.vehicle = x;
      }, err => {
        return throwError(err);
      })
  }

}
