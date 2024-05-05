import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie } from 'src/model/Movie';
import { User } from 'src/model/User';

@Injectable({
  providedIn: 'root'
})
export class MovieFormService {

  constructor(private http: HttpClient) { }

  private apiAuth = 'http://localhost:8080/api/auth';

  private baseUrl = 'http://localhost:8080/movies';


  getUserById(userId: number): Observable<User> {
    const url = `${this.apiAuth}/user/${userId}`;
    return this.http.get<User>(url);
  }

  createMovie(movie: Movie): Observable<Movie> {
    // Obtém o token JWT do armazenamento local
    const token = localStorage.getItem('token');
    console.log(localStorage.length)
    console.log(localStorage)
    console.log(token)
    // Verifica se o token está presente
    if (token) {
      // Adiciona o token ao cabeçalho Authorization
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      console.log(JSON.stringify(headers));
      // Faz a requisição com o cabeçalho contendo o token
      return this.http.post<Movie>(`${this.baseUrl}`, movie, { headers })
        .pipe(
          catchError(error => {
            console.error('Erro ao criar filme:', error);
            return throwError(error); 
          })
        );
    } else {
      // Se o token não estiver presente, emite um erro
      const errorMessage = 'Token JWT não encontrado';
      console.error(errorMessage);
      return throwError(errorMessage);
    }
  }
}
