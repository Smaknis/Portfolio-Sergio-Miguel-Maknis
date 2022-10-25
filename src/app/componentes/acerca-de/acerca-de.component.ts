import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { UiService } from 'src/app/servicios/ui.service';
import { Subscription } from 'rxjs';
import { Pers } from "../../Per";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  
  miPortfolio:any=0;
  
  faEdit = faEdit;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;

  showAgregarAc: boolean = false;
  id: number = 0;
  personId:number = 0;
  about1:string = "";
  about2:string = "";
  subscription?: Subscription;

  constructor(
    private datosPortfolio:PortfolioService,
    private uiService: UiService) {
      this.subscription = this.uiService.onSwitchAc()
        .subscribe(value=>this.showAgregarAc = value)
  }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.miPortfolio=data;
    });

  }

  switchFormularioAc(){
    if(this.miPortfolio.person.about1===""){
    this.uiService.switchFormularioAc()
    }
    if(this.miPortfolio.person.about1!==""){Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El portfolio ya cuenta con información "Acerca de ", si quiere modificarla puede aditar con el boton lápiz',
        
      })
    }
  
  }

  onEdit(){
    console.log("Editar")
  }

  onDelete(){
    console.log("eliminar")
  }

  onAddAc(){}

}
