import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-admakers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './browse-admakers.html',
  styleUrls: ['./browse-admakers.css']
})
export class BrowseAdmakersComponent implements OnInit {

  admakers: any[] = [];

  filters = {
    service: '',
    minBudget: null,
    maxBudget: null,
    minRating: null,
    minExperience: null
  };

    
  constructor(private clientService: ClientService,
    private cdr: ChangeDetectorRef,
    private router: Router,) {}

  ngOnInit(): void {
    this.loadAdmakers();
    this.cdr.markForCheck();
  }

  // Load all approved admakers
loadAdmakers(){
this.cdr.markForCheck();
  this.clientService.getAdmakers()
  .subscribe((res:any)=>{

    this.admakers = res.data;
 this.cdr.markForCheck();
  });

}
  // Search with filters
 search(){
 this.cdr.markForCheck();
  this.clientService.searchAdmakers(this.filters)
  .subscribe((res:any)=>{

    this.admakers = res.data || res;
 this.cdr.markForCheck();
  });

}

  // Handle image loading error
  handleImageError(event: any) {
    event.target.src = 'https://localhost:7265/uploads/default-portfolio.jpg';
  }

  // View profile button
  viewProfile(admaker: any) {
this.cdr.markForCheck();
  this.router.navigate(['/client/admaker-profile', admaker.id]);
 this.cdr.markForCheck();
}

}