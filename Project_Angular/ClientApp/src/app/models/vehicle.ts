import { ServiceRecord } from './service-record';
import { MatTableDataSource } from '@angular/material/table';

export class Vehicle {
  constructor(
    public VehicleId?: number,
    public MakeBy?: string,
    public Color?: string,
    public Condition?: string,
    public MakeDate?: Date | string,
    public Mileage?: number,
    public VINNumber?: string,
    public IsHold?: boolean,
    public Note?: string,
    public ServiceRecord?: ServiceRecord[] | MatTableDataSource<ServiceRecord>
  ) { }
}

export interface VehicleDataSource {
  VehicleId?: number;
  MakeBy?: string;
  Color?: string;
  Condition?: string;
  MakeDate?: Date | string;
  Mileage?: number;
  VINNumber?: string;
  IsHold?: boolean;
  Note?: string;
  ServiceRecord?: MatTableDataSource<ServiceRecord>;
}
