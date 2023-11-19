import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoVehiculo } from '../model/tipo-vehiculo';
import { Observable } from 'rxjs';
import { Piso } from '../model/piso';

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

  anadirTipoVehiculo(tipo: string): Observable<any> {
    return this.http.post("http://localhost:8080/tiposvehiculoRest/anadirTipoVehiculo", tipo);
  }
  eliminarTipoVehiculo(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/tiposvehiculoRest/deleteTipoVehiculo/${id}`);
  }

  getPisoByTipoVehiculo(id : number) : Observable<Piso[]>{
    return this.http.get<Piso[]>(`http://localhost:8080/tiposvehiculoRest/getPisosByTipoVehiculo/${id}`)
  }
  
}
