import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { Header2Component } from "../shared/header2/header2.component";
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ FooterComponent, Header2Component,CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private router:Router,
    private http: HttpClient,
  ){}


  ngOnInit() {
    this.getAreas();
  }

  areas: any[] = []

  getAreas() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.get(`${environment.apiUrl}/space`, { headers }).subscribe({
      next: (response: any) => {
        console.log('response', response)
        this.areas = response.data;
        console.log('positions', this.areas)
      }
    });
  }
  irDisponible():void{
    this.router.navigate(['disponible']);
  }

}
