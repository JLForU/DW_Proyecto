
import { Vehiculo } from './vehiculo';
import { TipoVehiiculo } from './tipo-vehiiculo';

/* IMPLEMENTACIÓN DE CLASE "Piso". */

export class Piso {

    constructor (
        public id : number ,
        public area : string ,
        public tipoVehiculo : string ,
        public capacidad : number,
        public vehiculos : Vehiculo[]
    ) { }

}
