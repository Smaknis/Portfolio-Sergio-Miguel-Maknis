import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { Hard } from '../../Hab';
import { Soft } from '../../Hab';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  hardList: Hard[] = [];
  softList: Soft[] = [];

  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.hardList=data.hardSkills;
      this.softList=data.softSkills;
    });

  
  }

  deleteHard(hard:Hard){};

  editHard(hard:Hard){};

  editarHard(hard:Hard){};

}
