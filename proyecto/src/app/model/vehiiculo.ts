
import { Piso } from './piso';
import { Tarifa } from './tarifa';
import { TipoVehiiculo } from './tipo-vehiiculo';


/* IMPLEMENTACIÓN DE LA CLASE 'Vehículo'. */

export class Vehiiculo {


    constructor (

        public id : number ,
        public placa : string ,
        public tipoVehiiculo : TipoVehiiculo ,
        public tiempoLlegada : string ,
        public tiempoSalida : string ,
        public tarifa : Tarifa ,
        public piso : Piso
    
    ) { }


}
