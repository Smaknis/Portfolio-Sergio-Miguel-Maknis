import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hard } from '../../Hab';
import { HARD } from '../../mock-Job';
import { faEdit, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { UiService } from 'src/app/servicios/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-habilidades-item',
  templateUrl: './habilidades-item.component.html',
  styleUrls: ['./habilidades-item.component.css']
})
export class HabilidadesItemComponent implements OnInit {

  @Output() onDeleteHard: EventEmitter<Hard> = new EventEmitter();
  @Output() onEditHard: EventEmitter<Hard> = new EventEmitter();
  @Input() hard: Hard = HARD[0]


  faEdit = faEdit;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;

  edit:boolean = false;
  subscription?: Subscription;

  title:string = "";
  score:number = 0;

  //sc: number = this.hard.score;

  constructor(private uiService: UiService
    ) {
      this.subscription = this.uiService.onSwitchE()
      .subscribe(value=>this.edit = value)
  }
  
  ngOnInit(): void {
  }

  onDeleteH(hard:Hard){
    this.onDeleteHard.emit(hard);
  }

  onEditH(hard:Hard){
    this.title=this.hard.title
    this.score=this.hard.score
    this.onEditHard.emit(hard);
  }

}
