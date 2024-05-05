import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/model/User';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }
  
  private baseUrl: string = 'http://localhost:8080/api/auth'; 

  register(user: User):Observable<any>{
    console.log(user)
    return this.httpClient.post(`${this.baseUrl}/register`, user);
  }
}
