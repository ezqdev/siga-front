import { Component } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";
import { Header2Component } from "../../shared/header2/header2.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-bienes',
  standalone: true,
  imports: [FooterComponent, Header2Component],
  templateUrl: './admin-bienes.component.html',
  styleUrl: './admin-bienes.component.css'
})
export class AdminBienesComponent {

  constructor(private router: Router){
    
  }

  volver():void{
    this.router.navigate(['admin']);
  }

}
