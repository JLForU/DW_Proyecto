import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Piso } from 'src/app/model/piso';
import { Tarifa } from 'src/app/model/tarifa';
import { TipoVehiculo } from 'src/app/model/tipo-vehiculo';
import { Vehiculo } from 'src/app/model/vehiculo';
import { AuthService } from 'src/app/shared/auth.service';
import { PisoService } from 'src/app/shared/piso.service';
import { TarifaService } from 'src/app/shared/tarifa-service.service';
import { TipoVehiculoService } from 'src/app/shared/tipo-vehiculo.service';
import { VehiculoService } from 'src/app/shared/vehiculo.service';

@Component({
  selector: 'app-eliminar-piso',
  templateUrl: './eliminar-piso.component.html',
  styleUrls: ['./eliminar-piso.component.css']
})
export class EliminarPisoComponent {
  tarifas: Tarifa[] = []; // Propiedad para almacenar la lista de tarifas
  pisos : Piso[] = [];
  tipos: TipoVehiculo[] = [];
  tarifa_id: number | null = null;
  vehiculo: any = {}; // Objeto para almacenar los datos del formulario
  vehiculos : Vehiculo[] =[];
  id_piso : number = 0;
  tipo_id : number | null = null;
  formularioValido: boolean = false;
  errorMessages: string[] = []; // Propiedad para mensajes de error
  exito: string | null = null;
  error: string | null = null;
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
          this.vehiculoIns.getVehiculos(),
          this.pisoService.getPisos(),
          this.tipoService.getTipos()
        ]).subscribe({
          next: ([vehiculos, pisos, tipos]) => {
            this.vehiculos = vehiculos;
            this.pisos = pisos;
            this.tipos = tipos;
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

  eliminarPiso(id: number): void {
    const piso = this.pisos.find(p => p.id === id);
  
    if (!piso) {
      this.error = 'No se encontró el piso con el ID proporcionado.';
      this.exito = null;
      return;
    }
  
    let cont = 0;
  
    this.vehiculos.forEach(vehiculo => {
      if (vehiculo.piso?.id === id) {
        cont++;
      }
    });
  
    if (cont !== 0) {
      this.error = 'No se puede eliminar el piso, el piso tiene vehículos estacionados.';
      this.exito = null;
      return;
    }
  
    this.pisoService.deletePiso(piso).subscribe(
      () => {
        this.pisos = this.pisos.filter(p => p.id !== id);
        this.exito = 'Piso eliminado exitosamente.';
        this.error = null;
      },
      (error) => {
        this.error = 'Ha ocurrido un error al eliminar el piso.';
        this.exito = null;
      }
    );
  }
  

}
