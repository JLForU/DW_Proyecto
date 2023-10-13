
import { Vehiiculo } from './vehiiculo';
import { TipoVehiiculo } from './tipo-vehiiculo';


/* IMPLEMENTACIÓN DE CLASE "Piso". */

export class Piso {


    constructor (

        public id : number ,
        public area : string ,
        public tipoVehiiculo : TipoVehiiculo ,
        public vehiiculos : Vehiiculo[]

    ) { }


}
