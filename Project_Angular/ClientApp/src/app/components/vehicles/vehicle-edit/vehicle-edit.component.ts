import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/Services/vehicle.service';
import { NotifyService } from 'src/app/Services/notify.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ServiceRecord } from 'src/app/models/service-record';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.css']
})
export class VehicleEditComponent implements OnInit {
  vehicle: Vehicle = null;
  vihicleForm: FormGroup = new FormGroup({
    MakeBy: new FormControl('', Validators.required),
    Color: new FormControl(''),
    Condition: new FormControl(''),
    MakeDate: new FormControl('', Validators.required),
    Mileage: new FormControl('', Validators.required),
    VINNumber: new FormControl('', Validators.required),
    IsHold: new FormControl(''),
    Note: new FormControl(''),
    services: new FormArray([]),
    Newservices: new FormArray([])
  });
  removeItem(index: number) {
    (this.vehicle.ServiceRecord as ServiceRecord[]).splice(index, 1);
  }
  onSubmit() {
    //console.log(this.isDisabled);
    if (this.vihicleForm.controls.MakeBy.invalid ||
      this.vihicleForm.controls.MakeDate.invalid ||
      this.vihicleForm.controls.Mileage.invalid ||
      this.vihicleForm.controls.VINNumber.invalid ||
      (this.vehicle.ServiceRecord as ServiceRecord[]).length == 0
    ) return;

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
    let i = 0;
    for (let x of this.ServiceArray.controls) {
      //console.log();
      (this.vehicle.ServiceRecord as ServiceRecord[])[i].ServiceBy = x.get("ServiceBy").value;
      (this.vehicle.ServiceRecord as ServiceRecord[])[i].ServiceCharge = x.get("ServiceCharge").value;
      (this.vehicle.ServiceRecord as ServiceRecord[])[i].ConditionDescr = x.get("ConditionDescr").value;
      (this.vehicle.ServiceRecord as ServiceRecord[])[i].IsDelivered = x.get("IsDelivered").value;
      i++;
    }
    //console.log(this.vehicle);

    this.vehicleService.updateVehicle(this.vehicle)
      .subscribe(x => {
        this.notifyService.message("Data updated successfully.", 'DISMISS');
        //this.vihicleForm.reset({});
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
    (this.vihicleForm.get('Newservices') as FormArray).push(
      new FormGroup({
        ServiceBy: new FormControl('', Validators.required),
        ServiceCharge: new FormControl('', Validators.required),
        ConditionDescr: new FormControl(''),
        IsDelivered: new FormControl('')
      }));
  }
  addServiceToVehicle() {
    //console.log(this.NewServiceArray.controls[0].value);
    let servie = new ServiceRecord();
    Object.assign(servie, this.NewServiceArray.controls[0].value);
    (this.vehicle.ServiceRecord as ServiceRecord[]).push(servie);
    (this.vihicleForm.get('services') as FormArray).push(
      new FormGroup({
        ServiceBy: new FormControl(servie.ServiceBy, Validators.required),
        ServiceCharge: new FormControl(servie.ServiceCharge, Validators.required),
        ConditionDescr: new FormControl(servie.ConditionDescr),
        IsDelivered: new FormControl(servie.IsDelivered)
      }));
    this.NewServiceArray.controls[0].reset({});
    this.NewServiceArray.controls[0].markAsPristine();
    this.NewServiceArray.controls[0].markAsUntouched();
  }
  get ServiceArray() {
    return this.vihicleForm.get("services") as FormArray;
  }
  get NewServiceArray() {
    return this.vihicleForm.get("Newservices") as FormArray;
  }
  initForm() {
    this.vihicleForm.setValue({
      MakeBy: this.vehicle.MakeBy,
      Color: this.vehicle.Color,
      Condition: this.vehicle.Condition,
      MakeDate: this.vehicle.MakeDate,
      Mileage: this.vehicle.Mileage,
      VINNumber: this.vehicle.VINNumber,
      IsHold: this.vehicle.IsHold,
      Note: this.vehicle.Note,
      services: [],
      Newservices: []
    });
    for (let x of this.vehicle.ServiceRecord as ServiceRecord[]) {
      (this.vihicleForm.get('services') as FormArray).push(
        new FormGroup({
          ServiceBy: new FormControl(x.ServiceBy, Validators.required),
          ServiceCharge: new FormControl(x.ServiceCharge, Validators.required),
          ConditionDescr: new FormControl(x.ConditionDescr),
          IsDelivered: new FormControl(x.IsDelivered)
        }));
    }
    this.addServieForm();
  }
  removeServiceItem(index: number) {
    this.ServiceArray.removeAt(index);
    (this.vehicle.ServiceRecord as ServiceRecord[]).splice(index, 1);
  }
  constructor(
    private vehicleService: VehicleService,
    private notifyService: NotifyService,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params.id;
    //console.log(id);
    this.vehicleService.getWithServiceId(id)
      .subscribe(x => {
        //console.log(x);
        this.vehicle = x;
        this.initForm();
      }, err => {
        this.notifyService.message("Failed to fetch trade data.", 'DISMISS');
        return throwError(err);
      });
  }

}
