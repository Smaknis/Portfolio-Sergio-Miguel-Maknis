import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //@Output() onlogin: EventEmitter<login> = new EventEmitter();

  miPortfolio:any=0;
  form:FormGroup;
  loginStatus:boolean = false;

  email:string = "";
  password:string = "";

  loginEmail:string = ""
  loginPassword:string = ""

  constructor(
    private datosPortfolio:PortfolioService, 
    private portfolioService:PortfolioService,
    private formBuilder:FormBuilder) 
    {
    this.form=this.formBuilder.group(
      {
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required, Validators.minLength(8)]],
        deviceInfo:this.formBuilder.group({
          deviceId: ["17867868768"],
          deviceType: ["DEVICE_TYPE_ANDROID"],
          notificationToken:["67657575ececc34"]
        })
      }
    )
   }

  ngOnInit(): void {this.datosPortfolio.obtenerDatos().subscribe(data =>{
    this.loginEmail=data.person.email;
    this.loginPassword=data.person.password;
    this.loginStatus=data.person.loginStatus;
    this.miPortfolio=data.person;
  }); 
  }

  get Email(){
    return this.form.get('email');
  }

  get Password(){
    return this.form.get('password');
  }

  onLogin(){
    const login = {
      email: this.email,
      password: this.password,
    };
    console.log(login);
    if(this.email!==this.loginEmail || this.password!==this.loginPassword){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Los datos son incorrectos, contacte al administrador para que se los proporcione eintente nuevamente',
      })}
    if(this.email===this.loginEmail && this.password===this.loginPassword){
      this.loginStatus=true;
      const loginPersona = {
        id: this.miPortfolio.id,
        about1: this.miPortfolio.about1,
        about2: this.miPortfolio.about2,
        address: this.miPortfolio.address,
        back_image: this.miPortfolio.back_image,
        last_name: this.miPortfolio.last_name,
        name: this.miPortfolio.name,
        location: this.miPortfolio.location,
        nationality: this.miPortfolio.nationality,
        phone: this.miPortfolio.phone,
        position: this.miPortfolio.position,
        title: this.miPortfolio.title,
        url_image: this.miPortfolio.url_image,
        email: this.miPortfolio.email,
        password: this.miPortfolio.password,
        birth_date: this.miPortfolio.birth_date, 
        edit: this.miPortfolio.edit, 
        loginStatus: this.loginStatus
      }
      this.portfolioService.editarPerson(loginPersona).subscribe();
      location.reload();
    }
    //console.log(this.loginEmail);
    //console.log(this.loginPassword);
    console.log(this.loginStatus);
    //this.onLogin.emit(login);
  }

  onLogout(){
    this.loginStatus=false;
      const loginPersona = {
        id: this.miPortfolio.id,
        about1: this.miPortfolio.about1,
        about2: this.miPortfolio.about2,
        address: this.miPortfolio.address,
        back_image: this.miPortfolio.back_image,
        last_name: this.miPortfolio.last_name,
        name: this.miPortfolio.name,
        location: this.miPortfolio.location,
        nationality: this.miPortfolio.nationality,
        phone: this.miPortfolio.phone,
        position: this.miPortfolio.position,
        title: this.miPortfolio.title,
        url_image: this.miPortfolio.url_image,
        email: this.miPortfolio.email,
        password: this.miPortfolio.password,
        birth_date: this.miPortfolio.birth_date, 
        edit: this.miPortfolio.edit, 
        loginStatus: this.loginStatus
      }
      this.portfolioService.editarPerson(loginPersona).subscribe();
      location.reload();
    
  }
}
