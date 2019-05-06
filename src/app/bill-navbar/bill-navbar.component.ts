import { Component, OnInit } from '@angular/core';
import { User } from '../login/user.model';
import { ComponentFactoryResolver } from '@angular/core/src/render3';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bill-navbar',
  templateUrl: './bill-navbar.component.html',
  styleUrls: ['./bill-navbar.component.css']
})
export class BillNavbarComponent implements OnInit {

  user: User = new User("Robson Mattos", "rjnmattos@gmail.com", true, "Robson Mattos")

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
      this.router.navigate(['/login'])
  }

}
