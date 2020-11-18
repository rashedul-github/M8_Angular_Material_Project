import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';
import { dataUrl } from '../models/constant';
import { ServiceRecord } from '../models/service-record';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }
  getWithService(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${dataUrl}/VehicleWithService/VehicleWithService`);
  }
  getWithServiceId(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${dataUrl}/VehicleWithService/GetVehicleById/${id}`);
  }
  updateVehicle(v: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${dataUrl}/VehicleWithService/Update/${v.VehicleId}`, v);
  }
  insertVehicle(v: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${dataUrl}/VehicleWithService/Insert`,v);
  }
  deleteVehicle(id: number): Observable<Vehicle> {
    return this.http.delete<Vehicle>(`${dataUrl}/VehicleWithService/Delete/${id}`);
  }
  deleteService(id: number): Observable<ServiceRecord> {
    return this.http.delete<ServiceRecord>(`${dataUrl}/VehicleWithService/DeleteService/${id}`);
  }
}
