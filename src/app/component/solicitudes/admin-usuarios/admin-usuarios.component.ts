import { Component } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";
import { Header2Component } from "../../shared/header2/header2.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [FooterComponent, Header2Component],
  templateUrl: './admin-usuarios.component.html',
  styleUrl: './admin-usuarios.component.css'
})
export class AdminUsuariosComponent {

   constructor(private router: Router){
      
    }
  
    volver():void{
      this.router.navigate(['admin']);
    }

}
