import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Soft } from '../../Hab';
import { SOFT } from '../../mock-Job';
import { faEdit, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { UiService } from 'src/app/servicios/ui.service';
import { Subscription } from 'rxjs';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-habilidades1-item',
  templateUrl: './habilidades1-item.component.html',
  styleUrls: ['./habilidades1-item.component.css']
})
export class Habilidades1ItemComponent implements OnInit {

  @Output() onDeleteSoft: EventEmitter<Soft> = new EventEmitter();
  @Output() onEditSoft: EventEmitter<Soft> = new EventEmitter();
  @Output() onEditarSoft: EventEmitter<Soft> = new EventEmitter();
  @Input() soft: Soft = SOFT[0]


  faEdit = faEdit;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;

  form:FormGroup;

  edit:boolean = false;
  subscription?: Subscription;

  loginStatus:boolean = false;

  title:string = "";
  score:number = 0;

  constructor(
    private datosPortfolio:PortfolioService,
    private formBuilder:FormBuilder,
    private uiService: UiService
    ) {
      this.subscription = this.uiService.onSwitchE()
      .subscribe(value=>this.edit = value),
      this.form=this.formBuilder.group(
        {
          title:['',[Validators.required,Validators.minLength(3)]],
          score:['',[Validators.required, Validators.minLength(1)]],
        });
  }
  
  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.loginStatus=data.person.loginStatus;
    });
  }

  get Title(){
    return this.form.get('title');
  }

  get Score(){
    return this.form.get('score');
  }

  onDeleteS(soft:Soft){
    this.onDeleteSoft.emit(soft);
  }

  onEditS(soft:Soft){
    this.title=this.soft.title
    this.score=this.soft.score
    this.onEditSoft.emit(soft);
  }

  onGuardarSoft(soft:Soft){
    if(this.title.length === 0 || this.score == 0){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Debe completar todos los campos para guardar!',
        showConfirmButton: false,
        timer: 1400
      });
      return
    }
    const so = {
      personId: this.soft.personId,
      title: this.title,
      score: this.score,
      edit: this.soft.edit,
      id_soft: this.soft.id_soft,
      }
    this.onEditarSoft.emit(so);
    location.reload();
    return
  }

}
