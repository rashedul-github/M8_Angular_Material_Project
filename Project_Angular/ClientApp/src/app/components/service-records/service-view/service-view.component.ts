import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ServiceRecord } from 'src/app/models/service-record';
import { MatTableDataSource } from '@angular/material/table';
import { RecordService } from 'src/app/Services/record.service';
import { Vehicle } from 'src/app/models/vehicle';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../common/delete-dialog/delete-dialog.component';
import { NotifyService } from 'src/app/Services/notify.service';

@Component({
  selector: 'app-service-view',
  templateUrl: './service-view.component.html',
  styleUrls: ['./service-view.component.css']
})
export class ServiceViewComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  services: ServiceRecord[] = [];
  vehicles: Vehicle[];
  errorMsg: string = null;
  serviceDataSource: MatTableDataSource<ServiceRecord>;
  columnList: string[] = ['ServiceBy', 'ServiceCharge', 'ConditionDescr', 'IsDelivered', 'VehicleId', 'actions'];
  constructor(private serviceService: RecordService, private deleteDialog: MatDialog, private notifyService: NotifyService) { }

  getVehicleName(id: number) {
    if (!this.vehicles) return '';
    let n = '';
    for (let d of this.vehicles) {
      if (d.VehicleId == id) {
        n = d.VINNumber;
        break;
      }
    }
    return n;
  }

  confirmServiceDelete(item: ServiceRecord) {
    let dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.serviceService.deleteService(item.ServiceRecordId)
            .subscribe(x => {
              this.serviceDataSource.data = this.serviceDataSource.data.filter(data => data.ServiceRecordId != item.ServiceRecordId);
              this.notifyService.message("Data deleted.", ["DISMISS"])
            });
        }
        else { console.log("let it go"); }
      }
    );
  }


  ngOnInit(): void {
    this.serviceService.getVehicles()
      .subscribe(x => {
        this.vehicles = x;
      }, err => {
        this.errorMsg = "Could not department list data";
        return throwError(err);
      })
    this.serviceService.getService()
      .subscribe(x => {
        this.services = x;
        this.serviceDataSource = new MatTableDataSource(this.services);
        this.serviceDataSource.sort = this.sort;
        this.serviceDataSource.paginator = this.paginator;
      }, err => {
        this.errorMsg = "Could not fetch data";
      });
  }

}
