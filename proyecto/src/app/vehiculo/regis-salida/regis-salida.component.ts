import { Component } from '@angular/core';

@Component({
  selector: 'app-regis-salida',
  templateUrl: './regis-salida.component.html',
  styleUrls: ['./regis-salida.component.css']
})
export class RegisSalidaComponent {
  formData: any = {}; // Objeto para almacenar los datos del formulario

  onSubmit(formData: any) {
    // Aquí puedes acceder a los datos del formulario a través de formData
    console.log('Datos del formulario:', formData);

    // Puedes procesar los datos del formulario aquí o enviarlos a través de una solicitud HTTP, según tus necesidades.
  }
}
