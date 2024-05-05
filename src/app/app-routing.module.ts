import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/component/login.component';
import { RegisterComponent } from './register/component/register.component';
import { AuthGuard } from 'src/auth/auth.guard';
import { HomeComponent } from './home/component/home.component';
import { MovieFormComponent } from './movie-form/component/movie-form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
 { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, 
  { path: 'movie', component: MovieFormComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Rota padrão redireciona para a página de login
  { path: '**', redirectTo: '/login' } // Redireciona para a página de login se a rota não for encontrada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
