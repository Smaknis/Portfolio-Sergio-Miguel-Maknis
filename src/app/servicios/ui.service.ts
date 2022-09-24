import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAgregarExp:boolean = false;
  private subject = new Subject<any>();

  constructor() { }

  switchExperiencia():void{
    this.showAgregarExp = !this.showAgregarExp;
    this.subject.next(this.showAgregarExp);
    
  }

  onSwitch():Observable<any>{
    return this.subject.asObservable();
  }
}
