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
    }
    //console.log(this.loginEmail);
    //console.log(this.loginPassword);
    //console.log(this.loginStatus);
    //this.onLogin.emit(login);
  }
}
