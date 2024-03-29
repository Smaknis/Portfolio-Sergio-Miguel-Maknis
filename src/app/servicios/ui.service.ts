import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Job } from '../Job'; 
import { Edu } from '../Edu';
import { Hard } from '../Hard';
import { Soft } from '../Soft';  
import { Pers } from '../Per';  
import { Proy } from '../Proy';  

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAgregarExp:boolean = false;
  private subject = new Subject<any>();
  private edit:boolean = false;
  private subject1 = new Subject<any>();
  private showAgregarEd:boolean = false;
  private subject2 = new Subject<any>();
  private subject3 = new Subject<any>();
  private showAgregarHard:boolean = false;
  private subject4 = new Subject<any>();
  private subjectH = new Subject<any>();
  private showAgregarSoft:boolean = false;
  private subject5 = new Subject<any>();
  private subjectS = new Subject<any>();
  private showAgregarAc:boolean = false;
  private subject6 = new Subject<any>();
  private showAgregarPe:boolean = false;
  private subject7 = new Subject<any>();
  private showAgregarPr:boolean = false;
  private subject8 = new Subject<any>();
  private subject9 = new Subject<any>();
  private subjectPr = new Subject<any>();

  constructor() { }

  switchExperiencia():void{
    this.showAgregarExp = !this.showAgregarExp;
    this.subject.next(this.showAgregarExp);
    
  };

  onSwitch():Observable<any>{
    return this.subject.asObservable();
  };

  switchExperienciaE(job:Job){
    this.edit = !this.edit;
    this.subject1.next(this.edit);
  };

  onSwitchE():Observable<any>{
    return this.subject1.asObservable();
  };

  switchEducation():void{
    this.showAgregarEd = !this.showAgregarEd;
    this.subject2.next(this.showAgregarEd);
  };

  onSwitchEd():Observable<any>{
    return this.subject2.asObservable();
  };

  switchExperienciaEdu(edu:Edu){
    this.edit = !this.edit;
    this.subject3.next(this.edit);
  };

  switchHard():void{
    this.showAgregarHard = !this.showAgregarHard;
    this.subject4.next(this.showAgregarHard);
  };

  onSwitchHard():Observable<any>{
    return this.subject4.asObservable();
  };

  switchExperienciaHard(hard:Hard){
    this.edit = !this.edit;
    this.subjectH.next(this.edit);
  };

  switchSoft():void{
    this.showAgregarSoft = !this.showAgregarSoft;
    this.subject5.next(this.showAgregarSoft);
  };

  onSwitchSoft():Observable<any>{
    return this.subject5.asObservable();
  };

  switchExperienciaSoft(soft:Soft){
    this.edit = !this.edit;
    this.subjectS.next(this.edit);
  };

  switchFormularioAc(){
    this.showAgregarAc = !this.showAgregarAc;
    this.subject6.next(this.showAgregarAc);
  };

  onSwitchAc():Observable<any>{
    return this.subject6.asObservable()
  };

  switchFormularioPe(){
    this.showAgregarPe = !this.showAgregarPe;
    this.subject7.next(this.showAgregarPe);
  };

  onSwitchPe():Observable<any>{
    return this.subject7.asObservable()
  };

  switchFormularioProy(proy:Proy){
    this.showAgregarPr = !this.showAgregarPr;
    this.subject8.next(this.showAgregarPr);
  };

  onSwitchPr():Observable<any>{
    return this.subject8.asObservable()
  };

  switchFormularioPr(proy:Proy){
    this.edit = !this.edit;
    this.subject9.next(this.edit);
  };

  switchGuardarPr(proy:Proy){
    this.edit = !this.edit;
    this.subjectPr.next(this.edit);
  };

}
