import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { LoginService } from './services/login.service';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    RouterLink,
    CommonModule,
    NgIf,
    MatSidenavModule
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'qalikay';
  role: string = '';
  showToolbar: boolean = false;
  showSecondToolbar: boolean = false;
  private routerSubscription!: Subscription;
  currentSubMenu: string | null = null;

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit() {
    this.routerSubscription = this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const currentUrl = event.urlAfterRedirects;
      const hiddenToolbarRoutes = ['/home', '/authentication', '/aboutus', '/contact', '/registeruser', '/login'];
      this.showToolbar = hiddenToolbarRoutes.includes(currentUrl);
      this.showSecondToolbar = !hiddenToolbarRoutes.includes(currentUrl);
      if (currentUrl !== '/login') {
        this.verificar();
      }
    });

    this.verificar();
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
  toggleSubMenu(menu: string) {
    if (this.currentSubMenu === menu) {
      this.currentSubMenu = null;
    } else {
      this.currentSubMenu = menu;
    }
  }
  cerrar() {
    sessionStorage.clear();
  }

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }

  isAdmin() {
    return this.role === 'ADMIN';
  }

  isExperto() {
    return this.role === 'EXPERTO';
  }

  isCliente() {
    return this.role === 'CLIENTE';
  }

  isDashboard() {
    return this.router.url.includes('/dashboard');
  }
}
