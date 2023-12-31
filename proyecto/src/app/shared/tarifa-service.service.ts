import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarifa } from '../model/tarifa';

@Injectable({
  providedIn: 'root'
})
export class TarifaService {

  constructor(private http: HttpClient) { }

  getTarifas(): Observable<Tarifa[]> {
    return this.http.get<Tarifa[]>("http://localhost:8080/tarifasRest/getTarifas");
  }

  getTarifaById (id : number): Observable<Tarifa>{
    return this.http.get<Tarifa>(`http://localhost:8080/tarifasRest/${id}`);
  }

  createTarifa(tarifa : Tarifa){
    return this.http.post("http://localhost:8080/tarifasRest/createTarifa",tarifa,{
      headers : new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      })
    });
    
  }

}
