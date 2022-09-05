import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Job } from '../../Job';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.css']
})
export class ExperienciaLaboralComponent implements OnInit {
  
  jobsList: Job[] = [];

    
  constructor(private datosPortfolio:PortfolioService) { }
  
  
  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      console.log(data);
      this.jobsList=data.job;
 
    });
  }

  switchFormulario(){
    console.log("cambiar");
  }

  deleteJob(job:Job) {
    this.datosPortfolio.eliminarJob(job)
    .subscribe(
      ()=>(
      this.jobsList = this.jobsList.filter( (j) =>{
        return j.id_job !== job.id_job}) 
    ))

  }

  editJob(job:Job){
    console.log("edit");
  }

  agregarExperiencia(job:Job){
    this.datosPortfolio.agregarExperiencia(job).subscribe((job)=>(
    this.jobsList.push(job)
    ));
  }

}
