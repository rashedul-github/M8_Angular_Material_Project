import { Component, OnInit, ViewChild, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { VehicleService } from 'src/app/Services/vehicle.service';
import { Vehicle } from 'src/app/models/vehicle';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ServiceRecord } from 'src/app/models/service-record';
import { throwError } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../common/delete-dialog/delete-dialog.component';
import { NotifyService } from 'src/app/Services/notify.service';


@Component({
  selector: 'app-vehicle-view',
  templateUrl: './vehicle-view.component.html',
  styleUrls: ['./vehicle-view.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class VehicleViewComponent implements OnInit {
  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<ServiceRecord>>;
  @ViewChild(MatPaginator, { static: false }) paginator;

  dataSource: MatTableDataSource<Vehicle>;
  vehiclesData: Vehicle[] = [];
  columnsToDisplay = ['select', 'MakeBy', 'Color', 'Condition', 'MakeDate', 'Mileage', 'VINNumber', 'IsHold', 'Note', 'actions'];
  innerDisplayedColumns = ['ServiceBy', 'ServiceCharge', 'ConditionDescr', 'IsDelivered', 'actions'];
  expandedElement: Vehicle | null;
  constructor(
    private vehicleService: VehicleService,
    private cd: ChangeDetectorRef,
    private deleteDialog: MatDialog,
    private notifyService: NotifyService

  ) { }

  initTable(data: Vehicle[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  confirmDelete(item: Vehicle) {
    let dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.vehicleService.deleteVehicle(item.VehicleId)
            .subscribe(x => {
              this.dataSource.data = this.dataSource.data.filter(data => data.VehicleId != item.VehicleId);
              this.notifyService.message("Data deleted.", ["DISMISS"])
            });
        }
        else { console.log("let it go"); }
      }
    );
  }

  confirmDeleteService(item: ServiceRecord) {
    //console.log(this.expandedElement);
    console.log(item);
    let dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.vehicleService.deleteService(item.ServiceRecordId)
            .subscribe(x => {
              let ds = this.expandedElement.ServiceRecord as MatTableDataSource<ServiceRecord>;
              ds.data = ds.data.filter(data => data.ServiceRecordId != item.ServiceRecordId);
              this.notifyService.message("Data deleted.", ["DISMISS"])
            });
        }
        else { console.log("let it go"); }
      }
    );
  }



  ngOnInit(): void {
    this.vehicleService.getWithService()
      .subscribe(x => {
        this.vehiclesData = x;
        this.vehiclesData.forEach(vehicle => {
          if ((vehicle.ServiceRecord as ServiceRecord[]).length == 0) vehicle.ServiceRecord = null;
          if (vehicle.ServiceRecord && Array.isArray(vehicle.ServiceRecord) && vehicle.ServiceRecord.length) {
            vehicle.ServiceRecord = new MatTableDataSource(vehicle.ServiceRecord);
          }
        });
        //console.log(this.vehiclesData);
        this.initTable(this.vehiclesData);

      }, err => {
        console.log(err);
        return throwError(err);
      })
  }

  toggleRow(element: Vehicle) {
    //console.log(element.ServiceRecord);
    element.ServiceRecord && (element.ServiceRecord as MatTableDataSource<ServiceRecord>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<ServiceRecord>).sort = this.innerSort.toArray()[index]);
  }

  applyFilter(filterValue: string) {

    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
}
