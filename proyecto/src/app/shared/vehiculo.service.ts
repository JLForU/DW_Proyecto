import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehiculo } from '../model/vehiculo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private http: HttpClient) { }

  createVehiculo(vehiculo : Vehiculo){
    return this.http.post("http://localhost:8080/vehiculos",vehiculo,{
      headers : new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      })
    })
  }

  getVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>("http://localhost:8080/vehiculos/verVehiculos");
  }

  getVehiculosById(id : number): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(`http://localhost:8080/vehiculos/${id}`);
  }
}
