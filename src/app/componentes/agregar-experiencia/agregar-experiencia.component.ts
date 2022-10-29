import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Job } from '../../Job'  
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { UiService } from 'src/app/servicios/ui.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-experiencia',
  templateUrl: './agregar-experiencia.component.html',
  styleUrls: ['./agregar-experiencia.component.css']
})
export class AgregarExperienciaComponent implements OnInit {
  @Output() onAgregarExperiencia: EventEmitter<Job> = new EventEmitter(); //aca puso <Task> y no <any>
  
  form:FormGroup;

  personId:number = 0;
  position:string = "";
  company:string = "";
  journal_type:string = "";
  date_start:string = "";
  date_end:string = "";
  location_job:string = "";
  url_logo_job:string = "";
  edit:boolean = false;
  showAgregarExp: boolean = false;
  subscription?: Subscription;

  //miPortfolio:any=0;
  constructor(
    private datosPortfolio:PortfolioService,
    private formBuilder:FormBuilder,
    private uiService: UiService
    ) {
      this.subscription = this.uiService.onSwitch()
      .subscribe(value=>this.showAgregarExp = value),
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

  id: number = 0;

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.id=data.person.id;  
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
  
  onSubmit(){
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
    this.switchFormulario();
    //const {person_id,position,company,journal_type,date_start,date_end,location_job,url_logo_job} = this
    //const newJob = {person_id,position,company,journal_type,date_start,date_end,location_job,url_logo_job}
    const newJob = {
      personId: this.id,
      position: this.position,
      company: this.company,
      journal_type: this.journal_type,
      date_start: this.date_start,
      date_end: this.date_end,
      location_job: this.location_job,
      url_logo_job: this.url_logo_job,
      edit: this.edit
    }
    this.onAgregarExperiencia.emit(newJob);
    

    return
    
    
  }

  switchFormulario(){
    this.uiService.switchExperiencia();
  }

}
