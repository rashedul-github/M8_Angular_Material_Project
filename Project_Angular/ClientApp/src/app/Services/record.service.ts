import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceRecord } from '../models/service-record';
import { dataUrl } from '../models/constant';
import { Vehicle } from '../models/vehicle';


@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http: HttpClient) { }
  getService(): Observable<ServiceRecord[]> {
    return this.http.get<ServiceRecord[]>(`${dataUrl}/VehicleWithService/GetServices`);
  }
  getServiceById(id: number): Observable<ServiceRecord> {
    return this.http.get<ServiceRecord>(`${dataUrl}/VehicleWithService/GetServiceById/${id}`);
  }
  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${dataUrl}/VehicleWithService/GetVehicleDpwn`);
  }
  insertService(data: ServiceRecord): Observable<ServiceRecord> {
    return this.http.post<ServiceRecord>(`${dataUrl}/VehicleWithService/InsertService`, data);
  }
  updateService(data: ServiceRecord): Observable<ServiceRecord> {
    return this.http.put<ServiceRecord>(`${dataUrl}/VehicleWithService/UpdateService/${data.ServiceRecordId}`, data);
  }
  deleteService(id: number): Observable<ServiceRecord> {
    return this.http.delete<ServiceRecord>(`${dataUrl}/VehicleWithService/DeleteService/${id}`);
  }
}
