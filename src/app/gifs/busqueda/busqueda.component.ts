import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {

  @ViewChild('textBuscar') textBuscar!:ElementRef<HTMLInputElement>;
  
  constructor( private gifsService: GifsService) {}

  buscar(){

    const valor = this.textBuscar.nativeElement.value;
    
    if(valor.trim().length === 0) { //eta logica no permite que se guarden espacios en blanco en el historial
      return;
      }

    this.gifsService.buscarGifs(valor);

    this.textBuscar.nativeElement.value = '';
  }
}
