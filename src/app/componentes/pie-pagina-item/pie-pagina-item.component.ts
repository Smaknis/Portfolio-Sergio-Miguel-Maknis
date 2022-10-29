import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UiService } from 'src/app/servicios/ui.service';
import { Subscription } from 'rxjs';
import { Proy } from '../../Proy';
import { PROY } from '../../mock-Job';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pie-pagina-item',
  templateUrl: './pie-pagina-item.component.html',
  styleUrls: ['./pie-pagina-item.component.css']
})
export class PiePaginaItemComponent implements OnInit {

  @Input() proy: Proy = PROY[0]
  @Output() onDeletePr: EventEmitter<Proy> = new EventEmitter();
  @Output() onSwitchEditPr: EventEmitter<Proy> = new EventEmitter();
  @Output() onGuardarEditarPr: EventEmitter<Proy> = new EventEmitter();

  edit:boolean = false;
  subscription?: Subscription;

  form:FormGroup;

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  id_proyect: number = 0;
  personId:number = 0;
  name:string = "";
  description:string = "";

  loginStatus:boolean = false;

  constructor(
    private datosPortfolio: PortfolioService,
    private formBuilder:FormBuilder,
    private uiService: UiService) {
      this.subscription = this.uiService.onSwitchPr()
      .subscribe(value=>this.edit = value),
      this.form=this.formBuilder.group(
        {
          name:['',[Validators.required,Validators.minLength(3)]],
          description:['',[Validators.required,Validators.minLength(3)]]
        });
  }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.loginStatus=data.person.loginStatus;
    });
  }

  get Name(){
    return this.form.get('name');
  }

  get Description(){
    return this.form.get('description');
  }

  onDelete(proy:Proy){
    this.onDeletePr.emit(proy);
  }

  onSwitchEdit(proy:Proy) {
    this.name=this.proy.name;
    this.description=this.proy.description;
    this.onSwitchEditPr.emit(proy);
  }

  onGuardarEditPr(proy:Proy){

    if(this.name.length === 0 ){
      Swal.fire('Por favor agregue nombre del Proyecto')
      return
    }
    if(this.description.length === 0){
      Swal.fire('Por favor agregue descripción del Proyecto')
      return
    }
    
    const p = {
      personId: this.proy.personId,
      name: this.name,
      description: this.description,
      edit: this.proy.edit,
      id_proyect: this.proy.id_proyect,
    }
    this.onGuardarEditarPr.emit(p);
    location.reload()

    return
  }

  onCancelarPr(proy:Proy){
    this.onSwitchEditPr.emit(proy);
  }

}
