import { Component } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";
import { Header2Component } from "../../shared/header2/header2.component";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [FooterComponent, Header2Component, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-usuarios.component.html',
  styleUrl: './admin-usuarios.component.css'
})
export class AdminUsuariosComponent {

  users: any
  userForm: FormGroup;
  showForm: any;
  updateMode: any;
  positions: any;
  roles: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
        this.userForm = this.fb.group({
          name: ['', Validators.required],
          email: ['', Validators.required],
          password: ['', Validators.required],
          rol_id: ['', Validators.required],
          position_id: ['', Validators.required],
          id: [''],
        });
   }


  ngOnInit() {
    this.getUsers();
    this.getPositions();
    this.getRoles()
  }

  getUsers() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get(`${environment.apiUrl}/user`, { headers }).subscribe({
      next: (response: any) => {
        console.log('response', response)
        this.users = response.data.reverse();
      }
    });
  }

  getPositions() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get(`${environment.apiUrl}/position`, { headers }).subscribe({
      next: (response: any) => {
        this.positions = response.data;
      }
    });
  }

  getRoles() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get(`${environment.apiUrl}/rol`, { headers }).subscribe({
      next: (response: any) => {
        this.roles = response.data;
      }
    });
  }


  handleShowForm(user: any) {
    this.showForm = true;
    if(user!==null){
      this.updateMode = true
      console.log('user', user)
      const rol_id = user.Rol.match(/\d+/)[0];
      const position_id = user.Puesto.match(/\d+/)[0];
      this.userForm.setValue({ name: user.Nombre, id: user.id, email: user.Email, rol_id: rol_id, position_id: position_id, password: '' })
    }else{
      this.updateMode = false
      this.userForm.setValue({ name: '', id: '', email: '', password:'', rol_id: '', position_id: '' })
    }
  }

  deleteUser(userId: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.delete(`${environment.apiUrl}/user/${userId}`, { headers }).subscribe({
      next: (response: any) => {
        if (response.statusCode) {
          alert('Usuario eliminado exitosamente')
          this.getUsers()
        }
      }
    });
  }


  onSubmit() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    console.log('equipo form', this.userForm)
    if (this.userForm.valid) {
      if(!this.updateMode){
        this.http.post(`${environment.apiUrl}/user`,
          {
            ...this.userForm.value,
          },
          { headers }
        )
          .subscribe({
            next: (response: any) => {
              console.log('response', response)
              if (response.statusCode !== 200) {
                alert('Algo salió mal')
              } else {
                console.log('response', response)
                alert('Usuario creado exitosamente')
                this.getUsers()
              }
            },
            error: (error) => {
              console.error('Error en login:', error);
            }
          });
      }else{
        this.http.put(`${environment.apiUrl}/user/${this.userForm.value.id}`,
          {
            ...this.userForm.value,
          },
          { headers }
        )
          .subscribe({
            next: (response: any) => {
              console.log('response', response)
              if (response.statusCode !== 200) {
                alert('Algo salió mal')
              } else {
                console.log('response', response)
                alert('Usuario actualizado exitosamente')
                this.getUsers()
              }
            },
            error: (error) => {
              console.error('Error en login:', error);
            }
          });
      }
    }
  }

  volver(): void {
    this.router.navigate(['admin']);
  }

}
