import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  stats: any = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.adminService.getDashboardStats()
      .subscribe({
        next: (res: any) => {
          console.log("Dashboard API Response:", res);
          if (res.success) {
            this.stats = res.stats;
          }
        },
        error: (err: any) => {
          console.error("Dashboard error:", err);
        }
      });
  }
}