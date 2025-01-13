import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { Header2Component } from "../shared/header2/header2.component";
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ FooterComponent, Header2Component,CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {



  areas = [
    {
      id: 1,
      name: 'DOMO',
      /* image: './assets/img-planos/gimnasio.PNG' */
    },
    {
      id: 2,
      name: 'GIMNASIO AUDITORIO',
      image: './assets/img-planos/gimnasio.PNG'
    },
    {
      id: 3,
      name: 'PARANINFO',
      image: './assets/img-planos/paraninfo.PNG'
    },
    {
      id:4,
      name:'SALA DE USOS MULTIPLES',
      image:'./assets/img-planos/administrativo1.PNG'
    }
  ];

  constructor(private router:Router){}

  irDisponible():void{
    this.router.navigate(['disponible']);
  }

}
