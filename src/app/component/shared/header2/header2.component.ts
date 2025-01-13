import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header2',
  standalone: true,
  imports: [],
  templateUrl: './header2.component.html',
  styleUrl: './header2.component.css'
})
export class Header2Component {

  constructor(private router:Router){}

  irUsuario():void{
    this.router.navigate(['usuario']);
  }

  irAdmin():void{
    this.router.navigate(['admin']);
  }

}
