import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class UsersComponent implements OnInit {

  users: any[] = [];
  loading = false;
  roleFilter: string | null = null;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.roleFilter = this.route.snapshot.data['role'] || null;
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;

    this.adminService.getUsers(this.roleFilter || undefined).subscribe({
      next: (res) => {
        if (res.success) {
          this.users = res.data;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  activate(id: number) {
    this.adminService.activateUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  deactivate(id: number) {
    this.adminService.deactivateUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  delete(id: number) {
    if (confirm("Are you sure you want to delete this user?")) {
      this.adminService.deleteUser(id).subscribe(() => {
        this.loadUsers();
      });
    }
  }
}