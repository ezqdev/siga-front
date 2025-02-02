import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule, ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  positions: any[] = [];
  selectedPosition: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      position_id: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getPositions();
  }

  getPositions() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get(`${environment.apiUrl}/position`, { headers }).subscribe({
      next: (response: any) => {
        console.log('response', response)
        this.positions = response.data;
        console.log('positions', this.positions)
      }
    });
  }

  onSubmit() {
    console.log('register form', this.registerForm.valid)
    if (this.registerForm.valid) {
      this.http.post(`${environment.apiUrl}/user`,
        {
          ...this.registerForm.value,
          rol_id: 2
        }
      )
        .subscribe({
          next: (response: any) => {
            console.log('response', response)
            if (response.statusCode !== 200) {
              alert('Algo salió mal')
            } else {
              alert('Usuario creado exitosamente')
              this.router.navigate(['/auth']);
            }
          },
          error: (error) => {
            console.error('Error en login:', error);
          }
        });
    }
  }

  irHome(): void {
    this.router.navigate(['home']);
  }



}
