import { Component } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  constructor(
    private router: Router) { }

  getRoutes(): Routes {
    return this.router.config.filter(route => route.component && route.title);
  }
}
