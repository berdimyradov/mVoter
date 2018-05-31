import { Component, OnInit } from '@angular/core';
import { navItems} from './users-NavItems';

@Component({
  selector: 'app-users-layout',
  templateUrl: './users-layout.component.html',
  styleUrls: ['./users-layout.component.scss']
})
export class UsersLayoutComponent implements OnInit {

  public navItems = navItems;

  constructor() { }

  ngOnInit() {
  }

}
