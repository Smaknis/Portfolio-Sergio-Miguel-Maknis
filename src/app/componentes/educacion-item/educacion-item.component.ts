import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faEdit, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { UiService } from 'src/app/servicios/ui.service';
import { Subscription } from 'rxjs';
import { Edu } from '../../Edu' 
import { EDU } from '../../mock-Job'

@Component({
  selector: 'app-educacion-item',
  templateUrl: './educacion-item.component.html',
  styleUrls: ['./educacion-item.component.css'],
})
export class EducacionItemComponent implements OnInit {
  @Input() edu: Edu = EDU[0]
  @Output() onDeleteEdu: EventEmitter<Edu> = new EventEmitter();
  @Output() onEditEdu: EventEmitter<Edu> = new EventEmitter();
  @Output() onEditarEdu: EventEmitter<Edu> = new EventEmitter();
  @Output() cerrar = new EventEmitter();

  faEdit = faEdit;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;

  edit:boolean = false;
  subscription?: Subscription;

  id: number = 0;
  id_education: number = 0;
  personId:number = 0;
  institute:string = "";
  title:string = "";
  year_start:string = "";
  year_end:string = "";
  url_logo_education:string = "";
  score: string = "";

  constructor(private uiService: UiService
    ) {
      this.subscription = this.uiService.onSwitchE()
      .subscribe(value=>this.edit = value)
  }
  

  ngOnInit(): void {
  }

  onDelete(edu: Edu){
    this.onDeleteEdu.emit(edu);
  }

  onEdit(edu:Edu){
    this.institute=this.edu.institute
    this.title=this.edu.title
    this.year_start=this.edu.year_start
    this.year_end=this.edu.year_end
    this.url_logo_education=this.edu.url_logo_education
    this.onEditEdu.emit(edu);
  }

  onGuardarEdu(e:Edu){
    
    const edu = {
      personId: this.edu.personId,
      institute: this.institute,
      title: this.title,
      year_start: this.year_start,
      year_end: this.year_end,
      url_logo_education: this.url_logo_education,
      edit: this.edu.edit,
      id_education: this.edu.id_education,
      score: this.score,

    }
    this.onEditarEdu.emit(edu);
    return
  }

  onCancelarEdu(edu: Edu){
    this.cerrar.emit();
  }

}
