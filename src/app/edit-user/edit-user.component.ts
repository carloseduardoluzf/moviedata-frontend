import { Component, OnInit } from '@angular/core';
import { EditUserService } from './edit-user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChangePasswordDTO } from 'src/model/ChangePasswordDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  newPasswordForm!: FormGroup;
  loading: boolean = false;
  successMessage: boolean = false;
  private tokenExpirationTimer: any;

  constructor(private fb: FormBuilder,private editUserService: EditUserService, private router: Router) {
    this.newPasswordForm = this.fb.group({
      newPassword: ['', Validators.required],
      oldPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  deleteUser(): void {
    this.editUserService.deleteUser().subscribe(
      response => {
        console.log(response);
        // Trate a resposta conforme necessário
      },
      error => {
        console.error(error);
        // Trate o erro conforme necessário
      }
    );
  }

  logout(): void {
    // Limpa os dados armazenados no localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    // Para o temporizador de expiração do token
    clearTimeout(this.tokenExpirationTimer);
    // Redireciona o usuário para a página de login
    this.router.navigate(['/login']);
  }

  changePassword() {
    if (this.newPasswordForm.invalid) {
      return;
    }
  
    const newPassword: string = this.newPasswordForm.get('newPassword')?.value;
    const oldPassword: string = this.newPasswordForm.get('oldPassword')?.value;
    const changePasswordDTO: ChangePasswordDTO = { newPassword, oldPassword};
  
    this.loading = true;
    this.editUserService.changePassword(changePasswordDTO)
      .subscribe(
        () => {
          setTimeout(() => {
            this.loading = false; 
            this.successMessage = true;
            this.newPasswordForm.reset();
          }, 2000);
          this.successMessage = false;
        },
        error => {
          console.log('Erro ao alterar senha:', error);
          this.loading = false;
        }
      );
  }
}