
import { TipoVehiculo } from './tipo-vehiculo';
import { Vehiculo } from './vehiculo';


/* IMPLEMENTACIÓN DE CLASE "Piso". */

export class Piso {

    constructor (
        public id : number ,
        public area : string ,
        public tipoVehiculo : TipoVehiculo ,
        public capacidad : number,
        public vehiculos : Vehiculo[]
    ) { }

}
