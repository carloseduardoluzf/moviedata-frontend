import { Component, OnInit } from '@angular/core';
import { Movie } from '../../model/Movie';
import { FavoritesService } from './favorites.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favoriteMovies: Movie[] = [];
  displayedColumns: string[] = ['title', 'director', 'year', 'genre'];
  constructor(private favoritesService: FavoritesService, private router: Router) { }

  ngOnInit(): void {
    this.favoriteMovies = this.favoritesService.getFavoriteMovies();
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

}