import { Component } from '@angular/core';
import { FooterComponent } from "../shared/footer/footer.component";
import { HeaderComponent } from '../shared/header/header.component';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  loginForm: FormGroup;

  private apiUrl = environment.apiUrl;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.http.post(`${this.apiUrl}/login`, this.loginForm.value)
        .subscribe({
          next: (response: any) => {
            if (response.statusCode !== 200) {
              alert('Credenciales incorrectas')
            } else {
              console.log('response', response)
              localStorage.setItem('token', response.data.token)
              localStorage.setItem('user', JSON.stringify(response.data.user))
              this.router.navigate(['/home']);
            }
          },
          error: (error) => {
            console.error('Error en login:', error);
          }
        });
    }
  }

  irRegister(): void {
    this.router.navigate(['register']);
  }
}