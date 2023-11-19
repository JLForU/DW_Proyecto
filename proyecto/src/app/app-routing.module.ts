import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Vehiculo } from './model/vehiculo';
import { AdmisionComponent } from './vehiculo/admision/admision.component';
import { RegisSalidaComponent } from './vehiculo/regis-salida/regis-salida.component';
import { LoginComponent } from './security/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { TarifasEspaciosComponent } from './tarifa/tarifas-espacios/tarifas-espacios.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AnadirPisoComponent } from './piso/anadir-piso/anadir-piso.component';
import { EliminarPisoComponent } from './piso/eliminar-piso/eliminar-piso.component';
import { ActualizarPisoComponent } from './piso/actualizar-piso/actualizar-piso.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'vehiculo/anadirVehiculo', component: AdmisionComponent, canActivate: [AuthGuard] },    
  { path: 'vehiculo/registrarSalida', component: RegisSalidaComponent, canActivate: [AuthGuard] },
  { path: 'tarifa/tarifas-espacios', component: TarifasEspaciosComponent, canActivate: [AuthGuard] },
  { path: 'piso/anadirPiso', component: AnadirPisoComponent, canActivate: [AuthGuard] },
  { path: 'piso/eliminarPiso', component: EliminarPisoComponent, canActivate: [AuthGuard] },
  { path: 'piso/actualizarPiso', component: ActualizarPisoComponent, canActivate: [AuthGuard] },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
