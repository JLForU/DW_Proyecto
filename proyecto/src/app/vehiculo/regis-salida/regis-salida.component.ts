import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Piso } from 'src/app/model/piso';
import { Tarifa } from 'src/app/model/tarifa';
import { Vehiculo } from 'src/app/model/vehiculo';
import { PisoService } from 'src/app/shared/piso.service';
import { TarifaService } from 'src/app/shared/tarifa-service.service';
import { VehiculoService } from 'src/app/shared/vehiculo.service';

@Component({
  selector: 'app-regis-salida',
  templateUrl: './regis-salida.component.html',
  styleUrls: ['./regis-salida.component.css']
})
export class RegisSalidaComponent {
  formData: any = {}; // Objeto para almacenar los datos del formulario
  tarifas: Tarifa[] = []; // Propiedad para almacenar la lista de tarifas
  pisos : Piso[] = [];
  tarifa_id: number | null = null;
  vehiculos : Vehiculo[] =[];
  horaLlegada: string = ''; // Declaración de la propiedad 'horaLlegada'
  cobroFinal: number = 0 ; 
  vehiculoSeleccionado: Vehiculo | undefined;
  // Agrega estas variables al componente
  mensajeRetiro: string = ''; // Mensaje que se mostrará
  vehiculoRetirado: boolean = false; // Indica si el vehículo fue retirado
  constructor(private tarifaService : TarifaService , private vehiculoIns : VehiculoService, private pisoService : PisoService){}


  
  onSubmit(formData: any) {
    // Busca un vehículo en la lista de vehículos basado en la placa
    this.vehiculoSeleccionado = this.vehiculos.find(
      (vehiculo) => vehiculo.placa === formData.placa
    );

    if (this.vehiculoSeleccionado) {
      // El vehículo fue encontrado, puedes acceder a sus propiedades
      console.log('Vehículo encontrado:', this.vehiculoSeleccionado);

      // Puedes continuar con el procesamiento, como calcular la tarifa, etc.
      this.calcularTarifa();
    } else {
      // El vehículo no fue encontrado
      console.log('Vehículo no encontrado.');
    }
  }

  ngOnInit(): void {
    // Utiliza forkJoin para combinar las dos solicitudes
    forkJoin([
      this.tarifaService.getTarifas(),
      this.pisoService.getPisos(),
      this.vehiculoIns.getVehiculos()
    ]).subscribe(([tarifas, pisos,vehiculos]) => {
      this.tarifas = tarifas;
      this.pisos = pisos;
      this.vehiculos = vehiculos;
      console.log('Arreglo de vehiculos: ' , this.vehiculos);
      console.log('Arreglo de tarifas:', this.tarifas);
      console.log('Arreglo de pisos:', this.pisos);
    });
  }

  buscarHoraLlegada() {
    // Busca un vehículo en la lista de vehículos basado en la placa
    const vehiculoEncontrado = this.vehiculos.find(
      (vehiculo) => vehiculo.placa === this.formData.placa
    );
  
    if (vehiculoEncontrado) {
      // El vehículo fue encontrado, asigna la hora de llegada
      this.horaLlegada = vehiculoEncontrado.tiempoLlegada;
    } else {
      // El vehículo no fue encontrado, muestra un mensaje de error o reinicia el campo de hora de llegada
      this.horaLlegada = 'No encontrado';
    }
  }
  

  calcularTarifa() {
    if (this.vehiculoSeleccionado && this.vehiculoSeleccionado.tiempoLlegada && this.formData.tiempoSalida) {
      const llegada = new Date(`2000-01-01T${this.vehiculoSeleccionado.tiempoLlegada}`);
      const salida = new Date(`2000-01-01T${this.formData.tiempoSalida}`);
      const tarifaMinuto = this.obtenerTarifa(this.vehiculoSeleccionado.tipoVehiculo!.tipo);
      if (!isNaN(llegada.getTime()) && !isNaN(salida.getTime())) {
        const minutosTranscurridos = (salida.getTime() - llegada.getTime()) / 60000; // 1 minuto = 60000 ms
        console.log("Minutos transcurridos: ", minutosTranscurridos);
        this.cobroFinal = minutosTranscurridos*tarifaMinuto ;
        console.log("Cobro  final es: " + this.cobroFinal);
      } else {
        console.log('La hora de llegada o la hora de salida no son válidas.');
      }
    } else {
      console.log('El vehículo no tiene tiempo de salida o los datos del formulario son incompletos.');
    }
  }

  retirarVehiculo() {
    if (!this.vehiculoSeleccionado) {
      console.error('No se ha seleccionado un vehículo para retirar.');
      return;
    }
  
    const pisoId = this.vehiculoSeleccionado.piso?.id;
    const vehiculoId = this.vehiculoSeleccionado.id;
  
    if (pisoId === undefined || vehiculoId === undefined) {
      console.error('No se pudo obtener el ID del piso del vehículo.');
      return;
    }
  
    // Llama al método salirVehiculoPiso y sacarVehiculo del servicio PisoService
    this.pisoService.salirVehiculo(pisoId).subscribe(
      (response) => {
        this.finalizarRetiro();
      },
      (error) => {
        this.handleRetiroError(error);
      }
    );
  
    this.pisoService.sacarVehiculo(vehiculoId).subscribe(
      (response) => {
        this.finalizarRetiro();
      },
      (error) => {
        this.handleRetiroError(error);
      }
    );
  }
  
  finalizarRetiro() {
    this.mensajeRetiro = 'Vehículo retirado';
    this.vehiculoRetirado = true;
    console.log('Vehículo retirado del piso.');
  }
  
  handleRetiroError(error: any) {
    console.error('Error al retirar el vehículo del piso.', error);
  }
  
  
  
  getPisoIdPorPlaca(placa: string): number | null {
    for (const piso of this.pisos) {
      if (piso.tipoVehiculo.tipo === this.vehiculoSeleccionado!.tipoVehiculo!.tipo && piso.vehiculos) {
        const vehiculoEnPiso = piso.vehiculos.find((vehiculo) => vehiculo.placa === placa);
        if (vehiculoEnPiso) {
          return piso.id;
        }
      }
    }
    return null; // Retorna null si no se encuentra el piso por la placa
  }
  
  obtenerTarifa(tipoVehiculo: string): number {
    // Suponiendo que tarifas es una lista de objetos Tarifa
    const tarifaEncontrada = this.tarifas.find((tarifa) => tarifa.tipoVehiculo.tipo === tipoVehiculo);
    
    if (tarifaEncontrada) {
      this.tarifa_id = tarifaEncontrada.id;
      return Number(tarifaEncontrada.tarifaPorMinuto);      } 
    else {
      this.tarifa_id = null;
    return 0;
      }
  }

  
}
