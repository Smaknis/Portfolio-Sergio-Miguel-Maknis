import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../Job' 

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private apiUrl = 'http://localhost:8080'
    
  constructor(private http:HttpClient) { }
  
  obtenerDatos():Observable<any>{
    const url = `${this.apiUrl}/portfolio/1`
    return this.http.get(url) //lo que esta entre parentesis tiene que reemplazarse por una url con la que nos vamos a comunicar y vamos a enviar un request
  }

  agregarJob(job:Job):Observable<Job>{
    const url = `${this.apiUrl}/newjob/job`
    return this.http.post<Job>(url, job, httpOptions)
  }

  eliminarJob(job:Job): Observable<Job>{
    const url = `${this.apiUrl}/deletejob/${job.id_job}`
    return this.http.delete<Job>(url)
  }

  editarJob(job:Job): Observable<Job>{
    const url = `${this.apiUrl}/editjob/${job.id_job}`
    return this.http.put<Job>(url, job, httpOptions)
  }

  /*

  updateExperiencia(job:Job): Observable<Job>{
    const url = `${this.apiUrlj}/${experiencia.id}`
    return this.http.put<Job>(apiUrlj, job, httpOptions);
  }

  addExperiencia(task:Task): Observable<Task>{
    return this.http.post<Task>(this.apiUrl, task, httpOptions)

  }

*/

}

//  /assets/data/data.json > json original