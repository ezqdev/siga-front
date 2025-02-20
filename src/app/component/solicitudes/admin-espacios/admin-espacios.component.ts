import { Component } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";
import { Header2Component } from "../../shared/header2/header2.component";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-espacios',
  standalone: true,
  imports: [FooterComponent, Header2Component, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-espacios.component.html',
  styleUrl: './admin-espacios.component.css'
})
export class AdminEspaciosComponent {

  espacios: any;
  espacioForm: FormGroup;
  showForm: any;
  updateMode: any;
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.espacioForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      capacity: ['', Validators.required],
      id: [''],
    });
  }

  ngOnInit() {
    this.getSpaces();
  }

  handleShowForm(espacio: any) {
    this.showForm = true;
    if (espacio !== null) {
      this.updateMode = true
      this.espacioForm.setValue({ name: espacio.Nombre, id: espacio.id, capacity: espacio.Capacidad, description: espacio.Descripcion })
    } else {
      this.updateMode = false
      this.espacioForm.setValue({ name: '', id: '', capacity: '', description: '' })
    }
  }

  getSpaces() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get(`${environment.apiUrl}/space`, { headers }).subscribe({
      next: (response: any) => {
        console.log('response', response)
        const fullSpaces = response.data.map((space: any) => {
          return {
            ...space,
            image: 'http://localhost:8000' + space.image
          }
        })
        this.espacios = fullSpaces.reverse();
      }
    });
  }

  deleteEquipo(equipoId: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.delete(`${environment.apiUrl}/space/${equipoId}`, { headers }).subscribe({
      next: (response: any) => {
        if (response.statusCode) {
          alert('Espacio eliminado exitosamente')
          this.getSpaces()
        }
      }
    });
  }


  onSubmit() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    if (this.espacioForm.valid) {
      const formData = new FormData();
      formData.append('name', this.espacioForm.get('name')?.value);
      formData.append('capacity', this.espacioForm.get('capacity')?.value);
      formData.append('description', this.espacioForm.get('description')?.value);

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      if (!this.updateMode) {
        this.http.post(`${environment.apiUrl}/space`, formData, { headers })
          .subscribe({
            next: (response: any) => {
              if (response.statusCode !== 200) {
                alert('Algo salió mal: ' + response.message);
              } else {
                alert('Espacio creado exitosamente');
                this.getSpaces();
              }
            },
            error: (error) => {
              console.error('Error:', error);
            }
          });
      } else {
        formData.append('id', this.espacioForm.get('id')?.value);
        this.http.put(`${environment.apiUrl}/space/${this.espacioForm.value.id}`, formData, { headers })
          .subscribe({
            next: (response: any) => {
              if (response.statusCode !== 200) {
                alert('Algo salió mal: ' + response.message);
              } else {
                alert('Espacio actualizado exitosamente');
                this.getSpaces();
              }
            },
            error: (error) => {
              console.error('Error:', error);
            }
          });
      }
    }
  }

  volver(): void {
    this.router.navigate(['admin']);
  }

}
