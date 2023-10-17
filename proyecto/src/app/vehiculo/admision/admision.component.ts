import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Piso } from 'src/app/model/piso';
import { Tarifa } from 'src/app/model/tarifa';
import { Vehiculo } from 'src/app/model/vehiculo';
import { PisoService } from 'src/app/shared/piso.service';
import { TarifaService } from 'src/app/shared/tarifa-service.service';
import { VehiculoService } from 'src/app/shared/vehiculo.service';

@Component({
  selector: 'app-admision',
  templateUrl: './admision.component.html',
  styleUrls: ['./admision.component.css']
})
export class AdmisionComponent implements OnInit{
  
  tarifas: Tarifa[] = []; // Propiedad para almacenar la lista de tarifas
  pisos : Piso[] = [];
  tarifa_id: number | null = null;
  vehiculo: any = {}; // Objeto para almacenar los datos del formulario
  id_piso : number = 0;
  formularioValido: boolean = false;
  errorMessages: string[] = []; // Propiedad para mensajes de error

  constructor(private tarifaService : TarifaService , private vehiculoIns : VehiculoService, private pisoService : PisoService){}

  ngOnInit(): void {
    // Utiliza forkJoin para combinar las dos solicitudes
    forkJoin([
      this.tarifaService.getTarifas(),
      this.pisoService.getPisos()
    ]).subscribe(([tarifas, pisos]) => {
      this.tarifas = tarifas;
      this.pisos = pisos;
      console.log('Arreglo de tarifas:', this.tarifas);
      console.log('Arreglo de pisos:', this.pisos);
    });
  }
  onSubmit() {
    this.errorMessages = []; // Reinicia la lista de mensajes de error
    // Crear una instancia de Vehiculo
    const vehiculo1 = new Vehiculo(
      this.vehiculo.tiempoLlegada, 
      this.vehiculo.tiempoSalida,
      this.vehiculo.placa,
      this.vehiculo.tipoVehiculo
    );

    this.pisoService.getPisoById(this.id_piso).subscribe((piso) => {
      if (piso) {
        // Verificar que el tipo de vehículo del piso coincide con el del vehículo
        if (piso.tipoVehiculo.tipo === vehiculo1.tipoVehiculo) {
          // Verificar si hay espacios disponibles en el piso
          if (piso.capacidad > 0) {
            console.log('El vehículo se creó S:');
            // Obtener la tarifa por el tipo de vehículo
            this.tarifaService.getTarifaById(this.tarifa_id!).subscribe((tarifa) => {
              if (tarifa) {
                // Asignar el piso al vehículo
                vehiculo1.piso = piso;
                // Asignar la tarifa al vehículo
                vehiculo1.tarifa = tarifa;
                // Llamar al servicio para actualizar los espacios en el piso
                this.pisoService.updateEspacios(piso.id).subscribe(() => {
                  // Llamar al servicio para crear el vehículo
                  this.vehiculoIns.createVehiculo(vehiculo1).subscribe((vehiculoCreado) => {
                    if (vehiculoCreado) {
                      console.log('El vehículo se creó correctamente:', vehiculoCreado);
                    } else {
                      this.errorMessages.push('El vehículo se guardó correctamente.');
                    }
                  });
                });
              } else {
                this.errorMessages.push('No se encontró una tarifa para este tipo de vehículo.');
              }
            });
          } else {
            this.errorMessages.push('No hay espacios disponibles en el piso.');
          }
        } else {
          this.errorMessages.push('El vehículo no se puede guardar en este piso.');
        }
      } else {
        this.errorMessages.push('No se encontró el piso con el ID proporcionado.');
      }
    });
    
    
  }
  
  verificarFormulario() {
    this.formularioValido = this.vehiculo.tipoVehiculo && this.vehiculo.placa && this.vehiculo.tiempoLlegada && this.id_piso;
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

  getPisosPorTipoVehiculo(tipoVehiculo: string): any[] {
    const pisosEncontrados: any[] = [];
    for (const piso of this.pisos) {
      if (piso.tipoVehiculo.tipo === tipoVehiculo) { 
        pisosEncontrados.push({
          id: piso.id,
          capacidad: piso.capacidad,
          tipoVehiculo: tipoVehiculo
        });
      }
    }
    return pisosEncontrados;
  }
  
}
