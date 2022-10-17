import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faEdit, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Job } from '../../Job' 
import { JOBS } from '../../mock-Job'
import { UiService } from 'src/app/servicios/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-experiencia-item',
  templateUrl: './experiencia-item.component.html',
  styleUrls: ['./experiencia-item.component.css']
})
export class ExperienciaItemComponent implements OnInit {
  @Input() job: Job = JOBS[0]
  @Output() onDeleteJob: EventEmitter<Job> = new EventEmitter()
  @Output() onEditJob: EventEmitter<Job> = new EventEmitter()
  @Output() onEditarExperiencia: EventEmitter<Job> = new EventEmitter();
  @Output() cerrar = new EventEmitter();

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
  experienciaOriginal:string = "";

  constructor(private uiService: UiService
    ) {
      this.subscription = this.uiService.onSwitchE()
      .subscribe(value=>this.edit = value)
     }
  
  

  ngOnInit(): void {
  }

  onDelete(job: Job){
    this.onDeleteJob.emit(job);
  }

  onEdit(job: Job){
    this.onEditJob.emit(job);
  
  }

  cerrarEdicion(job: Job){
    this.experienciaEditar = null;
  }

  onGuardarE(j:Job){

    if(this.position===""){
      this.position=this.job.position
    };
    if(this.company===""){
      this.company=this.job.company
    };  
    if(this.journal_type===""){
      this.journal_type=this.job.journal_type
    }; 
    if(this.date_start===""){
      this.date_start=this.job.date_start
    };
    if(this.date_end===""){
      this.date_end=this.job.date_end
    };
    if(this.location_job===""){
      this.location_job=this.job.location_job
    };
    if(this.url_logo_job===""){
      this.url_logo_job=this.job.url_logo_job
    };
    
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
    this.onEditJob.emit(job);
    
    return
  }

  onCancelarE(job: Job){
    //this.experienciaOriginal = null;
    this.cerrar.emit();
    console.log("cancelar")
  }
}
