import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtRequest } from '../models/jwtRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  login(request: JwtRequest) {
    return this.http.post('http://localhost:8082/login', request);
  }
  verificar() {
    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
      let token = sessionStorage.getItem('token');
      return token != null;
    }
    return false; // Manejo cuando sessionStorage no está disponible
  }

  showRole() {
    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
      let token = sessionStorage.getItem('token');
      if (!token) {
        return null; // Manejar el caso en el que el token es nulo.
      }
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      return decodedToken?.role;
    }
    return null; // Manejo cuando sessionStorage no está disponible
  }
  // verificar() {
  //   let token = sessionStorage.getItem('token');
  //   return token != null;
  // }
  // showRole() {
  //   let token = sessionStorage.getItem('token');
  //   if (!token) {
  //     // Manejar el caso en el que el token es nulo.
  //     return null; // O cualquier otro valor predeterminado dependiendo del contexto.
  //   }
  //   const helper = new JwtHelperService();
  //   const decodedToken = helper.decodeToken(token);
  //   return decodedToken?.role;
  // }
}
