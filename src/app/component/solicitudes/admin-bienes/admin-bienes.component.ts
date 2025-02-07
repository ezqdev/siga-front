import { Component } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";
import { Header2Component } from "../../shared/header2/header2.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-bienes',
  standalone: true,
  imports: [FooterComponent, Header2Component, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-bienes.component.html',
  styleUrl: './admin-bienes.component.css'
})
export class AdminBienesComponent {

  services: any
  serviceForm: FormGroup;
  showForm: any;
  updateMode: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      id: [''],
    });
  }

  ngOnInit() {
    this.getServices();
  }

  handleShowForm(equipo: any) {
    this.showForm = true;
    if(equipo!==null){
      this.updateMode = true
      this.serviceForm.setValue({ name: equipo.Nombre, id: equipo.id })
    }else{
      this.updateMode = false
      this.serviceForm.setValue({ name: '', id: '' })
    }
  }

  getServices() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get(`${environment.apiUrl}/service`, { headers }).subscribe({
      next: (response: any) => {
        console.log('response', response)
        this.services = response.data.reverse();
      }
    });
  }

  deleteService(serviceId: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.delete(`${environment.apiUrl}/service/${serviceId}`, { headers }).subscribe({
      next: (response: any) => {
        if (response.statusCode) {
          alert('Servicio eliminado exitosamente')
          this.getServices()
        }
      }
    });
  }


  onSubmit() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    console.log('equipo form', this.serviceForm)
    if (this.serviceForm.valid) {
      if(!this.updateMode){
        this.http.post(`${environment.apiUrl}/service`,
          {
            ...this.serviceForm.value,
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
                alert('Servicio creado exitosamente')
                this.getServices()
              }
            },
            error: (error) => {
              console.error('Error en login:', error);
            }
          });
      }else{
        this.http.put(`${environment.apiUrl}/service/${this.serviceForm.value.id}`,
          {
            ...this.serviceForm.value,
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
                this.getServices()
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
