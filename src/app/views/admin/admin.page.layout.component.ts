import { Component, OnInit } from '@angular/core';
import { navItems } from './adminPageNavItems';

@Component({
  selector: 'app-admin.page.layout',
  templateUrl: './admin.page.layout.component.html',
  styleUrls: ['./admin.page.layout.component.scss']
})
export class AdminPageLayoutComponent implements OnInit {
  public navItems = navItems;

  constructor() { }

  ngOnInit() {
  }

  logout() {
    localStorage.setItem('currentUser', '');
  }

}
