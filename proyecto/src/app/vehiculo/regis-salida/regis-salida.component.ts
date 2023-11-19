import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Piso } from 'src/app/model/piso';
import { Tarifa } from 'src/app/model/tarifa';
import { Vehiculo } from 'src/app/model/vehiculo';
import { AuthService } from 'src/app/shared/auth.service';
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
  constructor(private auth: AuthService, private router: Router, private tarifaService : TarifaService , private vehiculoIns : VehiculoService, private pisoService : PisoService){}
  
  
  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }

  showLogoutButton() {
    return this.auth.isAuthenticated();
  }

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
    const userRole = this.auth.role(); // Obtener el rol del usuario autenticado
  
    if (userRole) {
      const isAdminOrPortero = userRole === 'ADMIN' || userRole === 'PORTERO';
  
      if (isAdminOrPortero) {
        forkJoin([
          this.tarifaService.getTarifas(),
          this.pisoService.getPisos(),
          this.vehiculoIns.getVehiculos()
        ]).subscribe({
          next: ([tarifas, pisos, vehiculos]) => {
            this.tarifas = tarifas;
            this.pisos = pisos;
            this.vehiculos = vehiculos;
            console.log('Arreglo de vehiculos:', this.vehiculos);
            console.log('Arreglo de tarifas:', this.tarifas);
            console.log('Arreglo de pisos:', this.pisos);
          },
          error: err => {
            if (err.status === 403) {
              this.router.navigate(['/access-denied']); // Redirige a la página de acceso denegado
            }
          }
        });
      } else {
        this.router.navigate(['/access-denied']); // Redirige a la página de acceso denegado si no tiene los roles adecuados
      }
    } else {
      this.router.navigate(['/access-denied']); // Manejar la falta de token o roles
    }
  }
  

  buscarHoraLlegada() {
    // Busca un vehículo en la lista de vehículos basado en la placa
    const vehiculoEncontrado = this.vehiculos.find(
      (vehiculo) => vehiculo.placa === this.formData.placa
    );
  
    if (vehiculoEncontrado && vehiculoEncontrado.tiempoLlegada) {
      // El vehículo fue encontrado, asigna la hora de llegada
      this.horaLlegada = vehiculoEncontrado.tiempoLlegada;
    } else {
      this.horaLlegada = 'No encontrado';
    }
  }
  obtenerFechaYHoraActual() {
    const now = new Date();
    const dia = now.getDate().toString().padStart(2, '0'); // Día en formato de dos dígitos
    const mes = (now.getMonth() + 1).toString().padStart(2, '0'); // Mes en formato de dos dígitos
    const año = now.getFullYear();
    const hora = now.getHours().toString().padStart(2, '0'); // Hora en formato de dos dígitos
    const minutos = now.getMinutes().toString().padStart(2, '0'); // Minutos en formato de dos dígitos
  
    this.formData.tiempoSalida = `${dia}/${mes}/${año} ${hora}:${minutos}`;
  }
  parsearFecha(fechaStr: string) {
    const partes = fechaStr.split(" ");
    if (partes.length === 2) {
      const fecha = partes[0];
      const hora = partes[1];
      const [dia, mes, anio] = fecha.split("/").map(Number);
      const [horaStr, minutoStr] = hora.split(":").map(Number);
      return new Date(anio, mes - 1, dia, horaStr, minutoStr);
    } else {
      return new Date(fechaStr); // Intenta analizarlo directamente
    }
  }
    
  calcularTarifa() {
    if (this.vehiculoSeleccionado && this.vehiculoSeleccionado.tiempoLlegada) {
      const llegada = this.parsearFecha(this.vehiculoSeleccionado.tiempoLlegada);
      this.obtenerFechaYHoraActual(); // Llama a la función para obtener el tiempo de salida actual
      const salida = this.parsearFecha(this.formData.tiempoSalida);
      const tarifaMinuto = this.obtenerTarifa(this.vehiculoSeleccionado.tipoVehiculo!.tipo);
      console.log("Llegada1:", llegada);
      console.log("Salida1:", salida);  
      if (!isNaN(llegada.getTime()) && !isNaN(salida.getTime())) {
  
        const minutosTranscurridos = (salida.getTime() - llegada.getTime()) / 60000; // 1 minuto = 60000 ms
        this.cobroFinal = minutosTranscurridos * tarifaMinuto;
        console.log("Cobro final es: " + this.cobroFinal.toFixed(2)); // Muestra el cobro final con dos decimales
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
  
    if (pisoId === undefined) {
      console.error('No se pudo obtener el ID del piso del piso.');
      return;
    }
  
    if (vehiculoId === undefined) {
      console.error('No se pudo obtener el ID del piso del vehiculo.');
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
      if (piso.tipoVehiculo!.tipo === this.vehiculoSeleccionado!.tipoVehiculo!.tipo && piso.vehiculos) {
        const vehiculoEnPiso = piso.vehiculos.find((vehiculo) => vehiculo.placa === placa);
        if (vehiculoEnPiso) {
          return piso.id!;
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
