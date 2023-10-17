
import { Piso } from './piso';
import { Tarifa } from './tarifa';
import { TipoVehiculo } from './tipo-vehiculo';


/* IMPLEMENTACIÓN DE LA CLASE 'Vehículo'. */

export class Vehiculo {
  [x: string]: any;

    id: number | undefined;
    tiempoLlegada: string | undefined;
    tiempoSalida: string | undefined;
    placa: string;
    tipoVehiculo: TipoVehiculo | undefined;
    piso: Piso | undefined ; // Ajusta el tipo según tu entidad de Piso
    tarifa: Tarifa | undefined; // Ajusta el tipo según tu entidad de Tarifa
    vehiculo1: any;

    constructor(placa: string) {
        this.placa = placa;
    }

}
