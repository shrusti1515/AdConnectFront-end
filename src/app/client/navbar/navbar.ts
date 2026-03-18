import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'client-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  constructor(private router: Router) {}

  logout() {
    // clear session if needed
    localStorage.clear();
    sessionStorage.clear();

    this.router.navigate(['/login']);
  }
}