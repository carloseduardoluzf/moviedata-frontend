import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.http.delete<void>(url);
  }

  editMovie(movie: Movie): Observable<Movie> {
    const url = `${this.baseUrl}/${movie.id}`;
    return this.http.put<Movie>(url, movie);
  }
}
