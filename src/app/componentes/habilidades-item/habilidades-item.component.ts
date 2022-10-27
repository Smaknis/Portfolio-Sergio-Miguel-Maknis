import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hard } from '../../Hab';
import { HARD } from '../../mock-Job';
import { faEdit, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { UiService } from 'src/app/servicios/ui.service';
import { Subscription } from 'rxjs';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-habilidades-item',
  templateUrl: './habilidades-item.component.html',
  styleUrls: ['./habilidades-item.component.css']
})
export class HabilidadesItemComponent implements OnInit {

  @Output() onDeleteHard: EventEmitter<Hard> = new EventEmitter();
  @Output() onEditHard: EventEmitter<Hard> = new EventEmitter();
  @Output() onEditarHard: EventEmitter<Hard> = new EventEmitter();
  @Input() hard: Hard = HARD[0]


  faEdit = faEdit;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;

  edit:boolean = false;
  subscription?: Subscription;

  loginStatus:boolean = false;

  title:string = "";
  score:number = 0;

  //sc: number = this.hard.score;

  constructor(
    private datosPortfolio:PortfolioService,
    private uiService: UiService
    ) {
      this.subscription = this.uiService.onSwitchE()
      .subscribe(value=>this.edit = value)
  }
  
  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.loginStatus=data.person.loginStatus;
    });
  }

  onDeleteH(hard:Hard){
    this.onDeleteHard.emit(hard);
  }

  onEditH(hard:Hard){
    this.title=this.hard.title
    this.score=this.hard.score
    this.onEditHard.emit(hard);
  }

  onGuardarHard(hard:Hard){
    const ha = {
      personId: this.hard.personId,
      title: this.title,
      score: this.score,
      edit: this.hard.edit,
      id_hard: this.hard.id_hard,
      }
    this.onEditarHard.emit(ha);
    return
  }
}
