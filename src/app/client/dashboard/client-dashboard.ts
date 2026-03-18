import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-dashboard.html',
  styleUrl: './client-dashboard.css'
})
export class ClientDashboard implements OnInit {

  loading = true;
  error = "";
  dashboardData: any = null;

  constructor(
    private api: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    // get clientId stored during login
    const clientId = localStorage.getItem("clientId");

    if (!clientId) {
      this.error = "Client not found. Please login again.";
      this.loading = false;
      return;
    }

    this.api.get(`Client/dashboard/${clientId}`).subscribe({

      next: (res: any) => {

        console.log("Dashboard Response:", res);

        if (res.success) {
          this.dashboardData = res.data;
        } else {
          this.error = "Failed to load dashboard";
        }

        this.loading = false;
        this.cdr.markForCheck();
      },

      error: (err: any) => {

        console.error("Dashboard error:", err);
        this.error = "Failed to load dashboard";
        this.loading = false;

      }

    });

  }

  browseAdmakers(){
    this.router.navigate(['/client/admakers']);
    this.cdr.markForCheck();
  }

  postProject(){
    this.router.navigate(['/client/post-project']);
    this.cdr.markForCheck();
  }

  myProjects(){
    this.router.navigate(['/client/my-projects']);
    this.cdr.markForCheck();
  }

  trackProjects(){
    this.router.navigate(['/client/track-projects']);
    this.cdr.markForCheck();
  }

}