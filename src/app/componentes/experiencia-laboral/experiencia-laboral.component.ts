import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Job } from '../../Job';
import { UiService } from 'src/app/servicios/ui.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.css'],
})
export class ExperienciaLaboralComponent implements OnInit {
  
  jobsList: Job[] = [];
  showAgregarExp: boolean = false;
  subscription?: Subscription;
  loginStatus:boolean = false;

  recargarComponente : any;
        
  constructor(
    private datosPortfolio: PortfolioService, 
    private portfolioService: PortfolioService,
    private uiService: UiService,
    ) {
      this.subscription = this.uiService.onSwitch()
      .subscribe(value=>this.showAgregarExp = value)
     }
  
  
  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.jobsList=data.job;
      this.loginStatus=data.person.loginStatus;
    });
  }

  switchFormulario(){
    this.uiService.switchExperiencia();
  }

  deleteJob(job:Job) {
    this.datosPortfolio.eliminarJob(job)
    .subscribe(()=>(
      this.jobsList = this.jobsList.filter( (j) =>{
        return j.id_job !== job.id_job}) 
    ))

  }

  agregarJob(job:Job){
    this.datosPortfolio.agregarJob(job).subscribe((job)=>(
    this.jobsList.push(job)
    ));
    //location.reload()
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Presione F5 para actualizar los cambios!',
      showConfirmButton: false,
      timer: 1200
    });
  }

  editJob(job:Job){
    job.edit = !job.edit;
    this.portfolioService.updateEditJob(job).subscribe();
    this.uiService.switchExperienciaE(job);
  }

  editarJob(job:Job){
    this.portfolioService.editarJob(job).subscribe();
    this.editJob(job);
    this.actualizarComponente();
    location.reload()
}

  actualizarComponente(){
    this.recargarComponente=this.datosPortfolio.obtenerDatos().subscribe(data =>{
    this.jobsList=data.job;
  });
  }

}
