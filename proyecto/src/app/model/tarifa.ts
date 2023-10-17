
import { TipoVehiiculo } from './tipo-vehiiculo';


/* IMPLEMENTACIÓN DE CLASE "Tarifa". */

export class Tarifa {


    constructor (
        public id : number ,
        public tipoVehiculo : string ,
        public tarifaPorMinuto : string

    ) { }


}
