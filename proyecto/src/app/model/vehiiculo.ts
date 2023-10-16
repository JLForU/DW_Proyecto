
import { Piso } from './piso';
import { Tarifa } from './tarifa';
import { TipoVehiiculo } from './tipo-vehiiculo';


/* IMPLEMENTACIÓN DE LA CLASE 'Vehículo'. */

export class Vehiiculo {


    constructor (

        public id : number ,
        public piso_id : number,
        public tarifa_id : number,
        public placa : string ,
        public tiempoLlegada : string ,
        public tiempoSalida : string ,
        public tipo_vehiculo : string ,

    ) { }


}
