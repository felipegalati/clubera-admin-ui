import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {}
