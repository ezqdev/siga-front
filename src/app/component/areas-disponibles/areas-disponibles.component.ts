import { Component } from '@angular/core';
import { FooterComponent } from "../shared/footer/footer.component";
import { Header2Component } from "../shared/header2/header2.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-areas-disponibles',
  standalone: true,
  imports: [FooterComponent, Header2Component],
  templateUrl: './areas-disponibles.component.html',
  styleUrl: './areas-disponibles.component.css'
})
export class AreasDisponiblesComponent {


   constructor(private router: Router){
      
    }
  
    volver():void{
      this.router.navigate(['home']);
    }

}
