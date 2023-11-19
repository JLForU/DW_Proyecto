import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Vehiculo } from './model/vehiculo';
import { AdmisionComponent } from './vehiculo/admision/admision.component';
import { RegisSalidaComponent } from './vehiculo/regis-salida/regis-salida.component';
import { LoginComponent } from './security/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { TarifasEspaciosComponent } from './tarifa/tarifas-espacios/tarifas-espacios.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AnadirTipoComponent } from './tipoVehiculo/anadir-tipo/anadir-tipo.component';
import { EliminarTipoComponent } from './tipoVehiculo/eliminar-tipo/eliminar-tipo.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'vehiculo/anadirVehiculo', component: AdmisionComponent, canActivate: [AuthGuard] },    
  { path: 'vehiculo/registrarSalida', component: RegisSalidaComponent, canActivate: [AuthGuard] },
  { path: 'tarifa/tarifas-espacios', component: TarifasEspaciosComponent, canActivate: [AuthGuard] },
  { path: 'tipoVehiculo/anadir-tipo', component: AnadirTipoComponent, canActivate: [AuthGuard], },
  { path: 'tipoVehiculo/eliminar-tipo', component: EliminarTipoComponent, canActivate: [AuthGuard], },
  { path: 'access-denied', component: AccessDeniedComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
