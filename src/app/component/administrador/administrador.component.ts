import { Component } from '@angular/core';
import { Header2Component } from '../shared/header2/header2.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [Header2Component,FooterComponent,CommonModule],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {


  constructor(private router:Router){}

  irHome():void{
    this.router.navigate(['home']);
  }


  irAdmin():void{
    this.router.navigate(['adminsoli']);
  }
  
  irAdmin2():void{
    this.router.navigate(['adminusuarios']);
  }

  irAdmin3():void{
    this.router.navigate(['adminequipos']);
  }
  
  irAdmin4():void{
    this.router.navigate(['adminespacio']);
  }

  irAdmin5():void{
    this.router.navigate(['adminbienes']);
  }

}
