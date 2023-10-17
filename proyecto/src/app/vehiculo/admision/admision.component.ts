import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Piso } from 'src/app/model/piso';
import { Tarifa } from 'src/app/model/tarifa';
import { TipoVehiculo } from 'src/app/model/tipo-vehiculo';
import { Vehiculo } from 'src/app/model/vehiculo';
import { PisoService } from 'src/app/shared/piso.service';
import { TarifaService } from 'src/app/shared/tarifa-service.service';
import { TipoVehiculoService } from 'src/app/shared/tipo-vehiculo.service';
import { VehiculoService } from 'src/app/shared/vehiculo.service';

@Component({
  selector: 'app-admision',
  templateUrl: './admision.component.html',
  styleUrls: ['./admision.component.css']
})
export class AdmisionComponent implements OnInit{
  
  tarifas: Tarifa[] = []; // Propiedad para almacenar la lista de tarifas
  pisos : Piso[] = [];
  tipos: TipoVehiculo[] = [];
  tarifa_id: number | null = null;
  vehiculo: any = {}; // Objeto para almacenar los datos del formulario
  id_piso : number = 0;
  tipo_id : number | null = null;
  formularioValido: boolean = false;
  errorMessages: string[] = []; // Propiedad para mensajes de error

  constructor(private tarifaService : TarifaService , private vehiculoIns : VehiculoService, private pisoService : PisoService, private tipoService : TipoVehiculoService){}

  ngOnInit(): void {
    // Utiliza forkJoin para combinar las dos solicitudes
    forkJoin([
      this.tarifaService.getTarifas(),
      this.pisoService.getPisos(),
      this.tipoService.getTipos()
    ]).subscribe(([tarifas, pisos, tipos]) => {
      this.tarifas = tarifas;
      this.pisos = pisos;
      this.tipos = tipos;
      console.log('Arreglo de tarifas:', this.tarifas);
      console.log('Arreglo de pisos:', this.pisos);
      console.log('Arreglo de tipos:', this.tipos);
    });
  }

  obtenerFechaYHoraActual() {
    const now = new Date();
    const dia = now.getDate().toString().padStart(2, '0'); // Día en formato de dos dígitos
    const mes = (now.getMonth() + 1).toString().padStart(2, '0'); // Mes en formato de dos dígitos
    const año = now.getFullYear();
    const hora = now.getHours().toString().padStart(2, '0'); // Hora en formato de dos dígitos
    const minutos = now.getMinutes().toString().padStart(2, '0'); // Minutos en formato de dos dígitos
  
    this.vehiculo.tiempoLlegada = `${dia}/${mes}/${año} ${hora}:${minutos}`;
  }

  
  onSubmit() {
    this.errorMessages = []; // Reinicia la lista de mensajes de error
    // Crear una instancia de Vehiculo
    const vehiculo1 = new Vehiculo(
      this.vehiculo.placa,
    );
  
    this.obtenerTipo(this.vehiculo.tipoVehiculo);
    this.obtenerFechaYHoraActual();
    vehiculo1.tiempoLlegada = this.vehiculo.tiempoLlegada;
    // Obtener el tipo de vehículo usando la función obtenerTipo()
    if (this.tipo_id !== null) {
      this.tipoService.getTipoById(this.tipo_id).subscribe((tipo) => {
        if (tipo) {
          // Asignar el tipo de vehículo al vehículo
          vehiculo1.tipoVehiculo = tipo;
  
          // Obtener el piso por ID
          this.pisoService.getPisoById(this.id_piso).subscribe((piso) => {
            if (piso) {
              // Verificar que el tipo de vehículo del piso coincide con el del vehículo
              if (piso.tipoVehiculo.tipo === vehiculo1.tipoVehiculo?.tipo) {
                // Verificar si hay espacios disponibles en el piso
                if (piso.capacidad > 0) {
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
        } else {
          this.errorMessages.push('No se encontró el tipo de vehículo con el ID proporcionado.');
        }
      });
    } else {
      this.errorMessages.push('No se encontró el tipo de vehículo con el ID proporcionado.');
    }
  }
  
  
  verificarFormulario() {
    this.formularioValido = this.vehiculo.tipoVehiculo && this.vehiculo.placa && this.id_piso;
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

  obtenerTipo(tipoVehiculo: string): void{
    // Suponiendo que tipos es una lista de objetos Tarifa
    const tipoEncontrada = this.tipos.find((tipo) => tipo.tipo === tipoVehiculo);
    
    if (tipoEncontrada) { 
      this.tipo_id = tipoEncontrada.id;} 
    else {
      this.tipo_id = null;
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
