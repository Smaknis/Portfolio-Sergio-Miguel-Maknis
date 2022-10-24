import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Hard } from '../../Hab';
import { Soft } from '../../Hab';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  hardList: Hard[] = [];
  softList: Soft[] = [];

  faPlus = faPlus;

  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.hardList=data.hardSkills;
      this.softList=data.softSkills;
    });

  
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

  switchFormularioHard(){};

  deleteSoft(soft:Soft){    
    this.datosPortfolio.onDeleteSoft(soft)
    .subscribe(()=>(
      this.softList = this.softList.filter( (s) =>{
        return s.id_soft !== soft.id_soft}) 
    ))
  };

  editSoft(soft:Soft){};

  editarSoft(soft:Soft){};

  switchFormularioSoft(){};

}
