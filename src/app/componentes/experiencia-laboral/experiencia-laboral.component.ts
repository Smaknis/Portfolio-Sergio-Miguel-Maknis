import { Component, OnInit, } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { faEdit, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Job } from '../../Job' 

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.css']
})
export class ExperienciaLaboralComponent implements OnInit {
  jobsList:any=0;
  jobs: Job[] = [];
  
  constructor(private datosPortfolio:PortfolioService) { }
  
  faEdit = faEdit;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;
  
  
  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      console.log(data);
      this.jobsList=data.job;
    });
  }

  switchFormulario(){
    console.log("cambiar");
  }

  onDelete() {
    console.log("delete");
  }

  onEdit(){
    console.log("edit");
  }

  agregarExperiencia(job:Job){
    this.datosPortfolio.agregarExperiencia(job).subscribe((job)=>(
    this.jobs.push(job)
    ));
  }

}
