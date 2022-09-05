import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faEdit, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Job } from '../../Job' 
import { JOBS } from '../../mock-Job'

@Component({
  selector: 'app-experiencia-item',
  templateUrl: './experiencia-item.component.html',
  styleUrls: ['./experiencia-item.component.css']
})
export class ExperienciaItemComponent implements OnInit {
  @Input() job: Job = JOBS[0];
  @Output() onDeleteJob: EventEmitter<Job> = new EventEmitter()
  @Output() onEditJob: EventEmitter<Job> = new EventEmitter()

  faEdit = faEdit;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;
 
  constructor() { }

  ngOnInit(): void {
  }

  onDelete(job: Job){
    this.onDeleteJob.emit(job);
  }

  onEdit(job: Job){
    this.onEditJob.emit(job);
  }
}
