import { Component, OnInit } from '@angular/core';
import { Tarifa } from 'src/app/model/tarifa';
import { Vehiiculo } from 'src/app/model/vehiiculo';
import { TarifaService } from 'src/app/shared/tarifa-service.service';
import { VehiculoService } from 'src/app/shared/vehiculo.service';

@Component({
  selector: 'app-admision',
  templateUrl: './admision.component.html',
  styleUrls: ['./admision.component.css']
})
export class AdmisionComponent implements OnInit{
  
  tarifas: Tarifa[] = []; // Propiedad para almacenar la lista de tarifas
  tarifa_id: number | null = null;
  constructor(private tarifaService : TarifaService , private vehiculoIns : VehiculoService){}

  ngOnInit(): void {
    this.tarifaService.getTarifas().subscribe((data: Tarifa[]) => {
      this.tarifas = data; // Guarda la lista de tarifas en la propiedad del componente
      console.log('Arreglo de tarifas:', this.tarifas); // Imprime el arreglo de tarifas en la consola

    });
  }

  vehiculo: any = {}; // Objeto para almacenar los datos del formulario
  formularioValido: boolean = false;


  onSubmit() {
    // Aquí puedes acceder a los datos del formulario a través de this.vehiculo
    console.log('Datos del formulario:', this.vehiculo);
    //this.vehiculoIns.createVehiculo(new Vehiiculo(9999,1,this.tarifa_id!,this.vehiculo.placa,"this.vehiculo.tiempoLlegada","0",this.vehiculo.tipoVehiculo));
    this.vehiculoIns.createVehiculo(new Vehiiculo(9999,1,1,"asdd","this.vehiculo.tiempoLlegada","0","Carro"));

  }

  verificarFormulario() {
    this.formularioValido = this.vehiculo.tipoVehiculo && this.vehiculo.placa && this.vehiculo.tiempoLlegada;
  }

  // obtenerTarifa(tipoVehiculo: string): number {

  //   // Suponiendo que tarifas es una lista de objetos Tarifa
  //   const tarifaEncontrada = this.tarifas.find((tarifa) => tarifa.tipoVehiculo === tipoVehiculo);
  //   this.tarifa_id = tarifaEncontrada.id;
  //   return tarifaEncontrada ? Number(tarifaEncontrada.tarifaPorMinuto) : 0; // Convertir el valor a número y luego devolverlo
  // }

  obtenerTarifa(tipoVehiculo: string): number {
    // Suponiendo que tarifas es una lista de objetos Tarifa
    const tarifaEncontrada = this.tarifas.find((tarifa) => tarifa.tipoVehiculo === tipoVehiculo);
    
    if (tarifaEncontrada) {
      this.tarifa_id = tarifaEncontrada.id;
      return Number(tarifaEncontrada.tarifaPorMinuto);      } 
    else {
      this.tarifa_id = null;
    return 0;
      }
  }

  guardarVehiculo(){
  }  
}
