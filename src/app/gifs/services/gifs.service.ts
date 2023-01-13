import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey      : string = 'gw9S88RWDzhmqBjgr0UJmrjZMVNRbWvx';
  private servicioUrl : string = 'https://api.giphy.com/v1/gifs';
  private _historial  : string[] = [];

  //Cambiar any por su tipo corespondiente 
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
    
  }
  
  constructor( private http: HttpClient ) {

      this._historial = JSON.parse(localStorage.getItem("historial")!) || [];
      this.resultados = JSON.parse(localStorage.getItem("resultados")!) || [];
  }

  buscarGifs(query: string= '') {
    query = query.trim().toLocaleLowerCase();

    // cuando usamos el ! significa que estamos pidiendo una negacion 
    // por ejemplo decimos en esta logica que si no incluye o no esta que lo incerte asi 
    // no se repite la data
    if( !this._historial.includes ( query ) ) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10); //esta logica se la utilizamos para cortar la cantidad de espacio para el historial
      
      localStorage.setItem('historial', JSON.stringify(this._historial) );
      
    }

    const params = new HttpParams()
          .set('api_Key', this.apiKey)
          .set('limit', '10')
          .set('q', query )

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=GIqSl8dQjlyRU3u77m0D0ugE6IdDViPD&q=${ query }&limit=10`)
              .subscribe( (resp) => {
                // console.log(resp.data);
                this.resultados = resp.data;
                localStorage.setItem('resultados', JSON.stringify(this.resultados));

              });
  }
  
}



