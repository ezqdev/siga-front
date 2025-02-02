import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header2.component.html',
  styleUrl: './header2.component.css'
})
export class Header2Component {

  constructor(private router: Router) { }

  user: any;

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    const jsonUser = JSON.parse(localStorage.getItem('user') || '');
    this.user = jsonUser
  }

  irUsuario(): void {
    this.router.navigate(['usuario']);
  }

  irAdmin(): void {
    this.router.navigate(['admin']);
  }

}
