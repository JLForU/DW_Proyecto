import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { TipoVehiculo } from 'src/app/model/tipo-vehiculo';
import { AuthService } from 'src/app/shared/auth.service';
import { TipoVehiculoService } from 'src/app/shared/tipo-vehiculo.service';

@Component({
  selector: 'app-eliminar-tipo',
  templateUrl: './eliminar-tipo.component.html',
  styleUrls: ['./eliminar-tipo.component.css']
})
export class EliminarTipoComponent {
  tipos: TipoVehiculo[] = [];
  vehiculo: any = {}; // Objeto para almacenar los datos del formulario
  successMessage: string | null = null;
  errorMessage: string | null = null;
  constructor(private auth: AuthService, private router: Router, private tipoVehiculoService : TipoVehiculoService){}
  logout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
  showLogoutButton() {
    return this.auth.isAuthenticated();
  }

  ngOnInit(): void {
    const role = this.auth.role();
    console.log(role);
    if (role) {
      const isAdmin = role.includes('ADMIN');
      if (isAdmin) {
        forkJoin([
          this.tipoVehiculoService.getTipos()
        ]).subscribe({
          next :([tipos]) =>{
            this.tipos = tipos;
          },
          error: err => {
            if (err.status === 403) {
              this.router.navigate(['/access-denied']); // Redirige a la página de acceso denegado
            } else {
              // Manejo de otros errores
            }
          }
        });
      }else{
        this.router.navigate(['/access-denied']); // Redirige a la página de acceso denegado si no tiene los roles adecuados
      }
    }else{
      this.router.navigate(['/access-denied']); // Manejar la falta de token o roles  
    }
  }

  eliminarTipoDeVehiculo() {
    const tipoExists = this.tipos.some(tipo => tipo.id === Number(this.vehiculo.id));
  
    if (tipoExists) {
      this.tipoVehiculoService.getPisoByTipoVehiculo(this.vehiculo.id).subscribe(
        (pisos) => {
          if (pisos && pisos.length > 0) {
            console.log('Existen pisos con este tipo de vehículo. Elimine los pisos primero.');
            this.errorMessage = 'Existen pisos con este tipo de vehículo. Elimine los pisos primero.';
          } else {
            this.tipoVehiculoService.eliminarTipoVehiculo(this.vehiculo.id).subscribe(
              (result) => {
                console.log('Tipo vehiculo eliminado exitosamente:', result);
                this.errorMessage = 'Tipo vehículo eliminado exitosamente.';
              },
              (error) => {
                console.error('Error al eliminar tipo vehiculo', error);
                this.errorMessage = 'Error al eliminar tipo de vehículo.';
              }
            );
          }
        },
        (error) => {
          console.error('Error al obtener Pisos', error);
          this.errorMessage = 'Error al obtener información de pisos.';
        }
      );
    } else {
      console.log('Error, Tipo no existe:', this.vehiculo.id);
      this.errorMessage = 'Error, Tipo no existe.';
    }
  }
  
  
  
  
}
