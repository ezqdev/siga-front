import { Component } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";
import { Header2Component } from "../../shared/header2/header2.component";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [FooterComponent, Header2Component, CommonModule],
  templateUrl: './admin-usuarios.component.html',
  styleUrl: './admin-usuarios.component.css'
})
export class AdminUsuariosComponent {

  users: any

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }


  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get(`${environment.apiUrl}/user`, { headers }).subscribe({
      next: (response: any) => {
        console.log('response', response)
        this.users = response.data;
      }
    });
  }

  volver(): void {
    this.router.navigate(['admin']);
  }

}
