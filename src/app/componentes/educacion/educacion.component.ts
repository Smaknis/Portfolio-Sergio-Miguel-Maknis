import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { UiService } from 'src/app/servicios/ui.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Edu } from '../../Edu';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  educationList: Edu[] = [];

  faPlus = faPlus;

  form:FormGroup;

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
    private formBuilder:FormBuilder,
    private uiService: UiService) {
      this.subscription = this.uiService.onSwitchEd()
      .subscribe(value=>this.showAgregarEd = value),
      this.form=this.formBuilder.group(
        {
          institute:['',[Validators.required,Validators.minLength(3)]],
          title:['',[Validators.required, Validators.minLength(3)]],
          year_start:['',[Validators.required, Validators.minLength(3)]],
          year_end:['',[Validators.required, Validators.minLength(3)]],
          url_logo_education:['',[Validators.required, Validators.minLength(3)]],
      });
   }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.educationList=data.education;
      this.id=data.person.id;
      this.loginStatus=data.person.loginStatus;
    });
  }

  get Institute(){
    return this.form.get('institute');
  }

  get Title(){
    return this.form.get('title');
  }

  get YearStart(){
    return this.form.get('year_start');
  }

  get YearEnd(){
    return this.form.get('year_end');
  }

  get UrlLogoEducation(){
    return this.form.get('url_logo_education');
  }

  switchFormularioEd(){
    this.uiService.switchEducation();
  }

  onAddEd(){
    if(this.institute.length === 0 ||
      this.title.length === 0 ||
      this.year_start.length === 0 || 
      this.year_end.length === 0 || 
      this.url_logo_education.length === 0 ){
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Debe completar todos los campos para guardar!',
          showConfirmButton: false,
          timer: 1400
        });
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
