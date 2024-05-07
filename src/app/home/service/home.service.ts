import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { Movie } from 'src/model/Movie';
import { catchError } from 'rxjs/operators'; 
import { User } from 'src/model/User';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  private baseUrl= 'http://localhost:8080/movies'
  private urlGetUserById = 'http://localhost:8080/api/auth'
  constructor(private http: HttpClient) { }

  private _refreshrequired=new Subject<void>();
  get RequiredRefresh(){
    return this._refreshrequired;
  }

  

  getAllMovies(): Observable<Movie[]> {
    const token = localStorage.getItem('token');
    
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    
      return this.http.get<Movie[]>(`${this.baseUrl}`, { headers })
        .pipe(
          catchError(error => {
            console.error('Erro ao obter todas as receitas:', error);
            return throwError(error);
          })
        );
    } else {
      const errorMessage = 'Token JWT não encontrado';
      console.error(errorMessage);
      return throwError(errorMessage);
    }
  }

  getUserById(userId: number): Observable<User> {
    const url = `${this.urlGetUserById}/user/${userId}`;
    return this.http.get<User>(url);
  }

  deleteMovie(movieId: number): Observable<void> {
    const url = `${this.baseUrl}/${movieId}`;
    
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
    return this.http.delete<void>(url, { headers })
      .pipe(
        catchError(error => {
          console.error('Erro ao excluir o filme:', error);
          return throwError(error);
        })
      );
  }

  editMovie(movieId: number): Observable<Movie> {
    const url = `${this.baseUrl}/${movieId}`;
    
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

    // Enviar a solicitação HTTP PUT com o cabeçalho de autorização
    return this.http.put<Movie>(url, { headers })
      .pipe(
        catchError(error => {
          console.error('Erro ao atualizar o filme:', error);
          return throwError(error);
        })
      );
  }


  getMovieById(movieId: number): Observable<Movie> {
    const url = `${this.baseUrl}/${movieId}`;

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

    // Enviar a solicitação HTTP GET com o cabeçalho de autorização
    return this.http.get<Movie>(url, { headers })
      .pipe(
        catchError(error => {
          console.error('Erro ao obter detalhes do filme:', error);
          return throwError(error);
        })
      );
  }

}
