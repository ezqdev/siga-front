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
      image: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getSpaces();
  }

  handleShowForm(espacio: any) {
    this.showForm = true;
    if(espacio!==null){
      this.updateMode = true
      this.espacioForm.setValue({ name: espacio.Nombre, id: espacio.id, capacity: espacio.Capacidad, description: espacio.Descripcion, image: espacio.image })
    }else{
      this.updateMode = false
      this.espacioForm.setValue({ name: '', id: '', capacity: '', description: '', image: '' })
    }
  }

  getSpaces() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get(`${environment.apiUrl}/space`, { headers }).subscribe({
      next: (response: any) => {
        console.log('response', response)
        this.espacios = response.data.reverse();
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
    console.log('equipo form', this.espacioForm)
    if (this.espacioForm.valid) {
      if(!this.updateMode){
        this.http.post(`${environment.apiUrl}/space`,
          {
            ...this.espacioForm.value,
          },
          { headers }
        )
          .subscribe({
            next: (response: any) => {
              console.log('response', response)
              if (response.statusCode !== 201) {
                alert('Algo salió mal: ' + response.message)
              } else {
                console.log('response', response)
                alert('Espacio creado exitosamente')
                this.getSpaces()
              }
            },
            error: (error) => {
              console.error('Error en login:', error);
            }
          });
      }else{
        this.http.put(`${environment.apiUrl}/space/${this.espacioForm.value.id}`,
          {
            ...this.espacioForm.value,
          },
          { headers }
        )
          .subscribe({
            next: (response: any) => {
              console.log('response', response)
              if (response.statusCode !== 200) {
                alert('Algo salió mal: ' + response.message)
              } else {
                console.log('response', response)
                alert('Espacio actualizado exitosamente')
                this.getSpaces()
              }
            },
            error: (error) => {
              console.error('Error en login:', error);
            }
          });
      }
    }
  }

    volver():void{
      this.router.navigate(['admin']);
    }

}
