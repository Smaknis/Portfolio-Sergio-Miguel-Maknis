import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-boton',
  templateUrl: './boton.component.html',
  styleUrls: ['./boton.component.css']
})
export class BotonComponent implements OnInit {
  @Output() botonClick = new EventEmitter();

  constructor() { }

  faPlus = faPlus;
  
  ngOnInit(): void {
  }

  onClick(){
    this.botonClick.emit();
  }

}
