import { Component, OnInit, Input, Output } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Pers } from "../../Per";
import { PERS } from "../../mock-Job";
import { UiService } from 'src/app/servicios/ui.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  
  @Input() pers: Pers = PERS[0]

  miPortfolio:any=0;

  form:FormGroup;
  
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
  password:string = "";
  birth_date:string = "";
  nationality:string = "";
  loginStatus:boolean = false;

  subscription?: Subscription;

  acercaPer: Pers [] = [];

  recargarComponente: any;

  constructor(
    private datosPortfolio:PortfolioService,
    private portfolioService: PortfolioService,
    private formBuilder:FormBuilder,
    private uiService: UiService) {
      this.subscription = this.uiService.onSwitchPe()
        .subscribe(value=>this.showAgregarPe = value),
      this.form=this.formBuilder.group(
        {
          name:['',[Validators.required,Validators.minLength(3)]],
          last_name:['',[Validators.required, Validators.minLength(3)]],
          position:['',[Validators.required, Validators.minLength(3)]],
          title:['',[Validators.required, Validators.minLength(3)]],
          location:['',[Validators.required, Validators.minLength(3)]],
          url_image:['',[Validators.required, Validators.minLength(3)]],
          back_image:['',[Validators.required, Validators.minLength(3)]],
      });
    }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      console.log(data);
      this.miPortfolio=data;
      this.loginStatus=data.person.loginStatus;
    });
  }

  get Name(){
    return this.form.get('name');
  }

  get Last_name(){
    return this.form.get('last_name');
  }

  get Position(){
    return this.form.get('position');
  }
  
  get Title(){
    return this.form.get('title');
  }

  get Location(){
    return this.form.get('location');
  }

  get Url_image(){
    return this.form.get('url_image');
  }

  get Back_image(){
    return this.form.get('back_image');
  }
  
  onAddPe(p:Pers){

    if(this.name.length === 0 ||
      this.last_name.length === 0 ||
      this.back_image.length === 0 ||
      this.url_image.length === 0 || 
      this.position.length === 0 || 
      this.title.length === 0 || 
      this.location.length === 0 ){
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Debe completar todos los campos para guardar!',
          showConfirmButton: false,
          timer: 1200
        });
      return
    }
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
      password: this.miPortfolio.person.password,
      loginStatus: this.loginStatus,
      birth_date: this.miPortfolio.person.birth_date, 
      edit: this.miPortfolio.person.edit, 
    }
    this.portfolioService.editarPerson(addAcerca).subscribe();
    this.switchFormularioPe();
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Presione F5 para actualizar los cambios!',
      showConfirmButton: false,
      timer: 1000
    });
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
    this.password = this.miPortfolio.person.password,
    this.loginStatus = this.loginStatus
  }

  editPe(pers:Pers){

    if(this.name.length === 0 ||
      this.last_name.length === 0 ||
      this.back_image.length === 0 ||
      this.url_image.length === 0 || 
      this.position.length === 0 || 
      this.title.length === 0 || 
      this.location.length === 0 ){
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Debe completar todos los campos para guardar!',
          showConfirmButton: false,
          timer: 1200
        });
      return
    }
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
      password: this.miPortfolio.person.password,
      loginStatus: this.loginStatus,
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
      password: this.miPortfolio.person.password,
      loginStatus: this.loginStatus,
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
