import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehiiculo } from '../model/vehiiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private http: HttpClient) { }

  createVehiculo(vehiculo : Vehiiculo){
    return this.http.post("http://localhost:8080/vehiculos",vehiculo,{

      headers : new HttpHeaders({
        'Content-Type' : 'aplication/json'
      })
    })

  }


}
