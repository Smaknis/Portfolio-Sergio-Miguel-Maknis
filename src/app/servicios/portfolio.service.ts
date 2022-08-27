import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http:HttpClient) { }

  obtenerDatos():Observable<any>{
    return this.http.get('http://localhost:8080/portfolio/1'); //lo que esta entre parentesis tiene que reemplazarse por una url con la que nos vamos a comunicar y vamos a enviar un request
  }

}

//  /assets/data/data.json 