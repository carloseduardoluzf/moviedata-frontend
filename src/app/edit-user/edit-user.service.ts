import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ChangePasswordDTO } from 'src/model/ChangePasswordDTO';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {
  private baseUrl = 'http://localhost:8080/api/auth'; // Coloque a URL do seu backend aqui

  constructor(private http: HttpClient) { }

  deleteUser(): Observable<any> {
    // Obter o token JWT do localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      const errorMessage = 'Token JWT não encontrado';
      console.error(errorMessage);
      return throwError(errorMessage);
    }

    // Configurar o cabeçalho com o token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Enviar a solicitação HTTP DELETE com o cabeçalho de autorização
    return this.http.delete<any>(`${this.baseUrl}/user`, { headers })
      .pipe(
        catchError(error => {
          console.error('Erro ao excluir o usuário:', error);
          return throwError(error);
        })
      );
  }

  changePassword(changePasswordDTO: ChangePasswordDTO): Observable<any> {
    // Obter o token JWT do localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      const errorMessage = 'Token JWT não encontrado';
      console.error(errorMessage);
      return throwError(errorMessage);
    }

    // Configurar o cabeçalho com o token JWT
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Enviar a solicitação HTTP PUT com o cabeçalho de autorização e o DTO de alteração de senha
    return this.http.put<any>(`${this.baseUrl}/change-password`, changePasswordDTO, { headers })
      .pipe(
        catchError(error => {
          console.error('Erro ao alterar a senha:', error);
          return throwError(error);
        })
      );
  }
}
