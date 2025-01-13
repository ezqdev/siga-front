import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  urlHost: string = '';

  constructor(private http: HttpClient) { }


  //servicio para agregar usuario
  addUsuario(usuario: Usuario):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }
    let body: any = JSON.stringify(usuario)
    return this.http.post(this.urlHost, body, httpOptions);
  }
}
