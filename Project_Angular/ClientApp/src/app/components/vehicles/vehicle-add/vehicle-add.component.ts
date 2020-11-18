import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ServiceRecord } from 'src/app/models/service-record';
import { VehicleService } from 'src/app/Services/vehicle.service';
import { NotifyService } from 'src/app/Services/notify.service';
import { throwError } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css']
})
export class VehicleAddComponent implements OnInit {
  vehicle: Vehicle = new Vehicle();
  vihicleForm: FormGroup = new FormGroup({
    MakeBy: new FormControl('', Validators.required),
    Color: new FormControl(''),
    Condition: new FormControl(''),
    MakeDate: new FormControl('', Validators.required),
    Mileage: new FormControl('', Validators.required),
    VINNumber: new FormControl('', Validators.required),
    IsHold: new FormControl(''),
    Note: new FormControl(''),
    services: new FormArray([])
  });
  removeItem(index: number) {
    (this.vehicle.ServiceRecord as ServiceRecord[]).splice(index, 1);
  }
  onSubmit() {
    //console.log(this.isDisabled);
    if (this.vihicleForm.controls.MakeBy.invalid ||
      //this.vihicleForm.controls.Color.invalid ||
      //this.vihicleForm.controls.Condition.invalid ||
      this.vihicleForm.controls.MakeDate.invalid ||
      this.vihicleForm.controls.Mileage.invalid ||
      this.vihicleForm.controls.VINNumber.invalid 
      //this.vihicleForm.controls.IsHold.invalid ||
      //this.vihicleForm.controls.Note.invalid 
    ) {
      this.notifyService.message("Errors in form", 'DISMISS')
      return;
    }
    if ((this.vehicle.ServiceRecord as ServiceRecord[]).length == 0) {
      this.notifyService.message("No course added.", 'DISMISS')
      return;
    }
    //let data = new Vehicle();
    //data.MakeDate = this.datePipe.transform(data.MakeDate, 'yyyy-MM-dd');
    this.vehicle.MakeBy = this.vihicleForm.controls.MakeBy.value;
    this.vehicle.Color = this.vihicleForm.controls.Color.value;
    this.vehicle.Condition = this.vihicleForm.controls.Condition.value;
    this.vehicle.MakeDate = this.vihicleForm.controls.MakeDate.value;
    this.vehicle.Mileage = this.vihicleForm.controls.Mileage.value;
    this.vehicle.VINNumber = this.vihicleForm.controls.VINNumber.value;
    this.vehicle.IsHold = this.vihicleForm.controls.IsHold.value ? this.vihicleForm.controls.IsHold.value : false;
    this.vehicle.Note = this.vihicleForm.controls.Note.value;
    this.vehicle.VehicleId = 0;
    console.log(this.vehicle);

    this.vehicleService.insertVehicle(this.vehicle)
      .subscribe(x => {
        this.notifyService.message("Data Saved successfully", 'DISMISS');
        this.vihicleForm.reset({});
        this.vihicleForm.markAsUntouched();
        this.vihicleForm.markAsPristine();
        this.vehicle = new Vehicle();
        this.vehicle.ServiceRecord = [];
      }, err => {
        //console.log(this.vehicle);
        this.notifyService.message("Could not insert data.", 'DISMISS');
        return throwError(err);
      })
  }
  addServieForm() {
    (this.vihicleForm.get('services') as FormArray).push(
      new FormGroup({
        ServiceBy: new FormControl('', Validators.required),
        ServiceCharge: new FormControl('', Validators.required),
        ConditionDescr: new FormControl(''),
        IsDelivered: new FormControl('')
      }));
  }
  addServiceToVehicle() {
    //console.log(this.ServiceArray.controls[0].value);
    let servie = new ServiceRecord();
    Object.assign(servie, this.ServiceArray.controls[0].value);
    (this.vehicle.ServiceRecord as ServiceRecord[]).push(servie);
    this.ServiceArray.controls[0].reset({});
    this.ServiceArray.controls[0].markAsPristine();
    this.ServiceArray.controls[0].markAsUntouched();
  }
  get ServiceArray() {
    return this.vihicleForm.get("services") as FormArray;
  }
  get serviceLength() {
    return (this.vehicle.ServiceRecord ? (this.vehicle.ServiceRecord as ServiceRecord[]).length : 0)
  }
  get isDisabled() {
    return this.vihicleForm.controls.MakeBy.invalid ||
      this.vihicleForm.controls.MakeDate.invalid ||
      this.vihicleForm.controls.Mileage.invalid ||
      this.vihicleForm.controls.VINNumber.invalid ||
      (this.vehicle.ServiceRecord as ServiceRecord[]).length == 0;
  }
  constructor(
    private vehicleService: VehicleService,
    private notifyService: NotifyService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.vehicle.ServiceRecord = [];
    this.addServieForm();
  }

}
