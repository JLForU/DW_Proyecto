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
    return this.http.post("http://localhost:8080/vehiculos/sacarVehiculoPiso",id,{
      headers : new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      })
    });
    
  }

  createPiso(piso : Piso){
    return this.http.post("http://localhost:8080/pisosRest/createPiso",piso,{
      headers : new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      })
    });
    
  }

  actuPiso(piso : Piso){
    return this.http.post("http://localhost:8080/pisosRest/actu",piso,{
      headers : new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      })
    });
    
  }

  deletePiso(piso : Piso){
    console.log(piso);
    return this.http.post("http://localhost:8080/pisosRest/delete",piso,{
      headers : new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      })
    });
    
  }

}
