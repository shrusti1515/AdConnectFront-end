import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { Admaker } from '../../business-entity/admaker-view-model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-admaker-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admaker-profile.html',
  styleUrls: ['./admaker-profile.css']
})
export class AdmakerProfileComponent implements OnInit, OnDestroy {

  admaker: Admaker | null = null;
  isLoading = true;
  errorMessage: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProfile(id);
    } else {
      this.errorMessage = 'No admaker ID provided';
      this.isLoading = false;
      this.cdr.markForCheck();
    }
  }

  loadProfile(id: any) {
    this.isLoading = true;
    this.errorMessage = null;
    this.cdr.markForCheck();

    this.clientService.getAdmakerProfile(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          console.log("Data received:", res);
          this.admaker = res;
          this.isLoading = false;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error("Error:", err);
          this.errorMessage = err?.message || 'Failed to load admaker profile';
          this.isLoading = false;
          this.cdr.markForCheck();
        }
      });
  }

  hireAdmaker() {
    if (this.admaker?.id) {
      this.router.navigate(['/client/create-project', this.admaker.id]);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}