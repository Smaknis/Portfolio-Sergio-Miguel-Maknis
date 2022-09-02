import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private apiUrl = 'http://localhost:8080/portfolio/1'

  constructor(private http:HttpClient) { }
  
  obtenerDatos():Observable<any>{
    return this.http.get(this.apiUrl); //lo que esta entre parentesis tiene que reemplazarse por una url con la que nos vamos a comunicar y vamos a enviar un request
  }
  /*
  deleteExperiencia(task:Task): Observable<Task>{
    const url = `${this.apiUrl}/${experiencia.id}`
    return this.http.delete<Task>(url)
  }

  updateExperiencia(task:Task): Observable<Task>{
    const url = `${this.apiUrl}/${experiencia.id}`
    return this.http.put<Task>(url, task, httpOptions)
  }

  addExperiencia(task:Task): Observable<Task>{
    return this.http.post<Task>(this.apiUrl, task, httpOptions)

  }

*/

}

//  /assets/data/data.json > json original