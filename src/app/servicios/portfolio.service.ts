import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../Job';
import { Edu } from '../Edu'; 
import { Hard } from '../Hard'; 
import { Soft } from '../Soft'; 
import { Pers } from '../Per'; 
import { Proy } from '../Proy'; 

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

  updateEditJob(job:Job): Observable<Job>{
    const url = `${this.apiUrl}/editjob/${job.id_job}`
    return this.http.put<Job>(url, job, httpOptions)
  }

  agregarEdu(edu:Edu):Observable<Edu>{
    const url = `${this.apiUrl}/newedu/edu`
    return this.http.post<Edu>(url, edu, httpOptions)
  }

  onDeleteEdu(edu:Edu): Observable<Edu>{
    const url = `${this.apiUrl}/deleteedu/${edu.id_education}`
    return this.http.delete<Edu>(url)
  }

  editEdu(edu:Edu): Observable<Edu>{
    const url = `${this.apiUrl}/editedu/${edu.id_education}`
    return this.http.put<Edu>(url, edu, httpOptions)
  }

  agregarHard(hard:Hard):Observable<Hard>{
    const url = `${this.apiUrl}/newhard/hard`
    return this.http.post<Hard>(url, hard, httpOptions)
  }

  onDeleteHard(hard:Hard): Observable<Hard>{
    const url = `${this.apiUrl}/deletehard/${hard.id_hard}`
    return this.http.delete<Hard>(url)
  }

  agregarSoft(soft:Soft):Observable<Soft>{
    const url = `${this.apiUrl}/newsoft/soft`
    return this.http.post<Soft>(url, soft, httpOptions)
  }

  onDeleteSoft(soft:Soft): Observable<Soft>{
    const url = `${this.apiUrl}/deletesoft/${soft.id_soft}`
    return this.http.delete<Soft>(url)
  }

  editHard(hard:Hard): Observable<Hard>{
    const url = `${this.apiUrl}/edithard/${hard.id_hard}`
    return this.http.put<Hard>(url, hard, httpOptions)
  }

  editSoft(soft:Soft): Observable<Soft>{
    const url = `${this.apiUrl}/editsoft/${soft.id_soft}`
    return this.http.put<Soft>(url, soft, httpOptions)
  }

  editarPerson(pers:Pers): Observable<Pers>{
    const url = `${this.apiUrl}/edit/person/${pers.id}`
    return this.http.put<Pers>(url, pers, httpOptions)
  }

  agregarPr(proy:Proy):Observable<Proy>{
    const url = `${this.apiUrl}/newproyect/proy`
    return this.http.post<Proy>(url, proy, httpOptions)
  }

  updateEditPr(proy:Proy): Observable<Proy>{
    const url = `${this.apiUrl}/editproy/${proy.id_proyect}`
    return this.http.put<Proy>(url, proy, httpOptions)
  }

  onDeletePr(proy:Proy): Observable<Proy>{
    const url = `${this.apiUrl}/deleteproy/${proy.id_proyect}`
    return this.http.delete<Proy>(url)
  }
}

//  /assets/data/data.json > json original