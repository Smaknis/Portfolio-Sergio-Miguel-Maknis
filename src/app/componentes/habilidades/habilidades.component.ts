import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { UiService } from 'src/app/servicios/ui.service';
import { Hard } from '../../Hab';
import { Soft } from '../../Hab';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  hardList: Hard[] = [];
  softList: Soft[] = [];

  faPlus = faPlus;

  form:FormGroup;

  showAgregarHard: boolean = false;
  showAgregarSoft: boolean = false;
  subscription?: Subscription;
  subscription1?: Subscription;

  id: number = 0;
  personId:number = 0;
  title:string = "";
  score:number = 0;
  edit:boolean = false;

  loginStatus:boolean = false;

  recargarComponente: any;

  constructor(
    private datosPortfolio:PortfolioService,
    private portfolioService:PortfolioService,
    private formBuilder:FormBuilder,
    private uiService: UiService) {
    this.subscription = this.uiService.onSwitchHard()
      .subscribe(value=>this.showAgregarHard = value),
    this.subscription1 = this.uiService.onSwitchSoft()
      .subscribe(value1=>this.showAgregarSoft = value1),
    this.form=this.formBuilder.group(
      {
        title:['',[Validators.required,Validators.minLength(3)]],
        score:['',[Validators.required, Validators.minLength(1)]],
        }); 
   }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.hardList=data.hardSkills;
      this.softList=data.softSkills;
      this.id=data.person.id;
      this.loginStatus=data.person.loginStatus;
    });  
  }

  get Title(){
    return this.form.get('title');
  }

  get Score(){
    return this.form.get('score');
  }

  switchFormularioHard(){
    this.uiService.switchHard();
  }

  switchFormularioSoft(){
    this.uiService.switchSoft();
  }

  onAddHard(){
    if(this.title.length === 0 || this.score == 0){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Debe completar todos los campos para guardar!',
        showConfirmButton: false,
        timer: 1400
      });
      return
    }
    const newHard = {
      personId: this.id,
      title: this.title,
      score: this.score,
      edit: this.edit,
    }
    this.agregarHard(newHard);
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Presione F5 para actualizar los cambios!',
      showConfirmButton: false,
      timer: 1000
    });
    return
  }

  agregarHard(hard:Hard){
    this.datosPortfolio.agregarHard(hard).subscribe((hard)=>(
    this.hardList.push(hard)
    ));
  }

  deleteHard(hard:Hard){
    this.datosPortfolio.onDeleteHard(hard)
    .subscribe(()=>(
      this.hardList = this.hardList.filter( (h) =>{
        return h.id_hard !== hard.id_hard}) 
    ))
  }

  editHard(hard:Hard){
    hard.edit = !hard.edit;
    this.portfolioService.editHard(hard).subscribe();
    this.uiService.switchExperienciaHard(hard);
  }

  editarHard(hard:Hard){
    this.portfolioService.editHard(hard).subscribe();
    this.editHard(hard);
    this.actualizarComponenteH();
    location.reload();
  }

    deleteSoft(soft:Soft){    
    this.datosPortfolio.onDeleteSoft(soft)
    .subscribe(()=>(
      this.softList = this.softList.filter( (s) =>{
        return s.id_soft !== soft.id_soft}) 
    ))
  }

  editSoft(soft:Soft){   
    soft.edit = !soft.edit;
    this.portfolioService.editSoft(soft).subscribe();
    this.uiService.switchExperienciaSoft(soft);
  }

  editarSoft(soft:Soft){    
    this.portfolioService.editSoft(soft).subscribe();
    this.editSoft(soft);
    this.actualizarComponenteS();
    console.log(soft)
  }

  onAddSoft(){
    if(this.title.length === 0 || this.score == 0){
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Debe completar todos los campos para guardar!',
      showConfirmButton: false,
      timer: 1400
    });
    return
    }

    const newSoft = {
      personId: this.id,
      title: this.title,
      score: this.score,
      edit: this.edit,
    }
    
    this.agregarSoft(newSoft);
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Presione F5 para actualizar los cambios!',
      showConfirmButton: false,
      timer: 1000
    });
    return
  }

  agregarSoft(soft:Soft){
    this.datosPortfolio.agregarSoft(soft).subscribe((soft)=>(
    this.softList.push(soft)
    ));
  }

  actualizarComponenteH(){
    this.recargarComponente=this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.hardList=data.hardSkills;
    })
  }

  actualizarComponenteS(){
    this.recargarComponente=this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.softList=data.softSkills;
    })
  }
}
