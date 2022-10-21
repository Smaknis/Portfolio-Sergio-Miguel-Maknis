import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Job } from '../Job' 
import { Edu } from '../Edu' 

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
  
  constructor() { }

  switchExperiencia():void{
    this.showAgregarExp = !this.showAgregarExp;
    this.subject.next(this.showAgregarExp);
    
  }

  onSwitch():Observable<any>{
    return this.subject.asObservable();
  }

  switchExperienciaE(job:Job){
    this.edit = !this.edit;
    this.subject1.next(this.edit);

  }

  onSwitchE():Observable<any>{
    return this.subject1.asObservable();
  }

  switchEducation():void{
    this.showAgregarEd = !this.showAgregarEd;
    this.subject2.next(this.showAgregarEd);
    
  }

  onSwitchEd():Observable<any>{
    return this.subject2.asObservable();
  }

  switchExperienciaEdu(edu:Edu){
    this.edit = !this.edit;
    this.subject3.next(this.edit);

  }


}
