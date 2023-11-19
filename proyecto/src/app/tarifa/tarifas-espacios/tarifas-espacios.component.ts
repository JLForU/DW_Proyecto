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
  selector: 'app-tarifas-espacios',
  templateUrl: './tarifas-espacios.component.html',
  styleUrls: ['./tarifas-espacios.component.css']
})
export class TarifasEspaciosComponent {

  tarifas: Tarifa[] = []; // Propiedad para almacenar la lista de tarifas
  pisos : Piso[] = [];
  tipos: TipoVehiculo[] = [];
  tarifa_id: number | null = null;
  vehiculo: any = {}; // Objeto para almacenar los datos del formulario
  id_piso : number = 0;
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
    // Obtener el token del usuario autenticado desde tu servicio de autenticación
    const role = this.auth.role(); // Ejemplo: método para obtener el token
    
    // Verificar si el token existe y tiene roles (esto puede variar dependiendo de tu implementación)
    if (role) {
      const isAdmin = role.includes('ADMIN');
      const isConductor = role.includes('CONDUCTOR');
  
      // Realizar las solicitudes solo si el usuario tiene los roles necesarios
      if (isAdmin || isConductor) {
        forkJoin([
          this.tarifaService.getTarifas(),
          this.pisoService.getPisos(),
        ]).subscribe({
          next: ([tarifas, pisos]) => {
            this.tarifas = tarifas;
            this.pisos = pisos;
            console.log('Arreglo de tarifas:', this.tarifas);
            console.log('Arreglo de pisos:', this.pisos);
          },
          error: err => {
            if (err.status === 403) {
              this.router.navigate(['/access-denied']); // Redirige a la página de acceso denegado
            } else {
              // Manejo de otros errores
            }
          }
        });
      } else {
        this.router.navigate(['/access-denied']); // Redirige a la página de acceso denegado si no tiene los roles adecuados
      }
    } else {
      // Manejar la falta de token o roles
      this.router.navigate(['/access-denied']);
    }
  }
  
  
}
