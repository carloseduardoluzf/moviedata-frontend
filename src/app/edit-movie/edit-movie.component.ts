import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/model/Movie';
import { HomeService } from '../home/service/home.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  movie: Movie = {
    title: '',
    director: '',
    year: 0,
    genre: ''
  };
    

  constructor(private route: ActivatedRoute, private homeService: HomeService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getMovieDetails();
  }

  getMovieDetails(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.homeService.getMovieById(id).subscribe(
      movie => {
        this.movie = movie;
      },
      error => {
        console.error('Erro ao obter detalhes do filme:', error);
      }
    );
  }

  saveMovie(): void {
    this.homeService.editMovie(this.movie.id!).subscribe(
      updatedMovie => {
        console.log('Filme atualizado com sucesso:', updatedMovie);
        
       
      },
      error => {
        console.error('Erro ao salvar filme:', error);
      }
    );
  }

}