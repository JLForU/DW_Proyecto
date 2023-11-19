import { TipoVehiculo } from "./tipo-vehiculo";

export class Tarifa {
    id: number | undefined;
    tipoVehiculo: TipoVehiculo | undefined;
    tarifaPorMinuto: string;

    constructor(tipoVehiculo: TipoVehiculo, tarifaPorMinuto: string) {
        this.tipoVehiculo = tipoVehiculo;
        this.tarifaPorMinuto = tarifaPorMinuto;
    }

    setId(id: number): void {
        this.id = id;
    }
}
