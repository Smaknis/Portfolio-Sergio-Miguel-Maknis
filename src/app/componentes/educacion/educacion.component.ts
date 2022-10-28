import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { UiService } from 'src/app/servicios/ui.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Edu } from '../../Edu';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  educationList: Edu[] = [];

  faPlus = faPlus;

  showAgregarEd: boolean = false;
  id: number = 0;
  personId:number = 0;
  institute:string = "";
  title:string = "";
  year_start:string = "";
  year_end:string = "";
  score:string = "";
  url_logo_education:string = "";
  edit:boolean = false;
  subscription?: Subscription;

  loginStatus:boolean = false;

  recargarComponente: any;

  constructor(
    private portfolioService: PortfolioService, 
    private datosPortfolio: PortfolioService, 
    private uiService: UiService) {
    this.subscription = this.uiService.onSwitchEd()
      .subscribe(value=>this.showAgregarEd = value)
   }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.educationList=data.education;
      this.id=data.person.id;
      this.loginStatus=data.person.loginStatus;
    });
  }

  switchFormularioEd(){
    this.uiService.switchEducation();
  }

  onAddEd(){
    if(this.institute.length === 0){
      alert("Por favor agregue un instituto")
      return
    }
    if(this.title.length === 0){
      alert("Por favor agregue un título")
      return
    }
    if(this.year_start.length === 0){
      alert("Por favor agregue un año de inicio")
      return
    }
    if(this.year_end.length === 0){
      alert("Por favor agregue un año de fin")
      return
    }

    if(this.url_logo_education.length === 0){
      alert("Por favor agregue un url logo")
      return
    }

    const newEdu = {
      personId: this.id,
      institute: this.institute,
      title: this.title,
      year_start: this.year_start,
      year_end: this.year_end,
      score: this.score,
      url_logo_education: this.url_logo_education,
      edit: this.edit,
    }
    this.agregarEdu(newEdu);
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Presione F5 para actualizar los cambios!',
      showConfirmButton: false,
      timer: 1200
    });
    return
  }

  agregarEdu(edu:Edu){
    this.datosPortfolio.agregarEdu(edu).subscribe((edu)=>(
    this.educationList.push(edu)
    ));
  }

  editEdu(edu:Edu){
    edu.edit = !edu.edit;
    this.portfolioService.editEdu(edu).subscribe();
    this.uiService.switchExperienciaEdu(edu);
  }

  editarEdu(edu:Edu){
    this.portfolioService.editEdu(edu).subscribe();
    this.editEdu(edu);
    this.actualizarComponente();
  }

  deleteEdu(edu:Edu){
    this.datosPortfolio.onDeleteEdu(edu)
    .subscribe(()=>(
      this.educationList = this.educationList.filter( (e) =>{
        return e.id_education !== edu.id_education}) 
    ));
  }

  actualizarComponente(){
    this.recargarComponente=this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.educationList=data.education;
    });
  }

}
