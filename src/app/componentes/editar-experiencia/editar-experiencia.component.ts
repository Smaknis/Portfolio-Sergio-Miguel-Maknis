import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-editar-experiencia',
  templateUrl: './editar-experiencia.component.html',
  styleUrls: ['./editar-experiencia.component.css']
})
export class EditarExperienciaComponent implements OnInit {

  @Input() set experiencia (valor: any) {
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
  }*/

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

  onGuardar(){
    this.datosPortfolio.editarJob(this.experienciaOriginal.$id_job);
    this.onCancelar();
  }

  onCancelar(){
    this.experienciaOriginal = null;
    this.cerrar.emit();
  }

}
