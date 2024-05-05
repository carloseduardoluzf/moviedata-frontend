import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../service/register.service';
import { Router } from '@angular/router';
import { User } from 'src/model/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading: boolean = false;
  user: User = new User();
  successMessage: boolean = false;

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private router: Router) {this.registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', Validators.required]
  }); }

  ngOnInit(): void {
  }

  register(): void {
    if (this.registerForm.invalid) {
      return;
    }

    setTimeout(() => {
      this.loading = true;
    }, 350);

    this.user.email = this.registerForm.value.email;
    this.user.password = this.registerForm.value.password;
    this.user.username = this.registerForm.value.username;

    this.registerService.register(this.user).subscribe(
      response => {
        console.log('Usuário cadastrado com sucesso:', response);
          setTimeout(() => {
            this.loading = false; 
            this.successMessage = true;
            this.registerForm.reset();
          }, 2000);
          this.successMessage = false;
      },
      error => {
        console.error('Erro ao cadastrar usuário:', error);
        this.loading = false; 
      },
    );
  }

}
