import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditMovieComponent } from './edit-movie.component';

@NgModule({
  declarations: [
    EditMovieComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    EditMovieComponent
  ]
})
export class EditMovieModule { }