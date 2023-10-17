import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoVehiculo } from '../model/tipo-vehiculo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoVehiculoService {

  constructor(private http: HttpClient) { }

  getTipos(): Observable<TipoVehiculo[]> {
    return this.http.get<TipoVehiculo[]>("http://localhost:8080/tiposvehiculoRest/getTipos");
  }

  getTipoById(id : number): Observable<TipoVehiculo> {
    return this.http.get<TipoVehiculo>(`http://localhost:8080/tiposvehiculoRest/${id}`);
  }
  
}
