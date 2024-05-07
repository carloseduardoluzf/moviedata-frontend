import { Component, OnInit } from '@angular/core';
import { Movie } from '../../model/Movie';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favoriteMovies: Movie[] = [];

  constructor() { }

  ngOnInit(): void {
    // Aqui você pode carregar os filmes favoritos do serviço ou de qualquer fonte de dados
    // Por enquanto, vamos apenas simular alguns filmes favoritos
    this.favoriteMovies = [
      { id: 1, title: 'Filme 1', director: 'Diretor 1', year: 2020, genre: 'Ação' },
      { id: 2, title: 'Filme 2', director: 'Diretor 2', year: 2019, genre: 'Comédia' },
      { id: 3, title: 'Filme 3', director: 'Diretor 3', year: 2018, genre: 'Drama' },
    ];
  }

}