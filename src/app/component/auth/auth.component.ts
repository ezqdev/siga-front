import { Component } from '@angular/core';
import { FooterComponent } from "../shared/footer/footer.component";
import { HeaderComponent } from '../shared/header/header.component';
import { Router, RouterModule } from '@angular/router';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FooterComponent, HeaderComponent,RouterModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  constructor(private router:Router){}

  irRegister():void{
    this.router.navigate(['register']);
  }



}
