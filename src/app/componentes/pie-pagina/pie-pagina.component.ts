import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { UiService } from 'src/app/servicios/ui.service';
import { Subscription } from 'rxjs';
import { Proy } from '../../Proy';
import { PROY } from '../../mock-Job';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pie-pagina',
  templateUrl: './pie-pagina.component.html',
  styleUrls: ['./pie-pagina.component.css']
})
export class PiePaginaComponent implements OnInit {

  @Input() proy: Proy = PROY[0]
  @Output() updateEditPr: EventEmitter<Proy> = new EventEmitter();

  proyectList:any=0;
  
  faEdit = faEdit;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;

  subscription?: Subscription;
  edit: boolean = false;

  showAgregarPr:boolean = false;
  showEditPr:boolean = false;

  loginStatus:boolean = false;

  id: number = 0;
  personId:number = 0;
  name:string = "";
  description:string = "";
 
  constructor(
    private datosPortfolio:PortfolioService,
    private portfolioService: PortfolioService,
    private uiService: UiService) {
      this.subscription = this.uiService.onSwitchPr()
        .subscribe(value=>this.showAgregarPr = value)
  }
    

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.proyectList=data.proyect;
      this.id=data.person.id;
      this.loginStatus=data.person.loginStatus;
    });
  }

  switchFormularioPr(proy:Proy){
    this.uiService.switchFormularioProy(proy)
  }

  onAddPr(proy:Proy){
    if(this.name.length === 0){
      Swal.fire('Por favor agregue nombre del Proyecto')
      return
    }
    if(this.description.length === 0){
      Swal.fire('Por favor agregue descripción del Proyecto')
      return
    }
      const newProy = {
      personId: this.id,
      name: this.name,
      description: this.description,
      edit: this.edit,
    }
    this.agregarPr(newProy);
    location.reload()
    return
  }

  agregarPr(proy:Proy){
    this.datosPortfolio.agregarPr(proy).subscribe((proy)=>(
    this.proyectList.push(proy)
    ));
  }

  deletePr(proy:Proy){
    this.datosPortfolio.onDeletePr(proy)
    .subscribe(()=>(
      this.proyectList = this.proyectList.filter( (p:any) =>{
        return p.id_proyect !== proy.id_proyect}) 
    ));
  }

  guardarEditarPr(proy:Proy){
    proy.edit = !proy.edit;
    this.portfolioService.updateEditPr(proy).subscribe();
    
  }

  switchEditPr(proy:Proy){
    proy.edit = !proy.edit;
    this.portfolioService.updateEditPr(proy).subscribe();
    this.uiService.switchFormularioPr(proy);
  }


}
