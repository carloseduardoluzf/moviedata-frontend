import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../model/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  private readonly baseUrl: string = 'http://localhost:8080/api/auth'; 

  login(user: User): Observable<any> { // Defina o tipo de retorno como Observable<any>
    return this.httpClient.post<any>(`${this.baseUrl}/login`, { email: user.email, password: user.password });
  }
}
