import { Component } from '@angular/core';
import { Header2Component } from "../../shared/header2/header2.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [Header2Component, FooterComponent, CommonModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  user: any

  reservations: any

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.getCurrentUser();
    this.getReservations();
  }

  volverHome(): void {
    this.router.navigate(['home']);
  }

  getCurrentUser() {
    const jsonUser = JSON.parse(localStorage.getItem('user') || '');
    this.user = jsonUser
  }

  getReservations() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const jsonUser = JSON.parse(localStorage.getItem('user') || '');

    this.http.get(`${environment.apiUrl}/reservation/byUser/${jsonUser.id}`, { headers }).subscribe({
      next: (response: any) => {
        console.log('response', response)
        this.reservations = response.data;
        console.log('reservations', this.reservations)
      }
    });
  }



}
