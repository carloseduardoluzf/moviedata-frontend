import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Movie } from 'src/model/Movie';
import { HomeService } from '../service/home.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
  
  movies: Movie[] = [];
  private tokenExpirationTimer: any;
  displayedColumns: string[] = ['id', 'title', 'director', 'year', 'genre', 'actions'];
  dataSource: MatTableDataSource<Movie> = new MatTableDataSource<Movie>(this.movies);


  constructor(private homeService: HomeService, private router: Router) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator; 

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.homeService.getAllMovies().subscribe(
      movies => {
        this.movies = movies;
        this.dataSource.data = this.movies;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.error('Erro ao obter filmes:', error);
      }
    );
  }

  isOwner(movie: Movie): boolean {
    // Verifica se o token do localStorage está presente e decodifica o token para obter o ID do usuário
    const id = this.getUserIdByLocalStorage();
    console.log('ID do usuário:', id);
  console.log('ID do filme:', movie.userId);
    if (id && movie.userId === id) {
      return true;
    }
    return false;
  }

  setSession(authResult: any): void {
    // Armazena o token JWT e a data/hora de expiração no localStorage
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(authResult.expiresAt));

    // Inicia o temporizador de expiração do token
    this.startTokenExpirationTimer();
  }

  private startTokenExpirationTimer(): void {
    const expiresAtString = localStorage.getItem('expires_at');
    // Obtém a data/hora de expiração do token do localStorage
    if (expiresAtString) {
      const expiresAt = JSON.parse(expiresAtString);
      // Calcula o tempo restante antes da expiração do token em milissegundos
      const expiresIn = new Date(expiresAt).getTime() - new Date().getTime();

      // Configura o temporizador para chamar o método de logout após o tempo de expiração
      this.tokenExpirationTimer = setTimeout(() => {
        this.logout();
      }, expiresIn);
    } else {
      this.logout();
    }
  }


  deleteMovie(movie: Movie): void {
    const confirmation = confirm('Tem certeza que deseja excluir este filme?');
    if (confirmation) {
      if (movie.id !== undefined) {
        this.homeService.deleteMovie(movie.id).subscribe(
          () => {
            this.movies = this.movies.filter(m => m.id !== movie.id);
          },
          error => {
            console.error('Erro ao excluir filme:', error);
          }
        );
      } else {
        console.error('ID do filme não está definido');
      }
    }
  }

  editMovie(movie: Movie): void {
    this.homeService.editMovie(movie).subscribe(
      updatedMovie => {
        const index = this.movies.findIndex(m => m.id === updatedMovie.id);
        if (index !== -1) {
          this.movies[index] = updatedMovie;
        }
      },
      error => {
        console.error('Erro ao atualizar filme:', error);
      }
    );
  }

  getUserIdByLocalStorage(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      return decodedToken.id;
    }
    return null;
  }

  getToken(): any {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage
    if (token) {
      console.log(token); // Exibe os dados do usuário no console
    } else {
      console.log('Token não encontrado no localStorage');
    }
  }

  logout(): void {
    // Limpa os dados armazenados no localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    // Para o temporizador de expiração do token
    clearTimeout(this.tokenExpirationTimer);
    // Redireciona o usuário para a página de login
    this.router.navigate(['/login']);
  }
}
