import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importa o módulo ReactiveFormsModule
import { FormsModule } from '@angular/forms'; 
import { EditUserRoutingModule } from './edit-user-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule,
    EditUserRoutingModule
  ]
})
export class EditUserModule { }
