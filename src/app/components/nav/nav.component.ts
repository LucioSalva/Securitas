import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(private router: Router) {}


  isHomePage(): boolean {

    return this.router.url === '/' || this.router.url === '/home';
  }

  isLoginPage(): boolean {

    return this.router.url === '/login';
  }

  irAlLogin() {
    this.cerrarOffcanvas();
    this.router.navigate(['/login']);
  }
  irHome(){
    this.cerrarOffcanvas();
    this.router.navigate(['/'])
  }
  private cerrarOffcanvas() {
    const offcanvasElement = document.getElementById('offcanvasNavbar');
    if (offcanvasElement) {
      const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
      if (offcanvasInstance) {
        offcanvasInstance.hide();
      }
    }
  }
  }

