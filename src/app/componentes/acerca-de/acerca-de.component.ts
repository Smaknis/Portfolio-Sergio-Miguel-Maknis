import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { UiService } from 'src/app/servicios/ui.service';
import { Subscription } from 'rxjs';
import { Pers } from "../../Per";
import { PERS } from "../../mock-Job";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {

  @Output() onEditarPerson: EventEmitter<Pers> = new EventEmitter();
  @Output() onSwitchEdit: EventEmitter<any> = new EventEmitter();
  @Input() pers: Pers = PERS[0]
  miPortfolio:any=0;
  
  faEdit = faEdit;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;

  showAgregarAc: boolean = false;
  showEditAc: boolean = false;
  id: number = 0;
  personId:number = 0;
  about1:string = "";
  about2:string = "";
  name: string = "";
  last_name: string = "";
  back_image:string = "";;
  url_image:string = "";;
  position:string = "";;
  title:string = "";;
  location:string = "";;
  address:string = "";
  phone:string = "";;
  email:string = "";;
  birth_date:string = "";;
  nationality:string = "";
 
  subscription?: Subscription;

  acercaList: Pers [] = [];

  recargarComponente: any;

  constructor(
    private datosPortfolio:PortfolioService,
    private portfolioService: PortfolioService,
    private uiService: UiService) {
      this.subscription = this.uiService.onSwitchAc()
        .subscribe(value=>this.showAgregarAc = value)
  }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.miPortfolio=data;
    });
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.acercaList=data.person;
    });

  }

  switchFormularioAc(){
    if(this.miPortfolio.person.about1===""){
    this.uiService.switchFormularioAc()
    }
    if(this.miPortfolio.person.about1!==""){Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El portfolio ya cuenta con información "Acerca de ", si quiere modificarla puede editar con el boton lápiz',
      })
    }
  }

  onSwitchFormularioAcer(){
    this.showEditAc = !this.showEditAc;
    this.about1=this.miPortfolio.person.about1;
    this.about2=this.miPortfolio.person.about2;
  }

  editAc(pers:Pers){
    const addAcerca = {
      id: this.miPortfolio.person.id,
      about1: this.about1,
      about2: this.about2,
      address: this.miPortfolio.person.address,
      back_image: this.miPortfolio.person.back_image,
      last_name: this.miPortfolio.person.last_name,
      name: this.miPortfolio.person.name,
      location: this.miPortfolio.person.location,
      nationality: this.miPortfolio.person.nationality,
      phone: this.miPortfolio.person.phone,
      position: this.miPortfolio.person.position,
      title: this.miPortfolio.person.title,
      url_image: this.miPortfolio.person.url_image,
      email: this.miPortfolio.person.email,
      birth_date: this.miPortfolio.person.birth_date, 
      edit: this.miPortfolio.person.edit, 
      
    }
    this.portfolioService.editarPerson(addAcerca).subscribe();
    this.onSwitchFormularioAcer();
    this.actualizarComponente();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No esta funcionando el refresh, presione F5 para actualizar!',
    })
  }

  onDeleteAc(p:Pers){
    const acerca = {
      id: this.miPortfolio.person.id,
      about1: "",
      about2: "",
      address: this.miPortfolio.person.address,
      back_image: this.miPortfolio.person.back_image,
      last_name: this.miPortfolio.person.last_name,
      name: this.miPortfolio.person.name,
      location: this.miPortfolio.person.location,
      nationality: this.miPortfolio.person.nationality,
      phone: this.miPortfolio.person.phone,
      position: this.miPortfolio.person.position,
      title: this.miPortfolio.person.title,
      url_image: this.miPortfolio.person.url_image,
      email: this.miPortfolio.person.email,
      birth_date: this.miPortfolio.person.birth_date, 
      edit: this.miPortfolio.person.edit, 
      
    }
    this.portfolioService.editarPerson(acerca).subscribe();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ocurrio un error, presione F5 para actualizar los cambios!',
    })
    return
  }

  
  onAddAc(p:Pers){
    const addAcerca = {
      id: this.miPortfolio.person.id,
      about1: this.about1,
      about2: this.about2,
      address: this.miPortfolio.person.address,
      back_image: this.miPortfolio.person.back_image,
      last_name: this.miPortfolio.person.last_name,
      name: this.miPortfolio.person.name,
      location: this.miPortfolio.person.location,
      nationality: this.miPortfolio.person.nationality,
      phone: this.miPortfolio.person.phone,
      position: this.miPortfolio.person.position,
      title: this.miPortfolio.person.title,
      url_image: this.miPortfolio.person.url_image,
      email: this.miPortfolio.person.email,
      birth_date: this.miPortfolio.person.birth_date, 
      edit: this.miPortfolio.person.edit, 
      
    }
    this.portfolioService.editarPerson(addAcerca).subscribe();
    this.switchFormularioAc();
    console.log(addAcerca)
    return  
  }

  actualizarComponente(){
    this.recargarComponente=this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.acercaList=data.person;
    })
  }

}
