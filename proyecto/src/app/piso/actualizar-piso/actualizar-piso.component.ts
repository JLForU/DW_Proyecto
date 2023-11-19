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
import { VehiculoService } from 'src/app/shared/vehiculo.service'

@Component({
  selector: 'app-actualizar-piso',
  templateUrl: './actualizar-piso.component.html',
  styleUrls: ['./actualizar-piso.component.css']
})
export class ActualizarPisoComponent {

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

  actualizarPiso(id: number, area: number, tipoVehiculo: string, areaPorVehiculo: number) {
    const tipoEncontrado: any = this.tipos.find((tipo: any) => tipo.tipo === tipoVehiculo);
  
    if (!tipoEncontrado) {
      this.error = 'No se encontró el tipo de vehículo en la base de datos. No se puede actualizar el piso.';
      this.exito = null;
      this.router.navigate(['/pisos/anadirPiso']);
      return;
    }
  
    const capacidad: number = area / areaPorVehiculo; // Cálculo de la capacidad
  
    const piso: Piso = new Piso(area.toString(), tipoEncontrado, capacidad); // Ajusta la creación del objeto Piso según tu modelo
    piso.setId(id);

    this.pisoService.actuPiso(piso).subscribe(
      (response: any) => {
        this.exito = 'Piso actualizado exitosamente.';
        this.error = null;
      },
      (error: any) => {
        this.error = 'Ha ocurrido un error al actualizar el piso.';
        this.exito = null;
      }
    );
  }

}
