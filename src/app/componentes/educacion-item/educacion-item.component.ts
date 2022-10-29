import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faEdit, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { UiService } from 'src/app/servicios/ui.service';
import { Subscription } from 'rxjs';
import { Edu } from '../../Edu'; 
import { EDU } from '../../mock-Job';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-educacion-item',
  templateUrl: './educacion-item.component.html',
  styleUrls: ['./educacion-item.component.css'],
})
export class EducacionItemComponent implements OnInit {
  @Input() edu: Edu = EDU[0]
  @Output() onDeleteEdu: EventEmitter<Edu> = new EventEmitter();
  @Output() onEditEdu: EventEmitter<Edu> = new EventEmitter();
  @Output() onEditarEdu: EventEmitter<Edu> = new EventEmitter();
  @Output() cerrar = new EventEmitter();

  faEdit = faEdit;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;

  form:FormGroup;

  edit:boolean = false;
  subscription?: Subscription;

  id: number = 0;
  id_education: number = 0;
  personId:number = 0;
  institute:string = "";
  title:string = "";
  year_start:string = "";
  year_end:string = "";
  url_logo_education:string = "";
  score: string = "";

  loginStatus:boolean = false;

  constructor(
    private datosPortfolio:PortfolioService,
    private formBuilder:FormBuilder,
    private uiService: UiService
    ) {
      this.subscription = this.uiService.onSwitchE()
      .subscribe(value=>this.edit = value),
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

  onDelete(edu: Edu){
    this.onDeleteEdu.emit(edu);
  }

  onEdit(edu:Edu){
    this.institute=this.edu.institute
    this.title=this.edu.title
    this.year_start=this.edu.year_start
    this.year_end=this.edu.year_end
    this.url_logo_education=this.edu.url_logo_education
    this.onEditEdu.emit(edu);
  }

  onGuardarEdu(e:Edu){

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
    
    const edu = {
      personId: this.edu.personId,
      institute: this.institute,
      title: this.title,
      year_start: this.year_start,
      year_end: this.year_end,
      url_logo_education: this.url_logo_education,
      edit: this.edu.edit,
      id_education: this.edu.id_education,
      score: this.score,
    }
    this.onEditarEdu.emit(edu);
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Presione F5 para actualizar los cambios!',
      showConfirmButton: false,
      timer: 1200
    });
    return
  }

  onCancelarEdu(edu: Edu){
    this.cerrar.emit();
  }

}
