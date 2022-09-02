import { Component, OnInit, } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { faEdit, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.css']
})
export class ExperienciaLaboralComponent implements OnInit {
  jobsList:any=0;
  
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

  onDelete() {
    console.log("delete");
  }

  onEdit(){
    console.log("edit");
  }

}
