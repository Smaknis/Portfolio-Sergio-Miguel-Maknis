import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Subscription } from 'rxjs';
import { Job } from '../../Job';
import { UiService } from 'src/app/servicios/ui.service';

@Component({
  selector: 'app-editar-experiencia',
  templateUrl: './editar-experiencia.component.html',
  styleUrls: ['./editar-experiencia.component.css']
})
export class EditarExperienciaComponent implements OnInit {
  @Output() onEditarExperiencia: EventEmitter<Job> = new EventEmitter();
  @Output() cerrar = new EventEmitter();

  id_job: number = 0;
  personId:number = 0;
  position:string = "";
  company:string = "";
  journal_type:string = "";
  date_start:string = "";
  date_end:string = "";
  location_job:string = "";
  url_logo_job:string = "";
  edit:boolean = false;
  subscription?: Subscription;

  constructor(
    private datosPortfolio:PortfolioService,
    private uiService: UiService
    ) {
      this.subscription = this.uiService.onSwitchE()
      .subscribe(value=>this.edit = value)
     }

  id: number = 0;
  experienciaOriginal: any;
  job:any;

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.id=data.person.id;
      this.job=data.job;
           
    });
  
  }

  onSubmitE(job:Job){
    if(this.position.length === 0){
      alert("Por favor agregue una posición")
      return
    }
    if(this.company.length === 0){
      alert("Por favor agregue una empresa")
      return
    }
    if(this.journal_type.length === 0){
      alert("Por favor agregue un tipo de jornada")
      return
    }
    if(this.date_start.length === 0){
      alert("Por favor agregue fecha de inicio")
      return
    }
    if(this.date_end.length === 0){
      alert("Por favor agregue fecha de finalización")
      return
    }
    if(this.location_job.length === 0){
      alert("Por favor agregue ubicación")
      return
    }
    this.switchFormularioE();
    
    const editJob = {
      personId: this.id,
      position: this.position,
      company: this.company,
      journal_type: this.journal_type,
      date_start: this.date_start,
      date_end: this.date_end,
      location_job: this.location_job,
      url_logo_job: this.url_logo_job,
      edit: this.edit,
      id_job: this.id_job
    }
    this.onEditarExperiencia.emit(editJob);
    
    return
    
    
  }

  switchFormularioE(){
    
  }

  onGuardarE(job:Job){
    this.datosPortfolio.editarJob(this.job);
    //this.onCancelarE();
    console.log(this.job);
  }

  onCancelarE(){
    this.experienciaOriginal = null;
    this.cerrar.emit();
  }

}

/*  @Input() set experiencia (valor: any) {
    this.crearFormulario();
    if (valor) {
      this.experienciaOriginal = valor;
      this.form.patchValue({
        position: valor.position,
        company: valor.company,
        journal_type: valor.journal_type,
        date_start: valor.date_start,
        date_end: valor.date_end,
        location_job: valor.location_job,
        url_logo_job: valor.url_logo_job
      });
    }
  }

  @Output() cerrar = new EventEmitter();
  
  form: any;
  
  experienciaOriginal: any;

  constructor(
    private datosPortfolio:PortfolioService,
    private fb: FormBuilder      
    ) { }

  /*ngOnInit(): void {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      //console.log(data);
      this.form=data.job;
      this.crearFormulario();
    });
  }
  
  crearFormulario() {
    this.form = this.fb.group({
      position: '',
      company: '',
      journal_type: '',
      date_start: '',
      date_end: '',
      location_job: '',
      url_logo_job: ''
    })
  }

  */

