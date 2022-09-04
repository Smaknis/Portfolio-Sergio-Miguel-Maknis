import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Job } from '../../Job'  
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-agregar-experiencia',
  templateUrl: './agregar-experiencia.component.html',
  styleUrls: ['./agregar-experiencia.component.css']
})
export class AgregarExperienciaComponent implements OnInit {
  @Output() onAgregarExperiencia: EventEmitter<Job> = new EventEmitter(); //aca puso <Task> y no <any>
  
  personId: number = 0;
  position:string = "";
  company:string = "";
  journal_type:string = "";
  date_start:string = "";
  date_end:string = "";
  location_job:string = "";
  url_logo_job:string = "";

  miPortfolio:any=0;
  constructor(private datosPortfolio:PortfolioService) { }

  id: number = 0;

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      console.log(data);
      this.id=data.person.id;
      
    });
  }

  
  onSubmit(){
    if(this.position.length === 0){
      alert("Por favor agregue una experiencia")
      return
    }

    //const {person_id,position,company,journal_type,date_start,date_end,location_job,url_logo_job} = this
    //const newJob = {person_id,position,company,journal_type,date_start,date_end,location_job,url_logo_job}
    const newJob = {
      personId: this.id,
      position: this.position,
      company: this.company,
      journal_type: this.journal_type,
      date_start: this.date_start,
      date_end: this.date_end,
      location_job: this.location_job,
      url_logo_job: this.url_logo_job
    }
    this.onAgregarExperiencia.emit(newJob);
  }
}
