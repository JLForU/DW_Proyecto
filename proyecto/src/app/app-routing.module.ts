import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Vehiculo } from './model/vehiculo';
import { AdmisionComponent } from './vehiculo/admision/admision.component';
import { RegisSalidaComponent } from './vehiculo/regis-salida/regis-salida.component';
import { LoginComponent } from './security/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'vehiculo/anadirVehiculo', component: AdmisionComponent },    
  { path: 'vehiculo/registrarSalida', component: RegisSalidaComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
