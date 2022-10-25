import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { UiService } from 'src/app/servicios/ui.service';
import { Hard } from '../../Hab';
import { Soft } from '../../Hab';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  hardList: Hard[] = [];
  softList: Soft[] = [];

  faPlus = faPlus;

  showAgregarHard: boolean = false;
  showAgregarSoft: boolean = false;
  subscription?: Subscription;
  subscription1?: Subscription;

  id: number = 0;
  personId:number = 0;
  title:string = "";
  score:number = 0;
  edit:boolean = false;

  recargarComponente: any;

  constructor(
    private datosPortfolio:PortfolioService,
    private uiService: UiService) {
    this.subscription = this.uiService.onSwitchHard()
      .subscribe(value=>this.showAgregarHard = value),
    this.subscription1 = this.uiService.onSwitchSoft()
      .subscribe(value1=>this.showAgregarSoft = value1)  
   }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.hardList=data.hardSkills;
      this.softList=data.softSkills;
    });
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.id=data.person.id;
    });  
  }

  switchFormularioHard(){
    this.uiService.switchHard();
  };

  switchFormularioSoft(){
    this.uiService.switchSoft();
  };

  onAddHard(){
    if(this.title.length === 0){
      alert("Por favor agregue un título")
      return
    }
    if(this.score === 0){
      alert("Por favor agregue nivel alcanzado")
      return
    }

    const newHard = {
      personId: this.id,
      title: this.title,
      score: this.score,
      edit: this.edit,
    }
    
    this.agregarHard(newHard);
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
  };

  editHard(hard:Hard){};

  editarHard(hard:Hard){};

    deleteSoft(soft:Soft){    
    this.datosPortfolio.onDeleteSoft(soft)
    .subscribe(()=>(
      this.softList = this.softList.filter( (s) =>{
        return s.id_soft !== soft.id_soft}) 
    ))
  };

  editSoft(soft:Soft){};

  editarSoft(soft:Soft){};

  onAddSoft(){
    if(this.title.length === 0){
      alert("Por favor agregue un título")
      return
    }
    if(this.score === 0){
      alert("Por favor agregue nivel alcanzado")
      return
    }

    const newSoft = {
      personId: this.id,
      title: this.title,
      score: this.score,
      edit: this.edit,
    }
    
    this.agregarSoft(newSoft);
    return
  }

  agregarSoft(soft:Soft){
    this.datosPortfolio.agregarSoft(soft).subscribe((soft)=>(
    this.softList.push(soft)
    ));
  }


}
