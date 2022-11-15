import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  form:FormGroup;

  constructor(private formBuilder: FormBuilder, private autenticationService:AutenticacionService, private ruta:Router, private tokenService: TokenService) { 
    this.form=this.formBuilder.group(
      {
        userName:['',[Validators.required]],
        password:['', [Validators.required,Validators.minLength(4)]],
        deviceInfo:this.formBuilder.group({
          deviceId:["17867868768"],
          deviceType:["DEVICE_TYPE_ANDROID"],
          notificationToken:["67657575eececc34"]
        })
      }
    )
  }

  ngOnInit(): void {
    
  }

  get UserName()
  {
    return this.form.get('nombreUsuario');
  }
  get Password()
  {
    return this.form.get('password');
  }

  onEnviar(event:Event)
  {
    event.preventDefault;
    console.log(this.form.value)
    const credenciales = {nombreUsuario: this.form.value.userName, password: this.form.value.password}
    this.autenticationService.IniciarSesion(credenciales).subscribe(data=>{
      console.log("DATA:" + JSON.stringify(data));
      const {token, nombreUsuario, authorities} = data
      this.tokenService.setToken(token)
      this.tokenService.setUserName(nombreUsuario)
      this.tokenService.setAuthorities(authorities)
      this.ruta.navigate(['/portfolio']);

    })
  }

}