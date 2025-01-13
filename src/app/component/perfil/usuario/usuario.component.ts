import { Component } from '@angular/core';
import { Header2Component } from "../../shared/header2/header2.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [Header2Component, FooterComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {


  constructor(private router: Router){}


  volverHome():void{
    this.router.navigate(['home']);
  }

}
