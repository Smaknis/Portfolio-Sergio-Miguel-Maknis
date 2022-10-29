import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faEdit, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Job } from '../../Job' 
import { JOBS } from '../../mock-Job'
import { UiService } from 'src/app/servicios/ui.service';
import { Subscription } from 'rxjs';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experiencia-item',
  templateUrl: './experiencia-item.component.html',
  styleUrls: ['./experiencia-item.component.css'],
})
export class ExperienciaItemComponent implements OnInit {
  @Input() job: Job = JOBS[0]
  @Output() onDeleteJob: EventEmitter<Job> = new EventEmitter();
  @Output() onEditJob: EventEmitter<Job> = new EventEmitter();
  @Output() onEditarExperiencia: EventEmitter<Job> = new EventEmitter();
  @Output() cerrar = new EventEmitter();

  form:FormGroup;

  faEdit = faEdit;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;
  
  experienciaEditar = null;
  edit:boolean = false;
  id: number = 0;
  id_job: number = 0;
  personId:number = 0;
  position:string = "";
  company:string = "";
  journal_type:string = "";
  date_start:string = "";
  date_end:string = "";
  location_job:string = "";
  url_logo_job:string = "";
  subscription?: Subscription;

  loginStatus:boolean = false;
 
  constructor(
    private datosPortfolio:PortfolioService,
    private formBuilder:FormBuilder,
    private uiService: UiService) {
      this.subscription = this.uiService.onSwitchE()
      .subscribe(value=>this.edit = value),
      this.form=this.formBuilder.group(
        {
          position:['',[Validators.required,Validators.minLength(3)]],
          company:['',[Validators.required, Validators.minLength(3)]],
          journal_type:['',[Validators.required, Validators.minLength(3)]],
          date_start:['',[Validators.required, Validators.minLength(3)]],
          date_end:['',[Validators.required, Validators.minLength(3)]],
          location_job:['',[Validators.required, Validators.minLength(3)]],
          url_logo_job:['',[Validators.required, Validators.minLength(3)]],
      });
  }
  
  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.loginStatus=data.person.loginStatus;
    });
  }

  get Position(){
    return this.form.get('position');
  }

  get Company(){
    return this.form.get('company');
  }

  get JournalType(){
    return this.form.get('journal_type');
  }
  
  get DateStart(){
    return this.form.get('date_start');
  }

  get DateEnd(){
    return this.form.get('date_end');
  }

  get LocationJob(){
    return this.form.get('location_job');
  }

  get UrlLogoJob(){
    return this.form.get('url_logo_job');
  }

  onDelete(job: Job){
    this.onDeleteJob.emit(job);
  }

  onEdit(job: Job){
    this.position=this.job.position;
    this.company=this.job.company;
    this.journal_type=this.job.journal_type;
    this.date_start=this.job.date_start;
    this.date_end=this.job.date_end;
    this.location_job=this.job.location_job;
    this.url_logo_job=this.job.url_logo_job;
    this.onEditJob.emit(job);
  }

  onGuardarE(j:Job){

    if(this.position.length === 0 ||
      this.company.length === 0 ||
      this.journal_type.length === 0 ||
      this.date_start.length === 0 || 
      this.date_end.length === 0 || 
      this.location_job.length === 0 || 
      this.url_logo_job.length === 0 ){
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Debe completar todos los campos para guardar!',
          showConfirmButton: false,
          timer: 1400
        });
      return
    }

    const job = {
      personId: this.job.personId,
      position: this.position,
      company: this.company,
      journal_type: this.journal_type,
      date_start: this.date_start,
      date_end: this.date_end,
      location_job: this.location_job,
      url_logo_job: this.url_logo_job,
      edit: this.job.edit,
      id_job: this.job.id_job
    }
    
    this.onEditarExperiencia.emit(job);
    location.reload()
    return
  }

  onCancelarE(job: Job){
    this.onEditJob.emit(job);
  }
}
