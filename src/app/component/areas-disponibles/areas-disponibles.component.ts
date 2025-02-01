import { Component } from '@angular/core';
import { FooterComponent } from "../shared/footer/footer.component";
import { Header2Component } from "../shared/header2/header2.component";
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-areas-disponibles',
  standalone: true,
  imports: [FooterComponent, Header2Component, CommonModule, RouterModule],
  templateUrl: './areas-disponibles.component.html',
  styleUrl: './areas-disponibles.component.css'
})
export class AreasDisponiblesComponent {

  ocuppied: any
  maintenance: any
  available: any

  constructor(
    private router: Router,
    private http: HttpClient
  ) {

  }

  volver(): void {
    this.router.navigate(['home']);
  }


  ngOnInit(){
    this.getSpacesResume()
  }

  getSpacesResume() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    this.http.get(`${environment.apiUrl}/space-resume`, { headers }).subscribe({
      next: (response: any) => {
        console.log('response', response)
        this.ocuppied = response.ocuppied;
        this.maintenance = response.maintenance;
        this.available = response.available;
      }
    });
  }

}
