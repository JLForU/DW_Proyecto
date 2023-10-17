/* IMPLEMENTACIÓN DE CLASE "Tarifa". */

import { TipoVehiculo } from "./tipo-vehiculo";

export class Tarifa {


    constructor (
        public id : number ,
        public tipoVehiculo : TipoVehiculo ,
        public tarifaPorMinuto : string
    ) { }


}
