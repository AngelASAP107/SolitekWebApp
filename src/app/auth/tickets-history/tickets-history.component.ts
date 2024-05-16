import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tickets-history',
  templateUrl: './tickets-history.component.html',
  styleUrl: './tickets-history.component.css'
})
export class TicketsHistoryComponent {
  constructor(private router: Router) { }

  navigateToMenu() {
    this.router.navigate(['/menu-admin']);
  }

}
