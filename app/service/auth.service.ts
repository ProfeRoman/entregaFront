import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../model/jwt-dto';
import { IniciarSesionComponent } from '../components/iniciar-sesion/iniciar-sesion.component';
import { NuevoUsuario } from '../model/nuevo-usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //URL = environment.URL + 'auth/';
  URL = 'https://scolloback.herokuapp.com/auth/';

  constructor(private httpClient: HttpClient) { }

 public nuevo(nuevoUsuario: NuevoUsuario): Observable<any>{
   return this.httpClient.post<any>(this.URL + 'nuevo', nuevoUsuario);
 }

 public login(loginUsuario: IniciarSesionComponent): Observable<JwtDto>{
   return this.httpClient.post<JwtDto>(this.URL + 'login', loginUsuario)
 }
}