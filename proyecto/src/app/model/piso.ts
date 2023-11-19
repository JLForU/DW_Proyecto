import { TipoVehiculo } from './tipo-vehiculo';
import { Vehiculo } from './vehiculo';

export class Piso {
    id: number | undefined;
    area: string;
    tipoVehiculo: TipoVehiculo | undefined;
    capacidad: number;
    vehiculos: Vehiculo[] | undefined;

    constructor(area: string, tipoVehiculo: TipoVehiculo, capacidad: number) {
        this.area = area;
        this.tipoVehiculo = tipoVehiculo;
        this.capacidad = capacidad;
    }

    setTipoVehiculo(tipo: TipoVehiculo): void {
        this.tipoVehiculo = tipo;
    }

    addVehiculo(vehiculo: Vehiculo): void {
        if (!this.vehiculos) {
            this.vehiculos = [];
        }
        this.vehiculos.push(vehiculo);
    }

    setId(id: number): void {
        this.id = id;
    }
    
}
