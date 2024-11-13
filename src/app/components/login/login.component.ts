import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

// Interfaces para tipar las respuestas
interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    name: string;
  };
}

interface LoginError {
  message: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = '';

      const username = this.loginForm.get('username')?.value || '';
      const password = this.loginForm.get('password')?.value || '';

      this.authService.login(username, password).subscribe({
        next: (response: LoginResponse) => {
          if (response && response.token) {
            this.authService.setToken(response.token);
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error: LoginError) => {
          this.error = error.message || 'Usuario o contraseña incorrectos';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  // Método auxiliar para marcar todos los campos como tocados
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Métodos para verificar errores en los campos
  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    
    if (control?.errors) {
      if (control.errors['required']) {
        return `El campo ${controlName} es requerido`;
      }
    }
    return '';
  }

  // Verificar si un campo tiene errores
  hasError(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return (control?.invalid && (control?.dirty || control?.touched)) ?? false;
  }
}