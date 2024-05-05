import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from 'src/app/pagination/pagination/pagination.component';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [PaginationComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
