import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../utils/environments';
import { Credenciales } from '../interfaces/credenciales';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url=environment.urlBack;
  constructor(private httpclient:HttpClient) {
   }

   login(user:Credenciales):Observable<any>{
    return this.httpclient.post<string>(`${this.url}/login/credenciales`,user);
   }
}
