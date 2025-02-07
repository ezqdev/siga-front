import { Component } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";
import { Header2Component } from "../../shared/header2/header2.component";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-equipos',
  standalone: true,
  imports: [FooterComponent, Header2Component, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-equipos.component.html',
  styleUrl: './admin-equipos.component.css'
})
export class AdminEquiposComponent {

  equipos: any
  equipoForm: FormGroup;
  showForm: any;
  updateMode: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.equipoForm = this.fb.group({
      name: ['', Validators.required],
      id: [''],
    });
  }

  ngOnInit() {
    this.getEquipos();
  }

  handleShowForm(equipo: any) {
    this.showForm = true;
    if(equipo!==null){
      this.updateMode = true
      this.equipoForm.setValue({ name: equipo.Nombre, id: equipo.id })
    }else{
      this.updateMode = false
      this.equipoForm.setValue({ name: '', id: '' })
    }
  }

  getEquipos() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get(`${environment.apiUrl}/estate`, { headers }).subscribe({
      next: (response: any) => {
        console.log('response', response)
        this.equipos = response.data.reverse();
      }
    });
  }

  deleteEquipo(equipoId: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.delete(`${environment.apiUrl}/estate/${equipoId}`, { headers }).subscribe({
      next: (response: any) => {
        if (response.statusCode) {
          alert('Equipo eliminado exitosamente')
          this.getEquipos()
        }
      }
    });
  }


  onSubmit() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    console.log('equipo form', this.equipoForm)
    if (this.equipoForm.valid) {
      if(!this.updateMode){
        this.http.post(`${environment.apiUrl}/estate`,
          {
            ...this.equipoForm.value,
          },
          { headers }
        )
          .subscribe({
            next: (response: any) => {
              console.log('response', response)
              if (response.statusCode !== 201) {
                alert('Algo salió mal')
              } else {
                console.log('response', response)
                alert('Equipo creado exitosamente')
                this.getEquipos()
              }
            },
            error: (error) => {
              console.error('Error en login:', error);
            }
          });
      }else{
        this.http.put(`${environment.apiUrl}/estate/${this.equipoForm.value.id}`,
          {
            ...this.equipoForm.value,
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
                alert('Equipo actualizado exitosamente')
                this.getEquipos()
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
