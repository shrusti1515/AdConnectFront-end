import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector:'client-sidebar',
  standalone:true,
  imports:[RouterLink, RouterLinkActive],
  templateUrl:'./sidebar.html',
  styleUrl:'./sidebar.css'
})
export class Sidebar{}