import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Vehiculo } from './model/vehiculo';
import { AdmisionComponent } from './vehiculo/admision/admision.component';
import { RegisSalidaComponent } from './vehiculo/regis-salida/regis-salida.component';

const routes: Routes = [
  { path: 'vehiculo/anadirVehiculo', component: AdmisionComponent },    
  { path: 'vehiculo/registrarSalida', component: RegisSalidaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
