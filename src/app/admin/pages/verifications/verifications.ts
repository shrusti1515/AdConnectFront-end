import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-verifications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verifications.html',
  styleUrls: ['./verifications.css']
})
export class VerificationsComponent implements OnInit {

  pendingAdmakers: any[] = [];
  selectedPortfolio: any[] = [];
  showPortfolioModal = false;
  loading = false;
  actionLoadingId: number | null = null;

  constructor(
    private adminService: AdminService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadPendingAdmakers();
  }

  // ================= LOAD PENDING ADMAKERS =================
  loadPendingAdmakers(): void {
    this.loading = true;

    this.adminService.getPendingAdmakers().subscribe({
      next: (res: any) => {
        this.pendingAdmakers = res.data || [];
        this.loading = false;
      },
      error: () => {
        this.toast.show("Failed to load pending Admakers");
        this.loading = false;
      }
    });
  }

  // ================= VIEW PORTFOLIO =================
  viewPortfolio(admakerId: number): void {

    this.adminService.getAdmakerPortfolios(admakerId).subscribe({
      next: (res: any) => {
        this.selectedPortfolio = res.data || [];
        this.showPortfolioModal = true;
      },
      error: () => {
        this.toast.show("Failed to fetch portfolio");
      }
    });

  }

  // ================= VERIFY ADMAKER =================
  verifyAdmaker(admakerId: number, status: 'Approved' | 'Rejected'): void {

    if (!confirm(`Are you sure you want to ${status.toLowerCase()} this Admaker?`))
      return;

    this.actionLoadingId = admakerId;

    this.adminService.verifyAdmaker(admakerId, status).subscribe({

      next: (res: any) => {

        if (status === 'Approved') {
          this.toast.show("Admaker approved successfully");
        } else {
          this.toast.show("Admaker rejected successfully");
        }

        this.loadPendingAdmakers();
        this.actionLoadingId = null;

      },

      error: (err) => {
        this.toast.show(err?.error?.message || "Verification failed");
        this.actionLoadingId = null;
      }

    });
  }

  // ================= CLOSE MODAL =================
  closePortfolioModal(): void {
    this.showPortfolioModal = false;
    this.selectedPortfolio = [];
  }


}