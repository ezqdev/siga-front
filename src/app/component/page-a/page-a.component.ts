import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-a',
  standalone: true,
  imports: [],
  templateUrl: './page-a.component.html',
  styleUrl: './page-a.component.css'
})
export class PageAComponent {

  constructor(private router: Router){

  }


  irAuth():void{
    this.router.navigate(['auth']); 
   }
}
