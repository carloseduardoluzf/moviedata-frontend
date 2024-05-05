import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { MovieFormService } from '../service/movie-form.service';
import { Movie } from 'src/model/Movie';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {
  movie: Movie = new Movie();
  currentUser: string | null = localStorage.getItem('token');
  movieForm: FormGroup;
  loading: boolean = false;
  successMessage: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private movieService: MovieFormService) {
    this.movieForm = this.formBuilder.group({
      title: ['', Validators.required],
      director: ['', Validators.required],
      year: ['', Validators.required],
      genre: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }
  
  getUserIdByLocalStorage(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      return decodedToken.userId;
    }
    return null;
  }

  createMovie(): void {
    this.movieService.createMovie(this.movie).subscribe(
      response => {
        console.log('Filme criado com sucesso:', response)
        this.successMessage = true;
      },
      error => {
        console.error('Erro ao criar filme:', error);
      }
    );
  }

  getUserById(): void {
    const userId = this.getUserIdByLocalStorage();
    if (userId) {
      this.movieService.getUserById(userId)
        .subscribe(
          user => {
            console.log('Usuário obtido com sucesso:', user);
            // Defina o nome do autor da receita
            this.movie.userId = user.id;
            console.log(user)
          },
          error => {
            console.error('Erro ao obter usuário:', error);
            // Lidar com o erro, por exemplo, exibindo uma mensagem para o usuário
          }
        );
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

}
