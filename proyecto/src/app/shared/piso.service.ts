import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Piso } from '../model/piso';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PisoService {

  constructor(private http: HttpClient) { }

  getPisos(): Observable<Piso[]> {
    return this.http.get<Piso[]>("http://localhost:8080/pisosRest/getPisos");
  }

  getPisoById(id: number): Observable<Piso> {
    return this.http.get<Piso>(`http://localhost:8080/pisosRest/${id}`);
  }

  updateEspacios(id : number){
    return this.http.post("http://localhost:8080/pisosRest/updateEspacios",id,{
      headers : new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      })
    });
  }

  salirVehiculo(id : number){
    return this.http.post("http://localhost:8080/pisosRest/salirVehiculoPiso",id,{
      headers : new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      })
    });
    
  }
  sacarVehiculo(id : number){
    return this.http.post("http://localhost:8080/pisosRest/sacarVehiculoPiso",id,{
      headers : new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      })
    });
    
  }
  sacarVehiculoF(id : number){
    console.info("hfhfhfhfh ");
    return this.http.post("http://localhost:8080/pisosRest/sacarVehiculoPisoF",id,{
      headers : new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      })
    });
    
  }



}
