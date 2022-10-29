import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { UiService } from 'src/app/servicios/ui.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form:FormGroup;

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
  loginStatus:boolean = false;
 
  subscription?: Subscription;

  acercaList: Pers [] = [];

  recargarComponente: any;

  constructor(
    private datosPortfolio:PortfolioService,
    private portfolioService: PortfolioService,
    private formBuilder:FormBuilder,
    private uiService: UiService) {
      this.subscription = this.uiService.onSwitchAc()
        .subscribe(value=>this.showAgregarAc = value),
      this.form=this.formBuilder.group(
        {
          about1:['',[Validators.required,Validators.minLength(3)]],
          about2:['',[Validators.required, Validators.minLength(3)]],
        });
  }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.miPortfolio=data;
      this.acercaList=data.person;
      this.loginStatus=data.person.loginStatus;
    });

  }

  get About1(){
    return this.form.get('about1');
  }

  get About2(){
    return this.form.get('about2');
  }

  switchFormularioAc(){
    if(this.miPortfolio.person.about1===""){
    this.uiService.switchFormularioAc()
    }
    if(this.miPortfolio.person.about1!==""){Swal.fire({
        icon: 'warning',
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

    if(this.about1.length === 0 ||
      this.about2.length === 0
      ){
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
      password: this.miPortfolio.person.password,
      loginStatus: this.loginStatus,
      birth_date: this.miPortfolio.person.birth_date, 
      edit: this.miPortfolio.person.edit, 
      
    }
    this.portfolioService.editarPerson(addAcerca).subscribe();
    this.onSwitchFormularioAcer();
    this.actualizarComponente();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No se pudo recargar. Presione F5 para actualizar! (es poco elegante pero funciona)',
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

  
  onAddAc(p:Pers){

    if(this.about1.length === 0 ||
      this.about2.length === 0
      ){
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
      password: this.miPortfolio.person.password,
      loginStatus: this.loginStatus,
      birth_date: this.miPortfolio.person.birth_date, 
      edit: this.miPortfolio.person.edit, 
      
    }
    this.portfolioService.editarPerson(addAcerca).subscribe();
    this.switchFormularioAc();
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Presione F5 para actualizar los cambios!',
      showConfirmButton: false,
      timer: 1000
    })
    return  
  }

  actualizarComponente(){
    this.recargarComponente=this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.acercaList=data.person;
    })
  }

}
