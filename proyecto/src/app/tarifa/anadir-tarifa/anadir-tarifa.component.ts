import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Piso } from 'src/app/model/piso';
import { Tarifa } from 'src/app/model/tarifa';
import { TipoVehiculo } from 'src/app/model/tipo-vehiculo';
import { AuthService } from 'src/app/shared/auth.service';
import { PisoService } from 'src/app/shared/piso.service';
import { TarifaService } from 'src/app/shared/tarifa-service.service';
import { TipoVehiculoService } from 'src/app/shared/tipo-vehiculo.service';
import { VehiculoService } from 'src/app/shared/vehiculo.service';

@Component({
  selector: 'app-anadir-tarifa',
  templateUrl: './anadir-tarifa.component.html',
  styleUrls: ['./anadir-tarifa.component.css']
})
export class AnadirTarifaComponent {
  tarifas: Tarifa[] = []; // Propiedad para almacenar la lista de tarifas
  pisos : Piso[] = [];
  tipos: TipoVehiculo[] = [];
  tarifa_id: number | null = null;
  vehiculo: any = {}; // Objeto para almacenar los datos del formulario
  id_piso : number = 0;
  mensaje: string | undefined;
  tipo_id : number | null = null;
  formularioValido: boolean = false;
  errorMessages: string[] = []; // Propiedad para mensajes de error
  constructor(private auth: AuthService, private router: Router, private tarifaService : TarifaService , private vehiculoIns : VehiculoService, private pisoService : PisoService, private tipoService : TipoVehiculoService){}

  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }

  showLogoutButton() {
    return this.auth.isAuthenticated();
  }
  
  ngOnInit(): void {
    const userRole = this.auth.role(); 
    if (userRole) {
      const isAdmin = userRole === 'ADMIN';
  
      if (isAdmin) {
        forkJoin([
          this.tarifaService.getTarifas(),
          this.pisoService.getPisos(),
          this.tipoService.getTipos()
        ]).subscribe({
          next: ([tarifas, pisos, tipos]) => {
            this.tarifas = tarifas;
            this.pisos = pisos;
            this.tipos = tipos;
            console.log('Arreglo de tarifas:', this.tarifas);
            console.log('Arreglo de pisos:', this.pisos);
            console.log('Arreglo de tipos:', this.tipos);
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

  crearTarifa(tipoVehiculo: string, tarifaPorMinuto: number): void {
    const tipoEncontrado: any = this.tipos.find((tipo: any) => tipo.tipo === tipoVehiculo);
  
    if (!tipoEncontrado) {
      this.mensaje = 'Tipo de vehículo no encontrado';
      return;
    }
  
    const tarifaExistente = this.tarifas.find((tarifa: any) => tarifa.tipoVehiculo.id === tipoEncontrado.id);
  
    if (tarifaExistente) {
      this.mensaje = 'Ya existe una tarifa para este tipo de vehículo';
      return;
    }
  
    if (tarifaPorMinuto !== undefined && tarifaPorMinuto !== null) {
      const nuevaTarifa: Tarifa = new Tarifa(tipoEncontrado, tarifaPorMinuto.toString());
  
      this.tarifaService.createTarifa(nuevaTarifa)
        .subscribe(
          () => {
            this.mensaje = 'Tarifa creada exitosamente';
          },
          (error) => {
            this.mensaje = `Error al crear la tarifa: ${error}`;
          }
        );
    } else {
      this.mensaje = 'Por favor, complete todos los campos';
    }
  }
  
  

}
