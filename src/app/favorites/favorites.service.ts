import { Injectable } from '@angular/core';
import { Movie } from '../../model/Movie';
import { HomeComponent } from '../home/component/home.component';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoriteMovies: Movie[] = [];
  private localStorageKey = 'favoriteMovies';

  constructor() { }

  getFavoriteMovies(): Movie[] {
    const favoriteMoviesString = localStorage.getItem(this.localStorageKey);
    return favoriteMoviesString ? JSON.parse(favoriteMoviesString) : [];
  }

  setFavoriteMovies(movies: Movie[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(movies));
  }

  toggleFavorite(movie: Movie): void {
    const favoriteMovies = this.getFavoriteMovies();
    const index = favoriteMovies.findIndex(favMovie => favMovie.id === movie.id);
    if (index !== -1) {
        // Se o filme já estiver marcado como favorito, remova-o da lista
        favoriteMovies.splice(index, 1);
      } else {
        // Adiciona o filme à lista de favoritos
        favoriteMovies.push(movie);
      }
    // Atualiza a lista de favoritos no localStorage
    this.setFavoriteMovies(favoriteMovies);

    // Atualiza a propriedade isFavorite do filme
    movie.isFavorite = !movie.isFavorite;
  }
}