import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdmisionComponent } from './vehiculo/admision/admision.component';
import { RegisSalidaComponent } from './vehiculo/regis-salida/regis-salida.component';
import { LoginComponent } from './security/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TarifasEspaciosComponent } from './tarifa/tarifas-espacios/tarifas-espacios.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AnadirPisoComponent } from './piso/anadir-piso/anadir-piso.component';
import { EliminarPisoComponent } from './piso/eliminar-piso/eliminar-piso.component';
import { ActualizarPisoComponent } from './piso/actualizar-piso/actualizar-piso.component';

@NgModule({
  declarations: [
    AppComponent,
    AdmisionComponent,
    RegisSalidaComponent,
    LoginComponent,
    TarifasEspaciosComponent,
    AccessDeniedComponent,
    AnadirPisoComponent,
    EliminarPisoComponent,
    ActualizarPisoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }