import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { TipoVehiculo } from 'src/app/model/tipo-vehiculo';
import { AuthService } from 'src/app/shared/auth.service';
import { TipoVehiculoService } from 'src/app/shared/tipo-vehiculo.service';

@Component({
  selector: 'app-anadir-tipo',
  templateUrl: './anadir-tipo.component.html',
  styleUrls: ['./anadir-tipo.component.css']
})
export class AnadirTipoComponent {
  tipos: TipoVehiculo[] = [];
  vehiculo: any = { tipo: '' }; // Initialize as an object with 'tipo' property
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
            console.log('Arreglo de tipos', this.tipos);
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

  crearTipoVehiculo() {
    const tipoExists = this.tipos.some(tipo => tipo.tipo === this.vehiculo.tipo);
  
    if (tipoExists) {
      this.errorMessage = 'Error al agregar tipo de vehiculo. Verifica la información e intenta nuevamente.';
    } else {
      this.tipoVehiculoService.anadirTipoVehiculo(this.vehiculo.tipo).subscribe(
        (result) => {
          console.log('Tipo vehiculo added successfully:', result);
          this.errorMessage = 'El tipo de vehiculo se añadio correctamente';
        },
        (error) => {
          console.error('Error while adding tipo vehiculo', error);
          this.errorMessage = 'Error al agregar tipo de vehiculo. Verifica la información e intenta nuevamente.';
        }
      );
    }
  }
  
}
