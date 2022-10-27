import { Component, OnInit, Input, Output } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Pers } from "../../Per";
import { PERS } from "../../mock-Job";
import { UiService } from 'src/app/servicios/ui.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  
  @Input() pers: Pers = PERS[0]

  miPortfolio:any=0;
  
  faEdit = faEdit;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;

  showAgregarPe:boolean = false;
  showEditPe:boolean = false;

  id: number = 0;
  personId:number = 0;
  about1:string = "";
  about2:string = "";
  name: string = "";
  last_name: string = "";
  back_image:string = "";
  url_image:string = "";
  position:string = "";
  title:string = "";
  location:string = "";
  address:string = "";
  phone:string = "";
  email:string = "";
  birth_date:string = "";
  nationality:string = "";
  loginStatus:boolean = false;

  subscription?: Subscription;

  acercaPer: Pers [] = [];

  recargarComponente: any;

  constructor(
    private datosPortfolio:PortfolioService,
    private portfolioService: PortfolioService,
    private uiService: UiService) {
      this.subscription = this.uiService.onSwitchAc()
        .subscribe(value=>this.showAgregarPe = value)
      }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      console.log(data);
      this.miPortfolio=data;
      this.loginStatus=data.person.loginStatus;
    });
  }

  onAddPe(p:Pers){
    const addAcerca = {
      id: this.miPortfolio.person.id,
      about1: this.miPortfolio.person.about1,
      about2: this.miPortfolio.person.about2,
      address: this.miPortfolio.person.address,
      back_image: this.back_image,
      last_name: this.last_name,
      name: this.name,
      location: this.location,
      nationality: this.miPortfolio.person.nationality,
      phone: this.miPortfolio.person.phone,
      position: this.position,
      title: this.title,
      url_image: this.url_image,
      email: this.miPortfolio.person.email,
      birth_date: this.miPortfolio.person.birth_date, 
      edit: this.miPortfolio.person.edit, 
      
    }
    this.portfolioService.editarPerson(addAcerca).subscribe();
    this.switchFormularioPe();
    console.log(addAcerca)
    return  
  }

  switchFormularioPe(){
    if(this.miPortfolio.person.name===""){
    this.uiService.switchFormularioPe()
    }
    if(this.miPortfolio.person.name!==""){Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'El portfolio ya cuenta con información personal, si quiere modificarla puede editar con el boton lápiz',
      })
    }
  }

  onSwitchFormularioPe(){
    this.showEditPe = !this.showEditPe;
    this.name = this.miPortfolio.person.name;
    this.last_name = this.miPortfolio.person.last_name;
    this.back_image = this.miPortfolio.person.back_image;
    this.url_image = this.miPortfolio.person.url_image;
    this.position = this.miPortfolio.person.position;
    this.title = this.miPortfolio.person.title;
    this.location = this.miPortfolio.person.location;
  }

  editPe(pers:Pers){
    const addAcerca = {
      id: this.miPortfolio.person.id,
      about1: this.miPortfolio.person.about1,
      about2: this.miPortfolio.person.about2,
      address: this.miPortfolio.person.address,
      back_image: this.back_image,
      last_name: this.last_name,
      name: this.name,
      location: this.location,
      nationality: this.miPortfolio.person.nationality,
      phone: this.miPortfolio.person.phone,
      position: this.position,
      title: this.title,
      url_image: this.url_image,
      email: this.miPortfolio.person.email,
      birth_date: this.miPortfolio.person.birth_date, 
      edit: this.miPortfolio.person.edit, 
      
    }
    this.portfolioService.editarPerson(addAcerca).subscribe();
    this.onSwitchFormularioPe();
    this.actualizarComponente();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No encontre la forma de recargar el componente, presione F5 para actualizar!',
    })
  }

  onDeletePe(p:Pers){
    const acerca = {
      id: this.miPortfolio.person.id,
      about1: this.miPortfolio.person.about1,
      about2: this.miPortfolio.person.about2,
      address: this.miPortfolio.person.address,
      back_image: "",
      last_name: "",
      name: "",
      location: "",
      nationality: this.miPortfolio.person.nationality,
      phone: this.miPortfolio.person.phone,
      position: "",
      title: "",
      url_image: "",
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

  actualizarComponente(){
    this.recargarComponente=this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.acercaPer=data.person;
    })
  }
}
