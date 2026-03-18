import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../shared/services/toast.service';

interface FieldErrors {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  message: string = "";
  loading = false;

  showPassword = false;
  showConfirmPassword = false;

  errors: FieldErrors = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastService
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  register(
    name: string,
    email: string,
    phone: string,
    pass: string,
    confirm: string,
    role: string
  ) {

    this.message = "";

    this.errors = {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      role: ''
    };

    /* ---------- FRONTEND VALIDATION ---------- */

    if (!name.trim()) {
      this.errors.name = "Full name is required";
    }

    if (!email.trim()) {
      this.errors.email = "Email is required";
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.errors.email = "Enter valid email address";
    }

    if (!phone.trim()) {
      this.errors.phone = "Phone number is required";
    }
    else if (!/^[6-9]\d{9}$/.test(phone)) {
      this.errors.phone = "Enter valid Indian phone number";
    }

    if (!pass) {
      this.errors.password = "Password is required";
    }
    else if (pass.length < 6) {
      this.errors.password = "Password must be at least 6 characters";
    }

    if (!confirm) {
      this.errors.confirmPassword = "Confirm your password";
    }
    else if (pass !== confirm) {
      this.errors.confirmPassword = "Passwords do not match";
    }

    if (!role) {
      this.errors.role = "Please select a role";
    }

    if (Object.values(this.errors).some(x => x !== "")) return;

    /* ---------- API CALL ---------- */

    const payload = {
      Name: name.trim(),
      Email: email.trim(),
      Phone: phone.trim(),
      Password: pass,
      ConfirmPassword: confirm,
      Role: role
    };

    this.loading = true;

    this.http.post<any>(`${environment.apiUrl}/User/register`, payload)
      .subscribe({

        next: () => {

          this.loading = false;

          this.toast.show("Registration Successful");

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1200);
        },

        error: (err: HttpErrorResponse) => {

          this.loading = false;

          if (err.status === 400 && err.error?.errors) {

            const backendErrors = err.error.errors;

            Object.keys(backendErrors).forEach(field => {

              const key = field.charAt(0).toLowerCase() + field.slice(1) as keyof FieldErrors;

              if (this.errors[key] !== undefined) {
                this.errors[key] = backendErrors[field][0];
              }

            });

          }
          else if (err.error?.message) {
            this.message = err.error.message;
          }
          else {
            this.message = "Something went wrong. Try again.";
          }

        }

      });

  }
}