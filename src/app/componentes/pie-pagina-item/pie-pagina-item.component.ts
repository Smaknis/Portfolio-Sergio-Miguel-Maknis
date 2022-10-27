import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UiService } from 'src/app/servicios/ui.service';
import { Subscription } from 'rxjs';
import { Proy } from '../../Proy';
import { PROY } from '../../mock-Job';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

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

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  id_proyect: number = 0;
  personId:number = 0;
  name:string = "";
  description:string = "";

  constructor(
    private datosPortfolio: PortfolioService,
    private uiService: UiService) {
      this.subscription = this.uiService.onSwitchPr()
      .subscribe(value=>this.edit = value)
  }

  ngOnInit(): void {
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
