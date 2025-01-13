import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Header2Component } from "../shared/header2/header2.component";
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-solicitud-user',
  standalone: true,
  imports: [Header2Component, FooterComponent],
  templateUrl: './solicitud-user.component.html',
  styleUrl: './solicitud-user.component.css'
})
export class SolicitudUserComponent {

   constructor(private router: Router){
      
    }
  
    volver():void{
      this.router.navigate(['home']);
    }

}
